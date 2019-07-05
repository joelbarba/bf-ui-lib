// bf-switch = 'bf-btn'
// BfSwitch = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-switch-demo]',
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
`<bf-switch [(ngModel)]="myVal" bfLabel="view.common.name" bfLabelPos="left"></bf-switch>`;

  public instance4 =
`<bf-switch [(ngModel)]="myVal" bfLabel="view.common.name"></bf-switch>`;

  public cssReset = `div.bf-switch {

  .switch-bar {  // Background bar
    background: white;
    border-color: #ccc;
  }

  .switch-value {  // Text color (ON/OFF)
    .bf-switch-off-text { color: red; }
    .bf-switch-on-text  { color: green; }
  }

  .switch-lever {  // Switch color
    color: white;
    background: #f3f3f3;
    &.is-on  { background: $primary_color; }
    &.is-off { background: red; }
  }

  &.is-disabled {
    .switch-bar   { background: #d4d4d4; }
    .switch-lever { background: #f3f3f3; }
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
    hasLabel: false, labelText: 'Feature Enabled', labelPosLeft: false,
    hasTooltip: false, btnTooltip: 'Hello World', btnTooltipPos: null, btnTooltipBody: false,
    isDisabled: false,
    hasOnText: false, hasOffText: false, onText: 'Yes', offText: 'No'
  };

  public updateCustomSw = () => {
    this.swCode = `<bf-switch [(ngModel)]="myValue"`;

    if (this.swConf.hasLabel) {
      this.swCode += this.bsStr + ` bfLabel="${this.swConf.labelText}"`;

      if (this.swConf.labelPosLeft) {
        this.swCode += this.bsStr + ` bfLabelPos="left"`;
      }
    }

    if (this.swConf.hasOnText) {
      this.swCode += this.bsStr + ` bfOnText="${this.swConf.onText}"`;
    }
    if (this.swConf.hasOffText) {
      this.swCode += this.bsStr + ` bfOffText="${this.swConf.offText}"`;
    }

    if (this.swConf.isDisabled) {
      this.swCode += this.bsStr + `[bfDisabled]="true"`;
    }

    if (this.swConf.hasTooltip) {
      this.swCode += this.bsStr + ` bfTooltip="${this.swConf.btnTooltip}"`;
      if (!!this.swConf.btnTooltipPos) {
        this.swCode += this.bsStr + ` bfTooltipPos="${this.swConf.btnTooltipPos}"`;
      }
      if (!!this.swConf.btnTooltipBody) {
        this.swCode += this.bsStr + ` bfTooltipBody="${this.swConf.btnTooltipBody}"`;
      }

    }

    this.swCode += (`>` + this.brStr + `</bf-btn>`);
  };


  constructor() { }

  ngOnInit() { }

}


export const BfSwitchDoc = {
  name    : `bf-switch`,
  uiType  : 'component',
  desc    : `Generates a switch.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated)
[bfDisabled]    : Whether the switch is disabled (true) or not (false).
[bfOnText]      : Text displayed when value is true. By default = ON.
[bfOffText]     : Text displayed when value is false. By default = OFF.
[bfLabel]       : If text provided, a label will be added.
[bfLabelPos]    : Position of the label (top | left). By default = top.
[bfTooltip]     : Tooltip on the label
[bfTooltipPos]  : Position of the tooltip on the label
[bfTooltipBody] : Whether the tooltip on the label is append on the body (true) or not (false)`,
  instance: `<bf-switch [(ngModel)]="myVal"></bf-switch>`,
  demoComp: BfSwitchDemoComponent
};
