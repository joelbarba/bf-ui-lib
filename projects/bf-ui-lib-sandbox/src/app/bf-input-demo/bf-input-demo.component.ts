import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {BfGrowlService} from "../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service";
import {IbfInputCtrl} from "../../../../bf-ui-lib/src/lib/bf-input/bf-input.component";

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
  public val1 = '1';
  public val2 = 'Barba';

  public myModel:string = 'My default value';




  public valEx: any = {
    isRequired: false, minLen: 0,
    isMaxLen: false, maxLen: 5,
    hasPattern: false, pattern: '[A-Za-z]{3,8}',
    valType: null, valTypes: [
      { id: 'integer',  text: 'integer',  },
      { id: 'number',   text: 'number',   },
      { id: 'decimal',  text: 'decimal',  },
      { id: 'email',    text: 'email',    },
    ],
    hasBfValidator: false, bfValMatchVal: '666',
    hasErrOnPristine: false,
    hasIcon: false,        hasInvalidIcon: false,             hasValidIcon: false,
    bfIcon: 'icon-search', bfInvalidIcon: 'icon-thumbs-down', bfValidIcon: 'icon-checkmark4',
    hasErrorText: false, bfErrorText: 'view.common.custom_error',
    errorPos: '', errorPosOpts : [
      { id: 'top-right',    text: 'top-right',  },
      { id: 'bottom-left',  text: 'bottom-left',   },
      { id: 'bottom-right', text: 'bottom-right',  },
    ],
  };
  public isInputReady = false;
  public exposedModel: FormControl;
  public inputCtrl: IbfInputCtrl = {};
  public inputInit = () => {
    this.exposedModel = this.inputCtrl.getControl();
    setTimeout(() => this.isInputReady = true, 400);
  };
  public validIfFn = (value) => {
    return (value === this.valEx.bfValMatchVal) ? null : { label : 'this is wrong' };
  };

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

  public cssReset = `$input-border: #ccc !default; // <-- this is a bootstrap default
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

  public instance4 = `<bf-input [(ngModel)]="myModel" bfAutoFocus="true"
          (bfOnKeyDown)="growl.success('Key pressed -> ' + $event.key)">
</bf-input>`;
  public instance5 = `<bf-input [(ngModel)]="myModel" bfAutoFocus="true"
          (bfOnEsc)="growl.success('Esc key pressed')"
          (bfOnEnter)="growl.success('Enter key pressed')"
          (bfOnCtrlEnter)="growl.success('Ctrl + Enter key pressed')">
