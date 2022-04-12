import { Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import { OnInit, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import {BfUILibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { PositionType } from '../abstractions/types/position.type';
import {Patterns} from '../patterns';
import {BfDefer} from '../bf-defer/bf-defer';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface IbfInputCtrl {
  getControl  ?: { _: FormControl };
  inputCtrl$  ?: Observable<FormControl>;
  setFocus    ?: { () };
  setBlur     ?: { () };
  setDirty    ?: { (opts?) };
  setPristine ?: { (opts?) };
  removeError ?: { () };
  addError    ?: { (err) };
  refresh     ?: { () };
}

export type TExtCtrl$ =
  { action: 'setFocus'    }
| { action: 'setBlur'     }
| { action: 'setDirty',    opts?: any }
| { action: 'setPristine', opts?: any }
| { action: 'addError',    label?: string }
| { action: 'removeError' }
| { action: 'refresh'     };


@Component({
  selector: 'bf-input',
  templateUrl: './bf-input.component.html',
  styleUrls: [],
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
export class BfInputComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
  private ngControl;
  public bfModel: any; // Internal to hold the linked ngModel on the wrapper

  @Input() bfLabel = '';                    // Text for the label above the input. Translation applied.
  @Input() bfName = 'bfInput';      // The name attribute specifies the name of an <input> element
  @Input() bfRequired = false;     // It adds the required validator to the ngModel (input), meaning that the required field styles will be applied on the label and input.
  @Input() bfDisabled = false;     // True=Input disabled. False=Input enabled.
  @Input() bfPlaceholder = '';     // It adds a placeholder text onto the input. Translation applied.

  @Input() bfType: 'text' | 'number' | 'email' | 'password' = 'text';  // Set a type on the input (text by default)

  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';    // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;
  @Input() bfDisabledTip: string;   // Label for the text of the tooltip to display when the input is disabled
  @Input() bfLeftBtnIcon: string;   // Icon to show into a button on the left of the input (prepend addon https://getbootstrap.com/docs/4.3/components/input-group/#button-addons)
  @Input() bfRightBtnIcon: string;  // Icon to show into a button on the right of the input (append addon)
  @Input() bfLeftBtnText: string;   // Text to show into a button on the left of the input (prepend addon)
  @Input() bfRightBtnText: string;  // Text to show into a button on the left of the input (append addon)
  @Input() bfLeftBtnTooltip: string;  // Tooltip for the button on the left
  @Input() bfRightBtnTooltip: string; // Tooltip  for the button on the right

  @Input() bfAutoFocus = false; // If true, once input linked to the view is automatically focused
  @Input() bfAutocomplete = false; // If true, once the input is clicked, the previous value will be suggested

  @Input() bfMinlength = null;  // Min number of chars. Built in validator (minlength). Null means no min
  @Input() bfMaxlength = null;  // Max number of chars. Built in validator (maxlength). Null means no max. It blocks input if limit.
  @Input() bfPattern = null;    // Regex validator. Built in validator (pattern). Null means no validation.

  @Input() bfValidType: keyof typeof Patterns = null;  // Predefined validator patterns. It overrides bfPattern
  @Input() bfValidIf: boolean;  // Inline boolean expression to determine validity (true=valid, false=invalid)

  // Callback custom validator function. It is called every time the internal ngModel validates its value.
  // As a parameter, it passes the current value of the model. It should return null (valid) or error object (invalid)
  @Input() bfValidator: (value, ops: { value, status, errors, prevErrors, ctrl }) => any;

  @Input() bfErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() bfErrorPos: 'top-right' | 'bottom-left' | 'bottom-right' | 'none';  // Custom position where to display the error text

  @Input() bfIcon = '';             // Icon to show into the input floating at the right hand side (this is replace by bfValidIcon and bfInvalidIcon)
  @Input() bfValidIcon = '';        // Icon to show when the value is dirty and valid (by default none).
  @Input() bfInvalidIcon = 'icon-warning22'; // Icon to show when the value is dirty and invalid (by default icon-warning22)
  @Input() bfErrorOnPristine = false; // If true, errors will be shown in pristine state too (by default pristine shows as valid always)

  @Input() bfImage;
  @Input() BfImageAltText = '';
  @Input() bfImageHidden = true;

  @Output() bfLeftBtnClick = new EventEmitter<any>();   // Emitter for left addon button
  @Output() bfRightBtnClick = new EventEmitter<any>();  // Emitter for right addon button
  @Output() bfOnAutofill = new EventEmitter<any>();     // Emitter when a browser autofill is detected
  @Output() bfOnKeyDown = new EventEmitter<any>();      // Emitter when a key is pressed
  @Output() bfOnEsc = new EventEmitter<any>();          // Emitter when esc key is pressed
  @Output() bfOnEnter = new EventEmitter<any>();        // Emitter when Enter is pressed
  @Output() bfOnCtrlEnter = new EventEmitter<any>();    // Emitter when Ctrl+Enter is pressed
  @Output() bfOnFocus = new EventEmitter<void>();       // See the native 'focus' event
  @Output() bfOnBlur = new EventEmitter<void>();        // See the native 'blur' event
  @Output() bfOnKeypress = new EventEmitter<any>();      // Emitter when a key is pressed

  @Output() bfOnLoaded = new EventEmitter<IbfInputCtrl>();  // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() bfBeforeChange = new EventEmitter<any>();       // Emitter to catch the next value before it is set

  @Input() extCtrl$: Observable<any>; // To trigger actions manually from an external observable (subject)
  @Input() inputId: string;
  @Input() bfPatternLabel: string; // used to give a hint to fill out regexp patterns, added to the label
  @Input() bfAriaLabel: string;

  public autocomplete = 'off';
  public bfLabelTrans$ = of('');        // Translated text for the label
  public bfTooltipTrans$ = of('');      // Translated text for the tooltip of the label
  public bfPlaceholderTrans$ = of('');  // Translated text for the placeholder of the input
  public bfDisabledTipTrans$ = of('');  // Translated text for the disabled tooltip of the input
  public errorTextTrans$ = of('');      // Translated text for the error message
  public errTxtRequired$ = of('');      // Default error text for required
  public errTxtMinLen$ = of('');        // Default error text for minlength
  public errTxtMaxLen$ = of('');        // Default error text for maxlength
  public bfPatternLabelTrans = '';      // Default value for the bfPatternLabel

  // Status of the bfInput. Pristine will be valid even if the value is wrong (unless bfErrorOnPristine)
  public status: 'valid' | 'error' | 'loading' = 'valid';  // pristine, valid, error, loading

  public displayIcon = '';
  public errorPosition: PositionType = 'default';
  public isPristine = true;
  public isFocus = false; // Whether the focus is on the input
  public hasAutofillDetection = false;  // Whether is has autofill detection (any parameter linked to bfOnAutofill)
  public manualError = null; // Manual error (set through addError() / removeError())
  public ctrlSubs;  // Subscription to external control observable
  private readonly ctrlObject; // Hold an object with the input controller and the action methods
  private inputCtrlDefer = new BfDefer();  // This is resolved once inputCtrl is initialized


  // Link and hook up the internal input FormControl
  public ngInputRef: ElementRef; // <-- internal input ref
  public inputCtrl: FormControl; // <-- ngInputRef.control
  @ViewChild('ngInputRef', { static: false }) set content(content: ElementRef) {
    if (content && !this.ngInputRef) {
      this.ngInputRef = content;
      this.inputCtrl = content['control'];
      // this.inputCtrlDefer.promise.then(() => this.inputCtrl.setValidators(this.customValidator)); // add validators
      this.inputCtrlDefer.resolve(this.inputCtrl);
    }
  }

  private currentErrorMessage: { label: string, params?: any };

  constructor(
    private translate: BfUILibTransService,
    private elementRef: ElementRef,
    private liveAnnouncer: LiveAnnouncer
    // public ngControl: NgControl
  ) {
    // ngControl.valueAccessor = this;
    this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_value'); // Default error message
    this.errTxtRequired$ = this.translate.getLabel$('view.common.required_field');
    this.errTxtMinLen$ = this.translate.getLabel$('view.common.invalid_min_length');
    this.errTxtMaxLen$ = this.translate.getLabel$('view.common.invalid_max_length');

    const updateCtrl = () => { if (this.ngControl) { this.ngControl.updateValueAndValidity(); }};
    this.ctrlObject = {
      setFocus    : () => this.elementRef.nativeElement.querySelector('input').focus({ preventScroll: false }),
      setBlur     : () => this.elementRef.nativeElement.querySelector('input').blur(),
      setDirty    : (opts?) => { this.inputCtrl.markAsDirty(opts); updateCtrl(); },
      setPristine : (opts?) => { this.inputCtrl.markAsPristine(opts); updateCtrl(); },
      refresh     : () => updateCtrl(),
      removeError : ()      => {
        if (this.manualError !== null) { this.manualError = null; updateCtrl(); }
      },
      addError : (err)   => {
        if (JSON.stringify(this.manualError) !== JSON.stringify(err)) { this.manualError = err; updateCtrl(); }
      },
    };
  }



  ngOnChanges(change) {
    // console.log('ngOnChanges', change);

    if (change.hasOwnProperty('bfValidator')) {
      this.inputCtrlDefer.promise.then(() => this.inputCtrl.updateValueAndValidity());
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


    // Pre defined ngPatterns (only when no bfPattern)
    if (change.hasOwnProperty('bfValidType') && !(change.hasOwnProperty('bfPattern') && change.bfPattern.currentValue)) {
      this.bfPattern = this.bfValidType ? Patterns[this.bfValidType] : null;
    }

    if (change.hasOwnProperty('bfAutoFocus') && !!this.bfAutoFocus) {
      setTimeout(() => {  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
        this.elementRef.nativeElement.querySelector('input').focus({ preventScroll: false });
      }, 50);
    }

    // External control via extCtrl$
    if (change.hasOwnProperty('extCtrl$')) {
      if (!!this.ctrlSubs) { this.ctrlSubs.unsubscribe(); }
      this.ctrlSubs = this.extCtrl$.subscribe((op: TExtCtrl$) => {
        if (op.action === 'setFocus')    { this.ctrlObject.setFocus(); }
        if (op.action === 'setBlur')     { this.ctrlObject.setBlur(); }
        if (op.action === 'setDirty')    { this.ctrlObject.setDirty(op.opts); }
        if (op.action === 'setPristine') { this.ctrlObject.setPristine(op.opts); }
        if (op.action === 'addError')    { this.ctrlObject.addError(op); }
        if (op.action === 'removeError') { this.ctrlObject.removeError(); }
        if (op.action === 'refresh')     { this.ctrlObject.refresh(); }
      });
    }


    // When this runs (before ngAfterViewInit) recalculate validations manually
    if (this.inputCtrl && this.ngControl) {
      setTimeout(() => { // wait for CUSTOM_VALIDATOR run first
        this.ngControl.updateValueAndValidity(); // --> triggers NG_VALIDATORS -> validate() -> updateStatus()
        // this.propagateModelUp(this.bfModel);  // This would force NG_VALIDATORS too, but also trigger ngModelChange
      });
    }
  }

  ngOnInit() {
    // console.log('ngOnInit');
    // We are using a similar hack than these guys: https://medium.com/@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
    // to detect the autofill through a css animation listener
    this.hasAutofillDetection = this.bfOnAutofill.observers.length > 0; // Check if there's anything listening to autofill detection
    if (this.hasAutofillDetection) {
      this.elementRef.nativeElement.querySelector('input').addEventListener('animationstart', ($event) => { this.bfOnAutofill.emit($event); });
      this.elementRef.nativeElement.querySelector('input').addEventListener('webkitAnimationStart', ($event) => { this.bfOnAutofill.emit($event); });
    }

    if (!this.inputId) {
      this.inputId = this.generateUniqueId('input');
    }

    this.bfPatternLabelTrans = this.translate.doTranslate(this.bfPatternLabel);
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
    this.inputCtrlDefer.promise.then(() => {
      this.bfOnLoaded.emit({ // expose the formControl
        inputCtrl$ : this.inputCtrl ? this.inputCtrl.statusChanges.pipe(map(status => this.inputCtrl)) : null,
        ...this.ctrlObject,  // Add control methods here too
        inputCtrl: this.inputCtrl,
      });
    });
  }

  ngOnDestroy() {
    if (!!this.ctrlSubs) { this.ctrlSubs.unsubscribe(); }
  }


  // ------- ControlValueAccessor -----

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALUE_ACCESSOR --> This is triggered every time the external <bf-input [ngModel]> changes (propagate down)
  // It is also triggered twice when the component is first initialized
  //   1 - Before #ngInputRef is set (value always null)
  //   2 - After #ngInputRef is set (initial ngModel value from outside)
  public writeValue = (value: any) => {
    this.bfModel = (value || value === 0) ? value : '';
    // console.log('writeValue -> ', value, 'bfModel=', this.bfModel);

    if (this.inputCtrl && this.ngControl) {
      // setTimeout(() => this.ngControl.updateValueAndValidity()); // --> force NG_VALIDATORS

      // Set the value to the internal input formControl to force the internal validators run
      // so when the external validate() is triggered after this it gets the last value
      this.inputCtrl.setValue(this.bfModel, { emitViewToModelChange: false }); // https://angular.io/api/forms/FormControl#setValue
    }
  };

  // NG_VALIDATORS: To determine the <bf-input [ngModel]> formControl status. Triggered:
  //   - After writeValue()
  //   - After propagateModelUp()
  //   - After this.ngControl.updateValueAndValidity()
  public validate = (extFormCtrl: FormControl) => {
    // console.log('NG_VALIDATORS. ngControl = ', !!extFormCtrl, '. inputCtrl = ', !!this.inputCtrl);
    let result = null;  // null means valid
    this.ngControl = extFormCtrl; // FormControl of the external ngModel

    // Ignore first writeValue() when internal input is not ready yet (always VALID)
    if (!this.inputCtrl) { return null; } // this.inputCtrl  <-- FormControl of the internal ngModel


    // Propagates upward the state of the internal ngModel
    if (this.inputCtrl.status === 'INVALID') { result = this.inputCtrl.errors; }

    if (this.bfValidIf === false) { result = { label: 'view.common.invalid_value' }; }

    if (this.bfValidator && typeof this.bfValidator === 'function') {
      result = this.bfValidator(this.inputCtrl.value, {
        value: this.inputCtrl.value,
        status: this.inputCtrl.status,
        errors: result,
        prevErrors: this.ngControl.errors,
        ctrl: this.ctrlObject });
    }

    if (this.manualError) { result = this.manualError; }

    setTimeout(() => this.updateStatus());  // Update status (defer so ngControl gets updated first)
    return result;
  };


  // // Custom validator for the internal ngModel (input)
  // public customValidator = (intFormCtrl?) => {
  //   console.error('CUSTOM_VALIDATOR. ngControl = ', !!this.ngControl, '. inputCtrl = ', !!this.inputCtrl);
  //   let result = null; // no error
  //   return result;
  // };



  // ------------------------------------


  // Internal (ngModelChange)
  public parseModelChange = (value) => {
    // console.log('parseModelChange', value);
    if (this.bfType === 'number') { // Number type conversion
      if (value && value !== '') {
        value = value !== 0 ? Number(value) : value;
      }
    }

    this.bfBeforeChange.emit({ currentValue: this.bfModel, nextValue: value });
    this.bfModel = value;
    this.propagateModelUp(this.bfModel);
    // console.log('propagateModelUp (ngModel) -> ', this.bfModel);
  };

  // Updates the state of the bfInput. Always triggered after NG_VALIDATORS -> validate()
  // Produce new values for: [status, displayIcon, isPristine, errorTextTrans$]
  public updateStatus = () => {
    // console.warn('updateStatus -> inputCtrl = ', this.inputCtrl.status, this.inputCtrl.errors, 'ngControl = ', this.ngControl.status, this.inputCtrl.errors);
    this.status = 'valid';
    this.displayIcon = this.bfIcon;
    if (this.ngControl && this.inputCtrl) {
      // this.ngControl.status can be: [VALID, INVALID, PENDING, DISABLED]
      if (this.ngControl.status === 'INVALID' && (!this.inputCtrl.pristine || this.bfErrorOnPristine)) {
        this.status = 'error';
        this.displayIcon = this.bfIcon || this.bfInvalidIcon;
        if (!this.bfErrorText) {
          const errors = this.ngControl.errors;
          this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_value', errors);
          this.setCurrentErrorMessage({ label: 'view.common.invalid_value', params: errors  });

          if (errors.required) {
            this.errorTextTrans$ = this.errTxtRequired$;
            this.liveAnnouncer.announce(this.translate.doTranslate('view.common.required_field'));
            this.setCurrentErrorMessage({ label: 'view.common.required_field'  });
          }
          if (errors.minlength) {
            this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_min_length', { min: this.inputCtrl.errors.minlength.requiredLength });
            this.liveAnnouncer.announce(this.translate.doTranslate('view.common.invalid_min_length', { min: this.inputCtrl.errors.minlength.requiredLength }));
            this.setCurrentErrorMessage({ label: 'view.common.invalid_min_length', params: { min: this.inputCtrl.errors.minlength.requiredLength }});
          }
          if (errors.maxlength) {
            this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_max_length', { max: this.inputCtrl.errors.maxlength.requiredLength });
            this.liveAnnouncer.announce(this.translate.doTranslate('view.common.invalid_max_length', { max: this.inputCtrl.errors.maxlength.requiredLength }));
            this.setCurrentErrorMessage({ label: 'view.common.invalid_max_length', params: { max: this.inputCtrl.errors.maxlength.requiredLength }});
          }
          if (errors.pattern) {
            this.errorTextTrans$ = this.translate.getLabel$('view.common.invalid_pattern');
            this.liveAnnouncer.announce(this.translate.doTranslate('view.common.invalid_pattern'));
            this.setCurrentErrorMessage({ label: 'view.common.invalid_pattern' });
          }
          if (errors.label) {
            this.errorTextTrans$ = this.translate.getLabel$(errors.label, errors);
            this.liveAnnouncer.announce(this.translate.doTranslate(errors.label, errors));
            this.setCurrentErrorMessage({ label: errors.label, params: errors });
          }
          if (!!this.manualError && this.manualError.label) {
            this.errorTextTrans$ = this.translate.getLabel$(this.manualError.label, this.manualError);
            this.liveAnnouncer.announce(this.translate.doTranslate(this.manualError.label, this.manualError));
            this.setCurrentErrorMessage({ label: this.manualError.label, params: this.manualError });
          }
        }
      }

      if (this.ngControl.status === 'VALID') {
        this.status = 'valid';
        if (!this.inputCtrl.pristine || this.bfErrorOnPristine) {
          this.displayIcon = this.bfIcon || this.bfValidIcon;
        }
        this.liveAnnouncer.clear();
      }

      this.isPristine = this.inputCtrl.pristine;
      if (this.ngControl) {
        if (this.isPristine && !this.ngControl.pristine) { this.ngControl.markAsPristine(); }
        if (!this.isPristine && this.ngControl.pristine) { this.ngControl.markAsDirty(); }
      }
    }

    // Special spinning icon
    if (this.displayIcon === 'loading') { this.displayIcon = 'icon-loop32'; }
  };



  // React on key events (on the input)
  public triggerKey = (event) => {
    if (event.key === 'Escape') { this.bfOnEsc.emit(event); }
    if (event.key === 'Enter') { this.bfOnEnter.emit(event); }
    if (event.key === 'Enter' && event.ctrlKey) { this.bfOnCtrlEnter.emit(event); }
    this.bfOnKeyDown.emit(event);
  }

  public onKeyPress(event) {
    this.bfOnKeypress.emit(event);
  }

  public onFocus(): void {
    this.isFocus = true;
    this.bfOnFocus.emit();

    if (this.currentErrorMessage) {
      const { label, params } = this.currentErrorMessage;
      this.liveAnnouncer.announce(this.translate.doTranslate(label, params));
    }
  }

  public setCurrentErrorMessage(errorData: { label: string, params?: any }): void {
    this.currentErrorMessage = errorData;
  }

  private generateUniqueId(component: string): string {
    const hexString = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${component}-${hexString}`;
  }

  public refreshTooltip = (btnTip) => {
    btnTip.close();
    setTimeout(() => btnTip.open());
  }
}
