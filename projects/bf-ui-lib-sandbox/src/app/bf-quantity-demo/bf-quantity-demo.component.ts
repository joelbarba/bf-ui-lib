import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-bf-quantity-demo]',
  templateUrl: './bf-quantity-demo.component.html',
  styleUrls: ['./bf-quantity-demo.component.scss']
})
export class BfQuantityDemoComponent implements OnInit {
  public name = BfQuantityDoc.name;
  public desc = BfQuantityDoc.desc;
  public api = BfQuantityDoc.api;
  public instance = BfQuantityDoc.instance;
  public outerValue = 6;

  // public myForm = new FormGroup({ outer_value: new FormControl() });
  public myForm = new FormGroup({ outer_value: new FormControl() });

  public myInputCtrl: FormControl = new FormControl();

  public myFormGroup = new FormGroup({});
  public myInput100: FormControl = new FormControl();
  public myInput200: FormControl = new FormControl();
  public myInput500: FormControl = new FormControl();

  // public myInput700;
  @ViewChild('myInput700') myInput700: ElementRef;


  public instance2 = 
`<bf-quantity</bf-quantity>`;

  constructor() { }

  ngOnInit() {
    this.myFormGroup.registerControl('input100', this.myInput100);
    this.myFormGroup.registerControl('input200', this.myInput200);
    this.myFormGroup.registerControl('input500', this.myInput500);
  }

  doSomething = (ctrl) => {
    // this.myInput700 = ctrl;
    console.log('doing something', this.myInput700);
  }

}


export const BfQuantityDoc = {
  name    : `bf-quantity`,
  desc    : `Generates a button.`, 
  api     : `[bfText]: Button text`,
  instance: `<bf-quantity></bf-quantity>`, 
  demoComp: BfQuantityDemoComponent
};