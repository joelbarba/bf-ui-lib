import {BehaviorSubject, merge, Observable, Subject, timer} from 'rxjs';
import {debounce, debounceTime, distinctUntilChanged, map, scan} from 'rxjs/operators';
import Debug from 'debug';
import {BfPrototypes} from '../bf-prototypes/bf-prototypes';
const debugList = Debug('bfUiLib:bfListHandler');  // Turn it on with:   localStorage.debug='bfUiLib:bfListHandler'

export interface BfListHandlerConfig {
  listName      ?: string;
  filterFields  ?: Array<string>;
  orderFields   ?: Array<string>;
  orderReverse  ?: boolean;
  rowsPerPage   ?: number;
  totalPages    ?: number;
  extMethods    ?: boolean;
  filtersConf   ?: { [name: string]: { debounceTime: number; addToUrl: boolean }};
  backendPagination ?: (queryFilter: any) => void | Promise<{ pageList, totalItems }>;
}


export class BfListHandler {
  public render$: BehaviorSubject<any>; // Observable to listen to rendering changes
  public renderList$: Observable<any>;  // Observable to listen to rendering changes, mapping only renderedList as output

  // ---- STATE ---------------
  public loadedList: Array<any>;    // Array with the full loaded content
  public renderedList: Array<any>;  // Array with the content to render on the list (filtered + ordered + paginated)
  public listName = '';             // Optional list identifier
  public loadingStatus = 0;         // 0=Empty, 1=Loading, 2=Loaded, 3=Error, 4=Loading Page
  public totalItems = 0;            // loadedList.length
  public totalFiltered = 0;         // Total number of filtered items (middle step after filter and before pagination)
  public renderedItems = 0;         // renderedList.length
  public rowsPerPage = 10;          // Max number of rows per page of the pagination
  public currentPage = 1;           // Current page of the pagination
  public totalPages = 1;            // Calculation of the total number of pages
  public filterText = '';           // Current filter value
  public backendPagination;         // Function to provide a backend filtered/paginated list handler
  public backFilter = { limit: 10, offset: 0, order_by : '' };
  public filtersConf: any = {};     // Object array with every filter's configuration
  // --------------------------
  public filters: any = {}; // To keep multiple filter field values

  public extMethods = false;        // Whether to extend the items with handling methods ($remove, $save)
  public filterFields: Array<string> = [];  // Name of the field where to apply the filter (filterText)
  public orderConf = {
    fields: [],       // Array with all the fields the list is ordered by
    reverse: false,   // Whether the list is ordered asc (false) or desc (true)
    setField: (orderField) => this.order(orderField) // Function to add a new field to the order sequence
  };
  public pagesList = [{id: 1, isLast: false}];   // List of page numbers (to loop)


  private contentSubs;  // Content loader subscription
  private stateSubs;    // State loader subscription
  private debouncedFilter$ = new Subject<{filterName, filterValue}>();

  constructor(customInit: Partial<BfListHandlerConfig> = {}) {
    if (customInit.hasOwnProperty('listName'))     { this.listName     = customInit.listName; }
    if (customInit.hasOwnProperty('orderFields'))  { this.orderConf.fields  = customInit.orderFields; }
    if (customInit.hasOwnProperty('orderReverse')) { this.orderConf.reverse = customInit.orderReverse; }
    if (customInit.hasOwnProperty('rowsPerPage'))  { this.rowsPerPage  = customInit.rowsPerPage; }
    if (customInit.hasOwnProperty('totalPages'))   { this.totalPages   = customInit.totalPages; }
    if (customInit.hasOwnProperty('extMethods'))   { this.extMethods   = customInit.extMethods; }
    if (customInit.hasOwnProperty('backendPagination')) { this.backendPagination = customInit.backendPagination; }
    if (customInit.hasOwnProperty('filterFields')) { this.filterFields = customInit.filterFields; }
    if (customInit.hasOwnProperty('filtersConf')) {
      this.filtersConf = customInit.filtersConf;
      Object.keys(this.filtersConf).forEach(filterName => {
        this.filtersConf[filterName] = { addToUrl: true, debounceTime: 500, ...this.filtersConf[filterName] };
      });
    }

    this.backFilter = this.getBackendPagination(this.currentPage, this.orderConf, this.rowsPerPage);
    this.debouncedFilter$.pipe(debounce((filter) => {
      if (Object.keys(this.filtersConf).includes(filter.filterName)) {
        return timer(this.filtersConf[filter.filterName].debounceTime);
      }
      return timer(500);
    }), distinctUntilChanged()).subscribe(filter => {
      this.filters[filter.filterName] = filter.filterValue;
      this.dispatch({ action: 'FILTER', payload: '' });
    });


    this.loadedList = [];
    this.renderedList = [];

    this.loadingStatus = 0; // Empty
    this.render$ = new BehaviorSubject(this.getState());
    this.renderList$ = this.render$.pipe(map(state => state.renderedList ));
  }


