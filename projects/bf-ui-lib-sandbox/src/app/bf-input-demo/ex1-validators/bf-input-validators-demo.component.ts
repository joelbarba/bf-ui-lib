import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BfGrowlService} from '../../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {IbfInputCtrl} from '../../../../../bf-ui-lib/src/lib/bf-input/bf-input.component';
import {Router} from '@angular/router';
import {dCopy} from '../../../../../bf-ui-lib/src/lib/bf-prototypes/deep-copy';

@Component({
  selector: 'app-bf-input-validators-demo',
  templateUrl: './bf-input-validators-demo.component.html',
  styleUrls: ['./bf-input-validators-demo.component.scss']
})
export class BfInputValidatorsDemoComponent implements OnInit, AfterViewInit {

  constructor(
    public growl: BfGrowlService,
    public router: Router,
  ) {}

  public val1;
  public isLinked = true;
  public inputRef: IbfInputCtrl; // bf-input controller object (ctrlObject)
  public innerInput;

  public manualErrorEx1 = `inputCtrl.removeError()`;
  public manualErrorEx2 = `inputCtrl.addError({ label: 'wroooong!' })`;
  public manualErrorEx3 = `public inputCtrl: IbfInputCtrl = {};`;


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n          `;
  public customCompCode = ``;
  public valCompCode = '';
  public valEx: any = {
    hasErrOnPristine: true, isDisabled: false, errorPos: '', errorPosOpts : [
      { id: 'top-right',    text: 'top-right',  },
      { id: 'bottom-left',  text: 'bottom-left',   },
      { id: 'bottom-right', text: 'bottom-right',  },
    ],
    bfType: 'text', inputTypes: [
      { id: 'text',     text: 'text',     },
      { id: 'number',   text: 'number',   },
      { id: 'password', text: 'password', },
      { id: 'email',    text: 'email',    },
    ],
    hasInvalidIcon: false,  bfInvalidIcon: 'icon-thumbs-down',
    hasValidIcon: false,    bfValidIcon: 'icon-checkmark4',
    hasErrorText: false,    bfErrorText: 'view.common.custom_error',
    hasIcon: false,         bfIcon: 'icon-search', // bfIcon: 'loading',

    isRequired: true,
    isMinLen: false, minLen: 3,
    isMaxLen: false, maxLen: 5,
    hasPattern: false, pattern: '[A-Za-z]{2,8}',
    hasValidType: false, valType: null, valTypes: [
      { id: 'integer',  text: 'integer',  },
      { id: 'number',   text: 'number',   },
      { id: 'decimal',  text: 'decimal',  },
      { id: 'email',    text: 'email',    },
    ],
    bfValMatchVal: 'AAA',
    hasValidIf: false,
    hasBfValidator: false,
    hasAsyncVal: false,
    hasManualErr: false
  };

  ngOnInit() {
    this.upComp();
  }
  ngAfterViewInit() {} // console.log('EXT - ngAfterViewInit');


  public upComp = () => {
    this.valCompCode = `<bf-input #bfInputRef="ngModel"`;
    this.valCompCode += this.bsStr + `[(ngModel)]="myVariable"`;
    if (this.valEx.hasErrOnPristine)  { this.valCompCode += this.bsStr + `bfErrorOnPristine="true"`; }
    if (this.valEx.isDisabled)        { this.customCompCode += this.bsStr + `[bfDisabled]="true"`; }
    if (this.valEx.errorPos)          { this.valCompCode += this.bsStr + `bfErrorPos="${this.valEx.errorPos}"`; }
    if (this.valEx.inputType !== 'text') { this.customCompCode += this.bsStr + `bfType="${this.valEx.inputType}"`; }

    if (this.valEx.hasInvalidIcon)  { this.valCompCode += this.bsStr + `bfInvalidIcon="${this.valEx.bfInvalidIcon}"`; }
    if (this.valEx.hasValidIcon)    { this.valCompCode += this.bsStr + `bfValidIcon="${this.valEx.bfValidIcon}"`; }
    if (this.valEx.hasErrorText)    { this.valCompCode += this.bsStr + `bfErrorText="${this.valEx.bfErrorText}"`; }
    if (this.valEx.hasIcon)         { this.valCompCode += this.bsStr + `bfIcon="${this.valEx.bfIcon}"`; }

    if (this.valEx.isRequired)  { this.valCompCode += this.bsStr + `bfRequired="true"`; }
    if (this.valEx.isMinLen)    { this.valCompCode += this.bsStr + `bfMinlength="${this.valEx.minLen}"`; }
    if (this.valEx.isMaxLen)    { this.valCompCode += this.bsStr + `bfMaxlength="${this.valEx.maxLen}"`; }
    if (this.valEx.valType)     { this.valCompCode += this.bsStr + `bfValidType="${this.valEx.valType}"`; }
    if (this.valEx.hasPattern)  { this.valCompCode += this.bsStr + `bfPattern="${this.valEx.pattern}"`; }
    if (this.valEx.hasValidIf)  { this.valCompCode += this.bsStr + `[bfValidIf]="val1 === 'AAA'"`; }
    if (this.valEx.hasBfValidator) { this.valCompCode += this.bsStr + `[bfValidator]="bfValidatorFn"`; }

    if (this.valEx.hasManualErr) { this.valCompCode += this.bsStr + `(bfOnLoaded)="ctrl = $event"`; }

    this.valCompCode += (`>` + this.brStr + `</bf-input>`);

    if (this.valEx.hasManualErr) {
      this.valCompCode += `\n \n public ctrl: IbfInputCtrl; // bfInput controller object\n`;
      this.valCompCode += ` ctrl.addError({ label: 'manual error here' });\n`;
      this.valCompCode += ` ctrl.removeError();\n`;
    }


    // This is just to avoid the ExpressionChangedAfterItHasBeenCheckedError on the view
    if (this.inputRef) {
      this.innerInput = dCopy(this.inputRef['inputCtrl']);
      setTimeout(() => this.innerInput = this.inputRef['inputCtrl']);
    }
  };



  reLink = () => {
    this.isLinked = false;
    setTimeout(() => this.isLinked = true, 500);
  };

  public bfValidatorFn = (value, ctrl) => {
    return (value === this.valEx.bfValMatchVal) ? null : { label : 'wrooong' };
  };



}



