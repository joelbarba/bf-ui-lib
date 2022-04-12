import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BfGrowlService } from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';

@Component({
  selector: 'app-bf-input-demo',
  templateUrl: './bf-input-demo.component.html',
  styleUrls: ['./bf-input-demo.component.scss']
})
export class BfInputDemoComponent implements OnInit, AfterViewInit {
  public name = BfInputDoc.name;
  public desc = BfInputDoc.desc;
  public api = BfInputDoc.api;
  public instance = BfInputDoc.instance;
  public val1;
  public val2 = 'Barba';

  public boxCo = new Array(10); // Box collapsible
  public myVariable3: any;
  public myVariable4: any;
  public myVariable5: any;
  public bfModel: any;
  public tipOn = false;
  public isLinked = true;

  constructor(
    public growl: BfGrowlService,
    public router: Router,
  ) {}

 public bfImageExample = `<bf-input bfLabel="I have an image"  bfPlaceholder="I have an image" bfImage="assets/language-flags/de.png"></bf-input>`;

  public formExampleInput100 = `<form #myForm="ngForm">

  <bf-input [bfRequired]="true" ngModel="val1" #firstRef="ngModel" name="first">
  </bf-input>

  <bf-input [bfRequired]="true" ngModel="val2" #lastRef="ngModel" name="last">
  </bf-input>

  <bf-btn bfText="Save Form" [bfDisabled]="myForm.invalid"></bf-btn>

</form>`;

  public flatExample = '<bf-input class="flat" [ngModel]="bfModel"></bf-input>';
  public inputColExample = `<bf-input [(ngModel)]="myVar" class="input-col-1" bfLabel="view.common.name"></bf-input>
<bf-input [(ngModel)]="myVar" class="input-col-2" bfLabel="view.common.name"></bf-input>
<bf-input [(ngModel)]="myVar" class="input-col-5" bfLabel="view.common.name"></bf-input>`;

  public cssReset = `$input-optional-color  : $optional-color !default;  // <-- this is a bootstrap default
$input-focused-color   : $focused-color !default;
$input-disabled-color  : $disabled-color !default;
$input-required-color  : $required-color !default;
$input-invalid-color   : $invalid-color !default;
$input-valid-color     : $valid-color !default;`;



