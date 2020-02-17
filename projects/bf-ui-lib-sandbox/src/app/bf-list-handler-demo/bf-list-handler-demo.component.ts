import {Component, OnDestroy, OnInit} from '@angular/core';
import {BfGrowlService} from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {BfListHandler} from '../../../../bf-ui-lib/src/lib/bf-list-handler/bf-list-handler';
import {BehaviorSubject, Subject} from 'rxjs';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-bf-list-handler-demo',
  templateUrl: './bf-list-handler-demo.component.html',
  styleUrls: ['./bf-list-handler-demo.component.scss']
})
export class BfListHandlerDemoComponent implements OnInit, OnDestroy {
  public name = BfListHandlerDoc.name;
  public desc = BfListHandlerDoc.desc;
  public api = BfListHandlerDoc.api;
  public instance = BfListHandlerDoc.instance;

  public listData = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba'},
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen' },
    { id:  4, username: 'CAraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen' },
    { id: 13, username: 'Dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen' },
  ];
  public genList;

  public example1 = `import { BfListHandler} from 'bf-ui-lib';

this.myList = new BfListHandler({
  listName      : 'test-list',
  filterFields  : ['username', 'first_name'],
  orderFields   : ['id', 'username'],
  orderReverse  : false,
  rowsPerPage   : 10,
  totalPages    : 15,
});`;
  public example2 = `this.myList.load(data); // <-- Sync load

// Async loading
const loader$ = new Subject();
this.myList.setLoader(this.loader$);
setTimeout(() => { this.loader$.next(data); }, 1000);

this.myList.render$.subscribe(state => ...);`;
  public example3 = `this.myList.filterList = (list: Array<any>, filterText: string = '', filterFields: Array<string>): Array<any> => {
  return this.defaultFilterList(list, filterText, filterFields);
};`;
  public example4 = `<bf-list-header-col colTitle="Username" fieldName="username" [orderConf]="myList.orderConf"></bf-list-header-col>`;
  public example5 = `<bf-list-paginator class="col-12" [bfCtrl]="myList" bfShowSelector="true"></bf-list-paginator>`;
  public example6 = `<bf-btn bfType="add" bfText="view.common.add" (bfClick)="myList.add({...})"></bf-btn>
<li *ngFor="let item of myList.renderList$ | async">
  <div class="col-10">...</div>
  <div class="col-2 text-right">
    <bf-btn bfType="delete" (bfClick)="item.$remove()"></bf-btn>
    <bf-btn bfType="edit"   (bfClick)="item.$save({ username: 'new value' })"></bf-btn>
  </div>
</li>`;

  public viewExample = `<div class="row whiteBg padB15">
  <bf-input class="col-4"
            bfLabel="Filter (any)"
            bfIcon="icon-search"
            [(ngModel)]="myList.filterText"
            (ngModelChange)="myList.filter($event)">
  </bf-input>
  <div class="col-8 marT20 text-right">
    <bf-btn bfType="add" bfText="view.common.add" (bfClick)="myList.add({...})"></bf-btn>
  </div>
</div>

<div class="row whiteBg">
  <bf-list-paginator class="col-12" [bfCtrl]="myList" bfShowSelector="true"></bf-list-paginator>
</div>

<div class="row">
  <div class="col-12">
    <ul class="list-unstyled table-list">
      <li class="list-header">
        <bf-list-header-col class="col-1" colTitle="Id"         fieldName="id"        [orderConf]="myList.orderConf"></bf-list-header-col>
        <bf-list-header-col class="col-2" colTitle="Username"   fieldName="username"  [orderConf]="myList.orderConf"></bf-list-header-col>
        <bf-list-header-col class="col-4" colTitle="Email"></bf-list-header-col>
        <bf-list-header-col class="col-4" colTitle="Full Name"></bf-list-header-col>
      </li>

      <bf-list-placeholder [hidden]="myList.loadingStatus > 1" [bfColumns]="[1, 2, 4, 4, 1]"></bf-list-placeholder>
      <li class="list-row" [hidden]="myList.loadingStatus <= 1"
          *ngFor="let item of myList.renderList$ | async">
        <div class="col-1"><h5>{{item.id}}</h5></div>
        <div class="col-2"><h5>{{item.username}}</h5></div>
        <div class="col-4"><h5>{{item.email}}</h5></div>
        <div class="col-4"><h5>{{item.first_name + ' ' + item.last_name}}</h5></div>
        <div class="col-1 text-right">
          <bf-btn bfType="delete" (bfClick)="item.$remove()"></bf-btn>
          <bf-btn bfType="edit"   (bfClick)="item.$save({ username: 'new value' })"></bf-btn>
        </div>
      </li>
    </ul>
  </div>
</div>`;

  public codeExample = `
  public myList: BfListHandler;
  public loader$ = new Subject();
  
  constructor() {
    const listConfig = {
      listName      : 'test-list',
      filterFields  : ['username', 'first_name'],
      orderFields   : ['id', 'username'],
      orderReverse  : false,
      rowsPerPage   : 10,
      totalPages    : 15,
    };
    this.myList  = new BfListHandler({ ...listConfig, listName: 'test-list' });
  }

  ngOnInit() {
    this.myList.setLoader(this.loader$);
    // this.myList.load(data); // Async load
    
    this.myList.setLoader(this.loader$);
    setTimeout(() => { this.loader$.next(data); }, 1000);
  }`;


  public myList: BfListHandler;
  public loader$ = new Subject();

  public bpList: BfListHandler;
  public bpLoader$ = new Subject();

  constructor(
    private growl: BfGrowlService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    // List configuration
    // const listConfig = {
    //   listName      : 'test-list',
    //   filterFields  : ['username', 'first_name'],
    //   orderFields   : ['id', 'username'],
    //   orderReverse  : false,
    //   rowsPerPage   : 10,
    //   totalPages    : 15,
    // };
    // this.myList  = new BfListHandler({ ...listConfig, listName: 'test-list' });

    this.bpList  = new BfListHandler({
      listName      : 'backend-pagination-list',
      filterFields  : ['username', 'first_name'],
      orderFields   : ['id', 'username'],
      orderReverse  : false,
      rowsPerPage   : 5,
      backendPagination : (slimFilter: any, fullFilter: any) => {

        // this.mockBEFilter(slimFilter).then((data: any) => {
        //   this.bpList.loadPage({ pageList: data.users, totalItems: data.count });
        // });

        return this.mockBEFilter(slimFilter).then((data: any) => {
          return { pageList: data.users, totalItems: data.count };
        });
      },
    }, this.route.snapshot.queryParams);


    this.bpList.onFiltersChange$.subscribe((filters: any) => {

      // Replace the empty values by null, to stripe them out the url
      Object.keys(filters).forEach(n => {
        if (filters[n] === '' || filters[n] === undefined) { filters[n] = null; }
      });

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: filters,
        replaceUrl: true,
        queryParamsHandling: 'merge',
      });
    });
  }

  ngOnInit() {


    this.bpList.triggerPagination().then(data => {
      // console.log('FIRST PAGE LOADED', data);
    });

    // this.myList.subscribeTo(this.loader$);

    // this.loader$.next(this.getRandomData());
    // this.loader$.next(this.listData);
    // this.myList.load(this.getRandomData());
  }

  ngOnDestroy() {
    this.bpList.destroy();
  }

  asyncLoad() {
    // this.myList.setLoader(this.loader$);
    this.myList.loadingStatus = 1;
    setTimeout(() => {
      this.loader$.next(this.getRandomData());
    }, 4000);
  }

  addItem() {
    this.myList.add({
      id: (Math.trunc(Math.random() * 500)),
      username: 'USER ' + (Math.trunc(Math.random() * 50)),
      email: 'someone@there.com',
      first_name: 'new',
      last_name: 'user'
    });
  }

  editItem(item) {
    item.$save({
      username: 'USER ' + (Math.trunc(Math.random() * 50))
    });
  }

  deleteItem(item) {
    console.log(item, new Date());
    item.$remove();
  }

  public getRandomData = () => {
    this.genList = this.listData.filter(item => !!Math.trunc(Math.random() * 5));
    return this.genList;
  };

  clearFilters() {
    this.bpList.filters.username = null;
    this.bpList.filters.email = null;
    this.bpList.goToPage(1);
  }

  // Mock a backend side paginated list request
  public mockBEFilter = (backFilter) => {
    console.log('--------- Mocking webAPI request with --------->', backFilter);
    return new Promise(resolve => {
      let orderReverse = 1;
      let orderFields = [];
      if (!!backFilter.order_by) {
        orderFields = backFilter.order_by.replace(/-/gi, '').split(',');
        orderReverse = backFilter.order_by.charAt(0) === '-' ? -1 : 1;
      }

      const usersQuery = this.listData.dCopy()
        .filter(item => {
          if (backFilter.username && item.username.toLowerCase().indexOf(backFilter.username.toLowerCase()) < 0) { return false; }
          if (backFilter.email && item.email.toLowerCase().indexOf(backFilter.email.toLowerCase()) < 0) { return false; }
          return true;
        })
        .sort((itemA, itemB) => {
          const reVal = orderReverse;
          for (const field of orderFields) {
            let valA = itemA[field];
            let valB = itemB[field];
            if (!isNaN(valA) && !isNaN(valB)) { valA = Number(valA); valB = Number(valB); }
            if (typeof valA === 'string') { valA = valA.toLowerCase(); }
            if (typeof valB === 'string') { valB = valB.toLowerCase(); }
            if (valA !== valB) { return (valA > valB ? reVal : -reVal); }
          }
          return reVal;
      });

      const users = usersQuery.dCopy().splice(backFilter.offset, backFilter.limit);

      setTimeout(() => {
        resolve({ count: usersQuery.length, users });
      }, 1000);
    });
  };
}


