import { Directive, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, of, Subject, timer } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[bfLongPress]'
})
export class BfLongPressDirective implements OnDestroy {
  keyEvent$ = new BehaviorSubject<boolean>(null);

  private readonly destroy$ = new Subject<void>();
  private readonly _longPressTimer = 500;

  @Output() longPress = new EventEmitter();

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onKeyDown(event: MouseEvent) {
    this.keyEvent$.next(true);
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onKeyUp(event: MouseEvent) {
    this.keyEvent$.next(false);
  }

  constructor() {
    this.evaluateLongPress();
  }

  evaluateLongPress() {
    this.keyEvent$.pipe(
      switchMap(isClicked => isClicked ? timer(this._longPressTimer, 100) : of(null)),
      filter(isLongPress => !!isLongPress),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.longPress.emit();
      this.keyEvent$.next(false);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}