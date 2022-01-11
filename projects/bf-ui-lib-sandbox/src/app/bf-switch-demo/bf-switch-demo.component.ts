// bf-switch = 'bf-btn'
// BfSwitch = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-switch-demo',
  templateUrl: './bf-switch-demo.component.html',
  styleUrls: ['./bf-switch-demo.component.scss']
})
export class BfSwitchDemoComponent implements OnInit {
  public name = BfSwitchDoc.name;
  public desc = BfSwitchDoc.desc;
  public api = BfSwitchDoc.api;
  public instance = BfSwitchDoc.instance;
  public myValue = true;
  public myVal = false;

  public instance2 =
`<bf-switch [(ngModel)]="myVal" [bfDisabled]="true"></bf-switch>`;

  public instance3 =
`<bf-switch [(ngModel)]="myVal" bfLabel="view.common.name" class="horizontal"></bf-switch>`;

  public instance4 =
`<bf-switch [(ngModel)]="myVal" bfLabel="view.common.name"></bf-switch>`;

  public cssReset = `$switch-bar-bg: #fff !default;
$switch-bar-color: #ccc !default;
$switch-lever-bg: #f3f3f3 !default;
$switch-color-on: $valid-color !default;
$switch-color-off: $switch-lever-bg !default;`;

  public cssReset2 = `bf-switch .bf-switch {
  .switch-value {  // Text color (ON/OFF)
    .bf-switch-off-text { color: red; }
    .bf-switch-on-text  { color: green; }
  }
  .switch-lever { // Lever color
    &.is-on  { background: yellow; }
    &.is-off { background: purple; }
  }
}`;

  public brStr = `
`;
  public bsStr = `
          `;
  public swTooltipPos = [
    { id: 'top',        text: 'top'    },
    { id: 'right',      text: 'right'  },
    { id: 'bottom',     text: 'bottom' },
    { id: 'left',       text: 'left'   },
  ];
  public swTooltipBody = [
    { id: 'true',       text: 'true'   },
    { id: 'false',      text: 'false'  },
  ];
  public swCode = ``;
  public swConf = {
    hasLabel: true,
    labelText: 'view.common.field_name2',
    labelPosLeft: false,
    hasTooltip: false,
    btnTooltip: 'view.tooltip.message',
    btnTooltipPos: null,
    btnTooltipBody: false,
    isDisabled: false,
    hasOnText: false,
    hasOffText: false,
    valueTextPosLeft: false,
    onText: 'view.common.yes',
    offText: 'view.common.no',
    bfDisabledTip: '',
    inline: false,
    horizontal: false,
    formFit: true,
    valueLeft: false,
    spaced: false,
    show3: true,
  };

  public updateCustomSw = () => {
    this.swCode = `<bf-switch `;

    let compClasses = '';
    if (this.swConf.inline)     { compClasses += (!!compClasses.length ? ' ' : '') + 'inline'; }
    if (this.swConf.horizontal) { compClasses += (!!compClasses.length ? ' ' : '') + 'horizontal'; }
    if (this.swConf.formFit)    { compClasses += (!!compClasses.length ? ' ' : '') + 'form-fit'; }
    if (this.swConf.valueLeft)  { compClasses += (!!compClasses.length ? ' ' : '') + 'value-left'; }
    if (this.swConf.spaced)     { compClasses += (!!compClasses.length ? ' ' : '') + 'space-between'; }
    if (!!compClasses) {
      this.swCode += `class="${compClasses}"` + this.bsStr;
    }
    this.swCode += ` [(ngModel)]="myValue"`;

    if (this.swConf.hasLabel)   { this.swCode += this.bsStr + ` bfLabel="${this.swConf.labelText}"`; }
    if (this.swConf.hasOnText)  { this.swCode += this.bsStr + ` bfOnText="${this.swConf.onText}"`; }
    if (this.swConf.hasOffText) { this.swCode += this.bsStr + ` bfOffText="${this.swConf.offText}"`; }
    if (this.swConf.isDisabled) { this.swCode += this.bsStr + ` [bfDisabled]="true"`; }
    if (this.swConf.bfDisabledTip) { this.swCode += this.bsStr + ` bfDisabledTip="${this.swConf.bfDisabledTip}"`; }

    if (this.swConf.hasTooltip) {
      this.swCode += this.bsStr + ` bfTooltip="${this.swConf.btnTooltip}"`;
      if (!!this.swConf.btnTooltipPos) {
        this.swCode += this.bsStr + ` bfTooltipPos="${this.swConf.btnTooltipPos}"`;
      }
      if (!!this.swConf.btnTooltipBody) {
        this.swCode += this.bsStr + ` bfTooltipBody="${this.swConf.btnTooltipBody}"`;
      }
    }

    this.swCode += (`>` + this.brStr + `</bf-switch>`);
  }


  constructor() { }

  ngOnInit() {
    this.updateCustomSw();
  }

}


export const BfSwitchDoc = {
  name    : `bf-switch`,
  uiType  : 'component',
  desc    : `Generates a switch.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated)
[bfLabel]       : If text provided, a label will be added.
[bfDisabled]    : Whether the switch is disabled (true) or not (false).
[bfOnText]      : Text displayed when value is true. By default = ON.
[bfOffText]     : Text displayed when value is false. By default = OFF.
[bfTooltip]     : Tooltip on the label
[bfTooltipPos]  : Position of the tooltip on the label
[bfTooltipBody] : Whether the tooltip on the label is append on the body (true) or not (false).
[bfDisabledTip] : Tooltip to show when the component is disabled.
[bfLabelPos]    : (deprecated: use css class="horizontal") Position of the label (top | left). By default = top.
[bfValueTextPos]: (deprecated: use css class="value-left") Swapping the value on the left side of the lever (true).`,
  instance: `<bf-switch [(ngModel)]="myVal"></bf-switch>`,
  demoComp: BfSwitchDemoComponent
};
