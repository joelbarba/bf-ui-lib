// bf-tabs = 'bf-btn'
// BfTabs = 'BfBtn'


import { Component, OnInit } from '@angular/core';
import { BfTab } from 'projects/bf-ui-lib/src/public_api';

@Component({
  selector: 'app-bf-tabs-demo',
  templateUrl: './bf-tabs-demo.component.html',
  styleUrls: ['./bf-tabs-demo.component.scss']
})
export class BfTabsDemoComponent implements OnInit {
  public name = BfTabsDoc.name;
  public desc = BfTabsDoc.desc;
  public api = BfTabsDoc.api;
  public instance = BfTabsDoc.instance;

  public instance2 =
    `<bf-tabs></bf-tabs>`;


  public cssReset = `$optional_input_color : $optional-color;
$focused_input_color  : $focused-color;
$required_input_color : $primary_color;
$invalid_input_color  : $invalid-color;
$valid_input_color    : $primary_color;
$disabled_input_color : $disabled-color;

.bf-tabs-form-group {
  ...
}`;
  public tabs: BfTab[] = [{
    id: '1',
    label: 'Pizza',
    icon: 'icon-pizza',
    active: true,
    tooltip: 'Pizza is food'
  }, {
    id: '2',
    label: 'Burgers',
  },
  {
    id: '3',
    icon: 'icon-cheese',
    tooltip: 'Cheese'
  }];

  public customCompCode = `<bf-tabs [bfTabs]="bfTabs" (tabSelected)="selectedTab = $event"></bf-tabs>`;

  constructor() { }

  ngOnInit() { }

}


export const BfTabsDoc = {
  name: `bf-tabs`,
  uiType: 'component',
  desc: `Generates a row of navigation tabs`,
  api: `
    [bfTabs] : Array of tabs
      id: string;
      label?: string;
      tooltip?: string;
      icon?: string;
      active?: boolean;
  `,
  instance: `<bf-tabs></bf-tabs>`,
  demoComp: BfTabsDemoComponent
};
