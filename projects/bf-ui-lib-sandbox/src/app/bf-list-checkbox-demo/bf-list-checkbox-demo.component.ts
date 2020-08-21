import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-list-checkbox-demo',
  templateUrl: './bf-list-checkbox-demo.component.html',
  styleUrls: ['./bf-list-checkbox-demo.component.scss']
})
export class BfListCheckboxDemoComponent implements OnInit {
  public name = BfListCheckboxDoc.name;
  public desc = BfListCheckboxDoc.desc;
  public api = BfListCheckboxDoc.api;
  public instance = BfListCheckboxDoc.instance;


  public instance1 = `<li class="list-header">
  <bf-list-header-col class="mobile" ...

  <bf-list-checkbox [selection]="mySel"></bf-list-checkbox>
  
  <bf-list-header-col class="col-2" ...
  <bf-list-header-col class="col-2" ...
</li>`;


  public instance2 = `<li class="list-row">
  <bf-mobile-list-row ...

  <bf-list-checkbox [selection]="mySel" [id]="item.id"></bf-list-checkbox>

  <div class="col-2">...</div>
  <div class="col-2">...</div>
</li>`;


  constructor() { }

  ngOnInit() {

  }

}


export const BfListCheckboxDoc = {
  name    : `bf-list-checkbox`,
  uiType  : 'component',
  desc    : `Generates a checkbox to be placed inside a list row for multiple item selection.`,
  api     : `[selection] : The BfListSelection object to control the multiselection
[id]        : If provided, the identification of the row element to select. If not, it behaves as a full page selector. `,
  instance: `<bf-list-checkbox></bf-list-checkbox>`,
  demoComp: BfListCheckboxDemoComponent
};
