import { Component, OnInit, Input, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges, SimpleChange, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';

interface FollowingValues {
  hours: number,
  minutes: number
}

interface SupportedTimezones {
  country_code: string
  time_zone: string
}

@Component({
  selector: 'bf-time-picker',
  templateUrl: './bf-time-picker.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfTimePickerComponent implements OnInit, OnChanges {
  @Input() bfSelectedTime: Date; // date/time object specifying the selected date/time
  @Input() bfSelectedTimezone: any; // the desired timezone
  @Input() bfSupportedTimezones: Array<SupportedTimezones>; // An array of supported timezones for an application
  @Input() bfLocale: string; // The locale to use for the date formats
  @Input() bfIsDisabled: boolean; // if the input should be disabled
  @Input() bfMinTime: Date; // The minimum allowed time
  @Input() bfMaxTime: Date; // the maxium allowed time
  @Input() bfPlacement: string = 'bottom'; // the position of the dropdown container default to bottom

  @Output() bfSelectedTimeChange: EventEmitter<Date> = new EventEmitter(); // An event emitted when the date/time has been updated
  @Output() bfSelectedTimezoneChange: EventEmitter<string> = new EventEmitter(); // An event emitted when the timezone has changed

  // subject to hold the updated date/time
  private suggestedTime$: BehaviorSubject<Date>;
  private datePipe: DatePipe;

  constructor() { }

  ngOnInit(): void {
    this.suggestedTime$ = new BehaviorSubject(this.bfSelectedTime || new Date());
    this.datePipe = new DatePipe(this.bfLocale || 'en-IE');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { bfSelectedTime, bfMinTime, bfMaxTime } = changes;
    if (bfSelectedTime) {
      if (!bfSelectedTime.isFirstChange() && !this.isChangeTheSame(bfSelectedTime)) {
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
      if (!bfMinTime.isFirstChange() && !this.isChangeTheSame(bfMinTime)) {
        const currentTime = this.getSuggestedTime();
        const { currentValue } = bfMinTime;

        if (this.isTimeLessThanMinimumLimit(currentTime, currentValue)) {
          this.updateSuggestedTime(currentValue);
        }
      }
    }

    if (bfMaxTime) {
      if (!bfMaxTime.isFirstChange() && !this.isChangeTheSame(bfMaxTime)) {
        const currentTime = this.getSuggestedTime();
        const { currentValue } = bfMaxTime;

        if (this.isTimeGreaterThanMaximumLimit(currentTime, currentValue)) {
          this.updateSuggestedTime(currentValue);
        }
      }
    }
  }

  public isButtonDisabled() {
    return this.bfIsDisabled || !this.bfSupportedTimezones
  }

  public onDateChanged(newDate: any) {
    const currentTime = this.getSuggestedTime();
    const updatedDate = new Date(newDate);

    updatedDate.setHours(currentTime.getHours());
    updatedDate.setMinutes(currentTime.getMinutes());
    this.updateSuggestedTime(updatedDate);
  }

  public onTimezoneChanged(currentTimezone: string): void {
    let currentTime = this.getSuggestedTime();
    currentTime = currentTime.convertTZ(currentTimezone);

    if (this.bfMinTime) {
      this.bfMinTime = this.bfMinTime.convertTZ(currentTimezone);
    }

    if (this.bfMaxTime) {
      this.bfMaxTime = this.bfMaxTime.convertTZ(currentTimezone);
    }

    this.bfSelectedTimezone = currentTimezone;
    this.updateSuggestedTime(currentTime);
    this.bfSelectedTimezoneChange.emit(currentTimezone);
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
      map((value: Date) => {
        return `${this.datePipe.transform(value, 'dd/MM/yyyy H:mm aa')} ${this.bfSelectedTimezone ? '- ' + this.bfSelectedTimezone : '' }`;
      })
    );
  }

  // Get the formatted time string for the bf-date-picker
  public getFormattedTimeString$(): Observable<string> {
    return this.getSuggestedTime$().pipe(
      filter(date => date !== undefined),
      map((date: Date) => {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
      })
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
      )
  }

  public onMouseWheelHours(event: MouseWheelEvent): void {
    event.stopPropagation();
    event.preventDefault();

    event.deltaY > 0
      ? this.decrementHours()
      : this.incrementHours()
  }

  public onMouseWheelMinutes(event: MouseWheelEvent): void {
    event.stopPropagation();
    event.preventDefault();

    event.deltaY > 0
      ? this.decrementMinutes()
      : this.incrementMinutes()
  }

  /**
   * Increases the current hour by one
   * @param currentTime The current time at invocation. Can be called with updated Date from the increment minutes function
   */
  public incrementHours(currentTime: Date = null): void {
    currentTime = currentTime || this.getSuggestedTime();
    const currentHour = currentTime.getHours();
    const updatedTime = new Date(currentTime);

    let updatedHours = currentHour + 1

    if (updatedHours > 23) {
      updatedHours = 0;
      updatedTime.addDays(1);
      updatedTime.setHours(updatedHours);
    }

    updatedTime.setHours(updatedHours);

    if (!this.isTimeGreaterThanMaximumLimit(updatedTime)) {
      // if we increase an hour we need to check if the minute value is valid if not a call to update the minutes will be made
      if (this.isUpdatingMaximumMinutesRequired(updatedTime, this.bfMaxTime)) {
        updatedTime.setMinutes(this.bfMaxTime.getMinutes());
        this.incrementMinutes(updatedTime)
      }
      this.updateSuggestedTime(updatedTime);
      return;
    }
  }

  /**
   * Reduces the current hour by one
   * @param currentTime The current time at invocation. Can be called with updated date from the decrement minutes function
   */
  public decrementHours(currentTime: Date = null): void {
    currentTime = currentTime || this.getSuggestedTime();
    const currentHour = currentTime.getHours();
    const updatedTime = new Date(currentTime);

    let updatedHour = currentHour - 1;

    if (updatedHour < 0) {
      updatedHour = 23;
      updatedTime.addDays(- 1);
      updatedTime.setHours(updatedHour);
    }

    updatedTime.setHours(updatedHour);

    if (!this.isTimeLessThanMinimumLimit(updatedTime)) {
      // if we drop an hour we need to check if the minute value is valid if not a call to update the minutes will be made
      if (this.isUpdatingMinimumMinutesRequired(updatedTime, this.bfMinTime)) {
        updatedTime.setMinutes(this.bfMinTime.getMinutes());
        this.decrementMinutes(updatedTime);
      }
      this.updateSuggestedTime(updatedTime);
      return;
    }
  }

  public incrementMinutes(currentTime: Date = null): void {
    currentTime = currentTime || this.getSuggestedTime();
    const currentMinutes = currentTime.getMinutes();
    const updatedTime = new Date(currentTime);

    let updateMinutes = currentMinutes + 1;

    if (updateMinutes > 59) {
      updatedTime.setMinutes(0);
      this.incrementHours(updatedTime); // update the time with the current updated minutes
    } else {
      updatedTime.setMinutes(updateMinutes);

      if (!this.isTimeGreaterThanMaximumLimit(updatedTime)) {
        this.updateSuggestedTime(updatedTime);
        return;
      }
    }
  }

  public decrementMinutes(currentTime: Date = null): void {
    currentTime = currentTime || this.getSuggestedTime();
    const currentMinutes = currentTime.getMinutes();
    const updatedTime = new Date(currentTime);

    const updatedMinutes = currentMinutes - 1;

    if (updatedMinutes < 0) {
      updatedTime.setMinutes(59);
      this.decrementHours(updatedTime); // update the time with the current updated minutes
    } else {
      updatedTime.setMinutes(updatedMinutes);

      if (!this.isTimeLessThanMinimumLimit(updatedTime)) {
        this.updateSuggestedTime(updatedTime);
        return;
      }
    }
  }

  public onSave(timePickerDropdown: NgbDropdown): void {
    this.bfSelectedTimeChange.emit(this.getSuggestedTime());
    timePickerDropdown.close();
  }

  public onCancel(timePickerDropdown: NgbDropdown): void {
    if (this.bfSelectedTime) {
      this.updateSuggestedTime(this.bfSelectedTime);
    }

    timePickerDropdown.close();
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

          const returnValues = {
            before: { hours: null, minutes: null },
            after: { hours: null, minutes: null }
          };

          const isGreaterThanMax = this.isTimeGreaterThanMaximumLimit(timeToTestAfter);
          const isLessThanMin = this.isTimeLessThanMinimumLimit(timeToTestBefore);

          returnValues.before = isLessThanMin
            ? returnValues.before
            : { hours: hoursBefore, minutes: minutesBefore };

          returnValues.after = isGreaterThanMax
            ? returnValues.after
            : { hours: hoursAfter, minutes: minutesAfter }

          return returnValues;
        })
      );
  }

  public displayFollowingTimeValues(followingValue: number): string {
    return followingValue !== null ? this.padNumberString(followingValue) : '-';
  }

  private padNumberString(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private isTimeLessThanMinimumLimit(dateTimeToUpdate: Date, minimumTime: Date = this.bfMinTime): boolean {
    if (!!minimumTime) {
      return dateTimeToUpdate < minimumTime;
    }

    return false;
  }

  private isTimeGreaterThanMaximumLimit(dateTimeToUpdate: Date, maximumTime: Date = this.bfMaxTime): boolean {
    if (!!maximumTime) {
      return dateTimeToUpdate > maximumTime;
    }

    return false;
  }

  private isChangeTheSame(change: SimpleChange): boolean {
    const { currentValue, previousValue } = change;
    return currentValue.toUTCString() === previousValue.toUTCString();
  }

  private isUpdatingMinimumMinutesRequired(currentTime: Date, minimumTime: Date): boolean {
    if (!!minimumTime) {
      return currentTime.getMinutes() < minimumTime.getMinutes()
        && currentTime.getHours() - 1 === minimumTime.getHours();
    }

    return false;
  }

  private isUpdatingMaximumMinutesRequired(currentTime: Date, maximumTime: Date): boolean {
    if (!!maximumTime) {
      return currentTime.getMinutes() > maximumTime.getMinutes()
        && currentTime.getHours() + 1 === maximumTime.getHours();
    }

    return false;
  }
}
