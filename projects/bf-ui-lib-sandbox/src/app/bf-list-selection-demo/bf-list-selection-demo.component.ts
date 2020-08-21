import {Component, OnDestroy, OnInit} from '@angular/core';
import {BfListHandler, ListStatus} from '../../../../bf-ui-lib/src/lib/bf-list-handler/bf-list-handler';
import {BfListSelection} from '../../../../bf-ui-lib/src/lib/bf-list-selection/bf-list-selection';


@Component({
  selector: 'app-bf-list-selection-demo',
  templateUrl: './bf-list-selection-demo.component.html',
  styleUrls: ['./bf-list-selection-demo.component.scss']
})
export class BfListSelectionDemoComponent implements OnInit, OnDestroy {
  name = BfListSelectionDoc.name;
  desc = BfListSelectionDoc.desc;
  api = BfListSelectionDoc.api;
  instance = BfListSelectionDoc.instance;
  compInst = `<bf-list-checkbox>`;

  example1 = `public myList = new BfListHandler({ ... });
public mySel = new BfListSelection(this.myList);
this.mySel.getSelection(); / this.mySel.ids;


<ul class="list-unstyled table-list">
  <li class="list-header">
    <bf-list-header-col class="mobile" ...
  
    <bf-list-checkbox [selection]="mySel"></bf-list-checkbox>    
    <bf-list-header-col class="col-2" ...
    <bf-list-header-col class="col-2" ...
  </li>
  <li class="list-row">
    <bf-mobile-list-row ...
  
    <bf-list-checkbox [selection]="mySel" [id]="item.id">                      
    </bf-list-checkbox>  
    <div class="col-2">...</div>
    <div class="col-2">...</div>
  </li>
</ul>`;

  example2 = `public myList = new BfListHandler({ ... });
public mySel = new BfListSelection(this.myList);
this.mySel.getSelection(); / this.mySel.ids;


<ul class="list-unstyled table-list">
  <li class="list-header">    
    <bf-checkbox class="col-1"
                 [ngModel]="mySel.isPageChecked"
                 (ngModelChange)="mySel.togglePage()">                 
    </bf-checkbox>
    ...    
  </li>

  <li class="list-row">
    <bf-checkbox class="col-1"
                 [ngModel]="mySel.ids[item.id]"
                 (ngModelChange)="mySel.toggleCheck(item.id)">                 
    </bf-checkbox>
    ...
  </li>
</ul>`;



  public status = ListStatus;

  public itemsList = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba', icon: 'icon-smile2', img: 'assets/language-flags/ca.png' },
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen', icon: 'icon-home',          img: 'assets/language-flags/de.png' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen', icon: 'icon-office',        img: 'assets/language-flags/ja.png' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen', icon: 'icon-thumbs-up',     img3: 'assets/language-flags/cn.png' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen', icon: 'icon-phone2',        img: 'assets/language-flags/da.png' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen', icon: 'icon-bell2',         img: 'assets/language-flags/cat.png' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen', icon: 'icon-user',          img: 'assets/language-flags/el.png' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen', icon: 'icon-users',         img: 'assets/language-flags/es.png' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen', icon: 'icon-lock',          img: 'assets/language-flags/fi.png' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen', icon: 'icon-teapot',        img: 'assets/language-flags/fr.png' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen', icon: 'icon-plus',          img: 'assets/language-flags/gb.png' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen', icon: 'icon-minus',         img: 'assets/language-flags/ie.png' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen', icon: 'icon-notification2', img: 'assets/language-flags/it.png' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen', icon: 'icon-warning2',      img: 'assets/language-flags/ja.png' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen', icon: 'icon-checkmark',     img: 'assets/language-flags/nl.png' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen', icon: 'icon-rocket',        img: 'assets/language-flags/no.png' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen', icon: 'icon-bin',           img: 'assets/language-flags/pl.png' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen', icon: 'icon-shield',        img: 'assets/language-flags/pt.png' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen', icon: 'icon-switch',        img: 'assets/language-flags/sv.png' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen', icon: 'icon-list',          img: 'assets/language-flags/tw.png' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen', icon: 'icon-tree6',         img: 'assets/language-flags/us.png' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen', icon: 'icon-earth2',        img: 'assets/language-flags/zh.png' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen', icon2: 'icon-menu3',        img2: 'assets/language-flags/ca.png' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen', icon: 'icon-link',          img: 'assets/language-flags/de.png' },
  ];


  public myList = new BfListHandler({
    listName: 'test-list',
    filterFields: ['username', 'email'],
    orderFields: ['id'],
    rowsPerPage: 5,
  });


  // public sel: BfListSelection;
  public sel = new BfListSelection(this.myList);
  // public sel = new BfListSelection(this.myList.renderList$);
  // public sel = new BfListSelection(this.myList.renderedList);


  constructor() { }

  ngOnInit() {
    this.myList.load(this.itemsList);
    // this.sel = new BfListSelection(this.myList.renderedList);
  }
  ngOnDestroy() {
    this.sel.destroy();
  }

  public getSel() {
    console.log('Selected IDs:', this.sel.getSelection());
  }
  public selectAll() {
    this.myList.loadedList.forEach(item => this.sel.toggleCheck(item.id, true));
  }

}


export const BfListSelectionDoc = {
  name    : `BfListSelection`,
  uiType  : 'class',
  desc    : `(Class) Multiple selection handler`,
  api     : `new BfListSelection(list)   The list param of the constructor can be:
                              1 - A BfListHandler object
                              2 - An observable emitting the array of items (renderList$)
                              3 - An array with the list of items (renderedList)

ids: {};                    Object list with the selected keys (ids)
list: [];                   Reference to the list of items rendered on the current page of the list (renderedList)
isPageChecked: boolean;     Whether the current page has all items selected or not
resetOnFilter: boolean;     If true and using a BfListHandler, onFiltersChange$ empties the selection automatically

destroy() ................. In case of using observables, to destroy subscriptions. 
getSelection() ............ Returns the selected ids with an array = Object.keys(this.ids).
isChecked(id) ............. Returns whether an item with the ID is selected or not.
resetSel() ................ Empties the current selection.
refresh() ................. Updates the selection (page selection checkbox).
toggleCheck(id, value?) ... Selects/deselects the given ID. If value is provided, true=selects, false=deselects. 
togglePage(value?) ........ Selects/deselects all the items of the current page. If value is provided, true=selects all, false=deselects all.
`,
  instance: `mySel = new BfListSelection(this.myList);`,
  demoComp: BfListSelectionDemoComponent
};
