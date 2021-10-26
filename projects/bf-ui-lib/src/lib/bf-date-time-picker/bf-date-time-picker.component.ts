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

import { NgbDropdown, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BfUILibTransService } from '../abstract-translate.service';
import { BfDate } from '../bf-prototypes/bf-prototypes';

interface SupportedTimezones {
  country_code: string;
  time_zone: string;
}

@Component({
  selector: 'bf-date-time-picker',
  templateUrl: './bf-date-time-picker.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfDateTimePickerComponent implements OnInit, OnChanges, OnDestroy {
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

  locale: string;
  minTime: NgbTimeStruct;
  maxTime: NgbTimeStruct;
  selectedTime: NgbTimeStruct;

  // subject to hold the updated date/time
  private suggestedTime$: BehaviorSubject<Date>;
  private datePipe: DatePipe;
  private localeSubscription$: Subscription;

  public currentMinutes$: Observable<string>;
  public currentHour$: Observable<string>;
  public displayTime$: Observable<string>;
  public formattedTimeString$: Observable<string>;

  constructor(private translateService: BfUILibTransService) { }

  ngOnInit(): void {
    if (!this.bfMinTime) {
      this.bfMinTime = new Date();
      this.minTime = this.convertDateToTimeStruct(this.bfMinTime);
    }

    this.suggestedTime$ = new BehaviorSubject(this.bfSelectedTime || new Date());
    this.localeSubscription$ = this.translateService.locale$.subscribe((locale) => {
      this.locale = locale;
      this.datePipe = new DatePipe(locale || 'en-IE');
    });

    this.displayTime$ = this.getDisplayTime$();
    this.formattedTimeString$ = this.getFormattedTimeString$();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { bfSelectedTime, bfMinTime, bfMaxTime } = changes;
    if (bfSelectedTime) {
      if (this.shouldUpdateChange(bfSelectedTime)) {
        const currentTime = bfSelectedTime.currentValue;
        const updatedTime = this.isTimeGreaterThanMaximumLimit(currentTime)
          ? this.bfMaxTime
          : this.isTimeLessThanMinimumLimit(currentTime)
          ? this.bfMinTime
          : currentTime;

        this.updateSuggestedTime(updatedTime);
        this.selectedTime = this.convertDateToTimeStruct(updatedTime);
      }
    }

    if (bfMinTime) {
      if (this.shouldUpdateChange(bfMinTime)) {
        const currentTime = this.getSuggestedTime();
        const { currentValue } = bfMinTime;

        if (this.isTimeLessThanMinimumLimit(currentTime, currentValue)) {
          this.minTime = this.convertDateToTimeStruct(currentValue);
          this.updateSuggestedTime(currentValue);
        }
      }
    }

    if (bfMaxTime) {
      if (this.shouldUpdateChange(bfMaxTime)) {
        const currentTime = this.getSuggestedTime();
        const { currentValue } = bfMaxTime;

        if (this.isTimeGreaterThanMaximumLimit(currentTime, currentValue)) {
          this.maxTime = this.convertDateToTimeStruct(currentValue);
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
    timePicker.toggle();
  }

  public isDisabled() {
    return this.bfDisabled;
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

  public onCancel(timePickerDropdown: NgbDropdown): void {
    if (this.bfSelectedTime) {
      this.updateSuggestedTime(this.bfSelectedTime);
    }

    timePickerDropdown.close();
  }

  public closeTimePicker(timePickerDropdown: NgbDropdown): void {
    this.bfSelectedTimeChange.emit(this.getSuggestedTime());
    timePickerDropdown.close();
  }

  public formatDate(date: Date): string {
    return date ? this.datePipe.transform(date, 'yyyy-MM-dd') : '';
  }

  updateTime(time: NgbTimeStruct): void {
    const updatedTime = this.getDateCopy(this.getSuggestedTime());
    updatedTime.setHours(time.hour);
    updatedTime.setMinutes(time.minute);

    this.updateSuggestedTime(updatedTime);
  }

  convertDateToTimeStruct(date: Date): NgbTimeStruct {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: 0
    };
  }

  get isDateTimeValid(): boolean {
    return this.isTimeEqualToMin(this.getSuggestedTime(), this.bfMinTime)
      || this.isTimeEqualToMax(this.getSuggestedTime(), this.bfMaxTime);
  }

  private removeSecondsFromDate(date: Date): Date {
    return BfDate.truncMin.call(date);
  }

  private isTimeEqualToMax(currentTime: Date, maxTime: Date): boolean {
    if (!!maxTime) {
      return this.removeSecondsFromDate(currentTime).toUTCString() <= this.removeSecondsFromDate(maxTime).toUTCString();
    }

    return false;
  }

  private isTimeEqualToMin(currentTime: Date, minTime: Date): boolean {
    if (!!minTime) {
      return this.removeSecondsFromDate(currentTime).toUTCString() <= this.removeSecondsFromDate(minTime).toUTCString();
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

  private getDateCopy(currentTime: Date): Date {
    return new Date(currentTime);
  }
}
