// bf-list-placeholder = 'bf-btn'
// BfListPlaceholder = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-list-placeholder-demo]',
  templateUrl: './bf-list-placeholder-demo.component.html',
  styleUrls: ['./bf-list-placeholder-demo.component.scss']
})
export class BfListPlaceholderDemoComponent implements OnInit {
  public name = BfListPlaceholderDoc.name;
  public desc = BfListPlaceholderDoc.desc;
  public api = BfListPlaceholderDoc.api;
  public instance = BfListPlaceholderDoc.instance;

  public instance2 = 
`<bf-list-placeholder bfType="table"></bf-list-placeholder>`;

  constructor() { }

  ngOnInit() { }

}


export const BfListPlaceholderDoc = {
  name    : `bf-list-placeholder`,
  desc    : `Generates an animation to display a fake list while loading`, 
  api     : `[bfType]: 'table'`,
  instance: `<bf-list-placeholder></bf-list-placeholder>`, 
  demoComp: BfListPlaceholderDemoComponent
}