import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable, of} from 'rxjs';
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

  constructor(
    private translate: BfUILibTransService,
  ) {}

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('bfLabel'))   { this.bfLabelTrans$   = this.translate.getLabel$(this.bfLabel); }
    if (changes.hasOwnProperty('bfTooltip')) { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }

    if (changes.hasOwnProperty('bfMinVal')) { this.bfMinVal = this.checkRangeValue(this.bfMinVal); }
    if (changes.hasOwnProperty('bfMaxVal')) { this.bfMaxVal = this.checkRangeValue(this.bfMaxVal); }

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

  // Returns a valid value after all validations (--> bfModel)
  getValidValue = (value) => {
    if (value === null || value === '') { value = 0; }
    value = Number.parseInt(value, 10);

    if (Number.isNaN(value)) { value = this.previousValue; }
    value = Math.trunc(value);

    if (this.bfMinVal !== undefined && value < this.bfMinVal) { value = this.bfMinVal; }
    if (this.bfMaxVal !== undefined && value > this.bfMaxVal) { value = this.bfMaxVal; }

    // Enable/disable the inc/dec buttons
    this.decBtnEnabled = !this.bfDisabled && (this.bfMinVal === undefined || this.bfMinVal < value);
    this.incBtnEnabled = !this.bfDisabled && (this.bfMaxVal === undefined || this.bfMaxVal > value);

    return value;
  };


  // When rolling the wheel of the mouse, increment / decrement value
  onMouseWheel(event) {
    if (this.bfDisabled) { return; }

    if (event.wheelDelta > 0) {
      this.modelChange(this.bfModel + 1);
    } else {
      this.modelChange(this.bfModel - 1);
    }
    event.preventDefault();
    event.stopPropagation();
  }


  // Changing the value internally (propagate up)
  modelChange(value) {
    const nextVal = this.getValidValue(value);
    // console.log('modelChange ', this.bfModel, ' --->', nextVal);
    if (this.previousValue !== nextVal) {
      this.previousValue = nextVal;
      this.onChange(nextVal);
    }

    // Do it on the next cycle, so the input gets updated again after ngModel change
    setTimeout(() => { this.bfModel = nextVal; });
  }

  keyPressed(evt: KeyboardEvent) {
    const target = evt.target as HTMLInputElement;
    if (target.type === 'text') {  // chromevox changes html input type from 'number' to 'text', so we have to implement arrow controls manually
      if (evt.code === 'ArrowUp' && this.incBtnEnabled)   { this.modelChange(this.bfModel + 1); }
      if (evt.code === 'ArrowDown' && this.decBtnEnabled) { this.modelChange(this.bfModel - 1); }
    }
  }

  // ------- ControlValueAccessor ----- //

  onChange: any = (_: any) => {};
  onTouch: any = () => {};
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouch = fn; }

  // When the value is changed externally (propagated down)
  writeValue(value) {
    const nextVal = this.getValidValue(value);
    // console.log('writeValue ', this.bfModel, ' --->', nextVal);
    this.previousValue = nextVal;
    if (value !== nextVal) { this.onChange(nextVal); } // If value was rectified, push it back up
    setTimeout(() => { this.bfModel = nextVal; }); // Avoid overlap with modelChange timeout
  }


}
