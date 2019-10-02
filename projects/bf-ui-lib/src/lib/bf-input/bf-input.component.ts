import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  forwardRef,
  OnInit,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  Validators,
  NG_VALIDATORS,
  AbstractControl,
  NG_VALUE_ACCESSOR, NgControl
} from '@angular/forms';
import {AbstractTranslateService, BfUILibTransService} from '../abstract-translate.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from "rxjs";
import {map} from "rxjs/operators";

export interface IbfInputCtrl {
  getControl  ?: { (): FormControl };
  inputCtrl$  ?: Observable<FormControl>;
  setFocus    ?: { () };
  setDirty    ?: { (opts?) };
  setPristine ?: { (opts?) };
  removeError ?: { () };
  addError    ?: { (err) };
  refresh     ?: { () };
}


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
export class BfInputComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  private ngControl;
  public bfModel: string; // Internal to hold the linked ngModel on the wrapper

  @Input() bfLabel = '';          // Text for the label above the input. Translation applied.
  @Input() bfRequired = false;   // It adds the required validator to the ngModel (input), meaning that the required field styles will be applied on the label and input.
  @Input() bfDisabled = false;   // True=Input disabled. False=Input enabled.
  @Input() bfPlaceholder = '';    // It adds a placeholder text onto the input. Translation applied.

  @Input() bfType: 'text' | 'number' | 'email' | 'password' = 'text';  // Set a type on the input (text by default)

  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';    // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;
  @Input() bfDisabledTip: string;   // Label for the text of the tooltip to display when the input is disabled

  // @Input() bfName: string = '';    // The name attribute specifies the name of an <input> element
  @Input() bfLeftBtnIcon: string;   // Icon to show into a button on the left of the input (prepend addon https://getbootstrap.com/docs/4.3/components/input-group/#button-addons)
  @Input() bfRightBtnIcon: string;  // Icon to show into a button on the right of the input (append addon)
  @Input() bfLeftBtnText: string;   // Text to show into a button on the left of the input (prepend addon)
  @Input() bfRightBtnText: string;  // Text to show into a button on the left of the input (append addon)

  @Input() bfAutoFocus = false; // If true, once input linked to the view is automatically focused

  @Input() bfMinlength = 0;     // Min number of chars. Built in validator (minlength)
  @Input() bfMaxlength = null;  // Max number of chars. Built in validator (maxlength). Null means no max. It blocks input if limit.
  @Input() bfPattern = null;    // Regex validator. Built in validator (pattern). Null means no validation.

  @Input() bfValidType: 'integer' | 'number' | 'decimal' | 'email' = null;  // Predefined validator patterns. It overrides bfPattern
  @Input() bfValidator = null;  // Callback custom validator function. It is called every time the internal ngModel validates its value.
                                // As a parameter, it passes the current value of the model. It should return null (valid) or error object (invalid)
  // @Input() bfValidIf = null; // Not possible to manage this due to ExpressionChangedAfterItHasBeenCheckedError

  @Input() bfErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() bfErrorPos: 'top-right' | 'bottom-left' | 'bottom-right';  // Custom position where to display the error text

  @Input() bfIcon = '';             // Icon to show into the input floating at the right hand side (this is replace by bfValidIcon and bfInvalidIcon)
  @Input() bfValidIcon = '';        // Icon to show when the value is dirty and valid (by default none).
  @Input() bfInvalidIcon = 'icon-warning22'; // Icon to show when the value is dirty and invalid (by default icon-warning22)
  @Input() bfErrorOnPristine = false; // If true, errors will be shown in pristine state too (by default pristine shows as valid always)


  @Output() bfLeftBtnClick = new EventEmitter<any>();   // Emitter for left addon button
  @Output() bfRightBtnClick = new EventEmitter<any>();  // Emitter for right addon button
  @Output() bfOnAutofill = new EventEmitter<any>();     // Emitter when a browser autofill is detected
  @Output() bfOnKeyDown = new EventEmitter<any>();      // Emitter when a key is pressed
  @Output() bfOnEsc = new EventEmitter<any>();          // Emitter when esc key is pressed
  @Output() bfOnEnter = new EventEmitter<any>();        // Emitter when Enter is pressed
  @Output() bfOnCtrlEnter = new EventEmitter<any>();    // Emitter when Ctrl+Enter is pressed

  @Output() bfOnLoaded = new EventEmitter<IbfInputCtrl>();  // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() bfBeforeChange = new EventEmitter<any>();       // Emitter to catch the next value before it is set

  // bfAsyncValidator  : '&?',     // Function to validate asynchronously, returning a promise. Resolve=valid, reject=invalid



  public bfLabelTrans$: Observable<string> = of('');         // Translated text for the label
  public bfTooltipTrans$: Observable<string> = of('');       // Translated text for the tooltip of the label
  public bfPlaceholderTrans$: Observable<string> = of('');   // Translated text for the placeholder of the input
  public bfDisabledTipTrans$: Observable<string> = of('');   // Translated text for the disabled tooltip of the input
  public errorTextTrans$: Observable<string> = of(''); // Translated text for the error message

  public errTxtRequired$: Observable<string> = of(''); // Default error text for required
  public errTxtMinLen$: Observable<string> = of('');   // Default error text for minlength
  public errTxtMaxLen$: Observable<string> = of('');   // Default error text for maxlength

  // Status of the bfInput. Pristine will be valid even if the value is wrong (unless bfErrorOnPristine)
  public status: 'valid' | 'error' | 'loading' = 'valid';  // pristine, valid, error, loading

  public displayIcon = '';
  public errorPosition = 'default';
  public isPristine = true;
  public isFocus = false; // Whether the focus is on the input
  public hasAutofillDetection = false;  // Whether is has autofill detection (any parameter linked to bfOnAutofill)
  public manualError = null; // Manual error (set through addError() / removeError())


  @ViewChild('ngInputRef') ngInputRef: ElementRef;
  public inputCtrl: FormControl; // <-- ngInputRef.control

  constructor(
    private translate: BfUILibTransService,
    private config: NgbPopoverConfig,
    private elementRef: ElementRef,
    // public ngControl: NgControl
  ) {
    // ngControl.valueAccessor = this;
    this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_value'); // Default error message
    this.errTxtRequired$ = this.translate.getLabel$('view.common.required_field');
    this.errTxtMinLen$ = this.translate.getLabel$('view.common.invalid_min_length');
    this.errTxtMaxLen$ = this.translate.getLabel$('view.common.invalid_max_length');
  }



  ngOnChanges(change) {
    // Translate bfText whenever it changes
    // console.error('ngOnChanges', change);
    // console.log('this.ngInputRef', this.ngInputRef);

    // Link the formControl form the <input #ngInputRef="ngModel"> to "this.inputCtrl"
    if (!!this.ngInputRef['control'] && !this.inputCtrl) {
      this.inputCtrl = this.ngInputRef['control'];
      this.inputCtrl.setValidators(this.customValidator);
      this.inputCtrl.updateValueAndValidity();
    }

    if (change.hasOwnProperty('bfValidator')) {
      this.inputCtrl.updateValueAndValidity();
    }


    // Generate new observables for the dynamic text
    if (change.hasOwnProperty('bfLabel'))        { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
    if (change.hasOwnProperty('bfTooltip'))      { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
    if (change.hasOwnProperty('bfPlaceholder'))  { this.bfPlaceholderTrans$ = this.translate.getLabel$(this.bfPlaceholder); }
    if (change.hasOwnProperty('bfDisabledTip'))  { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }
    if (change.hasOwnProperty('bfErrorText'))    { this.errorTextTrans$ = this.translate.getLabel$(this.bfErrorText); }

    if (change.hasOwnProperty('bfErrorPos') && this.bfErrorPos) { this.errorPosition = this.bfErrorPos; }

    if (change.hasOwnProperty('bfType'))  {
      if (this.bfType !== 'text' && this.bfType !== 'number' && this.bfType !== 'password' && this.bfType !== 'email') {
        this.bfType = 'text';
      }
    }

    if (!this.bfErrorText) {
      if (change.hasOwnProperty('bfRequired'))  { this.errorTextTrans$ = this.errTxtRequired$; }
      if (change.hasOwnProperty('bfMinlength')) { this.errorTextTrans$ = this.errTxtMinLen$; }
      if (change.hasOwnProperty('bfMaxlength')) { this.errorTextTrans$ = this.errTxtMaxLen$; }
    }


    // Pre defined ngPatterns
    if (change.hasOwnProperty('bfValidType'))  {
      if (this.bfValidType === 'integer') { this.bfPattern = '^[0-9]{1,5}$'; }
      if (this.bfValidType === 'number')  { this.bfPattern = '^-?[0-9]{1,8}$'; }
      if (this.bfValidType === 'decimal') { this.bfPattern = '^-?[0-9]+(\\.[0-9]+)?$'; }
      // if (this.bfValidType === 'email')   { this.bfPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'; }

      // Email regex from W3C (https://www.w3.org/TR/html5/forms.html#valid-e-mail-address):
      if (this.bfValidType === 'email')   { this.bfPattern = "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"; }
    }

    if (change.hasOwnProperty('bfAutoFocus') && !!this.bfAutoFocus) {
      setTimeout(() => {  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
        this.elementRef.nativeElement.querySelector('input').focus({ preventScroll: false });
      }, 50);
    }

    // Update the model (once ready)
    this.deferRefresh();
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

  // ngAfterContentInit() { console.log('ngAfterContentInit'); }


  ngAfterViewInit() {
    // console.log('ngAfterViewInit', this.ngControl);

    if (!!this.ngInputRef['control'] && !this.inputCtrl) {
      this.inputCtrl = this.ngInputRef['control'];
    }

    this.bfOnLoaded.emit({
      inputCtrl$  : this.inputCtrl ? this.inputCtrl.statusChanges.pipe(map(status => this.inputCtrl)) : null, // expose the whole formControl
      setFocus    : () => this.elementRef.nativeElement.querySelector('input').focus({ preventScroll: false }),
      setDirty    : (opts?) => { this.inputCtrl.markAsDirty(opts); this.deferRefresh(); },
      setPristine : (opts?) => { this.inputCtrl.markAsPristine(opts); this.deferRefresh(); },
      removeError : () => {
        this.manualError = null;
        this.inputCtrl.updateValueAndValidity();
        this.deferRefresh();
      },
      addError    : (err) => {
        this.manualError = err;
        this.inputCtrl.updateValueAndValidity();
        this.deferRefresh();
      },
      refresh : () => {
        this.inputCtrl.updateValueAndValidity();
        this.deferRefresh();
      }
    });
  };




  // ngAfterViewChecked() {
  //   console.log('ngAfterViewChecked');
  // }



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
  public customValidator = ((intFormCtrl: FormControl) => {
    // intFormCtrl <-- FormControl of the internal ngModel (same as this.inputCtrl)
    let result = null;

    if (!!this.bfValidator && typeof this.bfValidator === 'function') {
      result = this.bfValidator(intFormCtrl.value);
    }

    if (!!this.manualError) { result = this.manualError; }  // Manual error

    return result;
  });

  // ------------------------------------


  // Internal ngModelChange
  public parseModelChange = (value) => {
    this.bfBeforeChange.emit({ currentValue: this.bfModel, nextValue: value });
    this.bfModel = value;
    this.propagateModelUp(this.bfModel);
    this.updateStatus();
    // console.log('propagateModelUp (ngModel) -> ', this.bfModel);
  };

  // Update the state of the bfInput after any change
  // Produce new values for: [status, displayIcon, isPristine, errorTextTrans$]
  public updateStatus = () => {
    // console.log('updateStatus -> ', this.inputCtrl.status);
    this.status = 'valid';
    this.displayIcon = this.bfIcon;
    if (!!this.inputCtrl) {

      // this.inputCtrl.status can be: [VALID, INVALID, PENDING, DISABLED]
      if (this.inputCtrl.status === 'INVALID' && (!this.inputCtrl.pristine || this.bfErrorOnPristine)) {
        this.status = 'error';
        this.displayIcon = this.bfIcon || this.bfInvalidIcon;

        if (!this.bfErrorText) {
          if (this.inputCtrl.errors.required)  { this.errorTextTrans$ = this.errTxtRequired$; }
          if (this.inputCtrl.errors.minlength) { this.errorTextTrans$ = this.errTxtMinLen$; }
          if (this.inputCtrl.errors.maxlength) { this.errorTextTrans$ = this.errTxtMaxLen$; }
          if (!!this.manualError && this.manualError.label) {
            this.errorTextTrans$ = this.translate.getLabel$(this.manualError.label);
          }
        }
      }

      if (this.inputCtrl.status === 'VALID') {
        this.status = 'valid';
        if (!this.inputCtrl.pristine || this.bfErrorOnPristine) {
          this.displayIcon = this.bfIcon || this.bfValidIcon;
        }
      }

      this.isPristine = this.inputCtrl.pristine;
      if (this.ngControl) {
        if (this.isPristine && !this.ngControl.pristine) { this.ngControl.markAsPristine(); }
        if (!this.isPristine && this.ngControl.pristine) { this.ngControl.markAsDirty(); }
      }
    }
  };


  // Update external ngModel and internal state (defer it to the next cycle)
  public deferRefresh = () => {
    setTimeout(() => {
      this.propagateModelUp(this.bfModel);  // This will force the external validate
      this.updateStatus();
    });
  };

  // React on key events (on the input)
  public triggerKey = (event) => {
    if (event.key === 'Escape') { this.bfOnEsc.emit(event); }
    if (event.key === 'Enter') { this.bfOnEnter.emit(event); }
    if (event.key === 'Enter' && event.ctrlKey) { this.bfOnCtrlEnter.emit(event); }
    this.bfOnKeyDown.emit(event);
  }
}
