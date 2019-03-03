// bf-dropdown = 'bf-btn'
// BfDropdown = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-dropdown-demo]',
  templateUrl: './bf-dropdown-demo.component.html',
  styleUrls: ['./bf-dropdown-demo.component.scss']
})
export class BfDropdownDemoComponent implements OnInit {
  public name = BfDropdownDoc.name;
  public desc = BfDropdownDoc.desc;
  public api = BfDropdownDoc.api;
  public instance = BfDropdownDoc.instance;

  public instance2 = 
`<bf-dropdown</bf-dropdown>`;

  constructor() { }

  ngOnInit() { }

}


export const BfDropdownDoc = {
  name    : `bf-dropdown`,
  desc    : `Generates a button.`, 
  api     : `[bfText]: Button text`,
  instance: `<bf-dropdown></bf-dropdown>`, 
  demoComp: BfDropdownDemoComponent
};