import {Component, OnInit, Input, Output, EventEmitter, Inject, forwardRef, OnChanges} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { BfUILibTransService} from '../abstract-translate.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'bf-textarea',
  templateUrl: './bf-textarea.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfTextareaComponent),
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfTextareaComponent),
    }
  ]
})
export class BfTextareaComponent implements ControlValueAccessor, OnInit, OnChanges {
  private ngControl;
  public bfModel: string; // Internal to hold the linked ngModel on the wrapper

  @Input() bfLabel = '';
  @Input() bfRequired = false;
  @Input() bfDisabled = false;
  @Input() bfRows = 4;
  @Input() bfPlaceholder = '';

  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;

  @Input() bfErrorPos = 'top-right';  // top-right, bottom-left, bottom-right
  @Input() bfErrorText: string;   // Custom error text (label) to display when invalid value

  @Input() bfMinlength = 0;     // Min number of chars. Built in validator (minlength)
  @Input() bfMaxlength = null;  // Max number of chars. Built in validator (maxlength). Null means no max. It blocks input if limit.
  @Input() bfValidator = null;  // Callback custom validator function. It is called every time the internal ngModel validates its value.
                                // As a parameter, it passes the current value of the model. It should return null (valid) or error object (invalid)


  @Output() bfOnKeyDown = new EventEmitter<any>();  // Emitter when a key is pressed
  @Output() bfOnEsc = new EventEmitter<any>();      // Emitter when esc key is pressed
  @Output() bfOnSave = new EventEmitter<any>();     // Emitter when Ctrl+Enter



  public status = 'pristine';      // pristine, valid, error, loading

  public bfLabelTrans$: Observable<string> = of('');        // Translated text for the label
  public bfPlaceholderTrans$: Observable<string> = of('');  // Translated text for the placeholder
  public bfTooltipTrans$: Observable<string> = of('');      // Translated text for the tooltip
  public errorTextTrans$: Observable<string> = of(''); // Translated text for the error message

  public errTxtRequired$: Observable<string> = of(''); // Default error text for required
  public errTxtMinLen$: Observable<string> = of('');   // Default error text for minlength
  public errTxtMaxLen$: Observable<string> = of('');   // Default error text for maxlength

  public errorPosition = 'default';
  public isFocus = false; // Whether the focus is on the input

  @ViewChild('ngInputRef', { static: false }) ngInputRef: ElementRef;
  public inputCtrl: FormControl; // <-- ngInputRef.control

  constructor(private translate: BfUILibTransService) {
    this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_value'); // Default error message
    this.errTxtRequired$ = this.translate.getLabel$('view.common.required_field');
    this.errTxtMinLen$ = this.translate.getLabel$('view.common.invalid_min_length');
    this.errTxtMaxLen$ = this.translate.getLabel$('view.common.invalid_max_length');
  }

  // ------- ControlValueAccessor -----

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ControlValueAccessor --> writes a new value from the external ngModel into the internal ngModel
  // This is triggered by setUpControl in FormControl directive outside this component
  public writeValue = (value: any) => {
    // console.log('writeValue -> ', value, this.ngInputRef);
    // if (value === null) {} // First time, when the component is initialized but the outer value not ready yet

    this.bfModel = value ? value : '';
    setTimeout(this.updateStatus);  // Update status (after internal ngModel cycle)

    // Set the value to the internal formControl to force the internal validators run
    // so when the external validate() is triggered after this it gets the last value
    if (!!this.inputCtrl) {
      this.inputCtrl.setValue(this.bfModel, { // https://angular.io/api/forms/FormControl#setValue
        emitViewToModelChange: false,
        // emitModelToViewChange: false,
        // emitEvent: false,
      });
    }
  };


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the state of the internal ngModel
  public validate = (extFormCtrl: FormControl) => {
    // extFormCtrl     <-- FormControl of the external ngModel
    // this.inputCtrl  <-- FormControl of the internal ngModel
    // this.ngInputRef <-- This is the reference of the internal <input> tag
    let result = null;  // null means valid
    this.ngControl = extFormCtrl; // Save the reference

    // If internal ngModel is invalid, external is invalid too
    if (!!this.inputCtrl && this.inputCtrl.status === 'INVALID') { // status: [VALID, INVALID, PENDING, DISABLED]
      result = this.inputCtrl.errors;
    }
    // console.log('validate', 'Internal FormControl:', this.inputCtrl.status, ' / External FormControl:', extFormCtrl.status, result);
    return result;
  };

