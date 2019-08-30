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
    },
    // { // Custom validator
    //   provide: NG_VALIDATORS, multi: true,
    //   useValue: (c: FormControl) => {
    //     console.log('NG_VALIDATORS', c);
    //     let err = { rangeError: {given: c.value, max: 10, min: 0 }};
    //
    //     return (c.value && c.value.length < 3) ? err : null;
    //   },
    // }
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
  @Input() bfAutoFocus = false; // If true, once input linked to the view is automatically focused

  @Input() bfMinlength = 0;   // Min number of chars. To bind to ngMinlength

  @Output() bfLeftBtnClick = new EventEmitter<any>();   // Emitter for left addon button
  @Output() bfRightBtnClick = new EventEmitter<any>();  // Emitter for right addon button
  @Output() bfOnAutofill = new EventEmitter<any>();     // Emitter when a browser autofill is detected
  @Output() bfOnKeyDown = new EventEmitter<any>();      // Emitter when a key is pressed
  @Output() bfOnEsc = new EventEmitter<any>();          // Emitter when esc key is pressed
  @Output() bfOnEnter = new EventEmitter<any>();        // Emitter when Enter is pressed
  @Output() bfOnCtrlEnter = new EventEmitter<any>();    // Emitter when Ctrl+Enter is pressed

/*

      bfPattern         : '@?',     // Bool expr to define ngPattern
      bfValidType       : '@?',     // Predefined ngPatterns. "decimal" -> Any number. "email" -> Email. If present it overrides bfPattern

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

  // ControlValueAccessor --> writes a new value from the external ngModel into the internal ngModel
  // This is triggered by setUpControl in FormControl directive outside this component
  writeValue(value: any) {
    console.log('writeValue -> ', value, this.ngInputRef);
    if (value === null)      {} // First time, when the component is initialized but the outer value not ready yet
    if (value === undefined) {} // Second time, when the component is initialized and the ngModel

    if (value !== undefined) {
      this.bfModel = value ? value: '';
      this.updateStatus();

      // Set the value to the internal formControl to force the internal validators run
      // so when the external validate() is triggered after this it gets the last value
      if (!!this.inputCtrl) {
        this.inputCtrl.setValue(this.bfModel, { // https://angular.io/api/forms/FormControl#setValue
          emitViewToModelChange: false,
          // emitModelToViewChange: false,
          // emitEvent: false,
        });
      }
    }
  }

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) {
    // console.log('registerOnChange');
    this.propagateModelUp = fn;
  }
  registerOnTouched(fn) { }


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the state of the internal ngModel
  public validate(extFormCtrl: FormControl) {
    // extFormCtrl     <-- FormControl of the external ngModel
    // this.inputCtrl  <-- FormControl of the internal ngModel
    // this.ngInputRef <-- This is the reference of the internal <input> tag

    console.log('validate', 'Internal FormControl:', this.inputCtrl.status, ' / External FormControl:', extFormCtrl.status);

    // If internal ngModel is invalid, external is invalid too
    if (!!this.inputCtrl && this.inputCtrl.status === 'INVALID') { // status: [VALID, INVALID, PENDING, DISABLED]
      return this.inputCtrl.errors;
    } else {
      return null;
    }
  }

  public customValidator = ((intFormCtrl: FormControl) => {
    // intFormCtrl <-- FormControl of the internal ngModel (same as this.inputCtrl)
    console.warn('customValidator errors 1 - Internal FC', intFormCtrl.errors);

    // This will force the external control to validate again (NG_VALIDATORS --> validate())
    // We have to wait until the internal ngModel gets the new value though
    // setTimeout(() => this.propagateModelUp(this.bfModel));


    if (intFormCtrl.value === 'Joel') {
      return { CUSTOM_VALIDATOR: { given: intFormCtrl.value, max: 10, min: 0 }};
    }
    return null;
  });

  // ------------------------------------

  ngOnChanges(change) {
    // Translate bfText whenever it changes
    console.log('ngOnChanges', change);
    // console.log('this.ngInputRef', this.ngInputRef);

    // Link the formControl form the <input #ngInputRef="ngModel"> to "this.inputCtrl"
    if (!!this.ngInputRef['control'] && !this.inputCtrl) {
      this.inputCtrl = this.ngInputRef['control'];
      this.inputCtrl.setValidators(this.customValidator);
      this.inputCtrl.updateValueAndValidity();
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

    if (change.hasOwnProperty('bfAutoFocus') && !!this.bfAutoFocus) {
      setTimeout(() => {  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
        this.elementRef.nativeElement.querySelector('input').focus({ preventScroll: false });
      }, 50);
    }




    this.displayIcon = this.bfIcon || '';

    // this.inputCtrl.setValue(this.bfModel);
    // console.log('this.inputCtrl.status', this.inputCtrl.status);
    console.log('propagateModelUp (ngOnChanges) -> ', this.bfModel);
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


  ngAfterContentInit() { console.error('ngAfterContentInit'); }
  ngAfterViewInit() { console.error('ngAfterViewInit'); }





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
    console.log('propagateModelUp (ngModel) -> ', this.bfModel);
    this.propagateModelUp(this.bfModel);
    this.updateStatus();
    // this.bfModelChange.emit(this.bfModel);
  };

  public triggerKey = (event) => {
    if (event.key === 'Escape') { this.bfOnEsc.emit(event); }
    if (event.key === 'Enter') { this.bfOnEnter.emit(event); }
    if (event.key === 'Enter' && event.ctrlKey) { this.bfOnCtrlEnter.emit(event); }
    this.bfOnKeyDown.emit(event);
  }
}