  // ------------------------- REDUCER -----------------------------
  // Apply an action to the current state to generate the next state
  private dispatch = (change: { action?: string, payload?: any } = {}) => {
    debugList('Reducer [', this.listName, ']----> ', change.action, change.payload);

    switch (change.action) {
      case 'LOAD' :
        this.loadedList = change.payload;
        this.loadedList.forEach(this.extendItem);
        this.loadingStatus = 2;
        break;

      case 'PAGINATE': // New rows per page = refresh pagination
        this.rowsPerPage = change.payload || this.rowsPerPage;
        this.currentPage = this.getPage(this.currentPage);
        break;

      case 'LOAD PAGE':
        if (!!this.backendPagination) {
          this.loadedList = change.payload.pageList;
          this.totalItems = change.payload.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.rowsPerPage) || 1;
          this.loadingStatus = 2;
        }
        break;

      case 'ADD'     : this.loadedList.push(this.extendItem(change.payload)); break;
      case 'REMOVE'  : this.loadedList.splice(this.loadedList.indexOf(change.payload), 1); break;
      case 'FILTER'  : this.filterText = change.payload; break;
      case 'ORDER'   : this.orderConf = this.getOrderConf(change.payload); break;
      case 'GOTO'    : this.currentPage = this.getPage(change.payload); break;
      case 'NEXT'    : this.currentPage = this.getPage(this.currentPage + 1); break;
      case 'PREV'    : this.currentPage = this.getPage(this.currentPage - 1); break;
      case 'REFRESH' : break;
    }

    // Generate rendered list
    this.renderedList = this.loadedList;

    // Filter list
    this.renderedList = this.filterList(this.renderedList, this.filterText, this.filterFields);
    this.totalFiltered = this.renderedList.length;

    // Order list
    if (!!this.orderConf && !!this.orderConf.fields && this.orderConf.fields.length > 0) {
      this.renderedList = this.orderList(this.renderedList, this.orderConf.fields, this.orderConf.reverse);
    }

    // Pagination (slice the list to one page)
    if (!this.backendPagination) {
      this.setFrontendPagination();
    } else {

      // These actions should force offset reset
      if (['PAGINATE', 'FILTER'].includes(change.action)) { this.currentPage = 1; }

      // These actions should trigger a backend page request to load the page
      if (['PAGINATE', 'FILTER', 'ORDER', 'GOTO', 'NEXT', 'PREV'].includes(change.action)) {
        this.triggerPagination();
      }
    }

    // Generate an array with all pages (for <bf-list-paginator>)
    this.pagesList = Array.from(Array(this.totalPages).keys())
      .map(ind => ({ id: ind + 1, isLast: (ind === this.totalPages - 1) }));

    this.renderedItems = this.renderedList.length;

