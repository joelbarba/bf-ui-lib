import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Options} from 'ng5-slider';

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
  public sliderOptions: Options = {
    animate: false,
    floor: null,
    ceil: null,
    disabled: false
  };

  @Input() bfHighValue: number = null;
  @Input() bfOptions: BfSliderOption;

  @Input() bfRequired = false;
  @Input() bfDisabled = false;

  @Input() bfLabel: string;
  @Input() bfTooltip: string;
  @Input() bfTooltipPos = 'top';
  @Input() bfLabelPos: 'top' | 'left' = 'top';

  constructor() { }

  ngOnInit() {
    console.log('Slider Component');
    this.optionsRebuild();
  }

  ngOnChanges(changes): void {
    console.log('Slider Component ON Change', changes);
    // this.bfModel = value
    if (changes.bfDisabled) { this.bfDisabled = changes.bfDisabled.currentValue; }
    this.optionsRebuild();
  }

  onChange() {
    this.propagateModelUp(this.bfModel);
  }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    this.bfModel = value || this.bfOptions.start;
  }

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // It's necessary to rebuild the Slider Option due a recommendation from the external component
  // more info: https://angular-slider.github.io/ng5-slider/docs/globals.html
  optionsRebuild() {
    const newOption: Options = Object.assign({}, this.sliderOptions);
    newOption.floor = this.bfOptions.start;
    newOption.ceil = this.bfOptions.end;
    newOption.disabled = this.bfDisabled;
    this.sliderOptions = newOption;
  }

}
