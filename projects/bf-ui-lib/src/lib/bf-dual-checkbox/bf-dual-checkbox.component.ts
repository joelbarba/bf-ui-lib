import {Component, OnInit, Input, forwardRef, OnChanges} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';
import {BfUILibTransService} from '../abstract-translate.service';
import {of} from 'rxjs';

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
//
export class BfDualCheckboxComponent implements ControlValueAccessor, OnInit, OnChanges {
  public checkboxes = {
    yes: true,
    no: true
  };
  @Input() bfLabel = '';
  @Input() bfDisabled = false;
  @Input() className = false;

  public bfLabelText$ = of('');     // Translated text for the label

  constructor(private translate: BfUILibTransService) { }

  ngOnInit() {}

  ngOnChanges(change) {
    if (change.hasOwnProperty('bfLabel'))   { this.bfLabelText$ = this.translate.getLabel$(this.bfLabel);  }
  }

  // ------- ControlValueAccessor -----
  writeValue() {
    this.checkboxes = {
      yes: true,
      no: true,
    };
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
