import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

/*
 * This directive draws heavy inspiration from this example:
 *   https://blog.bitsrc.io/angular-maximizing-performance-with-the-intersection-observer-api-23d81312f178
 *
 * Also check the MDN documentation:
 *   https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
@Directive({
  selector: '[bfIntersectionObserver]',
})
export class BfIntersectionObserverDirective implements OnDestroy, OnInit {

  /**
   * [optional] debounces events (in milliseconds), as the IntersectionObserver API can produce a lot of calls
   */
  @Input() debounce = 0;

  /**
   * The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target.
   * Defaults to the browser viewport if not specified or if null.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for more information
   */
  @Input() root: HTMLElement;

  /**
   * [optional] Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px"
   * (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side
   * of the root element's bounding box before computing intersections. Defaults to all zeros.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for more information
   */
  @Input() rootMargin = '0px';

  /**
   * Either a single number or an array of numbers which indicate at what percentage of the target's visibility the
   * observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can
   * use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify
   * the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback
   * will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for more information
   */
  @Input() threshold: number | number[];

  /**
   * Emits all events coming from IntersectionObserver (except when [debounce] is set).
   */
  @Output() visibilityChange = new EventEmitter<IntersectionObserverEntry>();

  private destroyed$ = new Subject<void>();


  private static fromIntersection(element: HTMLElement, options: IntersectionObserverInit) {
    const events$ = new Subject<IntersectionObserverEntry>();

    // It's always one, since the directive is bound to a specific HTML element
    const observer = new IntersectionObserver((entries) => events$.next(entries[0]), options);
    observer.observe(element);

    return events$.pipe(
      tap(() => void 0, () => void 0, () => observer.disconnect()),
    );
  }


  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) { }


  ngOnInit() {
    const config: IntersectionObserverInit = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    };

    BfIntersectionObserverDirective.fromIntersection(this.elementRef.nativeElement, config).pipe(
      takeUntil(this.destroyed$),
      debounceTime(this.debounce),
    ).subscribe((entry) => {
      this.visibilityChange.emit(entry);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
