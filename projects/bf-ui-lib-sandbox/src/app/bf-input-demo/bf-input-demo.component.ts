import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bf-input-demo]',
  templateUrl: './bf-input-demo.component.html',
  styleUrls: ['./bf-input-demo.component.scss']
})
export class BfInputDemoComponent implements OnInit {
  public name = BfInputDoc.name;
  public desc = BfInputDoc.desc;
  public api = BfInputDoc.api;
  public instance = BfInputDoc.instance;
  public val1 = 'Joel';
  public val2 = 'Barba';

  public myModel:string = 'My default value';

  public instance2 =
`<bf-input</bf-input>`;


  public formExampleInput100 = `<form #myForm="ngForm">
  
  <bf-input [bfRequired]="true" ngModel="val1" #firstRef="ngModel" name="first">
  </bf-input>
  
  <bf-input [bfRequired]="true" ngModel="val2" #lastRef="ngModel" name="last">
  </bf-input>
  
  <bf-btn bfText="Save Form" [bfDisabled]="myForm.invalid"></bf-btn>

</form>`;

  public flatExample = '<bf-input class="flat" [ngModel]="bfModel"></bf-input>';

  public cssReset=`$input-border: #ccc !default; // <-- this is a bootstrap default
$optional_input_color : $input-border;
$required_input_color : $primary_color;
$invalid_input_color  : $warning_color;
$valid_input_color    : $primary_color;
$disabled_input_color : #797979;

.bf-input-form-group {
    &.is-required .bf-input-inner-icon {
    color: $required_input_color; // Icon into the input to add info or error alert
  }
  .bf-input-inner-icon {
    &.bf-icon-error { color: $invalid_input_color; }
    &.bf-icon-valid { color: $valid_input_color; }
    &.bf-icon-loading { color: $valid_input_color; }
  }
  input.form-control { // Placeholder color (https://developer.mozilla.org/en-US/docs/Web/CSS/::placeholder)
    &::-webkit-input-placeholder { color: $optional_input_color; } /* WebKit, Blink, Edge */
    &:-moz-placeholder           { color: $optional_input_color; opacity:  1; } /* Mozilla Firefox 4 to 18 */
    &::-moz-placeholder          { color: $optional_input_color; opacity:  1; } /* Mozilla Firefox 19+ */
    &:-ms-input-placeholder      { color: $optional_input_color; } /* Internet Explorer 10-11 */
    &::-ms-input-placeholder     { color: $optional_input_color; } /* Microsoft Edge */
    &::placeholder               { color: $optional_input_color; } /* Most modern browsers support this now. */
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    border: 1px solid $optional_input_color;
    &:focus { box-shadow: 0 0 0 2px rgba($optional_input_color, 0.35); }
  }
  &.is-disabled input.form-control { color: $disabled_input_color; }
  &.is-required  input.form-control {
    border-color: $primary_color;
    &:focus { box-shadow: 0 0 0 2px rgba($primary_color, 0.20); }
  }
  &.is-error {
    label { color: $warning_color; }
    input.form-control {
      border-color: $warning_color;
      &:focus { box-shadow: 0 0 0 2px rgba($warning_color, 0.20); }
    }
    .bf-input-error-text { color: $invalid_input_color; }
  }
}`;

  constructor() { }
  ngOnInit() { }
}


export const BfInputDoc = {
  name    : `bf-input`,
  desc    : `Generates a button.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated).
[bfLabel]       : Label of the input (automatically translated). If not provided, no label is displayed.
[bfRequired]    : Whether the input is required or not
[bfDisabled]    : Whether the input is disabled or not
[bfPlaceholder] : Placeholder text (automatically translated)
[bfTooltip]     : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip
`,
  instance: `<bf-input></bf-input>`,
  demoComp: BfInputDemoComponent
};
