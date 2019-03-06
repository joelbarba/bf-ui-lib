import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'bf-quantity',
  templateUrl: './bf-quantity.component.html',
  styleUrls: ['./bf-quantity.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BfQuantityComponent),
      multi: true
    },
    { // Custom validator
      provide: NG_VALIDATORS,
      useValue: (c: FormControl) => {
        let err = { rangeError: { given: c.value, max: 10, min: 0 } };
        return (c.value > 5 || c.value < 10) ? err : null;
      },
      multi: true
    }
  ]
})
export class BfQuantityComponent implements ControlValueAccessor {
  // @Input() bfModel;
  // @Output() bfModelChange = new EventEmitter<boolean>();
  // @Input() counterValue = 0;
  public bfModel;

  constructor() { }
  ngOnInit() { }

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    console.log('writeValue', value);
    if (value !== undefined) { this.bfModel = value; }
  }

  public propagateChange = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  public propagateStatusChange = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)

  public registerOnChange(fn) {
    console.log('registerOnChange');
    this.propagateChange = fn;
  }
  public registerOnTouched(fn) {
    console.log('registerOnTouched');
    this.propagateStatusChange = fn
  }

  increment() {
    this.bfModel++;
    this.propagateChange(this.bfModel);
  }

  decrement() {
    this.bfModel--;
    this.propagateChange(this.bfModel);
  }
}