    // debugList('dispatching: ', change.action, this.getState());
    this.render$.next(this.getState());
  };

  // Wrap the state the fields
  public getState = () => {
    return {
      loadedList    : this.loadedList,
      renderedList  : this.renderedList,
      listName      : this.listName,
      loadingStatus : this.loadingStatus,
      totalItems    : this.totalItems,
      totalFiltered : this.totalFiltered,
      renderedItems : this.renderedItems,
      rowsPerPage   : this.rowsPerPage,
      currentPage   : this.currentPage,
      totalPages    : this.totalPages,
      filterFields  : this.filterFields,
      filterText    : this.filterText,
    };
  };

  // Returns an "orderConf" object with the order configuration for the list, adding the passed field
  public getOrderConf = (orderField: string) => {
    const orderConf = { ...this.orderConf };
    if (orderConf.fields[0] === orderField) {
      orderConf.reverse = !orderConf.reverse; // Revers current order

    } else { // Add selected field to the first field order
      const fieldPos = orderConf.fields.indexOf(orderField);
      if (fieldPos >= 0) { orderConf.fields.splice(fieldPos, 1); }
      orderConf.fields.unshift(orderField);
      orderConf.reverse = false;
    }
    return orderConf;
  };

  public getPage = (pageNum = this.currentPage) => {
    if (pageNum < 1) { pageNum = 1; }
    if (pageNum > this.totalPages) { pageNum = this.totalPages; }
    return pageNum;
  };

  // ---------------- Backend side pagination ----------------------

  // Frontend pagination (slice the list based on the pagination state)
  public setFrontendPagination = () => {
    this.totalPages = Math.ceil(this.renderedList.length / this.rowsPerPage) || 1;
    this.totalItems = this.loadedList.length;
    this.currentPage = this.getPage(); // In case it falls off

    this.renderedList = this.renderedList.filter((item, ind) => {
      const offSet = (this.currentPage - 1) * this.rowsPerPage;
      const limit = this.currentPage * this.rowsPerPage;
      return (ind >= offSet && ind < limit);
    });

  };

  // Backend pagination (mock the list slicing) with asynchronous page loading
  public triggerPagination = () => {
    const nextFilter = this.getBackendPagination(this.currentPage, this.orderConf, this.rowsPerPage);
    if (this.loadingStatus === 0 || this.isFilterDiff(nextFilter)) {
      this.loadingStatus = 4;
      this.backFilter = nextFilter;
      const resPromise = this.backendPagination(nextFilter);
      if (!!resPromise) { // If a promise is returned, trigger the page load automatically
        return resPromise.then(page => {
          this.loadPage(page);
          return page;
        });
      }
    } else {
      console.log('Same filter, do not refresh page', this.backFilter, nextFilter);
    }
    return Promise.resolve();
  };

  // Compares "nextFilter" object with "this.backFilter", prop by prop
  public isFilterDiff = (nextFilter) => {
    const keys1 = Object.keys(this.backFilter);
    const keys2 = Object.keys(nextFilter);
    if (keys1.length !== keys2.length) { return true; }
    for (const key of keys1) {
      if (!keys2.includes(key)) { return true; }
      if (this.backFilter[key] !== nextFilter[key]) { return true; }
    }
    return false;
  };

  // Returns an object with the parameters to generate a backend side filtered page
  public getBackendPagination = (pageNum?: number, orderConf?: { fields: Array<string>, reverse: boolean }, rowsPerPage?: number) => {
    const backFilter = { ...this.backFilter };
    if (!!rowsPerPage) { backFilter.limit  = rowsPerPage; }
    if (!!pageNum)     { backFilter.offset = (pageNum - 1) * backFilter.limit; }
    if (!!orderConf)   { backFilter.order_by = orderConf.fields.map(field => (orderConf.reverse ? '-' : '') + field).join(','); }

    Object.keys(this.filters).forEach(filterName => {
      if (!!this.filters[filterName]) {
        backFilter[filterName] = this.filters[filterName];
      } else {
        delete backFilter[filterName];
      }
    });
    return backFilter;
  };


  // ---------------- Public methods to trigger actions ----------------------

  // Load a list of data
  public load = (content) => this.dispatch({ action: 'LOAD', payload: content });

  // Set an observable as the source of input data for the list
  public subscribeTo = (load$) => {
    if (!!this.contentSubs) { this.contentSubs.unsubscribe(); }
    this.loadingStatus = 1; // loading
    this.contentSubs = load$.subscribe(list => {
      this.load(JSON.parse(JSON.stringify(list || [])));
    });
  };

  // Set an observable as the source of input state (state: { status, list })
  public setState = (state$) => {
    if (!!this.stateSubs) { this.stateSubs.unsubscribe(); }
    this.stateSubs = state$.subscribe(state => {
      this.loadingStatus = state.status;
      if (state.status === 2) { this.load(state.list); }
    });
  };

  // Shortcuts to dispatch action
  public refresh = () => this.dispatch({ action: 'REFRESH' });
  public add = (item: any) => this.dispatch({ action: 'ADD', payload: item });
  public order  = (orderField = '')    => this.dispatch({ action: 'ORDER',     payload: orderField });
  public paginate = (payload)          => this.dispatch({ action: 'PAGINATE',  payload });
  public loadPage = (payload)          => this.dispatch({ action: 'LOAD PAGE', payload });
  public goToPage = (numPage = 1)      => this.dispatch({ action: 'GOTO',      payload: numPage });
  public nextPage = () => this.dispatch({ action: 'NEXT' });
  public prevPage = () => this.dispatch({ action: 'PREV' });

  public filter = (filterValue: any, filterName?: string) => {
    if (filterName) { // Filter on an specific field
      this.debouncedFilter$.next({ filterValue, filterName });

    } else { // Filter filterText on multiple fields (filterFields)
      if (!!this.backendPagination) {
        console.warn('Not allowed with backend pagination. Provide a field please');
        return false;
      }
      this.dispatch({ action: 'FILTER', payload: filterValue });
    }
  };



  // Extend the list item with manipulation methods: $save(), $remove()
  private extendItem = (item: any = {}) => {
    if (this.extMethods) {
      item.$remove = () => {
        this.dispatch({ action: 'REMOVE', payload: item });
      };
      item.$save = (nextItem = {}) => {
        Object.assign(item, nextItem);
        this.dispatch({ action: 'REFRESH' });
      };
    }
    return item;
  };

  // Default function to filter the list (on render). If "filterList" is extended later, this can be used to refer to the default
  public defaultFilterList = (list: Array<any>, filterText: string = '', filterFields: Array<string>): Array<any> => {
    if (!filterText) {
      return list;

    } else {
      const matchPattern = filterText.toLowerCase();
      return list.filter((item) => {
        let isMatch = false;
        for (const field of filterFields) {
          if (item.hasOwnProperty(field)) {
            const fieldStr = JSON.stringify(item[field]); // In case the field is not a string, parse it
            isMatch = isMatch || fieldStr.toLowerCase().indexOf(matchPattern) >= 0;
          }
        }
        return isMatch;
      });
    }
  };

  // Function to filter the list. ---> Extend this function if you need a custom filter
  public filterList = (list: Array<any>, filterText: string = '', filterFields: Array<string>): Array<any> => {
    return this.defaultFilterList(list, filterText, filterFields);
  };

  // Function to order the list (default order on render)
  public orderList = (list: Array<any>, orderFields: Array<string>, orderReverse: boolean): Array<any> => {
    return list.sort((itemA, itemB) => {
      const reVal = !!orderReverse ? -1 : 1;

      // Iterate all fields until we find a difference and can tell which goes first
      for (const field of orderFields) {
        let valA = itemA[field];
        let valB = itemB[field];

        if (!isNaN(valA) && !isNaN(valB)) { // If numbers, compare using number type
          valA = Number(valA);
          valB = Number(valB);
        }

        // Turn string order fields lowercase to make the search not case sensitive
        if (typeof valA === 'string') { valA = valA.toLowerCase(); }
        if (typeof valB === 'string') { valB = valB.toLowerCase(); }

        if (valA !== valB) { // If not equal, return which goes first
          return (valA > valB ? reVal : -reVal);
        }
      }
      return reVal;
    });
  };

}
