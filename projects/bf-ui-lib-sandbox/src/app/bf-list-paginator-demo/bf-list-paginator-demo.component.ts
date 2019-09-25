// bf-list-paginator = 'bf-btn'
// BfListPaginator = 'BfBtn'


import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bf-list-paginator-demo]',
  templateUrl: './bf-list-paginator-demo.component.html',
  styleUrls: ['./bf-list-paginator-demo.component.scss']
})
export class BfListPaginatorDemoComponent implements OnInit {
  public name = BfListPaginatorDoc.name;
  public desc = BfListPaginatorDoc.desc;
  public api = BfListPaginatorDoc.api;
  public instance = BfListPaginatorDoc.instance;

  public instance2 = 
`<bf-list-paginator [bfCtrl]="myList" 
                   (bfPageChange)="page = $event">                   
</bf-list-paginator>`;

  public instance3 =
`<bf-list-paginator [bfCtrl]="myList"
                    bfShowSelector="true">
</bf-list-paginator>`;

  public instance4 =
`<bf-list-paginator class="full-width" [bfCtrl]="myList"></bf-list-paginator>`;

  public myList = {
    goToPage: (numPage) => { console.log('Going to page ', numPage)},
    currentPage : 1,
    totalPages  : 18,
    rowsPerPage : 10,
  };


  public cssReset = `$primary_color: #00B6F1;
$page_bg: white;
$page_color: darken($primary_color, 10%);
$page_border_color: #c0c0c0;
$page_hover_bg: #eeeeee;

div.bf-list-paginator {
  .page-buttons {
    .page-btn {
      border-color: $page_border_color;
      color: $page_color;
      background: $page_bg;
      &:not(.disabled):hover { background: $page_hover_bg; }
      &.current {
        color: $page_bg;
        background: $page_color;
        &:hover { background: $page_color; }
      }
    }
  }
}`;

  public page = 1;


  constructor() { }

  ngOnInit() { }

  public pageChangeFn = (numPage) => {
    console.log('bfPageChange callback ', numPage);
  };



  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n                   `;
  public customCompCode = ``;
  public compConf = {
    myList: {
      totalPages: 241,
      currentPage: 8,
      rowsPerPage: 10,
      // paginate: (rowsPerPage) => {
      //   console.log(rowsPerPage, new Date());
      // }
    },

    hasPageChange: false,
    hasMaxButtons: false,
    bfMaxButtons: 4,

    bfShowSelector: false,
    hasFullWidth: false,
    hasAlignRight: false,
    hasAlignCenter: false,

  };
  public upComp = () => {
    this.customCompCode = `<bf-list-paginator `;

    let compClasses = '';
    if (this.compConf.hasFullWidth) { compClasses += (!!compClasses.length ? ' ' : '') + 'full-width'; }
    if (this.compConf.hasAlignRight) { compClasses += (!!compClasses.length ? ' ' : '') + 'align-right'; }
    if (this.compConf.hasAlignCenter) { compClasses += (!!compClasses.length ? ' ' : '') + 'align-center'; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + this.bsStr;
    }
    this.customCompCode += `[bfCtrl]="myList"`;
    if (this.compConf.hasPageChange) { this.customCompCode += this.bsStr + `(bfPageChange)="doSomething($event)"`; }
    if (this.compConf.hasMaxButtons) { this.customCompCode += this.bsStr + `bfMaxButtons="${this.compConf.bfMaxButtons}"`; }
    if (this.compConf.bfShowSelector) { this.customCompCode += this.bsStr + `bfShowSelector="true"`; }

    this.customCompCode += (`>` + this.brStr + `</bf-list-paginator>`);
  };
  public changeNum = (value, delta) => {
    let result: number;
    if (typeof value !== 'number' && !Number.isNaN(value)) {
      result = parseInt(value) || 0;
    } else {
      result = value;
    }
    result = result + delta;
    if (result < 0) { result = 0; }
    return result;
  }




}


export const BfListPaginatorDoc = {
  name    : `bf-list-paginator`,
  uiType  : 'component',
  desc    : `Generates a list of buttons to control the pagination of a list`,
  api     : `[bfShowSelector] : (boolean) Whether to show the dropdown with the number of items per page
[bfMaxButtons]   : (number) Number of maximum extra page buttons to display next to every side of the current page (0=1, 1=3, 2=5, 3=7, 4=9 ... x=2x+1)
(bfPageChange)   : Event triggered every time the page changes (same as "goToPage")
[bfCtrl]         : (object) Wrapper with the main properties
                    bfCtrl.currentPage : (number) The current page of the list
                    bfCtrl.totalPages  : (number) The total number of pages (list.length \ rowsPerPage)
                    bfCtrl.rowsPerPage : (number) Number of items to display per page
                    bfCtrl.goToPage    : (function) Callback function to trigger every time the current page changes`,
  instance: `<bf-list-paginator [bfCtrl]="myList"></bf-list-paginator>`,
  demoComp: BfListPaginatorDemoComponent
};
