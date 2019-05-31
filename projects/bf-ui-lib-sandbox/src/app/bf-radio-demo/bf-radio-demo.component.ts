// bf-radio = 'bf-btn'
// BfRadio = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-radio-demo]',
  templateUrl: './bf-radio-demo.component.html',
  styleUrls: ['./bf-radio-demo.component.scss']
})
export class BfRadioDemoComponent implements OnInit {
  public name = BfRadioDoc.name;
  public desc = BfRadioDoc.desc;
  public api = BfRadioDoc.api;
  public instance = BfRadioDoc.instance;

  public instance2 = 
`<bf-radio</bf-radio>`;

  constructor() { }

  ngOnInit() { }

}


export const BfRadioDoc = {
  name    : `bf-radio`,
  desc    : `Generates a button.`, 
  api     : `[bfText]: Button text`,
  instance: `<bf-radio></bf-radio>`, 
  demoComp: BfRadioDemoComponent
};