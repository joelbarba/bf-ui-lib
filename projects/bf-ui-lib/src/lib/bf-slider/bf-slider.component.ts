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

  public bfModel: number;
  public highValue: number = null;
  public isHighValue = false;

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
    ticksArray: null,
    showOuterSelectionBars: false
  };

  @Input() bfOptions: BfSliderOption;

  @Input() bfRequired = false;
  @Input() bfDisabled = false;

  @Input() bfLabel: string;
  @Input() bfTooltip: string;
  @Input() bfTooltipPos = 'top';
  @Input() bfTranslate: any;
  @Input() bfShowOuterSection = false;

  @Input()
  get bfHighValue() {
    return this.highValue;
  }

  @Output() bfHighValueChange = new EventEmitter<number>();
  // tslint:disable-next-line:adjacent-overload-signatures
  set bfHighValue(value) {
    this.highValue = value;
    this.bfHighValueChange.emit(this.highValue);
  }

  constructor() { }

  ngOnInit() {
    this.isHighValue = this.highValue !== null;
    this.optionsRebuild();
  }

  ngOnChanges(changes): void {
    if (changes.bfDisabled) { this.bfDisabled = changes.bfDisabled.currentValue; this.optionsRebuild(); }
    if (changes.bfTranslate) { this.bfTranslate = changes.bfTranslate.currentValue; this.optionsRebuild(); }
    if (changes.bfShowOuterSection && this.isHighValue) { this.bfShowOuterSection = changes.bfShowOuterSection.currentValue; this.optionsRebuild(); }
  }

  onChange() {
    this.propagateModelUp(this.bfModel);
    this.bfHighValue = this.highValue;
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
    if (!!this.bfTranslate) { newOption.translate = this.bfTranslate; }
    if (this.isHighValue) { newOption.showOuterSelectionBars = this.bfShowOuterSection; }

    if (this.bfOptions.step) { newOption.step = this.bfOptions.step; }
    if (this.bfOptions.showTicks) { newOption.showTicks = this.bfOptions.showTicks; }
    if (this.bfOptions.showTicksValues) { newOption.showTicksValues = this.bfOptions.showTicks; }
    if (this.bfOptions.tickStep) { newOption.tickStep = this.bfOptions.tickStep; }
    if (this.bfOptions.tickArray) { newOption.ticksArray = this.bfOptions.tickArray; }
    if (this.bfOptions.tickValueStep) { newOption.tickValueStep = this.bfOptions.tickValueStep; }

    this.sliderOptions = newOption;
  }

}
