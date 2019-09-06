import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'bf-switch',
  templateUrl: './bf-switch.component.html',
  styleUrls: ['./bf-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfSwitchComponent),
    },
  ]
})
export class BfSwitchComponent implements ControlValueAccessor, OnInit {

  // @Output() bfClick = new EventEmitter<any>();
  @Input() bfDisabled = false;
  @Input() bfOnText = 'ON';
  @Input() bfOffText = 'OFF';

  @Input() bfLabel: string;
  @Input() bfLabelPos: 'top' | 'left' = 'top';
  @Input() bfTooltip: string;
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody: boolean;

  public bfModel = false; // Internal holding of the ngModel

  constructor() { }

  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    if (value !== undefined) {
      this.bfModel = !!value;
    }
  }
  public propagateModelUp = (_: boolean) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ----------------


  ngOnInit() { }

  public onSwitch = () => {
    if (!this.bfDisabled) {
      this.bfModel = !this.bfModel;
      this.propagateModelUp(this.bfModel);
    }
  }

}
