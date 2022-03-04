import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input, NgZone,
  OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


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
export class BfSliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() bfLabel: string;       // The label of the component
  @Input() bfTooltip: string;     // To add a tooltip on the label
  @Input() bfTooltipPos: 'top' | 'left' | 'right' | 'bottom' = 'top';
  @Input() bfDisabled = false;    // Whether the component is disabled
  @Input() bfStep = 1;            // Increases bfStep values when moving left/right
  @Input() bfIniValue = 0;        // Value at the start of the bar (left)
  @Input() bfEndValue = 100;      // Value at the end of the bar (right)
  @Input() bfMinValue: number;    // Min value (must be >= start). Equals bfIniValue if not defined
  @Input() bfMaxValue: number;    // Max value (must be <= end). Equals bfEndValue if not defined
  @Input() bfTabIndex = 0;        // Accessibility inputs to set to the pointer's [tabindex]
  @Input() bfRenderFn: (value: number, tickNum?: number) => number | string; // Function to render the values on the pointer and the ticks
  @Input() bfHighlightBar: 'left' | 'right' = 'left'; // If left, it draws a colored bar from the start to the pointer
                                                      // If right, it draws a colored bar from the pointer to the end
  // 0 = shows no ticks on the bar at all
  // 1 = shows the first and last tick on the bar (bfIniValue / bfEndValue) (default)
  // N = splits the bar in N sections, with ticks on every end of the section
  @Input() bfTicks = 1;

  // none = shows no values at all
  // all = shows the value of every tick (default)
  // N = shows the first and last ticks values + a value every N ticks
  @Input() bfTickLabels: 'none' | 'all' | number = 'all';

  // According to SPL-4673, this is needed for the component to work with an onPush parent
  // It mirrors the ngModel value, but it doesn't update it while mouse moving the pointer
  @Input() bfValue: number;
  @Output() bfValueChange: EventEmitter<any> = new EventEmitter();


  @ViewChild('bfSlider', { static: true }) bfSlider: ElementRef<HTMLElement>;
  @ViewChild('bfPointer', { static: true }) bfPointer: ElementRef<HTMLElement>;

  ngModel: number; // Internal variable to hold the value accessor

  barWidth = 0;   // Width of the bar (in px). Does not count the extra 16px + 16px at every end to fit the pointer
  barPosLeft = 0; // Absolute X position (in px) where the bar begins (relative to the DOM)
  valueSize = 1;  // Bar proportion (how many pixels equals every value)
  posXSize = 1;   // Value proportion (how many values equals every pixel)
  pointerPos = 0; // Current position of the pointer
  minVal: number; // Internal reference of bfMinValue (rectified)
  maxVal: number; // Internal reference of bfMaxValue (rectified)
  resize$;        // To unobserve the resize event on destroy
  hBar = { left: 0, right: 0 }; // Highlight bar positions (pixels where the line begins and ends)

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
    if (hasParam('bfMinValue', 'bfMaxValue', 'bfStep', 'bfHighlightBar')) { setTimeout(() => this.setValue()); }

    // Override ngModel from bfValue, when using that
    if (hasParam('bfValue') && !hasParam('ngModel')) { setTimeout(() => this.setValue(this.bfValue)); }
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
    this.pointerPos = Math.round((this.ngModel - this.bfIniValue) * this.valueSize);

    // Calculate the highlight bar start / end positions
    if (this.bfHighlightBar === 'left') { this.hBar.left = 0; this.hBar.right = this.barWidth + 16 - this.pointerPos; }
    if (this.bfHighlightBar === 'right') { this.hBar.right = 0; this.hBar.left = this.pointerPos + 16; }

    this.ticks.forEach(tick => {
      tick.pos = 11 + Math.round((tick.val - this.bfIniValue) * this.valueSize); // 16-(10/2) = 11
      tick.highlight = false;
      if (this.bfHighlightBar === 'left')  { tick.highlight = tick.val <= this.ngModel; }
      if (this.bfHighlightBar === 'right') { tick.highlight = tick.val >= this.ngModel; }
    });
  }

  renderValueFn(value: number, tickNum?: number): number | string {
    return this.bfRenderFn ? this.bfRenderFn(value, tickNum) : value;
  }


  // NG_VALUE_ACCESSOR --> Triggered every time external [ngModel] changes (propagate down)
  // It is also triggered twice when the component is initialized
  //   1 - Before ngAfterViewInit (value always null)
  //   2 - After ngAfterViewInit (initial ngModel value)
  writeValue(value) {
    this.setValue(value ?? this.bfIniValue, false);
  }

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  setValue(value = this.ngModel, pushValue = true) {
    this.ngModel = value;

    // Adjust the value to the step
    if (this.bfStep > 1) {
      const diff = this.ngModel % this.bfStep;
      this.ngModel -= diff;
      if (diff > this.bfStep / 2) { this.ngModel += this.bfStep; }
    }

    if (this.ngModel < this.minVal) { this.ngModel = this.minVal; }
    if (this.ngModel > this.maxVal) { this.ngModel = this.maxVal; }

    this.updateBar();
    this.propagateModelUp(this.ngModel);

    this.bfValue = this.ngModel;
    if (pushValue) { this.bfValueChange.next(this.bfValue); }
  }

  incValue(increment = 0) {
    this.setValue((this.ngModel || 0) + increment);
  }

  checkFocus() {
    if (this.bfDisabled) { this.bfPointer.nativeElement.blur(); }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft')  { event.preventDefault(); this.incValue(-this.bfStep); }
    if (event.key === 'ArrowRight') { event.preventDefault(); this.incValue( this.bfStep); }
    if (event.key === 'ArrowDown')  { event.preventDefault(); this.incValue(-this.bfStep); }
    if (event.key === 'ArrowUp')    { event.preventDefault(); this.incValue( this.bfStep); }
    if (event.key === 'PageDown')   { event.preventDefault(); this.incValue(-this.bfStep * 10); }
    if (event.key === 'PageUp')     { event.preventDefault(); this.incValue( this.bfStep * 10); }
    if (event.key === 'Home') { event.preventDefault(); this.setValue(this.minVal); }
    if (event.key === 'End')  { event.preventDefault(); this.setValue(this.maxVal); }
  }

  onBarClick(event: MouseEvent) {
    this.onMouseMove(event.clientX);
    this.onMouseDown(event);  // In case a drag starts on the bar
    setTimeout(() => this.bfPointer.nativeElement.focus());
  }


  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    const onMoveCallback = (e: MouseEvent): void => { e.preventDefault(); this.onMouseMove(e.clientX); };
    const onEndCallback = (e: MouseEvent): void => {
      e.preventDefault();
      this.bfValueChange.next(this.bfValue);
      document.removeEventListener('mousemove', onMoveCallback,  { capture: false });
      document.removeEventListener('mouseup',  onEndCallback, { capture: false });
    };

    // Bind move and end events
    document.addEventListener('mousemove', onMoveCallback,  { passive: false, capture: false });
    document.addEventListener('mouseup',  onEndCallback, { passive: false, capture: false });
  }

  onTouchStart(event: TouchEvent) {
    const onTouchCallback = (e: TouchEvent): void => { e.preventDefault(); this.onTouchMove(e); };
    const onEndCallback = (e: TouchEvent): void => {
      e.preventDefault();
      this.bfValueChange.next(this.bfValue);
      document.removeEventListener('touchend', onEndCallback, { capture: false });
      document.removeEventListener('touchmove', onTouchCallback, { capture: false });
    };

    // Bind move and end events
    document.addEventListener('touchmove', onTouchCallback, { passive: false, capture: false });
    document.addEventListener('touchend', onEndCallback, { passive: false, capture: false });
  }

  onMouseMove(clientX: number) {
    let xPos = clientX - this.barPosLeft;
    if (xPos > this.barWidth) { xPos = this.barWidth; }
    if (xPos < 0) { xPos = 0; }
    this.setValue(this.bfIniValue + Math.round(xPos * this.posXSize), false);
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches && event.touches[0]?.clientX) {
      this.onMouseMove(event.touches[0].clientX);
    }
  }

}
