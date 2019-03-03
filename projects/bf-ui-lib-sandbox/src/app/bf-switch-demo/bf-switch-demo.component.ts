// bf-switch = 'bf-btn'
// BfSwitch = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-switch-demo]',
  templateUrl: './bf-switch-demo.component.html',
  styleUrls: ['./bf-switch-demo.component.scss']
})
export class BfSwitchDemoComponent implements OnInit {
  public name = BfSwitchDoc.name;
  public desc = BfSwitchDoc.desc;
  public api = BfSwitchDoc.api;
  public instance = BfSwitchDoc.instance;

  public instance2 = 
`<bf-switch</bf-switch>`;

  constructor() { }

  ngOnInit() { }

}


export const BfSwitchDoc = {
  name    : `bf-switch`,
  desc    : `Generates a button.`, 
  api     : `[bfText]: Button text`,
  instance: `<bf-switch></bf-switch>`, 
  demoComp: BfSwitchDemoComponent
};