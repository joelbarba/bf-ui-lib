import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Options} from 'ng5-slider';

interface BfSliderOption {
  start: number;
  end: number;
  step?: number;
  showTicks?: boolean;
  showTicksValues?: boolean;
  tickStep?: number;
  tickArray?: Array<number>;
  tickValueStep?: number;
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

  public sliderOptions: Options = {
    animate: false,
    floor: null,
    ceil: null,
    disabled: false,
    step: 1,
    showTicks: false,
    showTicksValues: false,
    tickStep: null,
    tickValueStep: 1,
    ticksArray: null
  };

  @Input() ngModel: number;
  @Input() bfOptions: BfSliderOption;

  @Input() bfDisabled = false;

  @Input() bfLabel: string;
  @Input() bfLabelTooltip: string;
  @Input() bfLabelTooltipPos = 'top';
  @Input() bfCustomSliderLabel: any;
  // TODO this must be in the bf-range-slider
  // @Input() bfShowOuterSection = false;

  constructor() { }

  ngOnInit() {
    this.optionsRebuild();
  }

  ngOnChanges(changes): void {
    if (changes.bfDisabled) {
      this.bfDisabled = changes.bfDisabled.currentValue;
      this.optionsRebuild();
    }
    if (changes.bfCustomSliderLabel) {
      this.bfCustomSliderLabel = changes.bfCustomSliderLabel.currentValue;
      this.optionsRebuild();
    }
  }

  onChange() {
    this.propagateModelUp(this.ngModel);
  }

  // ------- ControlValueAccessor -----
  writeValue(value) {
    this.ngModel = value || this.bfOptions.start;
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
    if (!!this.bfCustomSliderLabel) { newOption.translate = this.bfCustomSliderLabel; }

    if (this.bfOptions.step) { newOption.step = this.bfOptions.step; }
    if (this.bfOptions.showTicks) { newOption.showTicks = this.bfOptions.showTicks; }
    if (this.bfOptions.showTicksValues) { newOption.showTicksValues = this.bfOptions.showTicks; }
    if (this.bfOptions.tickStep) { newOption.tickStep = this.bfOptions.tickStep; }
    if (this.bfOptions.tickArray) { newOption.ticksArray = this.bfOptions.tickArray; }
    if (this.bfOptions.tickValueStep) { newOption.tickValueStep = this.bfOptions.tickValueStep; }

    this.sliderOptions = newOption;
  }

}