</bf-input>`;



  constructor(
    private growl: BfGrowlService,
  ) { }
  ngOnInit() { }


  public linkCustomInput = true;
  public resetInput = () => {
    this.linkCustomInput = false;
    setTimeout(() => { this.linkCustomInput = true; });
  };

  public clickMsg;
  public addonClick = (msg = '') => {
    this.clickMsg += ' ' + msg;
    setTimeout(() => { this.clickMsg = ''; }, 1000);
  };

  public isAutofilled = '';


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n          `;
  public customCompCode = ``;
  public tooltipPosList = [
    { id: 'top',        text: 'top'    },
    { id: 'right',      text: 'right'  },
    { id: 'bottom',     text: 'bottom' },
    { id: 'left',       text: 'left'   },
  ];
  public tooltipBodyList = [
    { id: 'true',       text: 'true'   },
    { id: 'false',      text: 'false'  },
  ];
  public inputTypes = [
    { id: 'text',     text: 'text',     },
    { id: 'number',   text: 'number',   },
    { id: 'password', text: 'password', },
    { id: 'email',    text: 'email',    },
  ];
  public myVariable = '';
  public compConf = {
    hasLabel: true, labelText: 'view.common.name',
    hasPlaceholder: false, placeholderText: 'view.common.name',
    isRequired: true,
    hasType: false, inputType: 'text',
    isDisabled: false, inputDisabledTip: '',
    hasIcon: false, inputIcon: 'icon-search',
    hasTooltip: false, inputTooltip: 'Hello World', inputTooltipPos: null, inputTooltipBody: false,
    hasLeftBtn: false, leftBtnIcon: 'icon-plus', hasLeftBtnText: false, leftBtnText: '$',
    hasRightBtn: false, rightBtnIcon: 'icon-eye', hasRightBtnText: false, rightBtnText: 'view.common.yes',
    hasBtnListener: true,
    hasAutoFocus: false,
    hasKeyDown: false,
    hasKeyEsc: false,
    hasKeyEnter: false,
    hasKeyCtrlEnter: false,
    hasFlat: false,
  };
  public upComp = () => {
    this.customCompCode = `<bf-input `;

    let compClasses = '';
    if (this.compConf.hasFlat) { compClasses += (!!compClasses.length ? ' ' : '') + 'flat'; }
    // if (this.compConf.hasAlignRight) { compClasses += (!!compClasses.length ? ' ' : '') + 'align-right'; }
    // if (this.compConf.hasAlignCenter) { compClasses += (!!compClasses.length ? ' ' : '') + 'align-center'; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + this.bsStr;
    }

    this.customCompCode += `[(ngModel)]="myVariable"`;
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `bfRequired="true"`; }
    if (this.compConf.hasLabel) { this.customCompCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`; }
    if (this.compConf.hasPlaceholder) { this.customCompCode += this.bsStr + `bfPlaceholder="${this.compConf.placeholderText}"`; }
    if (this.compConf.hasIcon) { this.customCompCode += this.bsStr + `bfIcon="${this.compConf.inputIcon}"`; }
    if (this.compConf.inputType !== 'text') { this.customCompCode += this.bsStr + `bfType="${this.compConf.inputType}"`; }
    if (this.compConf.hasAutoFocus) { this.customCompCode += this.bsStr + `bfAutoFocus="true"`; }

    if (this.compConf.hasLeftBtnText && this.compConf.leftBtnText)   { this.customCompCode += this.bsStr + `bfLeftBtnText="${this.compConf.leftBtnText}"`; }
    if (this.compConf.hasLeftBtn && this.compConf.leftBtnIcon)       { this.customCompCode += this.bsStr + `bfLeftBtnIcon="${this.compConf.leftBtnIcon}"`; }
    if (this.compConf.hasRightBtnText && this.compConf.rightBtnText) { this.customCompCode += this.bsStr + `bfRightBtnText="${this.compConf.rightBtnText}"`; }
    if (this.compConf.hasRightBtn && this.compConf.rightBtnIcon)     { this.customCompCode += this.bsStr + `bfRightBtnIcon="${this.compConf.rightBtnIcon}"`; }

    if (this.compConf.hasBtnListener) {
      if (this.compConf.hasLeftBtnText || this.compConf.hasLeftBtn) { this.customCompCode += this.bsStr + `(bfLeftBtnClick)="onClickFn()"`; }
      if (this.compConf.hasRightBtnText || this.compConf.hasRightBtn) { this.customCompCode += this.bsStr + `(bfRightBtnClick)="onClickFn()"`; }
    }

    if (this.compConf.hasKeyDown) { this.customCompCode += this.bsStr + `(bfOnKeyDown)="onClickFn($event)"`; }
    if (this.compConf.hasKeyEsc)  { this.customCompCode += this.bsStr + `(bfOnEsc)="onClickFn($event)"`; }
    if (this.compConf.hasKeyEnter) { this.customCompCode += this.bsStr + `(bfOnEnter)="onClickFn($event)"`; }
    if (this.compConf.hasKeyCtrlEnter) { this.customCompCode += this.bsStr + `(bfOnCtrlEnter)="onClickFn($event)"`; }

    this.customCompCode += (`>` + this.brStr + `</bf-input>`);
  };
}


export const BfInputDoc = {
  name    : `bf-input`,
  uiType  : 'component',
  desc    : `Generates a button.`,
  api     : `[(ngModel)]       : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated).
[bfLabel]         : Label of the input (automatically translated). If not provided, no label is displayed.
[bfRequired]      : Whether the input is required or not
[bfDisabled]      : Whether the input is disabled or not
[bfDisabledTip]   : Text with the tooltip to display on hover when the input is disabled
[bfPlaceholder]   : Placeholder text (automatically translated)
[bfIcon]          : Icon to show into the input floating at the right hand side (this is replaced by bfValidIcon and bfInvalidIcon, once the status changes)
[bfType]          : Type of value to apply to the input (text by default). It can be 'text', 'number', 'password', 'email'
[bfAutoFocus]     : (true/false) If true, the input will get focused automatically once is initialized (linked to the view).
[bfTooltip]       : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]    : Position of the tooltip (top by default)
[bfTooltipBody]   : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip
[bfLeftBtnIcon]   : Icon to display in a button on the left side of the input (prepend addon https://getbootstrap.com/docs/4.3/components/input-group/#button-addons)
[bfLeftBtnText]   : Text to display in a button on the left side of the input (prepend addon)
(bfLeftBtnClick)  : To listen to left addon button clicks
[bfRightBtnIcon]  : Icon to display in a button on the right side of the input (append addon)
[bfRightBtnText]  : Text to display in a button on the right side of the input (append addon)
(bfRightBtnClick) : To listen to right addon button clicks
(bfOnAutofill)    : To listen to a browser autofill event. It emits every time the browser autofills the input value
(bfOnKeyDown)     : Triggered when a key is pressed on the textarea
(bfOnEsc)         : Triggered when keys Esc is pressed.
(bfOnEnter)       : Triggered when key Enter is pressed.
(bfOnCtrlEnter)   : Triggered when keys Ctrl + Enter are pressed.
`,
  instance: `<bf-input></bf-input>`,
  demoComp: BfInputDemoComponent
};
