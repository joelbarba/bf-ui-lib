import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColourType } from './abstractions/types/colour.type';

@Component({
  selector: 'bf-dot-badge',
  templateUrl: './bf-dot-badge.component.html'
})
export class BfDotBadgeComponent implements OnInit, OnChanges, OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  @Input() bfType: ColourType;
  @Input() bfText: string = '';
  @Input() bfBreakpoint: number = 992;
  @Input() bfTabIndex = 0;

  /**
   * Specific background color of the dot as hex value
   */
  @Input() bfColor?: string;

  /**
   *  In cases where a status is true|false or 1|0 we show 'active'|'inactive' by default
   */
  @Input() bfStatus?: boolean | number;

  /**
   * How the text should be displayed on the dot badge.
   * <pre>
   * - auto: Will be displayed as a label on larger screens, and swapping to a tooltip on smaller screens.
   * - label: Display the text as a label next to the dot.
   * - tooltip: Display the text as a tooltip on the dot.
   * </pre>
   */
  @Input() bfLabelDisplayType: 'auto' | 'label' | 'tooltip' = 'auto';

  public calculatedDisplayType?: 'label' | 'tooltip';

  constructor(
    private readonly _breakpointObserver: BreakpointObserver,
    public elementRef: ElementRef
  ) { }

  _subscribeToBreakpoints() {
    this._breakpointObserver.observe(`(min-width: ${this.bfBreakpoint}px)`).pipe(
      takeUntil(this._destroy$)
    ).subscribe(({ matches }) => this.calculatedDisplayType = matches ? 'label' : 'tooltip');
  }

  _setLabelDisplay() {
    // Unsubscribe from the existing subscriptions that might not be needed anymore.
    this._destroy$.next();

    switch (this.bfLabelDisplayType) {
      case 'label':
        this.calculatedDisplayType = 'label';
        break;
      case 'tooltip':
        this.calculatedDisplayType = 'tooltip';
        break;
      default:
        this._subscribeToBreakpoints();
    }
  }

  _setDefaultStatus() {
    this.bfType = !!this.bfStatus ? 'primary' : 'warning';
    this.bfText = !!this.bfStatus ? 'view.common.active' : 'view.common.inactive';
  }

  ngOnInit() {
    this._setLabelDisplay();
    if(typeof this.bfStatus !== 'undefined')this._setDefaultStatus();
  }

  ngOnChanges(change: SimpleChanges) {
    if (!!change.bfLabelDisplayType) this._setLabelDisplay();
    if (!!change.bfStatus) this._setDefaultStatus();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
