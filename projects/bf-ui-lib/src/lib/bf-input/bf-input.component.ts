import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { AbstractTranslateService } from '../abstract-translate.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';
import {Observable, of} from "rxjs";

@Component({
  selector: 'bf-input',
  templateUrl: './bf-input.component.html',
  styleUrls: ['./bf-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfInputComponent),
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfInputComponent),
    }
  ]
})
export class BfInputComponent implements ControlValueAccessor {
// export class BfInputComponent implements OnInit {
  // @Output() bfModelChange = new EventEmitter<string>();
  // @Input() bfModel: string;

  public bfModel: string; // Internal to hold the linked ngModel on the wrapper

  @Input() bfLabel: string = '';          // Text for the label above the input. Translation applied.
  @Input() bfRequired: boolean = false;   // It adds the required validator to the ngModel (input), meaning that the required field styles will be applied on the label and input.
  @Input() bfDisabled: boolean = false;   // True=Input disabled. False=Input enabled.
  @Input() bfPlaceholder: string = '';    // It adds a placeholder text onto the input. Translation applied.

  @Input() bfType: 'text' | 'number' | 'email' | 'password' = 'text';  // Set a type on the input (text by default)

  @Input() bfTooltip    : string = '';
  @Input() bfTooltipPos : string = 'top';     // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody : boolean = true;
  @Input() bfDisabledTip : string;   // Label for the text of the tooltip to display when the input is disabled

  // @Input() bfName: string = '';    // The name attribute specifies the name of an <input> element
  @Input() bfIcon: string = '';     // Icon to show into the input floating at the right hand side (this is replace by bfValidIcon and bfInvalidIcon)
  @Input() bfLeftBtnIcon: string;   // Icon to show into a button on the left of the input (prepend addon https://getbootstrap.com/docs/4.3/components/input-group/#button-addons)
  @Input() bfRightBtnIcon: string;  // Icon to show into a button on the right of the input (append addon)
  @Input() bfLeftBtnText: string;   // Text to show into a button on the left of the input (prepend addon)
  @Input() bfRightBtnText: string;  // Text to show into a button on the left of the input (append addon)

  @Input() bfErrorPos: string = 'top-right';  // top-right, bottom-left, bottom-right


  @Output() bfLeftBtnClick = new EventEmitter<any>();   // Emitter for left addon button
  @Output() bfRightBtnClick = new EventEmitter<any>();  // Emitter for right addon button

