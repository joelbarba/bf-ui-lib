import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'bf-quantity-input',
  templateUrl: './bf-quantity-input.component.html',
  styleUrls: ['./bf-quantity-input.component.scss'],
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
  @Input() bfMinVal: number;
  @Input() bfMaxVal: number;
  @Input() bfDisabled: boolean;

  private bfModelControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.bfSizeMode = this.bfSizeMode || 'input-fit'; // default value
    this.setMinMaxValues();
    this.setModelControl();
  }

  setMinMaxValues() {
    this.bfMinVal = (typeof this.bfMinVal === 'string' ? parseInt(this.bfMinVal, 10) : this.bfMinVal) || 1;
    this.bfMaxVal = (typeof this.bfMaxVal === 'string' ? parseInt(this.bfMaxVal, 10) : this.bfMaxVal) || 100;
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

  checkValidationsInModel(value) {
    value = Number(value);
    // Reset to min or max if overflow
    if (value < this.bfMinVal || !value) {
      value = this.bfMinVal;
    } else if (value > this.bfMaxVal) {
      value = this.bfMaxVal;
    }

    // Avoid decimals
    value = Math.trunc(value);

    // Update if the modelValue in the FormControl is different to the real value
    if (this.bfModelControl.value !== value) {
      this.bfModelControl.setValue(value, {
        emitModelToViewChange: true
      });
    }
  }

  // ------- ControlValueAccessor ----- //

  onChange: any = (_: any) => {};
  onTouch: any = () => {};

  // this method sets the value programmatically
  writeValue(value) {
    // Validate and update the model if has bad validation
    this.checkValidationsInModel(value);

    // Propagate to the parent model
    this.onChange(this.bfModelControl.value);
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
