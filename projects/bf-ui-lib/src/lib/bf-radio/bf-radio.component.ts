import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'bf-radio',
  templateUrl: './bf-radio.component.html',
  styleUrls: ['./bf-radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfRadioComponent),
    }
  ]
})
// export class BfCheckboxComponent implements OnInit {
export class BfRadioComponent implements ControlValueAccessor {
  // @Input() bfModel: boolean = false;
  // @Output() bfModelChange = new EventEmitter<boolean>();
  public bfModel: boolean = false;
  @Input() bfLabel: string = '';
  @Input() bfDisabled: boolean = false;

  constructor() { }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    if (value !== undefined) { this.bfModel = value; }
  }
  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  ngOnInit() {}

  onChange(value) {
    this.bfModel = value;
    this.propagateModelUp(value);
    // this.bfModelChange.emit(value);
  }

}
