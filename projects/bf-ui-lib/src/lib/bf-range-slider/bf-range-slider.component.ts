import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ElementRef, NgZone, SimpleChanges, OnDestroy
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface BfRangeSliderValues {
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
export class BfRangeSliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() bfLabel: string;       // The label of the component
  @Input() bfTooltip: string;     // To add a tooltip on the label
  @Input() bfTooltipPos: 'top' | 'left' | 'right' | 'bottom' = 'top';
  @Input() bfDisabled = false;    // Whether the component is disabled
  @Input() bfStep = 1;            // Increases bfStep values when moving left/right
  @Input() bfIniValue = 0;        // Value at the start of the bar (left)
  @Input() bfEndValue = 100;      // Value at the end of the bar (right)
  @Input() bfMinValue: number;    // Min value (must be >= start). Equals bfIniValue if not defined
  @Input() bfMaxValue: number;    // Max value (must be <= end). Equals bfEndValue if not defined
  @Input() bfTabIndex1 = 0;       // Accessibility inputs to set to the pointer's [tabindex] 1
  @Input() bfTabIndex2 = 0;       // Accessibility inputs to set to the pointer's [tabindex] 2
  @Input() bfRenderFn: (value: number, tickNum?: number, pointer?: 1 | 2) => number | string; // Function to render the values on the pointer and the ticks
  @Input() bfAllowInverse = true; // Whether to allow an inverse range (pointer 2 < pointer 1)
  @Input() bfOuterRange = true;   // When inverted range, show the outer selection (true) or show the bar between the pointers (false)

  // 0 = shows no ticks on the bar at all
  // 1 = shows the first and last tick on the bar (bfIniValue / bfEndValue) (default)
  // N = splits the bar in N sections, with ticks on every end of the section
  @Input() bfTicks = 1;

  // none = shows no values at all
  // all = shows the value of every tick (default)
  // N = shows the first and last ticks values + a value every N ticks
  @Input() bfTickLabels: 'none' | 'all' | number = 'all';


  @ViewChild('bfSlider', { static: true }) bfSlider: ElementRef<HTMLElement>;
  @ViewChild('bfPointer1', { static: true }) bfPointer1: ElementRef<HTMLElement>;
  @ViewChild('bfPointer2', { static: true }) bfPointer2: ElementRef<HTMLElement>;

  ngModel: BfRangeSliderValues = { min: 0, max: 0 }; // Internal variable to hold the value accessor

  barWidth = 0;   // Width of the bar (in px). Does not count the extra 16px + 16px at every end to fit the pointer
  barPosLeft = 0; // Absolute X position (in px) where the bar begins (relative to the DOM)
  valueSize = 1;  // Bar proportion (how many pixels equals every value)
  posXSize = 1;   // Value proportion (how many values equals every pixel)
  pointerPos1 = 0; // Current position of the pointer 1
  pointerPos2 = 0; // Current position of the pointer 1
  minVal: number; // Internal reference of bfMinValue (rectified)
  maxVal: number; // Internal reference of bfMaxValue (rectified)
  resize$;        // To unobserve the resize event on destroy
  mergeLabels = false;  // When the pointers are too close, show 1 unique label instead of 2
  tabIndex1 = 0;  // Internal reference for bfTabIndex1
  tabIndex2 = 0;  // Internal reference for bfTabIndex2
  hBar1 = { left: 0, right: 0, css: '' }; // Highlight bar positions (pixels where the line begins and ends)
  hBar2 = { left: 0, right: 0, css: '' }; // In case of bfOuterRange, the second bar
  mLabel = { left: 0, right: 0, align: 'center' }; // To dynamically position a label between the 2 pointers

  // Array of ticks on the bar
  // val=value that represents
  // pos=position on the bar (in px)
  // label=whether to show the label with the value below
  // highlight=if a highlight bar, whether the tick is part of it
  ticks: Array<{ val: number; pos: number; label: boolean, highlight?: boolean }> = [];


  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.calculateBar();

    // Recalculate the sizes when the component is resized
    if ((window as any).ResizeObserver !== undefined) {
      this.resize$ = new (window as any).ResizeObserver(_ => this.zone.run(() => this.calculateBar()));
      this.resize$.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.resize$) { this.resize$.unobserve(this.elementRef.nativeElement); }
  }

  // Check the parameter is numeric, and if not turn it into a numeric value
  parseNumParam(changes: SimpleChanges, param: string, defaultVal: number) {
    if (changes.hasOwnProperty(param) && typeof this[param] !== 'number') {
      this[param] = (!isNaN(this[param]) && this[param] !== '') ? Number.parseInt(this[param] + '', 10) : defaultVal;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parseNumParam(changes, 'bfStep', 1);
    this.parseNumParam(changes, 'bfIniValue', 0);
    this.parseNumParam(changes, 'bfEndValue', 100);
    this.parseNumParam(changes, 'bfMinValue', undefined);
    this.parseNumParam(changes, 'bfMaxValue', undefined);

    // Default values
    this.minVal = this.bfMinValue ?? this.bfIniValue;
    this.maxVal = this.bfMaxValue ?? this.bfEndValue;

    // Make sure that min/max value is always between start/end value
    if (this.minVal < this.bfIniValue) { this.minVal = this.bfIniValue; }
    if (this.maxVal > this.bfEndValue) { this.maxVal = this.bfEndValue; }

    if (this.bfStep < 1) { this.bfStep = 1; } // Can't be lower

    // Do not accept bfRenderFn different than a function
    if (changes.hasOwnProperty('bfRenderFn') && !!this.bfRenderFn && typeof this.bfRenderFn !== 'function') {
      console.error('<bf-slider> - [bfRenderFn] : must be a function');
      this.bfRenderFn = undefined;
    }

    const hasParam = (...names) => names.some(name => changes.hasOwnProperty(name)); // shortcut

    // If any of these changes, rebuild the ticks[] array
    if (hasParam('bfTicks', 'bfTickLabels', 'bfIniValue', 'bfEndValue')) { setTimeout(() => this.setTicksArray()); }

    // If any of these changes, recalculate ngModel limits and update the bar
    if (hasParam('bfMinValue', 'bfMaxValue', 'bfStep', 'bfAllowInverse', 'bfOuterRange')) { setTimeout(() => this.setValue()); }

    if (hasParam('bfTabIndex1')) { this.tabIndex1 = this.bfTabIndex1; }
    if (hasParam('bfTabIndex2')) { this.tabIndex2 = this.bfTabIndex2; }
  }


  // Generates the ticks[] array to present them on the html
  setTicksArray() {
    this.ticks = [];
    if (this.bfTicks > 0) {
      this.ticks = Array.from(Array(this.bfTicks + 1).keys()).map(ind => {
        const val = this.bfIniValue + Math.round(100 * ind * (this.bfEndValue - this.bfIniValue) / this.bfTicks) / 100;
        return { val, pos: 0, label: false };
      });

      if (!this.bfTickLabels) {
        this.ticks[0].label = true;
        this.ticks[this.ticks.length - 1].label = true;

      } else if (this.bfTickLabels === 'all') {
        this.ticks.forEach(tick => tick.label = true);

      } else if (typeof this.bfTickLabels === 'number') { // shows the first and last ticks values + a value every N ticks
        this.ticks.filter((tick, ind) => ind % (this.bfTickLabels as number) === 0).forEach(tick => tick.label = true);
        this.ticks[this.ticks.length - 1].label = true;
      }
    }
    this.calculateBar();
  }

  // Calculates values depending on the size of the component
  calculateBar() {
    const rect = this.bfSlider.nativeElement.getBoundingClientRect();
    this.barPosLeft = Math.round(rect.x) + 16;
    this.barWidth = Math.round(rect.width) - 32;
    this.valueSize = this.barWidth / (this.bfEndValue - this.bfIniValue);
    this.posXSize = (this.bfEndValue - this.bfIniValue) / this.barWidth;
    this.setValue();
  }

  // Updates the html according to the state of the component
  updateBar() {
    this.pointerPos1 = Math.round((this.ngModel.min - this.bfIniValue) * this.valueSize);
    this.pointerPos2 = Math.round((this.ngModel.max - this.bfIniValue) * this.valueSize);

    // If using tab index, invert the order when the range is inverted
    if (this.bfTabIndex1 > 0 && this.bfTabIndex2 > 0) {
      if (this.pointerPos1 <= this.pointerPos2) {
        this.tabIndex1 = this.bfTabIndex1; this.tabIndex2 = this.bfTabIndex2;
      } else {
        this.tabIndex2 = this.bfTabIndex1; this.tabIndex1 = this.bfTabIndex2;
      }
    }

    // Calculate the highlight bar start / end positions
    if (this.pointerPos1 <= this.pointerPos2) {
      this.hBar1.left = this.pointerPos1 + 16;
      this.hBar1.right = this.barWidth + 16 - this.pointerPos2;
      this.hBar2.css = 'hide';

    } else if (!this.bfOuterRange) { // Inverse Range
      this.hBar1.left = this.pointerPos2 + 16;
      this.hBar1.right = this.barWidth + 16 - this.pointerPos1;
      this.hBar2.css = 'hide';

    } else { // Show 2 bars on the outer range
      this.hBar1.left = 0;
      this.hBar1.right = this.barWidth + 16 - this.pointerPos2;
      this.hBar2.css = '';
      this.hBar2.left = this.pointerPos1 + 16;
      this.hBar2.right = 0;
    }

    // If the 2 pointers are too close (100px), show only one label in between instead of 2
    this.mergeLabels = Math.abs(this.pointerPos1 - this.pointerPos2) < 100;
    if (this.pointerPos1 <= this.pointerPos2) {
      this.mLabel = { ...this.hBar1, align: 'center' };
    } else {
      this.mLabel = { left: this.pointerPos2, right: this.barWidth - this.pointerPos1, align: 'center' };
    }
    if (this.mLabel.left < 50) { this.mLabel = { left: 100, right: 100, align: 'left' }; }
    if (this.mLabel.right < 50) { this.mLabel = { left: 100, right: 100, align: 'right' }; }

    // Calculate which ticks position, and if they need to be highlighted (part of a bar)
    const { min, max } = this.ngModel;
    this.ticks.forEach(tick => {
      tick.pos = 11 + Math.round((tick.val - this.bfIniValue) * this.valueSize); // 16-(10/2) = 11
      tick.highlight = false;
      if (min <= max)              { tick.highlight = tick.val >= min && tick.val <= max; } // Normal
      else if (!this.bfOuterRange) { tick.highlight = tick.val >= max && tick.val <= min; } // Inverse
      else                         { tick.highlight = tick.val <= max || tick.val >= min; } // 2 Bars
    });
  }

  renderTickLabel(value: number, tickNum?: number): number | string {
    return this.bfRenderFn ? this.bfRenderFn(value, tickNum) : value;
  }

  renderPointerLabel(value: number, pointer?: 1 | 2): number | string {
    return this.bfRenderFn ? this.bfRenderFn(value, null, pointer) : value;
  }

  renderMergedLabel(): number | string {
    const label1 = this.renderPointerLabel(this.ngModel.min, 1);
    const label2 = this.renderPointerLabel(this.ngModel.max, 2);
    return label1 + ' - ' + label2;
  }


  // NG_VALUE_ACCESSOR --> Triggered every time external [ngModel] changes (propagate down)
  // It is also triggered twice when the component is initialized
  //   1 - Before ngAfterViewInit (value always null)
  //   2 - After ngAfterViewInit (initial ngModel value)
  writeValue(value) {
    this.setValue(value ?? { min: this.bfIniValue, max: this.bfEndValue });
  }

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  setValue(value = this.ngModel) {
    const lastValue = { ...this.ngModel }; // This is to know which of the two values is changing
    this.ngModel = value || { min: this.bfIniValue, max: this.bfEndValue };

    // Adjust the value to the step
    if (this.bfStep > 1) {
      const diffMin = this.ngModel.min % this.bfStep;
      const diffMax = this.ngModel.max % this.bfStep;
      this.ngModel.min -= diffMin;
      this.ngModel.max -= diffMax;
      if (diffMin > this.bfStep / 2) { this.ngModel.min += this.bfStep; }
      if (diffMax > this.bfStep / 2) { this.ngModel.max += this.bfStep; }
    }

    // Limit the range min/max
    if (this.ngModel.min < this.minVal) { this.ngModel.min = this.minVal; }
    if (this.ngModel.min > this.maxVal) { this.ngModel.min = this.maxVal; }
    if (this.ngModel.max < this.minVal) { this.ngModel.max = this.minVal; }
    if (this.ngModel.max > this.maxVal) { this.ngModel.max = this.maxVal; }

    // Adjust 0 range moving the other pointer when no inverse range is allowed
    if (!this.bfAllowInverse && this.ngModel.max < this.ngModel.min) {
      if (lastValue.min === this.ngModel.min) {
        this.ngModel.max = this.ngModel.min;
      } else {
        this.ngModel.min = this.ngModel.max;
      }
    }

    this.updateBar();
    if (lastValue.min !== this.ngModel.min || lastValue.max !== this.ngModel.max) {
      this.propagateModelUp(this.ngModel);
    }
  }

  setOneValue(value: number, pointer: 1 | 2) {
    let { min, max } = this.ngModel;
    if (pointer === 1) { min = value; }
    if (pointer === 2) { max = value; }
    this.setValue({ min, max });
  }

  incValue(increment = 0, pointer: 1 | 2) {
    const value = pointer === 1 ? this.ngModel.min : this.ngModel.max;
    this.setOneValue(value + increment, pointer);
  }

  checkFocus() {
    if (this.bfDisabled) { this.bfPointer1.nativeElement.blur(); }
  }

  onKeyDown(event: KeyboardEvent, pointer: 1 | 2) {
    if (event.key === 'ArrowLeft')  { event.preventDefault(); this.incValue(-this.bfStep, pointer); }
    if (event.key === 'ArrowRight') { event.preventDefault(); this.incValue( this.bfStep, pointer); }
    if (event.key === 'ArrowDown')  { event.preventDefault(); this.incValue(-this.bfStep, pointer); }
    if (event.key === 'ArrowUp')    { event.preventDefault(); this.incValue( this.bfStep, pointer); }
    if (event.key === 'PageDown')   { event.preventDefault(); this.incValue(-this.bfStep * 10, pointer); }
    if (event.key === 'PageUp')     { event.preventDefault(); this.incValue( this.bfStep * 10, pointer); }
    if (event.key === 'Home')       { event.preventDefault(); this.setOneValue(this.minVal, pointer); }
    if (event.key === 'End')        { event.preventDefault(); this.setOneValue(this.maxVal, pointer); }
  }

  onBarClick(event: MouseEvent) {

    // Calculate which pointer is closer to the click
    const clickPos = event.clientX - this.barPosLeft;
    const dist1 = Math.abs(clickPos - this.pointerPos1);
    const dist2 = Math.abs(clickPos - this.pointerPos2);
    const pointer = dist1 < dist2 ? 1 : 2;

    // Move the pointer to the position of the click
    this.onMouseMove(event.clientX, pointer);
    this.onMouseDown(event, pointer);  // In case a drag starts on the bar
    setTimeout(() => {
      if (pointer === 1) { this.bfPointer1.nativeElement.focus(); }
      if (pointer === 2) { this.bfPointer2.nativeElement.focus(); }
    });
  }

  onMouseDown(event: MouseEvent, pointer: 1 | 2) {
    const onMoveCallback = (e: MouseEvent): void => { e.preventDefault(); this.onMouseMove(e.clientX, pointer); };
    const onEndCallback = (e: MouseEvent): void => {
      e.preventDefault();
      document.removeEventListener('mousemove', onMoveCallback,  { capture: false });
      document.removeEventListener('mouseup',  onEndCallback, { capture: false });
    };

    // Bind move and end events
    document.addEventListener('mousemove', onMoveCallback,  { passive: false, capture: false });
    document.addEventListener('mouseup',  onEndCallback, { passive: false, capture: false });
  }

  onTouchStart(event: TouchEvent, pointer: 1 | 2) {
    const onTouchCallback = (e: TouchEvent): void => {
      e.preventDefault();
      if (e.touches && e.touches[0]?.clientX) {
        this.onMouseMove(e.touches[0].clientX, pointer);
      }
    };
    const onEndCallback = (e: TouchEvent): void => {
      e.preventDefault();
      document.removeEventListener('touchend', onEndCallback, { capture: false });
      document.removeEventListener('touchmove', onTouchCallback, { capture: false });
    };

    // Bind move and end events
    document.addEventListener('touchmove', onTouchCallback, { passive: false, capture: false });
    document.addEventListener('touchend', onEndCallback, { passive: false, capture: false });
  }

  onMouseMove(clientX: number, pointer: 1 | 2) {
    let xPos = clientX - this.barPosLeft;
    if (xPos > this.barWidth) { xPos = this.barWidth; }
    if (xPos < 0) { xPos = 0; }
    this.setOneValue(this.bfIniValue + Math.round(xPos * this.posXSize), pointer);
  }


}
