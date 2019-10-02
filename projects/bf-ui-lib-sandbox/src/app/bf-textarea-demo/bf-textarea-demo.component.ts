// bf-textarea = 'bf-btn'
// BfTextarea = 'BfBtn'


import { Component, OnInit } from '@angular/core';
import {BfGrowlService} from "../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service";

@Component({
  selector: 'app-bf-textarea-demo]',
  templateUrl: './bf-textarea-demo.component.html',
  styleUrls: ['./bf-textarea-demo.component.scss']
})
export class BfTextareaDemoComponent implements OnInit {
  public name = BfTextareaDoc.name;
  public desc = BfTextareaDoc.desc;
  public api = BfTextareaDoc.api;
  public instance = BfTextareaDoc.instance;
  public instance2 = `<bf-textarea</bf-textarea>`;
  public myVal = '';
  public flatExample = '<bf-textarea class="flat" [ngModel]="myVal"></bf-textarea>';
  public cssReset = `$input-border: #ccc !default; // <-- this is a bootstrap default
$optional_input_color : $input-border;
$disabled_input_color : #797979;
$primary_color        : #00B6F1;
$warning_color        : #ED0677;
$invalid_input_color  : $warning_color;

.bf-textarea-form-group {
  textarea.form-control {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    border: 1px solid $optional_input_color;
    &:focus { box-shadow: 0 0 0 2px rgba($optional_input_color, 0.35); }
  }
  &.is-disabled textarea.form-control {
    color: $disabled_input_color;
  }
  &.is-required  textarea.form-control {
    border-color: $primary_color;
    &:focus { box-shadow: 0 0 0 2px rgba($primary_color, 0.20); }
  }
  &.is-error {
    label { color: $warning_color; }
    textarea.form-control {
      border-color: $warning_color;
      &:focus { box-shadow: 0 0 0 2px rgba($warning_color, 0.20); }
    }
    .bf-textarea-error-text {
      color: $invalid_input_color;
    }
  }
}`;

  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList"></bf-dropdown>`;
  public compConf = {
    isRequired: false,
    isDisabled: false,
    rows: 4,
    hasLabel: false,      labelText: 'view.common.username',
    hasPlaceholder: false, placeholder: 'view.common.placeholder',
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: null, tooltipBody: false,
    hasKeyDown: false, hasKeyEsc: false, hasKeyCtrlEnter: false,
    hasFlat: false,
  };
  public upComp = () => {
    this.customCompCode = `<bf-textarea `;

    let compClasses = '';
    if (this.compConf.hasFlat) { compClasses += (!!compClasses.length ? ' ' : '') + 'flat'; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + this.bsStr;
    }
    this.customCompCode += `[(ngModel)]="myVal"`;

    if (this.compConf.hasLabel)       { this.customCompCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`; }
    if (this.compConf.hasPlaceholder) { this.customCompCode += this.bsStr + `bfPlaceholder="${this.compConf.placeholder}"`; }
    if (this.compConf.rows !== 4) { this.customCompCode += this.bsStr + `[bfRows]="${this.compConf.rows}"`; }
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `[bfRequired]="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[bfDisabled]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `bfTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `bfTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    if (this.compConf.hasKeyDown) { this.customCompCode += this.bsStr + `(bfOnKeyDown)="onClickFn($event)"`; }
    if (this.compConf.hasKeyEsc)  { this.customCompCode += this.bsStr + `(bfOnEsc)="onClickFn($event)"`; }
    if (this.compConf.hasKeyCtrlEnter) { this.customCompCode += this.bsStr + `(bfOnSave)="onClickFn($event)"`; }

    this.customCompCode += (`>` + this.brStr + `</bf-textarea>`);
  };



  constructor(
    private growl: BfGrowlService,
  ) { }

  ngOnInit() { }

}


export const BfTextareaDoc = {
  name    : `bf-textarea`,
  uiType  : 'component',
  desc    : `Generates a textarea component.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <textarea>, so that can be used as a form element with ngForm (status is propagated).
[bfRows]        : Number of rows of the <textarea> (4 by default).
[bfLabel]       : Label of the input (automatically translated). If not provided, no label is displayed.
[bfRequired]    : Whether the input is required or not
[bfDisabled]    : Whether the input is disabled or not
[bfPlaceholder] : Placeholder text (automatically translated)
[bfTooltip]     : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip
(bfOnKeyDown)   : Triggered when a key is pressed on the textarea
(bfOnEsc)       : Triggered when keys Esc is pressed.
(bfOnSave)      : Triggered when keys Ctrl + Enter are pressed. This represents the keyboard combination to save the value
`,
  instance: `<bf-textarea [(ngModel)]="myVal" bfLabel="My Text"></bf-textarea>`,
  demoComp: BfTextareaDemoComponent
};
