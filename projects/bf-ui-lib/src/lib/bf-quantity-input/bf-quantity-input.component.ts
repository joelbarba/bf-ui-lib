import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {BfUILibTransService} from '../abstract-translate.service';

@Component({
  selector: 'bf-quantity-input',
  templateUrl: './bf-quantity-input.component.html',
  styleUrls: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => BfQuantityInputComponent)
  }]
})
export class BfQuantityInputComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() bfMinVal;
  @Input() bfMaxVal;
  @Input() bfDisabled = false;
  @Input() bfLabel = '';
  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;

  public bfModel = 0; // internal value
  public previousValue = 0; // keep last value to rollback when invalid
  public decBtnEnabled = true;
  public incBtnEnabled = true;

  public bfLabelTrans$: Observable<string> = of('');        // Translated text for the label
  public bfTooltipTrans$: Observable<string> = of('');      // Translated text for the tooltip
  public bfErrorTrans$: Subject<string> = new Subject();

  constructor(
    private translate: BfUILibTransService,
  ) {}

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('bfLabel'))   { this.bfLabelTrans$   = this.translate.getLabel$(this.bfLabel); }
    if (changes.hasOwnProperty('bfTooltip')) { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }

    if (changes.hasOwnProperty('bfMinVal')) {
      this.bfMinVal = this.checkRangeValue(this.bfMinVal);
      this.validateValue(this.bfModel);
    }

    if (changes.hasOwnProperty('bfMaxVal')) {
      this.bfMaxVal = this.checkRangeValue(this.bfMaxVal);
      this.validateValue(this.bfModel);
    }

    if (this.bfMinVal !== undefined && this.bfMaxVal !== undefined && this.bfMaxVal < this.bfMinVal) {
      console.error('bfMinVal > bfMaxVal (', this.bfMinVal, '>', this.bfMaxVal, ')');
      this.bfMaxVal = this.bfMinVal;
    }

    this.modelChange(this.bfModel); // Update the model according to the new validations
  }

  ngOnInit() {}

  // Validate input value to a valid number or undefined (--> bfMinVal / bfMaxVal)
  checkRangeValue(value) {
    if (value === null) { value = undefined; }
    if (typeof value === 'string') { value = parseInt(value, 10); }
    if (Number.isNaN(value)) { value = undefined; }
    return value;
  }

  // When rolling the wheel of the mouse, increment / decrement value
  onMouseWheel(event) {
    if (this.bfDisabled) { return; }

    if (event.wheelDelta > 0) {
      const nextValue = this.bfModel + 1;
      this.modelChange(nextValue);
      this.validateValue(nextValue);
    } else {
      const nextValue = this.bfModel - 1;
      this.modelChange(nextValue);
      this.validateValue(nextValue);
    }
    event.preventDefault();
    event.stopPropagation();
  }


  // Changing the value internally (propagate up)
  modelChange(value) {
    const nextVal = value;
    // console.log('modelChange ', this.bfModel, ' --->', nextVal);
    this.validateValue(value);
    if (this.previousValue !== nextVal) {
      this.previousValue = nextVal;
      this.onChange(nextVal);
    }

    // Do it on the next cycle, so the input gets updated again after ngModel change
    setTimeout(() => { this.bfModel = nextVal; });
  }

  // ------- ControlValueAccessor ----- //

  onChange: any = (_: any) => {};
  onTouch: any = () => {};
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouch = fn; }

  // When the value is changed externally (propagated down)
  writeValue(value) {
    const nextVal = value;
    // console.log('writeValue ', this.bfModel, ' --->', nextVal);
    this.previousValue = nextVal;
    if (value !== nextVal) { this.onChange(nextVal); } // If value was rectified, push it back up
    setTimeout(() => { this.bfModel = nextVal; }); // Avoid overlap with modelChange timeout
  }

  decrementValue(currentValue: number): void {
    if (this.decBtnEnabled) {
      const nextValue = currentValue - 1;
      this.modelChange(nextValue);
      this.validateValue(nextValue);
    }
  }

  incrementValue(currentValue: number): void {
    if (this.incBtnEnabled) {
      const nextValue = currentValue + 1;
      this.modelChange(nextValue);
      this.validateValue(nextValue);
    }
  }

  validateValue(currentValue: number): void {
    const error = this.getValidationError(currentValue, this.bfMinVal, this.bfMaxVal);

    const translationValue = error !== null
      ? this.translate.doTranslate(error.label, error.params)
      : '';

    this.bfErrorTrans$.next(translationValue);
  }

  getValidationError(currentValue: number, minValue: number, maxValue: number): { label: string, params: { [key: string]: number } } {
    if (currentValue < minValue) {
      return { label: 'components.bf_quantity_input.min_value.error', params: { min: minValue } };
    }

    if (currentValue > maxValue) {
      return { label: 'components.bf_quantity_input.max_value.error', params: { max: maxValue } };
    }

    return null;
  }
}
