import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BfUILibTransService } from '../abstract-translate.service';
import { BfDate } from '../bf-prototypes/bf-prototypes';

interface FollowingValues {
  hours: number;
  minutes: number;
}

interface SupportedTimezones {
  country_code: string;
  time_zone: string;
}

@Component({
  selector: 'bf-time-picker',
  templateUrl: './bf-time-picker.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfTimePickerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() bfLabel: string; // The label for the component
  @Input() bfSelectedTime: Date; // date/time object specifying the selected date/time
  @Input() bfSelectedTimezone: any; // the desired timezone
  @Input() bfSupportedTimezones: Array<SupportedTimezones>; // An array of supported timezones for an application
  @Input() bfDisabled: boolean; // if the input should be disabled
  @Input() bfMinTime: Date; // The minimum allowed time
  @Input() bfMaxTime: Date; // the maxium allowed time
  @Input() bfPlacement = 'bottom'; // the position of the dropdown container default to bottom

  @Output() bfSelectedTimeChange: EventEmitter<Date> = new EventEmitter(); // An event emitted when the date/time has been updated
  @Output() bfSelectedTimezoneChange: EventEmitter<string> = new EventEmitter(); // An event emitted when the timezone has changed

  public locale: string;

  // subject to hold the updated date/time
  private suggestedTime$: BehaviorSubject<Date>;
  private datePipe: DatePipe;
  private localeSubscription$: Subscription;

  public currentMinutes$: Observable<string>;
  public currentHour$: Observable<string>;
  public displayTime$: Observable<string>;
  public followingValues$: Observable<{ before: FollowingValues, after: FollowingValues }>;
  public formattedTimeString$: Observable<string>;

  constructor(private translateService: BfUILibTransService) { }

  ngOnInit(): void {
    if (!this.bfMinTime) {
      this.bfMinTime = new Date();
    }
    this.suggestedTime$ = new BehaviorSubject(this.bfSelectedTime || new Date());
    this.localeSubscription$ = this.translateService.locale$.subscribe((locale) => {
      this.locale = locale;
      this.datePipe = new DatePipe(locale || 'en-IE');
    });

    this.currentMinutes$ = this.getCurrentMinutes$();
    this.currentHour$ = this.getCurrentHour$();
    this.displayTime$ = this.getDisplayTime$();
    this.followingValues$ = this.getFollowingValues$();
    this.formattedTimeString$ = this.getFormattedTimeString$();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { bfSelectedTime, bfMinTime, bfMaxTime } = changes;
    if (bfSelectedTime) {
      if (this.shouldUpdateChange(bfSelectedTime)) {
        const newTime = bfSelectedTime.currentValue;

        this.updateSuggestedTime(
          this.isTimeGreaterThanMaximumLimit(newTime)
            ? this.bfMaxTime
            : this.isTimeLessThanMinimumLimit(newTime)
            ? this.bfMinTime
            : newTime
        );
      }
    }

    if (bfMinTime) {
      if (this.shouldUpdateChange(bfMinTime)) {
        const currentTime = this.getSuggestedTime();
        const { currentValue } = bfMinTime;

        if (this.isTimeLessThanMinimumLimit(currentTime, currentValue)) {
          this.updateSuggestedTime(currentValue);
        }
      }
    }

    if (bfMaxTime) {
      if (this.shouldUpdateChange(bfMaxTime)) {
        const currentTime = this.getSuggestedTime();
        const { currentValue } = bfMaxTime;

        if (this.isTimeGreaterThanMaximumLimit(currentTime, currentValue)) {
          this.updateSuggestedTime(currentValue);
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.localeSubscription$) {
      this.localeSubscription$.unsubscribe();
    }
  }

  // using custom toggle logic to prevent time-picker from opening, this is mainly due to the fact that we can't open the dropdown until we have supported timezones
  public toggleTimePicker(timePicker: NgbDropdown) {
    if (!this.isDisabled()) {
      timePicker.toggle();
    }
  }

  public isDisabled() {
    return this.bfDisabled || !this.bfSupportedTimezones;
  }

  public onDateChanged(newDate: string) {
    const currentTime = this.getSuggestedTime();
    let updatedDate: Date;
    if (newDate?.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [ year, month, date ] = newDate.split('-').map((part) => parseInt(part));
      // /!\ REMEMBER /!\ months are zero-based (BECAUSE WHY NOT)
      updatedDate = new Date(year, month - 1, date, currentTime.getHours(), currentTime.getMinutes(), 0, 0);
    } else {
      updatedDate = new Date(currentTime);
    }

    if (this.isTimeGreaterThanMaximumLimit(updatedDate, this.bfMaxTime)) {
      this.updateSuggestedTime(this.bfMaxTime);
    } else if (this.isTimeLessThanMinimumLimit(updatedDate, this.bfMinTime)) {
      this.updateSuggestedTime(this.bfMinTime);
    } else {
      this.updateSuggestedTime(updatedDate);
    }
  }

  public onTimezoneChanged(currentTimezone: string): void {
    if (currentTimezone) {
      this.bfSelectedTimezone = currentTimezone;
      this.bfSelectedTimezoneChange.emit(currentTimezone);
    }
  }

  public getSuggestedTime$(): Observable<Date> {
    return this.suggestedTime$.asObservable();
  }

  public getSuggestedTime(): Date {
    return this.suggestedTime$.getValue();
  }

  public updateSuggestedTime(updateTime: Date): void {
    this.suggestedTime$.next(updateTime);
  }

  public getDisplayTime$(): Observable<string> {
    return this.getSuggestedTime$().pipe(
      map((value: Date) => this.datePipe.transform(value, 'short')),
      map((formattedDate: string) => `${formattedDate} ${this.bfSelectedTimezone ? '- ' + this.bfSelectedTimezone : '' }`)
    );
  }

  // Get the formatted time string for the bf-date-picker
  public getFormattedTimeString$(): Observable<string> {
    return this.getSuggestedTime$().pipe(
      filter(date => date !== undefined),
      map((date: Date) => {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
      }),
      distinctUntilChanged(),
    );
  }

  public getCurrentMinutes$(): Observable<string> {
    return this.getSuggestedTime$()
      .pipe(
        map((date: Date) => date.getMinutes()),
        map(this.padNumberString),
        distinctUntilChanged()
      );
  }

  public getCurrentHour$(): Observable<string> {
    return this.getSuggestedTime$()
      .pipe(
        map((date: Date) => date.getHours()),
        map(this.padNumberString),
        distinctUntilChanged()
      );
  }

  public onMouseWheelHours(event: WheelEvent): void {
    event.stopPropagation();
    event.preventDefault();

    event.deltaY > 0
      ? this.decrementHours()
      : this.incrementHours();
  }

  public onMouseWheelMinutes(event: WheelEvent): void {
    event.stopPropagation();
    event.preventDefault();

    event.deltaY > 0
      ? this.decrementMinutes()
      : this.incrementMinutes();
  }

  /**
   * Increases the current hour by one
   * @param currentTime The current time at invocation. Can be called with updated Date from the increment minutes function
   */
  public incrementHours(currentTime: Date = null): void {
    const timeToUpdate = this.getDateCopy(currentTime || this.getSuggestedTime());

    if (!this.isTimeEqualToMax(timeToUpdate, this.bfMaxTime)) {
      const currentHour = timeToUpdate.getHours();

      let updatedHours = currentHour + 1;

      if (updatedHours > 23) {
        updatedHours = 0;
        BfDate.addDays.call(timeToUpdate, 1);
        timeToUpdate.setHours(updatedHours);
      }

      timeToUpdate.setHours(updatedHours);

      // if we increase the hour to the max limit we need to check if the minute value is valid if not a call to update the minutes will be made
      if (this.isUpdatingMaximumMinutesRequired(timeToUpdate, this.bfMaxTime)) {
        timeToUpdate.setMinutes(this.bfMaxTime.getMinutes());
        this.incrementMinutes(timeToUpdate);
      }

      this.updateSuggestedTime(timeToUpdate);
      return;
    }
  }

  /**
   * Reduces the current hour by one
   * @param currentTime The current time at invocation. Can be called with updated date from the decrement minutes function
   */
  public decrementHours(currentTime: Date = null): void {
    const timeToUpdate = this.getDateCopy(currentTime || this.getSuggestedTime());

    if (!this.isTimeEqualToMin(timeToUpdate, this.bfMinTime)) {
      const currentHour = timeToUpdate.getHours();

      let updatedHour = currentHour - 1;

      if (updatedHour < 0) {
        updatedHour = 23;
        BfDate.addDays.call(timeToUpdate, - 1);
        timeToUpdate.setHours(updatedHour);
      }

      timeToUpdate.setHours(updatedHour);

      // if we drop the hour to the minimum limit we need to check if the minute value is valid if not a call to update the minutes will be made
      if (this.isUpdatingMinimumMinutesRequired(timeToUpdate, this.bfMinTime)) {
        timeToUpdate.setMinutes(this.bfMinTime.getMinutes());
        this.decrementMinutes(timeToUpdate);
      }

      this.updateSuggestedTime(timeToUpdate);
      return;
    }
  }

  public incrementMinutes(currentTime: Date = null): void {
    const timeToUpdate = this.getDateCopy(currentTime || this.getSuggestedTime());

    if (!this.isTimeEqualToMax(timeToUpdate, this.bfMaxTime)) {
      const currentMinutes = timeToUpdate.getMinutes();
      const updateMinutes = currentMinutes + 1;

      if (updateMinutes > 59) {
        timeToUpdate.setMinutes(0);
        this.incrementHours(timeToUpdate); // update the time with the current updated minutes
      } else {
        timeToUpdate.setMinutes(updateMinutes);

        if (!this.isTimeGreaterThanMaximumLimit(timeToUpdate)) {
          this.updateSuggestedTime(timeToUpdate);
          return;
        }
      }
    }
  }

  public decrementMinutes(currentTime: Date = null): void {
    const timeToUpdate = this.getDateCopy(currentTime || this.getSuggestedTime());

    if (!this.isTimeEqualToMin(timeToUpdate, this.bfMinTime)) {
      const currentMinutes = timeToUpdate.getMinutes();
      const updatedMinutes = currentMinutes - 1;

      if (updatedMinutes < 0) {
        timeToUpdate.setMinutes(59);
        this.decrementHours(timeToUpdate); // update the time with the current updated minutes
      } else {
        timeToUpdate.setMinutes(updatedMinutes);

        if (!this.isTimeLessThanMinimumLimit(timeToUpdate)) {
          this.updateSuggestedTime(timeToUpdate);
          return;
        }
      }
    }
  }

  public onCancel(timePickerDropdown: NgbDropdown): void {
    if (this.bfSelectedTime) {
      this.updateSuggestedTime(this.bfSelectedTime);
    }

    timePickerDropdown.close();
  }

  public closeTimePicker(timePickerDropdown: NgbDropdown): void {
    timePickerDropdown.close();
  }

  public onOpenChange(isDropdownOpen: boolean): void {
    if (!isDropdownOpen) {
      this.bfSelectedTime = this.getSuggestedTime();
      this.bfSelectedTimeChange.emit(this.bfSelectedTime);
    }
  }

  public formatDate(date: Date): string {
    return date ? this.datePipe.transform(date, 'yyyy-MM-dd') : '';
  }

  public getFollowingValues$(): Observable<{ before: FollowingValues, after: FollowingValues }> {
    return this.getSuggestedTime$()
      .pipe(
        map((date: Date) => {
          const currentMinutes = date.getMinutes();
          const currentHours = date.getHours();
          const timeToTestBefore = new Date(date);
          const timeToTestAfter = new Date(date);

          const minutesBefore = currentMinutes - 1 < 0 ? 59 : currentMinutes - 1;
          const hoursBefore = currentHours - 1 < 0 ? 23 : currentHours - 1;
          const minutesAfter = currentMinutes + 1 > 59 ? 0 : currentMinutes + 1;
          const hoursAfter = currentHours + 1 > 23 ? 0 : currentHours + 1;

          timeToTestAfter.setHours(hoursAfter);
          timeToTestAfter.setMinutes(minutesAfter);
          timeToTestBefore.setHours(hoursBefore);
          timeToTestBefore.setMinutes(minutesBefore);

          if (this.isTimeEqualToMin(date, this.bfMinTime)) {
            return {
              before: {
                hours: null,
                minutes: null
              },
              after: {
                hours: this.getHoursAfter(timeToTestAfter, this.bfMaxTime),
                minutes: this.getMinutesAfter(timeToTestAfter, this.bfMaxTime)
              }
            };
          } else if (this.isTimeEqualToMax(date, this.bfMaxTime)) {
            return {
              before: {
                hours: this.getHoursBefore(timeToTestBefore, this.bfMinTime),
                minutes: this.getMinutesBefore(timeToTestBefore, this.bfMinTime)
              },
              after: {
                hours: null,
                minutes: null
              }
            };
          } else {
            return {
              before: {
                hours: this.getHoursBefore(timeToTestBefore, this.bfMinTime),
                minutes: this.getMinutesBefore(timeToTestBefore, this.bfMinTime)
              },
              after: {
                hours: this.getHoursAfter(timeToTestAfter, this.bfMaxTime),
                minutes: this.getMinutesAfter(timeToTestAfter, this.bfMaxTime)
              }
            };
          }
        })
      );
  }

  public displayFollowingTimeValues(followingValue: number): string {
    return followingValue !== null ? this.padNumberString(followingValue) : '-';
  }

  private padNumberString(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private removeSecondsFromDate(date: Date): Date {
    return BfDate.truncMin.call(date);
  }

  private getHoursBefore(timeToTest: Date, minTime: Date): number {
    if (!!minTime) {
      const isDateLessThanMin = this.isTimeLessThanMinimumLimit(timeToTest, minTime);
      const isHoursLessThanMin = timeToTest.getHours() < minTime.getHours() ;
      return isDateLessThanMin && isHoursLessThanMin ? null : timeToTest.getHours();
    }

    return timeToTest.getHours();
  }

  private getMinutesBefore(timeToTest: Date, minTime: Date): number {
    if (!!minTime) {
      const isDateLessThanMin = this.isTimeLessThanMinimumLimit(timeToTest, minTime);
      // check if the minutes is in the minimum range including the hour value
      const isMinutesLessThanMin = timeToTest.getMinutes() < minTime.getMinutes() && this.getHoursBefore(timeToTest, minTime) === null;

      return isDateLessThanMin && isMinutesLessThanMin ? null : timeToTest.getMinutes();
    }

    return timeToTest.getMinutes();
  }

  private getHoursAfter(timeToTest: Date, maxTime: Date): number {
    if (!!maxTime) {
      const isTimeGreaterThanMax = this.isTimeGreaterThanMaximumLimit(timeToTest, maxTime);
      const isHoursGreaterThanMax = timeToTest.getHours() > maxTime.getHours();
      return isTimeGreaterThanMax && isHoursGreaterThanMax ? null : timeToTest.getHours();
    }

    return timeToTest.getHours();
  }

  private getMinutesAfter(timeToTest: Date, maxTime: Date): number {
    if (!!maxTime) {
      const isCurrentTimeGreaterThanMax = this.isTimeGreaterThanMaximumLimit(timeToTest, maxTime);
      // check if the minutes is in the maxium range including the hour value
      const isMinutesGreaterThanMax = timeToTest.getMinutes() > maxTime.getMinutes() && this.getHoursAfter(timeToTest, maxTime) === null;

      return isCurrentTimeGreaterThanMax && isMinutesGreaterThanMax ? null : timeToTest.getMinutes();
    }

    return timeToTest.getMinutes();
  }

  private isTimeEqualToMax(currentTime: Date, maxTime: Date): boolean {
    if (!!maxTime) {
      return this.removeSecondsFromDate(currentTime).toUTCString() === this.removeSecondsFromDate(maxTime).toUTCString();
    }

    return false;
  }

  private isTimeEqualToMin(currentTime: Date, minTime: Date): boolean {
    if (!!minTime) {
      return this.removeSecondsFromDate(currentTime).toUTCString() === this.removeSecondsFromDate(minTime).toUTCString();
    }

    return false;
  }

  private isTimeLessThanMinimumLimit(dateTimeToUpdate: Date, minimumTime: Date = this.bfMinTime): boolean {
    if (!!minimumTime) {
      const isLessThan = this.removeSecondsFromDate(dateTimeToUpdate) < this.removeSecondsFromDate(minimumTime);
      return isLessThan;
    }

    return false;
  }

  private isTimeGreaterThanMaximumLimit(dateTimeToUpdate: Date, maximumTime: Date = this.bfMaxTime): boolean {
    if (!!maximumTime) {
      return this.removeSecondsFromDate(dateTimeToUpdate) > this.removeSecondsFromDate(maximumTime);
    }

    return false;
  }

  private shouldUpdateChange(change: SimpleChange) {
    return !change.isFirstChange() && !this.isChangeTheSame(change);
  }

  private isChangeTheSame(change: SimpleChange): boolean {
    const { currentValue, previousValue } = change;

    if (previousValue) {
      return currentValue.toUTCString() === previousValue.toUTCString();
    }

    return false;
  }

  private isUpdatingMinimumMinutesRequired(currentTime: Date, minimumTime: Date): boolean {
    if (!!minimumTime) {
      return currentTime.getMinutes() < minimumTime.getMinutes()
        && currentTime.getHours() === minimumTime.getHours();
    }

    return false;
  }

  private isUpdatingMaximumMinutesRequired(currentTime: Date, maximumTime: Date): boolean {
    if (!!maximumTime) {
      return currentTime.getMinutes() > maximumTime.getMinutes()
        && currentTime.getHours() === maximumTime.getHours();
    }

    return false;
  }

  private getDateCopy(currentTime: Date): Date {
    return new Date(currentTime);
  }
}
