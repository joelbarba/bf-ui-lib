// bf-label = 'bf-btn'
// BfLabel = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-label-demo]',
  templateUrl: './bf-label-demo.component.html',
  styleUrls: ['./bf-label-demo.component.scss']
})
export class BfLabelDemoComponent implements OnInit {
  public name = BfLabelDoc.name;
  public desc = BfLabelDoc.desc;
  public api = BfLabelDoc.api;
  public instance = BfLabelDoc.instance;

  public instance2 = 
`<bf-label</bf-label>`;

  constructor() { }

  ngOnInit() { }

}


export const BfLabelDoc = {
  name    : `bf-label`,
  desc    : `Generates a button.`, 
  api     : `[bfText]: Button text`,
  instance: `<bf-label></bf-label>`, 
  demoComp: BfLabelDemoComponent
}