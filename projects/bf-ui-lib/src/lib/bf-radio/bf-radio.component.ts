import { Component, HostBinding, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Observable } from 'rxjs';
import { BfUILibTransService } from '../abstract-translate.service';

@Component({
  selector: 'bf-radio',
  templateUrl: 'bf-radio.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BfRadioComponent, multi: true, },
    { provide: NG_VALIDATORS, useExisting: BfRadioComponent, multi: true, },
  ],
})
export class BfRadioComponent implements OnChanges, ControlValueAccessor, Validator {
  @Input() bfLabel = '';
  @Input() bfRadioGroup = 'radio-group';
  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfIcon = '';
  @Input() a11yOn = false; // flag to be used until all radio groups in the portal have been refactored to be spec compliant

  private _value: string;
  @Input() set bfValue(v: string) { this._value = `${v}`; }
  get bfValue(): string { return this._value; }

  private _bfDisabled = false;
  @Input() set bfDisabled(v: boolean) { this._bfDisabled = this._toBoolean(v); }
  get bfDisabled(): boolean { return this._bfDisabled; }

  private _bfRequired = false;
  @Input() set bfRequired(v: boolean) { this._bfRequired = this._toBoolean(v); }
  get bfRequired(): boolean { return this._bfRequired; }

  private _bfTooltipBody = false;
  @Input() set bfTooltipBody(v: boolean) { this._bfTooltipBody = this._toBoolean(v); }
  get bfTooltipBody(): boolean { return this._bfTooltipBody; }

  private _bfModel: string;
  set bfModel(v: string) { this._bfModel = `${v}`; }
  get bfModel(): string { return this._bfModel; }


  isFocussed: boolean;
  bfLabelTrans$: Observable<string>;    // Translated text for the button
  bfTooltipTrans$: Observable<string>;  // Translated text for the tooltip

  private _toBoolean = (v: any) => `${v}` === 'true';
  private _onChange = (_: any) => { };
  private _onTouched = () => { };


  constructor(
    private _translate: BfUILibTransService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.bfLabel) { this.bfLabelTrans$ = this._translate.getLabel$(this.bfLabel); }
    if (changes.bfTooltip) { this.bfTooltipTrans$ = this._translate.getLabel$(this.bfTooltip); }
  }

  onChange(value: any) {
    this.bfModel = value;
    this._onChange(value);
    this._onTouched();
  }

  // *************
  // Accessibility
  // *************
  @HostBinding('attr.tabindex')
  get tabindex(): number {
    return this.bfDisabled ? -1 : 0;
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'radio';
  }

  @HostBinding('attr.aria-checked')
  get isChecked() {
    return this.bfValue === this.bfModel;
  }

  @HostListener('focus')
  onFocus(): void {
    if (this.a11yOn) {
      this.onChange(this.bfValue);
    }
  }

  @HostListener('blur')
  onBlur(): void {
    this._onTouched();
  }

  // Select with click or space bar
  @HostListener('click')
  @HostListener('keyup.space')
  onSelect(): void {
    if (!this.bfDisabled && !this.a11yOn) {
      this.onChange(this.bfValue);
    }
  }

  @HostListener('keydown.space', ['$event'])
  stopPageScroll(event: KeyboardEvent): void {
    event.preventDefault();
  }

  // ************************
  // Custom form control code
  // ************************

  // ------- ControlValueAccessor -----
  writeValue(value: any): void { this.bfModel = value; }
  registerOnChange(fn: (_: any) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.bfDisabled = isDisabled; }

  // ------- Validator -----
  validate({ value }: AbstractControl): ValidationErrors {
    const isControlEmpty = value === undefined || value === null || value === '';
    return this.bfRequired && isControlEmpty ? { required: true } : null;
  }
}