export const BfListHandlerDoc = {
  name    : `bfListHandler`,
  uiType  : 'class',
  desc    : `(Class) Factory to generate list handlers`,
  api     : `renderList$   → Observable to subscribe that generates the rendered list (ready to be used in ngFor with async)
render$       → Observable to subscribe to any state changes. It outputs the state, which contains all fiedls here below

loadedList    : Array<T> → Original content held on the list (no filters applied)
renderedList  : Array<T> → Rendering content (order + filter + pagination applied). It's a subset of loadedList.
listName      : string   → Optional list identifier
loadingStatus : number   → 0=Empty, 1=Loading, 2=Loaded, 3=Error
totalItems    : number   → loadedList.length
totalFiltered : number   → Total number of filtered items (middle step after filter and before pagination)
renderedItems : number   → renderedList.length
rowsPerPage   : number   → Current number of rows per page (pagination)
currentPage   : number   → Current page (pagination)
totalPages    : number   → Current total of pages (pagination)
filterText    : string   → Current filtered match (the pattern to match with the content)
extMethods    : boolean  → Current filtered match (the pattern to match with the content)

filterFields  : Array<string> → Array of the fields that will be match with the "filterText" during the filter process.
orderConf { → Object to manage order (ready to be link to <bf-list-header-col [bfCtrl]="orderConf">)
  fields: Array<string>   → Array of the fields to order the list (order by).
  reverse: boolean        → Whether the list is ordered asc (false) or desc (true)
  setField(field: string) → It adds (unshift) a new order field in fields[]. If that field was already present in the array
                            it swaps it to the first position (first field to order by)
}

.load(data: Array<T>)                                       → To load a new content passing a new array of objects.
.subscribeTo(loader$: Observable<Array<T>>)                 → Subscribes to a source (array to load on the list). 
.setLoader(loader$: Observable<{ status, list: Array<T> }>) → Same as .subscribeTo() but with status.
                                                              Subscribes to the loader$ observable to load the content every time it emits.
                                                              Setting the loader turns the loadingStatus to 1 (loading). When the content
                                                              is loaded (loader$.next()) it turns it to 2 (loaded).

// Action dispatchers - All this methods will trigger a list render after the state changes
.filter(filterText)     → To update filterText with a new match
.order(orderField)      → Select what field we order the list by. Choosing the same twice reverts.
.paginate(rowsPerPage)  → To change the number of rows per page
.nextPage()             → Jump pagination to the next page
.prevPage()             → Jump pagination to the previous page
.goToPage(page: number) → Jump pagination to the previous page
.refresh()              → It doesn't change anything, just forces a rerender of the list
.add(item: T)           → It adds an item to the content list, and renders again
`,
  instance: ``,
  demoComp: BfListHandlerDemoComponent
};
