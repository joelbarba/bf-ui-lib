// bf-date-picker = 'bf-btn'
// BfDatePicker = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-date-picker-demo',
  templateUrl: './bf-date-picker-demo.component.html',
  styleUrls: ['./bf-date-picker-demo.component.scss']
})
export class BfDatePickerDemoComponent implements OnInit {
  public name = BfDatePickerDoc.name;
  public desc = BfDatePickerDoc.desc;
  public api = BfDatePickerDoc.api;
  public instance = BfDatePickerDoc.instance;
  public model = '';
  public myVar = '';
  public instance3 = '';


  public instance2 =
`<bf-date-picker</bf-date-picker>`;

  constructor() { }

  ngOnInit() { }

}


export const BfDatePickerDoc = {
  name    : `bf-date-picker`,
  uiType  : 'component',
  desc    : `Generates a button.`,
  api     : `[bfText]: Button text`,
  instance: `<bf-date-picker></bf-date-picker>`,
  demoComp: BfDatePickerDemoComponent
};
