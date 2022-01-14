import { Directive, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, timer } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[bfShortPress]'
})
export class BfShortPressDirective implements OnDestroy {
  keyEvent$ = new BehaviorSubject<boolean>(null);

  private readonly destroy$ = new Subject<void>();
  private readonly _longPressTimer = 500;

  isShortPress: boolean;

  @Output() shortPress = new EventEmitter();

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onKeyDown() {
    this.keyEvent$.next(true);
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onKeyUp() {
    if(this.isShortPress) {
      this.shortPress.emit();
    }

    this.keyEvent$.next(false);
  }

  constructor() {
    this.evaluateShortPress();
  }

  evaluateShortPress() {
    this.keyEvent$.pipe(
      tap(isClicked => this.isShortPress = isClicked),
      switchMap(isClicked => isClicked ? timer(this._longPressTimer, 100) : of(null)),
      filter(isLongPress => !!isLongPress),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.isShortPress = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}