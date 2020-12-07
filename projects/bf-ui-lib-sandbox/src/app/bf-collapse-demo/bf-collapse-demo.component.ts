// bf-collapse = 'bf-btn'
// BfCollapse = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-collapse-demo',
  templateUrl: './bf-collapse-demo.component.html',
  styleUrls: ['./bf-collapse-demo.component.scss']
})
export class BfCollapseDemoComponent implements OnInit {
  public name = BfCollapseDoc.name;
  public desc = BfCollapseDoc.desc;
  public api = BfCollapseDoc.api;
  public instance = BfCollapseDoc.instance;
  public isColl = true;

  public ex1 = `<bf-btn class="toggle" [(bfToggle)]="isCol"></bf-btn>
<div [bf-collapse]="isCol">
  My dynamic content
</div>`;

  public ex2 = `<bf-btn (bfClick)="myBox.toggle()"></bf-btn>
<div class="marT15" bf-collapse #myBox="bfCollapse">
  My dynamic content
</div>`;

  constructor() { }
  ngOnInit() { }
}


export const BfCollapseDoc = {
  name    : `bf-collapse`,
  uiType  : 'component',
  desc    : `Generates a collapsible element`,
  api     : `[bf-collapse]: boolean with the status (collapsed=true, expanded=false)`,
  instance: `<bf-collapse></bf-collapse>`,
  demoComp: BfCollapseDemoComponent
};
