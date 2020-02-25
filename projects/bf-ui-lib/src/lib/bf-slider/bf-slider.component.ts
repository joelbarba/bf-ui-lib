import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

interface BfSliderOption {
  start: number;
  end: number;
}

@Component({
  selector: 'bf-slider',
  templateUrl: './bf-slider.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfSliderComponent)
    }
  ]
})
export class BfSliderComponent implements ControlValueAccessor, OnInit, OnChanges {

  public bfModel: number;
  public sliderOptions: Options;

  @Input() bfHighValue: number;
  @Input() bfOptions: BfSliderOption;

  @Input() bfRequired = false;
  @Input() bfDisabled = false;

  @Input() bfLabel: string;
  @Input() bfTooltip: string;
  @Input() bfTooltipPos = 'top';

  constructor() { }

  ngOnInit() {
    console.log('Slider Component');
    this.sliderOptions = {
      floor: this.bfOptions.start,
      ceil: this.bfOptions.end
    };
  }

  ngOnChanges(changes): void {
    console.log('Slider Component ON Change', changes);
    // this.bfModel = value
  }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    this.bfModel = value || this.bfOptions.start;
  }

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

}
