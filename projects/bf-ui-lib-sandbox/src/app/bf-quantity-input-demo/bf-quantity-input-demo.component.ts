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

  public cssReset = `$input-border: #ccc !default;
$optional_input_color : $input-border;
$disabled_input_color : #797979;
$primary_color        : #00B6F1;
$warning_color        : #ED0677;
$invalid_input_color  : $warning_color;
.bf-quantity-input-form-group {}`;

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
