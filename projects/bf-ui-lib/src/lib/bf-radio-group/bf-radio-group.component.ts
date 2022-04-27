import {
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {SubSink} from 'subsink';
import {BfRadioComponent} from '../bf-radio/bf-radio.component';
import {generateId} from '../generate-id';


@Component({
  selector: 'bf-radio-group',
  templateUrl: 'bf-radio-group.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BfRadioGroupComponent, multi: true, },
    { provide: NG_VALIDATORS, useExisting: BfRadioGroupComponent, multi: true, },
  ],
})
export class BfRadioGroupComponent implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
  @Input() ngModel: any;
  @Input() bfDisabled = false;
  @Input() bfRequired = false;
  @Input() bfLabel: string;
  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;
  @Input() bfErrorOnPristine = false; // If true, errors will be shown in pristine state too

  // List of <bf-radio> elements in the group
  bfRadios: QueryList<BfRadioComponent> = new QueryList();
  @ContentChildren(BfRadioComponent) set viewChildren(bfRadios: QueryList<BfRadioComponent>) {
    this.bfRadios = bfRadios;
    setTimeout(() => {
      this.bfRadios.forEach(bfRadio => {
        bfRadio.bfName = this.bfName;
        bfRadio.groupDisabled = !!this.bfDisabled;
        this.subs.add(bfRadio.selectedValue$.subscribe(value => this.internalChange(value)));
        this.subs.add(bfRadio.value$.subscribe(_ => {
          if (this.ngControl) {
            setTimeout(() => {
              this.ngControl.updateValueAndValidity();
            });
          }
        }));
      });
      this.updateTabIndexes();
    });
  };

  bfModel: string | number; // Internal reference for the selected value
  bfName: string;           // The name attribute (automatically taken from the host, or randomly generated)
  bfError: { [key: string]: boolean } = null;
  ngControl: FormControl;
  isPristine = true;
  subs = new SubSink();


  constructor(public htmlRef: ElementRef) {
    this.bfName = this.htmlRef.nativeElement.getAttribute('name') || `radio-group-${generateId(10)}`;
    this.bfLabelId = `radio-group-label-${generateId(10)}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('bfDisabled')) {
      this.bfRadios.forEach(bfRadio => bfRadio.groupDisabled = !!this.bfDisabled);
    }
    if (this.ngControl) { this.ngControl.updateValueAndValidity(); }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // When a radio option is selected, set the model and update the group
  internalChange(value: any) {
    if (this.bfModel === value) { return; }
    this.isPristine = false;
    this.bfModel = value;
    this.bfRadios.forEach(bfRadio => bfRadio.bfModel = value);
    this.updateTabIndexes();
    this.propagateModelUp(value);
  }

  // Sets tabindex -1 to all radios, but tabindex 0 to the selected one (or the first if none selected)
  updateTabIndexes() {
    let nothingSelected = true;
    this.bfRadios.forEach(bfRadio => {
      bfRadio.tabIndex = bfRadio.bfValue === this.bfModel ? 0 : -1;
      if (bfRadio.tabIndex === 0) { nothingSelected = false; }
    });

    // If no option selected, make the 1st option focusable
    if (this.bfRadios.length && nothingSelected) {
      this.bfRadios.first.tabIndex = 0;
    }
  }

  @HostBinding('class.is-required') get isRequired() { return !!this.bfRequired; };
  @HostBinding('class.is-invalid') get isInvalid() {
    return !!this.bfError && (!this.isPristine || this.bfErrorOnPristine);
  };

  @HostListener('keydown', ['$event']) onKeyPress(event: any) {
    const { key } = event;
    const currentRadio = this.bfRadios.find(el => el.tabIndex === 0);
    const currentIndex = this.bfRadios.toArray().indexOf(currentRadio);
    let nextRadio;

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      nextRadio = this.bfRadios.get(currentIndex - 1);
      if (!nextRadio) { nextRadio = this.bfRadios.last; }
    }

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      nextRadio = this.bfRadios.get(currentIndex + 1);
      if (!nextRadio) { nextRadio = this.bfRadios.first; }
    }

    if (nextRadio) {
      event.preventDefault();
      currentRadio.tabIndex = -1;
      nextRadio.tabIndex = 0;
      nextRadio.isFocused = true;
      nextRadio.htmlRef.nativeElement.focus();
    }
  }

  // ----- Accessibility -------
  // (roving tabindex) https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html
  // (aria-activedescendant) https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-2/radio-2.html

  // @HostBinding('attr.aria-activedescendant') activeDescendantId: string;
  // @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('attr.role') role = 'radiogroup';
  @HostBinding('attr.aria-labelledby') bfLabelId: string;


  // ------- ControlValueAccessor -----
  propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ControlValueAccessor --> writes a new value from the external ngModel into the internal ngModel
  // This is triggered by setUpControl in FormControl directive outside this component
  writeValue(value: any): void {
    // console.log('writeValue', value);
    if (this.bfModel === value) { return; }
    this.bfModel = value;
    this.bfRadios.forEach(bfRadio => bfRadio.externalChange(value));
    this.updateTabIndexes();
  }

  // NG_VALIDATORS: To determine the <bf-radio-group [ngModel]> formControl status. Triggered:
  //   - After writeValue()
  //   - After propagateModelUp()
  //   - After this.ngControl.updateValueAndValidity()
  validate(extFormCtrl: FormControl): ValidationErrors {
    this.ngControl = extFormCtrl;
    const isControlEmpty = !this.bfRadios.some(bfRadio => bfRadio.bfValue === this.bfModel);
    this.bfError = this.bfRequired && isControlEmpty ? { required: true } : null;
    return this.bfError;
  }

}
