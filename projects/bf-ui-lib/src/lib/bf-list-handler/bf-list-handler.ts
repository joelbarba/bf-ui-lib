import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {debounceTime, map, scan} from 'rxjs/operators';


export interface BfListHandlerConfig {
  listName      ?: string;
  filterFields  ?: Array<string>;
  orderFields   ?: Array<string>;
  orderReverse  ?: boolean;
  rowsPerPage   ?: number;
  totalPages    ?: number;
}


export class BfListHandler {
  public render$: BehaviorSubject<any>; // Observable to listen to rendering changes
  public renderList$: Observable<any>;  // Observable to listen to rendering changes, mapping only renderedList as output

  // ---- STATE ---------------
  public loadedList: Array<any>;    // Array with the full loaded content
  public renderedList: Array<any>;  // Array with the content to render on the list (filtered + ordered + paginated)
  public listName = '';             // Optional list identifier
  public loadingStatus = 0;         // 0=Empty, 1=Loading, 2=Loaded, 3=Error
  public totalItems = 0;            // loadedList.length
  public totalFiltered = 0;         // Total number of filtered items (middle step after filter and before pagination)
  public renderedItems = 0;         // renderedList.length
  public rowsPerPage = 10;          // Max number of rows per page of the pagination
  public currentPage = 1;           // Current page of the pagination
  public totalPages = 1;            // Calculation of the total number of pages
  public filterText = '';           // Current filter value
  // --------------------------

  public filterFields: Array<string> = [];  // Name of the field where to apply the filter (filterText)
  public orderConf = {
    fields: [],       // Array with all the fields the list is ordered by
    reverse: false,   // Whether the list is ordered asc (false) or desc (true)
    setField: (orderField) => this.order(orderField) // Function to add a new field to the order sequence
  };
  public pagesList = [{id: 1, isLast: false}];   // List of page numbers (to loop)


  private contentSubs;  // Content loader subscription

  constructor(customInit: Partial<BfListHandlerConfig> = {}) {
    if (customInit.hasOwnProperty('listName'))     { this.listName     = customInit.listName; }
    if (customInit.hasOwnProperty('filterFields')) { this.filterFields = customInit.filterFields; }
    if (customInit.hasOwnProperty('orderFields'))  { this.orderConf.fields = customInit.orderFields; }
    if (customInit.hasOwnProperty('orderReverse')) { this.orderConf.reverse = customInit.orderReverse; }
    if (customInit.hasOwnProperty('rowsPerPage'))  { this.rowsPerPage  = customInit.rowsPerPage; }
    if (customInit.hasOwnProperty('totalPages'))   { this.totalPages   = customInit.totalPages; }

    this.loadedList = [];
    this.renderedList = [];

    this.loadingStatus = 0; // Empty
    this.render$ = new BehaviorSubject(this.getState());
    this.renderList$ = this.render$.pipe(map(state => state.renderedList ));
  }


  // ------------------------- REDUCER -----------------------------
  // Apply an action to the current state to generate the next state
  private dispatch = (change: { action?: string, payload?: any } = {}) => {
    console.log('Reducer [', this.listName, ']----> ', change.action, change.payload);

    switch (change.action) {
      case 'LOAD' :
        this.loadedList = change.payload;
        this.loadedList.forEach(this.extendItem);
        this.loadingStatus = 2;
        break;

      case 'ADD'    : this.loadedList.push(this.extendItem(change.payload)); break;
      case 'REMOVE' : this.loadedList.splice(this.loadedList.indexOf(change.payload), 1); break;

      case 'FILTER' : this.filterText = change.payload; break;

      case 'ORDER'  :
        const orderField = change.payload;
        if (this.orderConf.fields[0] === orderField) {
          this.orderConf.reverse = !this.orderConf.reverse; // Revers current order

        } else { // Add selected field to the first field order
          const fieldPos = this.orderConf.fields.indexOf(orderField);
          if (fieldPos >= 0) { this.orderConf.fields.splice(fieldPos, 1); }
          this.orderConf.fields.unshift(orderField);
          this.orderConf.reverse = false;
        }
        break;

      case 'PAGINATE': this.rowsPerPage = change.payload; break;
      case 'GOTO':     this.currentPage = change.payload; break;
      case 'NEXT':     this.currentPage++; break;
      case 'PREV':     this.currentPage--; break;
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

    // Truncate pagination
    if (this.rowsPerPage > 0) {
      this.totalPages = Math.ceil(this.renderedList.length / this.rowsPerPage);

      if (this.currentPage < 1) { this.currentPage = 1; }
      if (this.currentPage > this.totalPages) { this.currentPage = this.totalPages; }

      this.renderedList = this.renderedList.filter((item, ind) => {
        const offSet = (this.currentPage - 1) * this.rowsPerPage;
        const limit = this.currentPage * this.rowsPerPage;
        return (ind >= offSet && ind < limit);
      });

      // Generate an array with all pages
      this.pagesList = Array.from(Array(this.totalPages).keys())
        .map(ind => ({ id: ind + 1, isLast: (ind === this.totalPages - 1) }));
    }

    this.totalItems = this.loadedList.length;
    this.renderedItems = this.renderedList.length;

    // console.log('dispatching: ', change.action, this.getState());
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

  // ---------------- Public methods to trigger actions ----------------------

  // Load a list of data
  public load = (content) => this.dispatch({ action: 'LOAD', payload: content });

  // Set an observable as the source of input data for the list
  public setLoader = (load$) => {
    if (!!this.contentSubs) { this.contentSubs.unsubscribe(); }
    this.loadingStatus = 1; // loading
    this.contentSubs = load$.subscribe(this.load);
  };

  // Shortcuts to dispatch action
  public refresh = () => this.dispatch({ action: 'REFRESH' });
  public add = (item: any) => this.dispatch({ action: 'ADD', payload: item });
  public filter = (filterText = '')    => this.dispatch({ action: 'FILTER',   payload: filterText });
  public order  = (orderField = '')    => this.dispatch({ action: 'ORDER',    payload: orderField });
  public paginate = (rowsPerPage = 10) => this.dispatch({ action: 'PAGINATE', payload: rowsPerPage });
  public goToPage = (numPage = 1)      => this.dispatch({ action: 'GOTO',     payload: numPage });
  public nextPage = () => this.dispatch({ action: 'NEXT' });
  public prevPage = () => this.dispatch({ action: 'PREV' });



  // Extend the list item with manipulation methods: $save(), $remove()
  private extendItem = (item: any = {}) => {
    item.$remove = () => this.dispatch({ action: 'REMOVE', payload: item });
    item.$save = (nextItem = {}) => {
      Object.assign(item, nextItem);
      this.dispatch({ action: 'REFRESH' });
    };
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

        if (valA !== valB) { // If not equal, return which goes first
          return (valA > valB ? reVal : -reVal);
        }
      }
      return reVal;
    });
  };

}