  @Output() bfOnAutofill = new EventEmitter<any>();     // Emitter when a browser autofill is detected

/*

      bfPattern         : '@?',     // Bool expr to define ngPattern
      bfValidType       : '@?',     // Predefined ngPatterns. "decimal" -> Any number. "email" -> Email. If present it overrides bfPattern
      bfMinlength       : '=?',     // Min number of chars. To bind to ngMinlength
      bfMaxlength       : '=?',     // Max number of chars. To bind to ngMinlength
      bfBlockMax        : '=?',     // Max length blocking. Adds a maxlength instead of ngMaxlength

      bfErrorText       : '@?',     // Custom error text to display when invalid value
      bfErrorPos        : '@?',     // Custom position where to display the error text.
      bfLabelCol        : '@?',     // It sets an horizontal layout. Cols of the label (input is 12-label)
      bfErrorOnPristine : '=?',     // Boolean. True means that errors will be shown in pristine state too. (false by default)
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

  public bfLabelTrans$: Observable<string> = of('');         // Translated text for the label
  public bfTooltipTrans$: Observable<string> = of('');       // Translated text for the tooltip of the label
  public bfPlaceholderTrans$: Observable<string> = of('');   // Translated text for the placeholder of the input
  public bfDisabledTipTrans$: Observable<string> = of('');   // Translated text for the disabled tooltip of the input

  public displayIcon: string = '';
  public errorPosition: string = 'top-right';
  public errorText: string = 'Invalid value';
  public bfValidIcon: string = 'icon-checkmark4';
  public bfInvalidIcon: string = 'icon-warning22';
  public isFocus = false; // Whether the focus is on the input
  public hasAutofillDetection = false;  // Whether is has autofill detection (any parameter linked to bfOnAutofill)

  @ViewChild('ngInputRef') ngInputRef: ElementRef;
  public inputCtrl:FormControl; // <-- ngInputRef.control

  constructor(
    @Inject('TranslateService') private translate: AbstractTranslateService,
    private config: NgbPopoverConfig,
    private elementRef: ElementRef,
  ) { }


  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    // console.log('writeValue -> ', value, this.ngInputRef);
    if (value !== undefined) {
      this.bfModel = value ? value: '';
      this.updateStatus();
      // this.inputCtrl.updateValueAndValidity(value);

      // After one cycle, set the value to the formControl, so the validate() gets the last
      // state in "inputCtrl.status" when updating ngModel outer link
      if (!!this.inputCtrl) {
        setTimeout(() => {
          this.inputCtrl.setValue(this.bfModel);
        });
      }
    }
  }

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALIDATORS ---> outer formControl validation
  validate(control: FormControl) {
    // console.log('validate', this.inputCtrl.status, this.ngInputRef.status, this.ngInputRef.value);
    // control.updateValueAndValidity();

    if (!!this.inputCtrl && this.inputCtrl.status === 'INVALID') {  // If internal ngModel is invalid, external is invalid too
      // return {'incorrect': true};
      return { 'required': false };
      // control.setErrors({ notUnique: true });
      // control.updateValueAndValidity();
      // return { notUnique: true };
    } else {
      return null;
    }

    // TODO ---> https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
    // Check there how to do proper custom validators
  }

  // ------------------------------------

  ngOnChanges(change) {
    // Translate bfText whenever it changes
    // console.log('ngOnChanges', change);
    // console.log('this.ngInputRef', this.ngInputRef);

    // Link the formControl form the <input #ngInputRef="ngModel"> to "this.inputCtrl"
    if (!!this.ngInputRef['control'] && !this.inputCtrl) {
      //noinspection TypeScriptUnresolvedVariable
      this.inputCtrl = this.ngInputRef['control'];
    }


    // // https://angular.io/api/forms/AbstractControl
    // // this.inputCtrl = new FormControl('', { validators: Validators.required });
    // if (this.bfRequired) {
    //   this.inputCtrl.setValidators(Validators.required);
    // } else {
    //   this.inputCtrl.clearValidators();
    // }
    //
    // if (this.bfDisabled) {
    //   this.inputCtrl.disable(); // Be careful, this turns the inputCtrl invalid (https://github.com/angular/angular/issues/11432#issuecomment-245670999)
    // } else {
    //   this.inputCtrl.enable();
    // }

    // Generate new observables for the dynamic text
    if (change.hasOwnProperty('bfLabel'))        { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
    if (change.hasOwnProperty('bfTooltip'))      { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
    if (change.hasOwnProperty('bfPlaceholder'))  { this.bfPlaceholderTrans$ = this.translate.getLabel$(this.bfPlaceholder); }
    if (change.hasOwnProperty('bfDisabledTip'))  { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }

    if (change.hasOwnProperty('bfType'))  {
      if (this.bfType !== 'text' && this.bfType !== 'number' && this.bfType !== 'password' && this.bfType !== 'email') {
        this.bfType = 'text';
      }
    }



    this.displayIcon = this.bfIcon || '';

    // this.inputCtrl.setValue(this.bfModel);
    // console.log('this.inputCtrl.status', this.inputCtrl.status);
    // console.log('propagateModelUp -> ', this.bfModel);
    this.propagateModelUp(this.bfModel);
    this.updateStatus();
  }


  ngOnInit() {
    // We are using a similar hack than these guys: https://medium.com/@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
    // to detect the autofill through a css animation listener
    this.hasAutofillDetection = this.bfOnAutofill.observers.length > 0; // Check if there's anything listening to autofill detection
    if (this.hasAutofillDetection) {
      this.elementRef.nativeElement.querySelector('input').addEventListener('animationstart', ($event) => { this.bfOnAutofill.emit($event); });
      this.elementRef.nativeElement.querySelector('input').addEventListener('webkitAnimationStart', ($event) => { this.bfOnAutofill.emit($event); });
    }
  }


  public updateStatus = () => {
    if (!!this.inputCtrl) {
      if (this.inputCtrl.pristine) { this.status = 'pristine'; }
      if (this.inputCtrl.dirty)    { this.status = 'dirty'; }

      // if (this.inputCtrl.status === 'INVALID') { // <--- If we have to show error on pristine
      if (this.inputCtrl.status === 'INVALID' && !this.inputCtrl.pristine)   {
        this.status = 'error';
        this.displayIcon = this.bfInvalidIcon;
      }
    }
  };


  public parseModelChange = (value) => {
    this.bfModel = value;
    // this.inputCtrl.updateValueAndValidity();
    // console.log('propagateModelUp -> ', this.bfModel);
    this.propagateModelUp(this.bfModel);
    this.updateStatus();
    // this.bfModelChange.emit(this.bfModel);
  }

}
