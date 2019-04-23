import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-bf-btn-demo',
  templateUrl: './bf-btn-demo.component.html',
  styleUrls: ['./bf-btn-demo.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BfBtnDemoComponent implements OnInit {
  public name = BfBtnDoc.name;
  public desc = BfBtnDoc.desc;
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
<bf-btn bfText="Extra"      bfType="extra"      bfIcon="icon-arrow-down3">  </bf-btn>`

public instance6 = `<bf-btn bfText="Simple Tooltip" bfTooltip="Hello World"></bf-btn>
<bf-btn bfText="Better tooltip" bfTooltip="Hey" bfTooltipPos="left" [bfTooltipBody]="true"></bf-btn>`;

public asyncExample1 = `<bf-btn bfText="Async Click Option 1"
        [bfAsyncPromise]="blockPr"
        (bfClick)="blockPr = asyncClickFunc('myValue', desc)">
</bf-btn>`;

public asyncExample2 = `<bf-btn bfText="Async Click Option 2"
        [bfAsyncClick]="asyncClickFunc.bind(this, 'myValue2', desc)">
</bf-btn>`;


public cssReset =
`$bf-colors: (
  "primary"     : $primary_color,
  "secondary"   : $secondary_color,  
  "tertiary"    : $tertiary_color,   
  "quaternary"  : $quaternary_color, 
  "warning"     : $warning_color,    
  "extra"       : $extra_color,      
  "white"       : $white,
);          

// Button color reset
@mixin btn-color-mixin($btn-color) {
  color: $white;
  background: $btn-color;
  .btn-icon-section { background: darken($btn-color, 5%); }
  .btn-icon-section.small-btn { background: $btn-color; } // If icon btn
  &:hover:not(:disabled) {
    background: darken($btn-color, 3%);
    .btn-icon-section { background: darken($btn-color, 7%); }
  }
}
@each $color, $value in $bf-colors { .#{$color}.bf-btn  { @include btn-color-mixin($value); } }`;

public squashExample = `<bf-btn class="squash" bfType="expand"></bf-btn>`;
public fullWidthExample = `<bf-btn class="full-width" bfText="Full Width Button"></bf-btn>`;

  public brStr = `
`;
  public bsStr = `
        `;
  public customBtnCode = '<bf-btn (bfClick)="myFunc($event)"></bf-btn>';
  public btnTypes = [
    { id: 'primary',    text: 'bfType = primary',    },
    { id: 'secondary',  text: 'bfType = secondary',  },
    { id: 'tertiary',   text: 'bfType = tertiary',   },
    { id: 'quaternary', text: 'bfType = quaternary', },
    { id: 'warning',    text: 'bfType = warning',    },
    { id: 'extra',      text: 'bfType = extra',      },
    { id: 'edit',       text: 'bfType = edit',     },
    { id: 'save',       text: 'bfType = save',     },
    { id: 'update',     text: 'bfType = update',   },
    { id: 'add',        text: 'bfType = add',      },
    { id: 'delete',     text: 'bfType = delete',   },
    { id: 'cancel',     text: 'bfType = cancel',   },
    { id: 'expand',     text: 'bfType = expand',   },
    { id: 'collapse',   text: 'bfType = collapse', },
  ];
  public btnIcons = [
    { id: 'icon-pencil',        text: 'bfIcon = icon-pencil'        },
    { id: 'icon-eye',           text: 'bfIcon = icon-eye'           },
    { id: 'icon-arrow-right3',  text: 'bfIcon = icon-arrow-right3'  },
    { id: 'icon-plus',          text: 'bfIcon = icon-plus'          },
    { id: 'icon-cross',         text: 'bfIcon = icon-cross'         },
    { id: 'icon-blocked',       text: 'bfIcon = icon-blocked'       },
    { id: 'icon-arrow-down3',   text: 'bfIcon = icon-arrow-down3'   },
    { id: 'icon-arrow-up3',     text: 'bfIcon = icon-arrow-up3'     },
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
  public btnConf:any = {
    hasText: false, btnText: 'Click Me',
    hasType: false, btnType: 'primary',
    hasIcon: false, btnIcon: 'icon-plus',
    isDisabled: false,
    hasTooltip: false, btnTooltip: 'Hello World', btnTooltipPos: null, btnTooltipBody: false
  };
  public res;
  public asyncClickFunc = (param1, param2) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  };
  public customBtnFunc = () => { this.res = ('Click at ' + new Date()); };
  public upBtn = () => {
    this.customBtnCode = `<bf-btn (bfClick)="myFunc($event)"`;

    if (this.btnConf.hasText) {
      this.customBtnCode += this.bsStr + ` bfText="${this.btnConf.btnText}"`;
    }

    if (this.btnConf.hasType) {
      this.customBtnCode += this.bsStr + ` bfType="${this.btnConf.btnType}"`;
    }

    if (this.btnConf.hasIcon) {
      this.customBtnCode += this.bsStr + ` bfIcon="${this.btnConf.btnIcon}"`;
    }

    if (this.btnConf.isDisabled) {
      this.customBtnCode += this.bsStr + `[bfDisabled]="true"`;
    }

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
  };



  constructor() { }
  ngOnInit() {
    this.upBtn();
  }
  public count = '';
}





export const BfBtnDoc = {
  name    : `bf-btn`,
  desc    : `Generates a button.`, 
  api     : `(bfClick)        : Click event handler
[bfText]         : Text of the button
[bfType]         : Class of the button [primary, secondary, tertiary, quaternary, warning, extra] or predefined type [add, save, edit, delete, cancel, expand, collapse]
[bfIcon]         : Icon of the button (icomoon class)
[bfDisabled]     : True=Button is disabled, False=Enabled
[bfTooltip]      : If label provided, adds a tooltip on the button (automatically translated)
[bfTooltipPos]   : Position of the tooltip (top by default)
[bfTooltipBody]  : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent container may affect the visibility of the tooltip
[bfAsyncPromise] : For async tasks, promise to block all buttons until the task is completed. 
[bfAsyncClick]   : Click callback function. Instead of using the (bfClick) output, it is also possible to pass a callback function. The return promise is automatically caught.   
`,
  instance: `<bf-btn bfType="edit" (bfClick)="myFunc($event)"></bf-btn>`,
  demoComp: BfBtnDemoComponent
};