import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-quantity-input-demo',
  templateUrl: './bf-quantity-input-demo.component.html',
  styleUrls: ['./bf-quantity-input-demo.component.scss']
})
export class BfQuantityInputDemoComponent implements OnInit {

  public name = BfQuantityInputDoc.name;
  public desc = BfQuantityInputDoc.desc;
  public api  = BfQuantityInputDoc.api;
  public instance = BfQuantityInputDoc.instance;

  public instance2 = `<bf-quantity-input></bf-quantity-input>`;

  public cssReset = `div.quantity-controller-box {
    color:$white;
    &.left{
      background: $primary_color;
    }
    &.right{
      background: $primary_color;
    }
    &.blocked {
      background: darken($primary_color, 8%);
    }
  }
  div.quantity-controller-center {
    input {
      border:2px solid $primary_color;
    }
  }`;

  public instanceObject = {
    name: 'instance1',
    value: 0,
    minValue: 3,
    maxValue: 30,
    mode: 'input-fit',
    disable: false,
    quantityOnChange: null,
    onChange: (item) => this.instanceObject.quantityOnChange = item.quantity
  };

  constructor() { }

  ngOnInit() {
  }

}

export const BfQuantityInputDoc = {
  name    : `bf-quantity-input`,
  uiType  : 'component',
  desc    : `Set quantity using the input or the side buttons`,
  api     : `[bfName]           : The input name used for control validations
[(bfValue)]        : Model value
(bfOnChange)       : Trigger when the model change
[bfMinVal]         : Minimum value permitted
[bfMaxVal]         : Maximum value permitted
[bfSizeMode]       : Used to set additional css properties regard the component size
[bfDisableControls]: Disable input and buttons`,
  instance: `<bf-quantity-input></bf-quantity-input>`,
  demoComp: BfQuantityInputDemoComponent
};