  public btnIcons = [
    { icon: 'loading'            },
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
  public btnImages = [
    { name: 'Germany', img: 'assets/language-flags/de.png' },
    { name: 'Ireland', img: 'assets/language-flags/ie.png' },
    { name: 'Italy', img: 'assets/language-flags/it.png' },
    { name: 'Canada', img: 'assets/language-flags/ca.png' },
  ];

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

  public myVariable = '';
  public compConf = {
    hasLabel: true, labelText: 'view.common.name',
    hasName: false, nameText: 'name',
    hasType: false, inputType: 'text', inputTypes: [
      { id: 'text',     text: 'text',     },
      { id: 'number',   text: 'number',   },
      { id: 'password', text: 'password', },
      { id: 'email',    text: 'email',    },
    ],

    errorPos: 'default',
    errorText: 'Hello world',

    hasPlaceholder: false, placeholderText: 'view.common.name',
    isRequired: true, hasAutoFocus: false, hasAutocomplete: true,
    isDisabled: false, disabledTip: '',
    hasIcon: false, inputIcon: 'icon-search',
    hasImage: false, inputImage: 'assets/language-flags/it.png',
    hasTooltip: false, inputTooltip: 'Hello World', inputTooltipPos: null, inputTooltipBody: false,

    hasLeftBtn: false, leftBtnIcon: 'icon-plus', hasLeftBtnText: false, leftBtnText: '$',
    hasRightBtn: false, rightBtnIcon: 'icon-eye', hasRightBtnText: false, rightBtnText: 'view.common.yes',

    hasKeyDown: false,
    hasKeyEsc: false,
    hasKeyEnter: false,
    hasKeyCtrlEnter: false,
    hasFlat: false,

    hasOnLoad: false,
    hasBeforeChange: false,

    bfLeftBtnClick: false,
    bfRightBtnClick: false,
    bfLeftBtnTooltip: '',
    bfRightBtnTooltip: '',
  };




  ngOnInit() {
    this.upComp();
  }
  ngAfterViewInit() {} // console.log('EXT - ngAfterViewInit');

  reLink = () => {
    this.isLinked = false;
    setTimeout(() => this.isLinked = true, 500);
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
    if (this.compConf.hasLabel)             { this.customCompCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`; }
    if (this.compConf.hasName)              { this.customCompCode += this.bsStr + `bfName="${this.compConf.nameText}"`; }
    if (this.compConf.hasPlaceholder)       { this.customCompCode += this.bsStr + `bfPlaceholder="${this.compConf.placeholderText}"`; }
    if (this.compConf.hasIcon)              { this.customCompCode += this.bsStr + `bfIcon="${this.compConf.inputIcon}"`; }
    if (this.compConf.hasImage)             { this.customCompCode += this.bsStr + `bfImage="${this.compConf.inputImage}"`; }
    if (this.compConf.inputType !== 'text') { this.customCompCode += this.bsStr + `bfType="${this.compConf.inputType}"`; }
    if (this.compConf.isRequired)           { this.customCompCode += this.bsStr + `[bfRequired]="true"`; }
    if (this.compConf.hasAutoFocus)         { this.customCompCode += this.bsStr + `[bfAutoFocus]="true"`; }
    if (this.compConf.hasAutocomplete)      { this.customCompCode += this.bsStr + `[bfAutocomplete]="true"`; }
    if (this.compConf.isDisabled)           { this.customCompCode += this.bsStr + `[bfDisabled]="true"`; }
    if (!!this.compConf.disabledTip)        { this.customCompCode += this.bsStr + `bfDisabledTip="${this.compConf.disabledTip}"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfTooltip="${this.compConf.inputTooltip}"`;
      if (!!this.compConf.inputTooltipPos) {
        this.customCompCode += this.bsStr + `bfTooltipPos="${this.compConf.inputTooltipPos}"`;
      }
      if (!!this.compConf.inputTooltipBody) {
        this.customCompCode += this.bsStr + `bfTooltipBody="${this.compConf.inputTooltipBody}"`;
      }
    }

    if (this.compConf.hasLeftBtnText && this.compConf.leftBtnText)   { this.customCompCode += this.bsStr + `bfLeftBtnText="${this.compConf.leftBtnText}"`; }
    if (this.compConf.hasLeftBtn && this.compConf.leftBtnIcon)       { this.customCompCode += this.bsStr + `bfLeftBtnIcon="${this.compConf.leftBtnIcon}"`; }
    if (this.compConf.hasRightBtnText && this.compConf.rightBtnText) { this.customCompCode += this.bsStr + `bfRightBtnText="${this.compConf.rightBtnText}"`; }
    if (this.compConf.hasRightBtn && this.compConf.rightBtnIcon)     { this.customCompCode += this.bsStr + `bfRightBtnIcon="${this.compConf.rightBtnIcon}"`; }

    if (this.compConf.errorPos) this.customCompCode += this.bsStr + `bfErrorPos="${this.compConf.errorPos}"`;
    if (this.compConf.errorText) this.customCompCode += this.bsStr + `bfErrorText="${this.compConf.errorText}"`;

    if (this.compConf.bfLeftBtnClick) { this.customCompCode += this.bsStr + `(bfLeftBtnClick)="onClickFn()"`; }
    if (this.compConf.bfRightBtnClick) { this.customCompCode += this.bsStr + `(bfRightBtnClick)="onClickFn()"`; }
    if (this.compConf.bfLeftBtnTooltip) { this.customCompCode += this.bsStr + `bfLeftBtnTooltip="${this.compConf.bfLeftBtnTooltip}"`; }
    if (this.compConf.bfRightBtnTooltip) { this.customCompCode += this.bsStr + `bfRightBtnTooltip="${this.compConf.bfRightBtnTooltip}"`; }

    if (this.compConf.hasKeyDown) { this.customCompCode += this.bsStr + `(bfOnKeyDown)="onClickFn($event)"`; }
    if (this.compConf.hasKeyEsc)  { this.customCompCode += this.bsStr + `(bfOnEsc)="onClickFn($event)"`; }
    if (this.compConf.hasKeyEnter) { this.customCompCode += this.bsStr + `(bfOnEnter)="onClickFn($event)"`; }
    if (this.compConf.hasKeyCtrlEnter) { this.customCompCode += this.bsStr + `(bfOnCtrlEnter)="onClickFn($event)"`; }

    if (this.compConf.hasOnLoad) { this.customCompCode += this.bsStr + `(bfOnLoaded)="ctrl = $event"`; }
    if (this.compConf.hasBeforeChange) { this.customCompCode += this.bsStr + `(bfBeforeChange)="doSomething($event)"`; }

    this.customCompCode += (`>` + this.brStr + `</bf-input>`);
  };


  public checkModelChange = (value) => console.log('Value from ngModel ->', value);
}



export const BfInputDoc = {
  name    : `bf-input`,
  uiType  : 'component',
  desc    : `Generates an text input field.`,
  api     : `[(ngModel)]       : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated).
[bfLabel]         : Label of the input (automatically translated). If not provided, no label is displayed.
[bfName]          : Name attribute. If not provided, will use bfInput,
[bfRequired]      : Whether the input is required or not
[bfDisabled]      : Whether the input is disabled or not
[bfDisabledTip]   : Text with the tooltip to display on hover when the input is disabled
[bfPlaceholder]   : Placeholder text (automatically translated)
[bfIcon]          : Icon to show into the input floating at the right hand side (this is replaced by bfValidIcon and bfInvalidIcon, once the status changes)
[bfType]          : Type of value to apply to the input (text by default). It can be 'text', 'number', 'password', 'email'
[bfAutoFocus]     : (true/false) If true, the input will get focused automatically once is initialized (linked to the view)
[bfAutocomplete]  : (true/false) Default true, the input focused will prompt the suggestions of the browser to fill the input
[bfTooltip]       : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]    : Position of the tooltip (top by default)
[bfTooltipBody]   : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip
[bfLeftBtnIcon]   : Icon to display in a button on the left side of the input (prepend addon https://getbootstrap.com/docs/4.3/components/input-group/#button-addons)
[bfLeftBtnText]   : Text to display in a button on the left side of the input (prepend addon)

[bfMinlength]       : Min number of chars. Built in validator "minlength"
[bfMaxlength]       : Max number of chars. Built in validator "maxlength". Null means no max. It blocks input if limit.
[bfPattern]         : Regex validator. Built in validator "pattern". Null means no validation.
[bfValidType]       : Predefined validator patterns. It overrides bfPattern. Values = [integer, number, decimal, email]
[bfValidIf]         : Boolean expression to determine the input validity
[bfValidator]       : Callback function called every time the internal ngModel validates its value. Parameter = current value of the model.
                      It should return null (valid) or error object (invalid).
[bfErrorOnPristine] : If true, errors will be shown in pristine state too (by default pristine shows as valid always).
[bfInvalidIcon]     : Icon to show when the value is dirty and invalid (by default icon-warning22)
[bfValidIcon]       : Icon to show when the value is dirty and valid (by default none). ()
[bfErrorText]       : Custom error text (label) to display when invalid value
[bfErrorPos]        : Custom position where to display the error text. Values = ['top-right', 'bottom-left', 'bottom-right', 'none']. None will hide the error text.

[bfLeftBtnIcon]     : Icon to display in a button on the left side of the input (append addon)
[bfLeftBtnText]     : Text to display in a button on the left side of the input (append addon)
[bfLeftBtnTooltip]  : Tooltip to show on the left addon button
(bfLeftBtnClick)    : To listen to left addon button clicks

[bfRightBtnIcon]    : Icon to display in a button on the right side of the input (append addon)
[bfRightBtnText]    : Text to display in a button on the right side of the input (append addon)
[bfRightBtnTooltip] : Tooltip to show on the right addon button
(bfRightBtnClick)   : To listen to right addon button clicks

(bfOnLoaded)        : Emitter to catch the moment when the component is ready (ngAfterViewInit)
(bfBeforeChange)    : Emitter to catch the next value before it is set. It returns both (currentValue, nextValue)
(bfOnAutofill)      : To listen to a browser autofill event. It emits every time the browser autofills the input value
(bfOnKeyDown)       : Triggered when a key is pressed on the textarea
(bfOnEsc)           : Triggered when keys Esc is pressed.
(bfOnEnter)         : Triggered when key Enter is pressed.
(bfOnCtrlEnter)     : Triggered when keys Ctrl + Enter are pressed.
(bfOnBlur)          : Triggered by the native blur event
(bfOnFocus)         : Triggered by the native focus event
`,
  instance: `<bf-input></bf-input>`,
  demoComp: BfInputDemoComponent
};
