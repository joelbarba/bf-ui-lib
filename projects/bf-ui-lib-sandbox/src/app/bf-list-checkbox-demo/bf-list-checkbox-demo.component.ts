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
  api     : `[selection]   : The BfListSelection object to control the multi selection
[id]          : If provided, the identification of the row element to select. If not, it behaves as a full page selector. 
[actions]     : In case of a header checkbox (no id), you can pass an array of actions to generate an expandable list. The action object has:
                    label     : string  --> Translate label to display the name of the action
                    disabled ?: boolean --> To disable the action
                    fn       ?: (sel?: BfListSelection) => void }]  --> Callback function when the action is clicked

(actionClick) : Apart from the callback function, you can also use this emitter to react to action clicks.   
`,
  instance: `<bf-list-checkbox></bf-list-checkbox>`,
  demoComp: BfListCheckboxDemoComponent
};
