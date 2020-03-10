import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BfSliderComponent} from '../bf-slider/bf-slider.component';
import {Options} from 'ng5-slider';

interface BfRangeSliderValues {
  min: number;
  max: number;
}

@Component({
  selector: 'bf-range-slider',
  templateUrl: './bf-range-slider.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfRangeSliderComponent)
    }
  ]
})
export class BfRangeSliderComponent extends BfSliderComponent implements ControlValueAccessor, OnInit, OnChanges {


  public minValue: number;
  public highValue: number;

  /*public sliderOptions: Options = {
    animate: false,
    floor: null,
    ceil: null,
    disabled: false,
    step: 1,
    showSelectionBar: false,
    showSelectionBarEnd: false,
    showTicks: false,
    showTicksValues: false,
    tickStep: null,
    tickValueStep: 1,
    ticksArray: null,
    maxLimit: null,
    minLimit: null,
    maxRange: null,
    minRange: null
  };*/

  @Input() ngModel: BfRangeSliderValues;
  /*@Input() bfOptions: BfSliderOption;

  @Input() bfDisabled = false;

  @Input() bfLabel: string;
  @Input() bfLabelTooltip: string;
  @Input() bfLabelTooltipPos = 'top';
  @Input() bfCustomSliderLabel: any;*/
  @Input() bfShowOuterSection = false;

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('Range Slider on init', this.ngModel);
    this.minValue = this.ngModel.min;
    this.highValue = this.ngModel.max;
    this.rangeOptionsRebuild();
  }

  ngOnChanges(changes): void {
    console.log('On Change', this.ngModel);
    if (changes.bfDisabled) {
      this.bfDisabled = changes.bfDisabled.currentValue;
      this.rangeOptionsRebuild();
    }
    if (changes.bfCustomSliderLabel) {
      this.bfCustomSliderLabel = changes.bfCustomSliderLabel.currentValue;
      this.rangeOptionsRebuild();
    }
  }

  valuesOnChange() {
    this.ngModel.min = this.minValue;
    this.ngModel.max = this.highValue;
    this.propagateModelUp(this.ngModel);
  }

  // ------- ControlValueAccessor -----
  writeValue(value) {
    this.ngModel = value;
  }

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // It's necessary to rebuild the Slider Option due a recommendation from the external component
  // more info: https://angular-slider.github.io/ng5-slider/docs/globals.html
  rangeOptionsRebuild() {
    this.optionsRebuild();
  }
  /*optionsRebuild() {
    const newOption: Options = Object.assign({}, this.sliderOptions);
    newOption.floor = this.bfOptions.start;
    newOption.ceil = this.bfOptions.end;
    newOption.disabled = this.bfDisabled;
    if (!!this.bfCustomSliderLabel) { newOption.translate = this.bfCustomSliderLabel; }

    this.sliderOptions = newOption;
  }*/
}
