import { Component, DoCheck, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
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
export class BfRangeSliderComponent extends BfSliderComponent implements ControlValueAccessor, OnInit, OnChanges, DoCheck {


  public minValue: number;
  public highValue: number;

  @Input() ngModel: BfRangeSliderValues;
  @Input() bfShowOuterSection = false;

  constructor() {
    super();
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.minValue = this.ngModel.min;
    this.highValue = this.ngModel.max;
    this.rangeOptionsRebuild();
  }

  // Deep check the ngModel object to update the values
  ngDoCheck() {
    const { min, max } = this.ngModel;
    if (min !== this.minValue) {
      this.minValue = Math.max(this.ngModel.min, this.bfOptions.minRange ? this.bfOptions.minRange : this.ngModel.min);
    }
    if (max !== this.highValue) {
      this.highValue = Math.min(this.ngModel.max, this.bfOptions.maxRange ? this.bfOptions.maxRange : this.ngModel.max);
    }
  }

  ngOnChanges(changes): void {
    if (changes.bfDisabled) {
      this.bfDisabled = changes.bfDisabled.currentValue;
      this.rangeOptionsRebuild();
    }
    if (changes.bfCustomSliderLabel) {
      this.bfCustomSliderLabel = changes.bfCustomSliderLabel.currentValue;
      this.rangeOptionsRebuild();
    }
    if  (changes.bfShowOuterSection) {
      this.bfShowOuterSection = changes.bfShowOuterSection.currentValue;
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
    const newOptions: Options = Object.assign({}, this.sliderOptions);
    newOptions.showOuterSelectionBars = this.bfShowOuterSection;

    if (this.bfOptions.maxRange) { newOptions.maxRange = this.bfOptions.maxRange; }
    if (this.bfOptions.minRange) { newOptions.minRange = this.bfOptions.minRange; }

    this.sliderOptions = newOptions;

    this.optionsRebuild();
  }
}
