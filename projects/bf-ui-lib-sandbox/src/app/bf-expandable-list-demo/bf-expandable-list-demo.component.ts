import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-expandable-list-demo',
  templateUrl: './bf-expandable-list-demo.component.html',
  styleUrls: ['./bf-expandable-list-demo.component.scss']
})
export class BfExpandableListDemoComponent implements OnInit {
  public name = BfExpandableListDoc.name;
  public desc = BfExpandableListDoc.desc;
  public api = BfExpandableListDoc.api;
  public instance = BfExpandableListDoc.instance;

  data = [{id:'1', name:'Lagavulin 16'},{id:'2', name:'Dalwhinnie'},{id:'3', name:'Laphroaig 10'},{id:'4', name:'Glenmorange 12'},{id:'5', name:'Oban'},];
  // data = [{id:'1', name:'Lagavulin'},{id:'2', name:'Dalwhinnie'}];
  // data = [{id:'1', name:'Lagavulin'}];
  // data = [];
  myList = this.data.map(u => `<a href='/billing/rates' class='pointer'>${u.name}</a>`);


  constructor() { }

  ngOnInit() { }

}


export const BfExpandableListDoc = {
  name    : `bf-expandable-list`,
  uiType  : 'component',
  desc    : `Generates an expandable list`,
  api     : `[bfList]: Array of strings to be displayed as a list. It can be html.`,
  instance: `<bf-expandable-list [bfList]="myList"></bf-expandable-list>`,
  demoComp: BfExpandableListDemoComponent
};
