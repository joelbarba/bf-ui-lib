import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-radio-demo',
  templateUrl: 'bf-radio-demo.component.html',
  styleUrls: ['bf-radio-demo.component.scss']
})export class BfRadioDemoComponent implements OnInit {
  public name = BfRadioDoc.name;
  public desc = BfRadioDoc.desc;
  public api = BfRadioDoc.api;
  public instance = BfRadioDoc.instance;

  public instance2 = `<bf-radio [(ngModel)]="myVariable" bfLabel="Option 1" bfValue="1" bfIcon="icon-home"></bf-radio>
<bf-radio [(ngModel)]="myVariable" bfLabel="Option 2" bfValue="2" bfIcon="icon-home"></bf-radio>
<bf-radio [(ngModel)]="myVariable" bfLabel="Option 3" bfValue="3" bfIcon="icon-home"></bf-radio>`;

  public instance3 = `<bf-radio [(ngModel)]="myVariable" bfLabel="Option 1" bfValue="1" bfIcon="icon-home" bfRequired=true></bf-radio>
<bf-radio [(ngModel)]="myVariable" bfLabel="Option 2" bfValue="2" bfIcon="icon-home" bfRequired=true></bf-radio>
<bf-radio [(ngModel)]="myVariable" bfLabel="Option 3" bfValue="3" bfIcon="icon-home" bfRequired=true></bf-radio>`;


  public cssReset = `$radio-color: $text-color !default;  // Default radio background color (when not required)
$radio-check-color: $white !default;`;

  public blockExample = `<bf-checkbox bfLabel="Inline check 1"></bf-checkbox>
<bf-checkbox bfLabel="Inline check 2"></bf-checkbox>
<bf-checkbox bfLabel="Inline check 3"></bf-checkbox>
<bf-checkbox class="block" bfLabel="Block check 4"></bf-checkbox>
<bf-checkbox class="block" bfLabel="Block check 5"></bf-checkbox>
<bf-checkbox class="block" bfLabel="Block check 6"></bf-checkbox>`;


  public icons = [
    { icon: 'icon-home'          },
    { icon: 'icon-search'        },
    { icon: 'icon-pencil'        },
    { icon: 'icon-eye'           },
    { icon: 'icon-plus'          },
    { icon: 'icon-minus'         },
    { icon: 'icon-cross'         },
    { icon: 'icon-blocked'       },
    { icon: 'icon-undo2'         },
    { icon: 'icon-home'          },
    { icon: 'icon-office'        },
    { icon: 'icon-phone2'        },
    { icon: 'icon-bell2'         },
    { icon: 'icon-user'          },
    { icon: 'icon-users'         },
    { icon: 'icon-lock'          },
    { icon: 'icon-cog'           },
    { icon: 'icon-bin'           },
    { icon: 'icon-shield'        },
    { icon: 'icon-link'          },
    { icon: 'icon-star-full'     },
    { icon: 'icon-thumbs-up'     },
    { icon: 'icon-notification2' },
    { icon: 'icon-warning2'      },
    { icon: 'icon-checkmark'     },
    { icon: 'icon-loop3'         },
    { icon: 'icon-spell-check'   },
  ];


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n          `;
  public customCompCode = ``;
  public myVariable;
  public compConf = {
    value: '1',
    labelText: 'view.common.name',
    hasGroup: false, groupValue: 'radio-group-1',
    isRequired: true, isDisabled: false,
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: null, tooltipBody: 'true',
    isClassBlock: false,
    hasIcon: false, icon: 'icon-home',
  };
  public upComp = () => {
    this.customCompCode = `<bf-radio `;
    this.customCompCode += `[(ngModel)]="myVariable"`;
    this.customCompCode += this.bsStr + `bfValue="${this.compConf.value}"`;
    this.customCompCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`;
    if (this.compConf.hasGroup) { this.customCompCode += this.bsStr + `bfRadioGroup="${this.compConf.groupValue}"`; }
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `bfRequired=true`; }
    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `bfDisabled=true`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `bfTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `bfTooltipBody=${this.compConf.tooltipBody}`; }
    }

    if (this.compConf.hasIcon) {
      this.customCompCode += this.bsStr + `bfIcon="${this.compConf.icon}"`;
    }

    this.customCompCode += (`>` + this.brStr + `</bf-radio>`);
  }

  constructor() { }

  ngOnInit() {
    this.upComp();
  }

}


export const BfRadioDoc = {
  name    : `bf-radio`,
  uiType  : 'component',
  desc    : `Generates a radio button input element.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated).
[bfValue]       : Value to set to the model when this radio is selected in the group
[bfLabel]       : Text of the label (optional)
[bfRadioGroup]  : (optional) Name of the group the radio belongs to. The selection is unique within this group.
[bfDisabled]    : Boolean value to disable (true) the input
[bfRequired]    : Turns the input required (the ngModel needs to be one of the values)
[bfTooltip]     : If set, an info bullet will be added before the label, with a tooltip of the text
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip
[bfIcon]        : Icon to show between the radio button and the text`,
  instance: `<bf-radio [(ngModel)]="myVariable" bfLabel="Option 1" bfValue="1"></bf-radio>`,
  demoComp: BfRadioDemoComponent
};
