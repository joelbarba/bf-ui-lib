import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { AbstractTranslateService } from '../abstract-translate.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';

@Component({
  selector: 'bf-input',
  templateUrl: './bf-input.component.html',
  styleUrls: ['./bf-input.component.scss']
})
export class BfInputComponent implements OnInit {
  @Output() bfModelChange = new EventEmitter<boolean>();
  @Input() bfModel: string;
  @Input() bfLabel: string = '';
  @Input() bfRequired: boolean = false;
  @Input() bfDisabled: boolean = false;
  @Input() bfPlaceholder: string = '';

  @Input() bfTooltip    : string = '';
  @Input() bfTooltipPos : string = 'top';
  @Input() bfTooltipBody : boolean = true;



  @Input() bfType: string = 'text';
  @Input() bfIcon: string = '';
  @Input() bfErrorPos: string = 'top-right';  // top-right, bottom-left, bottom-right


/*
      bfTooltipPos      : '@?',     // If tooltip on the label, specific position (top by default)
      bfPattern         : '@?',     // Bool expr to define ngPattern
      bfValidType       : '@?',     // Predefined ngPatterns. "decimal" -> Any number. "email" -> Email. If present it overrides bfPattern
      bfName            : "@?",     // The name attribute specifies the name of an <input> element
      bfType            : "@?",     // Set a type on the input (text by default)
      bfMinlength       : '=?',     // Min number of chars. To bind to ngMinlength
      bfMaxlength       : '=?',     // Max number of chars. To bind to ngMinlength
      bfBlockMax        : '=?',     // Max length blocking. Adds a maxlength instead of ngMaxlength
      bfErrorText       : '@?',     // Custom error text to display when invalid value
      bfErrorPos        : '@?',     // Custom position where to display the error text.
      bfLabelCol        : '@?',     // It sets an horizontal layout. Cols of the label (input is 12-label)
      bfErrorOnPristine : '=?',     // Boolean. True means that errors will be shown in pristine state too. (false by default)
      bfIcon            : '@?',     // Icon to show into the input floating at the right hand side (this is replace by bfValidIcon and bfInvalidIcon)
      bfValidIcon       : '@?',     // Icon to show when the value is dirty and valid (by default icon-checkmark4)
      bfInvalidIcon     : '@?',     // Icon to show when the value is dirty and invalid (by default icon-warning22)

      bfValidator       : '&?',     // Function to execute every time ngModel changes, to validate the new value. Returns true=valid or false=invalid
      bfValidIf         : '@?',     // Angular expression to validate the ngModel validity. Use "$value" into the expression to refer to the new ngModel value
      bfAsyncValidator  : '&?',     // Function to validate asynchronously, returning a promise. Resolve=valid, reject=invalid
      bfOnKeyDown       : '&?',     // Callback function to hook the event 'keydown' on the input
      bfOnChange        : '&?',     // Callback function triggered every time the ngModel changes. Passing ngModel object by param (model)
      bfOnLoaded        : '&?',     // Callback function triggered when the directive is loaded (linked)
      bfBeforeChange    : '&?',     // Callback function triggered every time the ngModel is going to changes (same as bfOnChange, but just befor the model changes)
      bfSetFocus        : '=?',     // Function to call to set the focus
      bfAutoFocus       : '@?',     // If present, set the focus automatically on load
      bfAddError        : '=?',     // Function to call to add a custom extra error on the model programatically
      bfRemoveError     : '=?',     // Function to call to remove the extra added error
      bfModelCtrl       : '=?'      // Binding to the ngModel controller on the input field
*/


  public status : string = 'pristine';      // pristine, valid, error, loading

  public bfLabelTrans: string = '';         // Translated text for the label
  public bfTooltipTrans: string = '';       // Translated text for the tooltip of the label
  public bfPlaceholderTrans: string = '';   // Translated text for the placeholder of the input

  public displayIcon: string = 'icon-cross';
  public errorPosition: string = 'top-right';
  public errorText: string = 'Invalid value';
  public bfValidIcon: string = 'icon-checkmark4';
  public bfInvalidIcon: string = 'icon-warning22';

  public inputCtrl:FormControl = new FormControl();

  constructor(
    @Inject('TranslateService') private translate: AbstractTranslateService,
    private config: NgbPopoverConfig) {
  }


  ngOnChanges(change) { // Translate bfText whenever it changes
    console.log(change);


    // https://angular.io/api/forms/AbstractControl
    // this.inputCtrl = new FormControl('', { validators: Validators.required });
    if (this.bfRequired) {
      this.inputCtrl.setValidators(Validators.required);
    } else {
      this.inputCtrl.clearValidators();
    }

    if (this.bfDisabled) {
      this.inputCtrl.disable(); // Be careful, this turns the inputCtrl invalid (https://github.com/angular/angular/issues/11432#issuecomment-245670999)
    } else {
      this.inputCtrl.enable();
    }

    if (!!this.translate.doTranslate) {
      if (!!change.bfLabel)       { this.bfLabelTrans = this.translate.doTranslate(this.bfLabel); }
      if (!!change.bfTooltip)     { this.bfTooltipTrans = this.translate.doTranslate(this.bfTooltip); }
      if (!!change.bfPlaceholder) { this.bfPlaceholderTrans = this.translate.doTranslate(this.bfPlaceholder); }
    } else {
      if (!!change.bfLabel)       { this.bfLabelTrans = this.bfLabel; }
      if (!!change.bfTooltip)     { this.bfTooltipTrans = this.bfTooltip; }
      if (!!change.bfPlaceholder) { this.bfPlaceholderTrans = this.bfPlaceholder; }
    }

    this.displayIcon = this.bfIcon || '';

    this.inputCtrl.setValue(this.bfModel);
    this.updateStatus();
  }

  ngOnInit() {

    this.inputCtrl.valueChanges.pipe(RxOp.distinctUntilChanged()).subscribe(value => {
      // console.log('valueChanges', value);
      this.updateStatus();
      this.bfModelChange.emit(value);
    });

    // Triggered every time the validation changes
    this.inputCtrl.statusChanges.pipe(RxOp.distinctUntilChanged()).subscribe(value => {
      console.log('statusChanges', value);
    });

    // this.inputCtrl.setValue(this.bfModel);
    this.updateStatus();
  }

  public updateStatus = () => {
    if (this.inputCtrl.pristine) { this.status = 'pristine'; }
    if (this.inputCtrl.dirty)    { this.status = 'dirty'; }
    if (!this.inputCtrl.valid && this.inputCtrl.dirty && !this.bfDisabled)   {
      this.status = 'error';
      this.displayIcon = this.bfInvalidIcon;
    }

  };


  // public parseModelChange = (value, modelCtrl) => {
    // if (modelCtrl.pristine) { this.status = 'pristine'; }
    // if (modelCtrl.dirty)    { this.status = 'dirty'; }
    // if (!modelCtrl.valid)   { this.status = 'error'; }

    // this.bfModelChange.emit(value);
  // }

}
