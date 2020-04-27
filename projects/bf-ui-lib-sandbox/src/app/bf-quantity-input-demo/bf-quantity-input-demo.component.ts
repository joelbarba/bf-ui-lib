import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-quantity-input-demo',
  templateUrl: './bf-quantity-input-demo.component.html',
  styleUrls: ['./bf-quantity-input-demo.component.scss']
})
export class BfQuantityInputDemoComponent implements OnInit {

  public myVar: any = 15;
  public myVar2;
  public lastMod = new Date();
  public name = BfQuantityInputDoc.name;
  public desc = BfQuantityInputDoc.desc;
  public api  = BfQuantityInputDoc.api;

  public custom = {
    exLinked: false,
    config: {
      hasMinValue: false,
      hasMaxValue: false,
      hasMode: false,
      modeOptions: [{ text: 'small' }, { text: 'large' }, { text: 'button-fit' }]
    },
    object: {
      value: 0,
      name: 'custom',
      disable: false,
      minValue: null,
      maxValue: null,
      mode: null
    },
    componentView: `<bf-quantity-input></bf-quantity-input>`,
    buildComponentView: () => {
      this.custom.exLinked = false;
      const obj = this.custom.object;
      const config = this.custom.config;
      this.custom.componentView = `<bf-quantity-input
      [(ngModel)]="value"
      [name]="${obj.name}"
      [bfDisabled]="${obj.disable}"` +
      (config.hasMinValue ? `
      [bfMinVal]="${obj.minValue}"` : '') +
      (config.hasMaxValue ? `
      [bfMaxVal]="${obj.maxValue}"` : '') +
      (config.hasMode ? `
      class="${obj.mode}"` : '') + '>' + `
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
</bf-quantity-input>`,
    object: {
      name: 'instance2',
      value: 2,
      minValue: null,
      maxValue: 10,
      mode: 'small',
      disable: false
    }
  };

  public cssReset = `$quantity-input-bg: $white !default;
$quantity-input-border: $valid-color !default;
$quantity-input-left-btn: $valid-color !default;
$quantity-input-right-btn: $valid-color !default;
$quantity-input-blocked-btn: darken($primary_color, 8%) !default;`;

  constructor() { }

  ngOnInit() {
  }

  setLastMod = () => this.lastMod = new Date();

  myFunc($event) {
    console.log('change emited', $event);
  }
}

export const BfQuantityInputDoc = {
  name    : `bf-quantity-input`,
  uiType  : 'component',
  desc    : `Set quantity using the input or the side buttons`,
  api     : `* [(ngModel)]        : Model value
  [name]             : The input name used for control validations
  [class]            : Options: small, large, button-fit
  [bfDisabled]       : Disable input and buttons
  [bfMinVal]         : Minimum value permitted
  [bfMaxVal]         : Maximum value permitted`,
  demoComp: BfQuantityInputDemoComponent
};
