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

  public custom = {
    exLinked: false,
    config: {
      hasMinValue: false,
      hasMaxValue: false,
      hasMode: false,
      modeOptions: [{ text: 'small' }, { text: 'large' }, { text: 'input-fit' }, { text: 'button-fit' }],
      hasOnChangeFunction: false,
      onChangeFunctionExample: `onChange: (item) => {
 const value = this.custom.object.quantityOnChange;
 value = item.quantity;
}`
    },
    object: {
      value: 0,
      name: 'custom',
      disable: false,
      minValue: null,
      maxValue: null,
      mode: null,
      quantityOnChange: null,
      onChange: (item) => {
        this.custom.object.quantityOnChange = item.quantity;
      }
    },
    componentView: `<bf-quantity-input></bf-quantity-input>`,
    buildComponentView: () => {
      this.custom.exLinked = false;
      const obj = this.custom.object;
      const config = this.custom.config;
      this.custom.componentView = `<bf-quantity-input
      [(ngModel)]="${obj.value}"
      [name]="${obj.name}"
      [bfDisabled]="${obj.disable}"` +
      (config.hasMinValue ? `
      [bfMinVal]="${obj.minValue}"` : '') +
      (config.hasMaxValue ? `
      [bfMaxVal]="${obj.maxValue}"` : '') +
      (config.hasMode ? `
      [bfMode]="${obj.mode}"` : '') +
      (config.hasOnChangeFunction ? `
      [bfOnChange]="${obj.onChange}"` : '') + '>' + `
</bf-quantity-input>`;
      setTimeout(() => {
        this.custom.exLinked = true;
      }, 10);
    }
  };

  public instance1 = {
    template: `<bf-quantity-input
 [(ngModel)]="value"                       // 0 at begin
 [name]="instance1.object.name"            // instance1
 [bfDisabled]="instance1.object.disable"   // false
 [bfMinVal]="instance1.object.minValue"    // 3
 [bfMaxVal]="instance1.object.maxValue"    // 30
 [bfSizeMode]="instance1.object.mode"      // input-fit
 [bfOnChange]="instance1.object.onChange"> // (i) => show(i.quantity)     
</bf-quantity-input>`,
    object: {
      name: 'instance1',
      value: 0,
      minValue: 3,
      maxValue: 30,
      mode: 'input-fit',
      disable: false,
      quantityOnChange: null,
      onChange: (item) => this.instance1.object.quantityOnChange = item.quantity
    }
  };

  public instance2 = {
    template: `<bf-quantity-input
 [(ngModel)]="value"                       // 2 at begin
 [name]="instance2.object.name"            // instance2
 [bfDisabled]="instance2.object.disable"   // false
 [bfMinVal]="instance2.object.minValue"    // null
 [bfMaxVal]="instance2.object.maxValue"    // 10
 [bfSizeMode]="instance2.object.mode"      // small
 [bfOnChange]="instance2.object.onChange"> // (i) => show(i.quantity)     
</bf-quantity-input>`,
    object: {
      name: 'instance2',
      value: 2,
      minValue: null,
      maxValue: 10,
      mode: 'small',
      disable: false,
      quantityOnChange: null,
      onChange: (item) => this.instance2.object.quantityOnChange = item.quantity
    }
  };

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

  constructor() { }

  ngOnInit() {
  }

}

export const BfQuantityInputDoc = {
  name    : `bf-quantity-input`,
  uiType  : 'component',
  desc    : `Set quantity using the input or the side buttons`,
  api     : `* [(ngModel)]        : Model value
  [name]             : The input name used for control validations
  [bfDisabled]       : Disable input and buttons
  (bfOnChange)       : Trigger when the model change
  [bfMinVal]         : Minimum value permitted
  [bfMaxVal]         : Maximum value permitted
  [bfSizeMode]       : Used to set additional css classes regard the component size. Options:
                       small, large, input-fit, button-fit`,
  demoComp: BfQuantityInputDemoComponent
};
