import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'bf-quantity-input',
  templateUrl: './bf-quantity-input.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BfQuantityInputComponent)
    },
  ]
})
export class BfQuantityInputComponent implements OnInit, ControlValueAccessor {
  @Input() bfMinVal = 1;
  @Input() bfMaxVal = 100;
  @Input() bfDisabled: boolean;

  public bfModelControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.setMinMaxValues();
    this.setModelControl();
  }

  setMinMaxValues() {
    this.bfMinVal = (typeof this.bfMinVal === 'string' ? parseInt(this.bfMinVal, 10) : this.bfMinVal);
    this.bfMaxVal = (typeof this.bfMaxVal === 'string' ? parseInt(this.bfMaxVal, 10) : this.bfMaxVal);
    this.bfMinVal = this.bfMinVal > this.bfMaxVal ? this.bfMaxVal : this.bfMinVal;
  }

  setModelControl() {
    this.bfModelControl = new FormControl([
      Validators.required
    ]);
    this.bfModelControl[!!this.bfDisabled ? 'disable' : 'enable']();
  }

  increaseQuantity() {
    const bfModel = this.bfModelControl.value;
    if (!this.bfDisabled && (this.bfMaxVal === undefined || bfModel < this.bfMaxVal)) {
      this.writeValue(bfModel + 1);
    }
  }

  decreaseQuantity() {
    const bfModel = this.bfModelControl.value;
    if (!this.bfDisabled && (this.bfMinVal === undefined || bfModel > this.bfMinVal)) {
      this.writeValue(bfModel - 1);
    }
  }

  // checkValidationsInModel(value) {
  //   console.log('checkValidationsInModel', value, this.bfModelControl.value);
  // }

  // ------- ControlValueAccessor ----- //

  onChange: any = (_: any) => {};
  onTouch: any = () => {};

  // this method sets the value programmatically
  writeValue(value) {
    // console.log('Propagate to the parent model', value);

    if (value === undefined || value === null) { value = this.bfMinVal; }

    value = Number(value);  // Validate and update the model if has bad validation
    value = Math.trunc(value);  // Avoid decimals

    // Reset to min or max if overflow
    if (value < this.bfMinVal) { value = this.bfMinVal;
    } else if (value > this.bfMaxVal) { value = this.bfMaxVal; }

    // Update if the modelValue in the FormControl is different to the real value
    if (this.bfModelControl.value !== value) {
      // console.log('this.bfModelControl.setValue()', value, this.bfModelControl.value);
      this.bfModelControl.setValue(value, { emitModelToViewChange: true });

      this.onChange(value); // Propagate to the parent model
    }
  }

  // Upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  // Upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