  // Custom validator for the internal ngModel (input)
  public customValidator = (intFormCtrl: FormControl) => {
    // intFormCtrl <-- FormControl of the internal ngModel (same as this.inputCtrl)
    let result = null;

    if (!!this.bfValidator && typeof this.bfValidator === 'function') {
      result = this.bfValidator(intFormCtrl.value);
    }

    // if (!!this.manualError) { result = this.manualError; }  // Manual error

    return result;
  };


  // ------------------------------------

  ngOnChanges(change) { // Translate bfText whenever it changes

    // Link the formControl form the <input #ngInputRef="ngModel"> to "this.inputCtrl"
    if (!!this.ngInputRef && !!this.ngInputRef['control'] && !this.inputCtrl) {
      this.inputCtrl = this.ngInputRef['control'];
      this.inputCtrl.setValidators(this.customValidator);
      this.inputCtrl.updateValueAndValidity();
    }

    if (change.hasOwnProperty('bfValidator')) {
      this.inputCtrl.updateValueAndValidity();
    }

    if (change.hasOwnProperty('bfLabel'))       { this.bfLabelTrans$       = this.translate.getLabel$(this.bfLabel); }
    if (change.hasOwnProperty('bfPlaceholder')) { this.bfPlaceholderTrans$ = this.translate.getLabel$(this.bfPlaceholder); }
    if (change.hasOwnProperty('bfTooltip'))     { this.bfTooltipTrans$     = this.translate.getLabel$(this.bfTooltip); }
    if (change.hasOwnProperty('bfErrorText'))   { this.errorTextTrans$     = this.translate.getLabel$(this.bfErrorText); }

    if (change.hasOwnProperty('bfErrorPos') && this.bfErrorPos) { this.errorPosition = this.bfErrorPos; }

    if (!this.bfErrorText) {
      if (change.hasOwnProperty('bfRequired'))  { this.errorTextTrans$ = this.errTxtRequired$; }
      if (change.hasOwnProperty('bfMinlength')) { this.errorTextTrans$ = this.errTxtMinLen$; }
      if (change.hasOwnProperty('bfMaxlength')) { this.errorTextTrans$ = this.errTxtMaxLen$; }
    }

    // Update the model (once ready)
    this.deferRefresh();
  }


  ngOnInit() { }

  public updateStatus = () => {
    if (!!this.inputCtrl) {
      if (this.inputCtrl.pristine) { this.status = 'pristine'; }
      if (this.inputCtrl.dirty)    { this.status = 'dirty'; }

      // if (this.inputCtrl.status === 'INVALID') { // <--- If we have to show error on pristine
      if (this.inputCtrl.status === 'INVALID' && !this.inputCtrl.pristine)   {
        this.status = 'error';

        if (!this.bfErrorText) {
          if (this.inputCtrl.errors.required)  { this.errorTextTrans$ = this.errTxtRequired$; }
          if (this.inputCtrl.errors.minlength) { this.errorTextTrans$ = this.errTxtMinLen$; }
          if (this.inputCtrl.errors.maxlength) { this.errorTextTrans$ = this.errTxtMaxLen$; }
        }
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
  };

  // Update external ngModel and internal state (defer it to the next cycle)
  public deferRefresh = () => {
    setTimeout(() => {
      this.propagateModelUp(this.bfModel);  // This will force the external validate
      this.updateStatus();
    });
  };


  public triggerKey = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) { this.bfOnSave.emit(event); }
    if (event.key === 'Escape') { this.bfOnEsc.emit(event); }
    this.bfOnKeyDown.emit(event);
  }
}
