import {Component, OnInit, Input, forwardRef, OnChanges} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';

@Component({
  selector: 'bf-dual-checkbox',
  templateUrl: './bf-dual-checkbox.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfDualCheckboxComponent),
    }
  ]
})

export class BfDualCheckboxComponent implements ControlValueAccessor, OnInit, OnChanges {
  public checkboxes = {
    yes: true,
    no: true
  };
  @Input() bfLabel = '';
  @Input() bfLabelOptionOne = 'view.common.yes';
  @Input() bfLabelOptionTwo = 'view.common.no';
  @Input() bfDisabled = false;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {}

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    if (!!value) {
      this.checkboxes = { yes: true, no: false };
    }
    if (value === false) {
      this.checkboxes = { yes: false, no: true };
    }
  }

  public propagateModelUp = (value: boolean) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  onChange(field: 'yes' | 'no') {
      if (this.checkboxes.yes === false && this.checkboxes.no === false) {
        this.checkboxes = field === 'yes' ? {yes: this.checkboxes.yes, no: !this.checkboxes.no} : {yes: !this.checkboxes.yes, no: this.checkboxes.no};
      }
      this.propagateModelUp(this.checkboxes.yes === this.checkboxes.no ? undefined : this.checkboxes.yes);
  }
}
