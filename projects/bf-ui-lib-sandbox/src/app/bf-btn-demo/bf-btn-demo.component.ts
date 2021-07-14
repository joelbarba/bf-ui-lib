import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BfGrowlService } from 'projects/bf-ui-lib/src/lib/bf-growl/bf-growl.service';

@Component({
  selector: 'app-bf-btn-demo',
  templateUrl: './bf-btn-demo.component.html',
  styleUrls: ['./bf-btn-demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BfBtnDemoComponent implements OnInit {
  public name = BfBtnDoc.name;
  public desc = BfBtnDoc.desc;
  public blockPr;
  public api = BfBtnDoc.api;
  public instance = BfBtnDoc.instance;

  public instance2 = `<bf-btn bfText="Add User"  (bfClick)="myFunc($event)" [bfDisabled]="false"></bf-btn>
<bf-btn bfText="Save User" (bfClick)="myFunc($event)" [bfDisabled]="true"></bf-btn>`;

  public instance3 = `<bf-btn bfText="Add User" bfIcon="icon-eye" (bfClick)="myFunc($event)"></bf-btn>
<bf-btn bfText="Add Item" bfIcon="icon-plus" bfType="quaternary"></bf-btn>`;

  public instance4 = `<bf-btn bfType="save"    bfText="Save User"   (bfClick)="myFunc($event)"></bf-btn>
<bf-btn bfType="add"     bfText="Add User"    (bfClick)="myFunc($event)"></bf-btn>
<bf-btn bfType="delete"  bfText="Delete User" (bfClick)="myFunc($event)"></bf-btn>
<bf-btn bfType="cancel"  bfText="Cancel"      (bfClick)="myFunc($event)"></bf-btn>
<bf-btn class="squash" bfType="expand"></bf-btn>
<bf-btn class="squash" bfType="collapse"></bf-btn>
`;
  public instance5 = `<bf-btn bfText="Primary"    bfType="primary"    bfIcon="icon-arrow-right3"> </bf-btn>
<bf-btn bfText="Secondary"  bfType="secondary"  bfIcon="icon-plus">         </bf-btn>
<bf-btn bfText="Tertiary"   bfType="tertiary"   bfIcon="icon-pencil">       </bf-btn>
<bf-btn bfText="Quaternary" bfType="quaternary" bfIcon="icon-blocked">      </bf-btn>
<bf-btn bfText="Warning"    bfType="warning"    bfIcon="icon-cross">        </bf-btn>
<bf-btn bfText="Extra"      bfType="extra"      bfIcon="icon-arrow-down3">  </bf-btn>`;

public instance6 = `<bf-btn bfText="Simple Tooltip" bfTooltip="Hello World"></bf-btn>
<bf-btn bfText="Better tooltip" bfTooltip="Hey" bfTooltipPos="left" [bfTooltipBody]="true"></bf-btn>`;

public asyncExample1 = `<bf-btn bfText="Async Click Option 1"
        [bfAsyncPromise]="blockPr"
        (bfClick)="blockPr = asyncClickFunc('myValue', desc)">
</bf-btn>`;

public asyncExample2 = `<bf-btn bfText="Async Click Option 2"
        [bfAsyncClick]="asyncClickFunc.bind(this, 'myValue2', desc)">
</bf-btn>`;


public cssReset = `@import 'bf-ui-lib/scss/bf-btn';
bf-btn.yellow-btn { @include custom-btn-color(green, black); }`;

public squashExample = `<bf-btn class="squash" bfType="expand"></bf-btn>`;
public fullWidthExample = `<bf-btn class="full-width" bfText="Full Width Button"></bf-btn>`;


public toggleExample = `<bf-btn class="toggle" [(bfToggle)]="isExp"></bf-btn>`;

  public brStr = `
`;
  public bsStr = `
        `;
  public count = '';
  public customBtnCode = '<bf-btn (bfClick)="myFunc($event)"></bf-btn>';
  public btnTypes = [
    { id: 'search',       text: 'search',       icon: 'icon-search' },
    { id: 'add',          text: 'add',          icon: 'icon-plus' },
    { id: 'edit',         text: 'edit',         icon: 'icon-pencil' },
    { id: 'save',         text: 'save',         icon: 'icon-arrow-right3' },

    { id: 'delete',       text: 'delete',       icon: 'icon-bin' },
    { id: 'view',         text: 'view',         icon: 'icon-eye' },
    { id: 'update',       text: 'update',       icon: 'icon-arrow-right3' },
    { id: 'cancel',       text: 'cancel',       icon: 'icon-blocked' },

    { id: 'upload',       text: 'upload',       icon: 'icon-upload5' },
    { id: 'download',     text: 'download',     icon: 'icon-download52' },
    { id: 'reset',        text: 'reset',        icon: 'icon-blocked' },
    { id: 'refresh',      text: 'refresh',      icon: 'icon-loop2' },

    { id: 'next',         text: 'next',         icon: 'icon-arrow-right3' },
    { id: 'prev',         text: 'prev',         icon: 'icon-arrow-left6' },
    { id: 'expand',       text: 'expand',       icon: 'icon-arrow-down3' },
    { id: 'collapse',     text: 'collapse',     icon: 'icon-arrow-up3' },

    { id: 'back',         text: 'back',         icon: 'icon-undo2' },
    { id: 'copy',         text: 'copy',         icon: 'icon-files-empty' },
    { id: 'menu',         text: 'menu',         icon: 'icon-menu5' },

    { id: 'primary',      text: 'primary',    },
    { id: 'secondary',    text: 'secondary',  },
    { id: 'tertiary',     text: 'tertiary',   },
    { id: 'quaternary',   text: 'quaternary', },
    { id: 'warning',      text: 'warning',    },
    { id: 'extra',        text: 'extra',      },
  ];

  public btnIcons = [
    { icon: 'icon-pencil'        },
    { icon: 'icon-eye'           },
    { icon: 'icon-arrow-right3'  },
    { icon: 'icon-arrow-left6'   },
    { icon: 'icon-plus'          },
    { icon: 'icon-minus'         },
    { icon: 'icon-cross'         },
    { icon: 'icon-blocked'       },
    { icon: 'icon-arrow-down3'   },
    { icon: 'icon-arrow-up3'     },
    { icon: 'icon-users4'        },
    { icon: 'icon-undo2'         },
    { icon: 'icon-volume-high'   },
    { icon: 'icon-first2'        },
    { icon: 'icon-last2'         },
    { icon: 'icon-download5'     },
    { icon: 'icon-upload5'       },
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
    { icon: 'icon-switch'        },
    { icon: 'icon-list'          },
    { icon: 'icon-tree6'         },
    { icon: 'icon-menu3'         },
    { icon: 'icon-earth2'        },
    { icon: 'icon-link'          },
    { icon: 'icon-star-full'     },
    { icon: 'icon-thumbs-up'     },
    { icon: 'icon-notification2' },
    { icon: 'icon-warning2'      },
    { icon: 'icon-checkmark'     },
    { icon: 'icon-square'        },
    { icon: 'icon-circle2'       },
    { icon: 'icon-loop3'         },
    { icon: 'icon-spell-check'   },
    { icon: 'icon-spinner11'     },
  ];
  public btnTooltipPoss = [
    { id: 'top',        text: 'top'    },
    { id: 'right',      text: 'right'  },
    { id: 'bottom',     text: 'bottom' },
    { id: 'left',       text: 'left'   },
  ];
  public btnTooltipBody = [
    { id: 'true',       text: 'true'   },
    { id: 'false',      text: 'false'  },
  ];
  public btnConf: any = {
    hasText: false, btnText: 'Click Me',
    hasType: false, btnType: 'primary',
    hasIcon: false, btnIcon: 'icon-plus',
    isDisabled: false,
    iconPos: 'right',
    hasTooltip: false, btnTooltip: 'Hello World', btnTooltipPos: null, btnTooltipBody: false,
    btnDisabledTip: '',
    hasToggle: false, toggleValue: undefined,
    cssPrimary: false, cssSecondary: false, cssTertiary: false, cssQuaternary: false, cssExtra: false, cssWarning: false,
  };
  public res;
  public asyncClickFunc(param1, param2) {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  }
  public customBtnFunc() { this.res = ('Click at ' + new Date()); }
  public upBtn() {
    this.customBtnCode = `<bf-btn `;

    let btnClasses = '';
    if (this.btnConf.hasFullWidth) { btnClasses = 'full-width'; }
    if (this.btnConf.hasSquash)     { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'squash'; }
    if (this.btnConf.hasEllipsis)   { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'ellipsis'; }
    if (this.btnConf.cssPrimary)    { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Primary'; }
    if (this.btnConf.cssSecondary)  { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Secondary'; }
    if (this.btnConf.cssTertiary)   { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Tertiary'; }
    if (this.btnConf.cssQuaternary) { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Quaternary'; }
    if (this.btnConf.cssExtra)      { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Extra'; }
    if (this.btnConf.cssWarning)    { if (!!btnClasses) { btnClasses += ' '; } btnClasses += 'Warning'; }
    if (!!btnClasses) {
      this.customBtnCode += `class="${btnClasses}"` + this.bsStr;
    }

    if (this.btnConf.hasAsync1) {
      this.customBtnCode += `[bfAsyncClick]="myFunc.bind(this, 'myValue2', desc)"`;
    } else {
      if (this.btnConf.hasAsync2) {
        this.customBtnCode += `[bfAsyncPromise]="blockPr"` + this.bsStr;
        this.customBtnCode += `(bfClick)="blockPr = myFunc('myValue', desc)"`;
      } else {
        this.customBtnCode += `(bfClick)="myFunc($event)"`;
      }
    }

    if (this.btnConf.hasText) { this.customBtnCode += this.bsStr + ` bfText="${this.btnConf.btnText}"`; }
    if (this.btnConf.hasType) { this.customBtnCode += this.bsStr + ` bfType="${this.btnConf.btnType}"`; }
    if (this.btnConf.hasIcon) {
      if (!!this.btnConf.btnIcon) {
               this.customBtnCode += this.bsStr + ` bfIcon="${this.btnConf.btnIcon}"`;
      } else { this.customBtnCode += this.bsStr + ` bfIcon=""`; }
    }
    if (this.btnConf.iconPos !== 'right') { this.customBtnCode += this.bsStr + ` bfIconPos="${this.btnConf.iconPos}"`; }
    if (this.btnConf.isDisabled) { this.customBtnCode += this.bsStr + `[bfDisabled]="true"`; }

    if (!!this.btnConf.btnDisabledTip) { this.customBtnCode += this.bsStr + ` bfDisabledTip="${this.btnConf.btnDisabledTip}"`; }

    if (this.btnConf.hasTooltip) {
      this.customBtnCode += this.bsStr + ` bfTooltip="${this.btnConf.btnTooltip}"`;
      if (!!this.btnConf.btnTooltipPos) {
        this.customBtnCode += this.bsStr + ` bfTooltipPos="${this.btnConf.btnTooltipPos}"`;
      }
      if (!!this.btnConf.btnTooltipBody) {
        this.customBtnCode += this.bsStr + ` bfTooltipBody="${this.btnConf.btnTooltipBody}"`;
      }

    }

    this.customBtnCode += (`>` + this.brStr + `</bf-btn>`);
  }


  constructor(public growl: BfGrowlService) { }
  ngOnInit() {
    this.upBtn();
  }

  public getBtnInst = (bfType) => `<bf-btn bfType="${bfType}"></bf-btn>`;

  public asyncClick() {
    return this.blockPr = new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, 5000);
    });
  }
}





export const BfBtnDoc = {
  name    : `bf-btn`,
  desc    : `Generates a button.`,
  uiType  : 'component',
  api     : `(bfClick) : Click event handler
[bfAsyncPromise] : For async tasks, promise to block all buttons until the task is completed.
[bfAsyncClick]   : Click callback function. Instead of using the (bfClick) output, it is also possible to pass a callback function. The return promise is automatically caught.
[bfText]         : Text of the button
[bfType]         : Customized type for the button. It predefines the color, icon and text (for some). In case of using just the icon version, suffix it with '-icon'.
[bfIcon]         : Icon of the button (icomoon class)
[bfIconPos]      : Position of the icon (left / right)
[bfDisabled]     : True=Button is disabled, False=Enabled
[bfTooltip]      : If label provided, adds a tooltip on the button (automatically translated)
[bfTooltipPos]   : Position of the tooltip (top by default)
[bfTabIndex]     : Set to -1 removes button from tab order - this is necessary when the button is in a table and should only be accessed by arrow-key navigation
[bfTooltipBody]  : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent container may affect the visibility of the tooltip
[bfDisabledTip]  : Tooltip text to be displayed when the button is disabled (useful to give tips about why it's disabled)
[(bfToggle)]     : Boolean flag to use the button as a toggle. Logic is held internally (also default arrow icons)
`,
  instance: `<bf-btn bfType="edit" (bfClick)="myFunc($event)"></bf-btn>`,
  demoComp: BfBtnDemoComponent
};
