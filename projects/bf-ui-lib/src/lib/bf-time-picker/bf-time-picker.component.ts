import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BfUILibTransService } from '../abstract-translate.service';

@Component({
  selector: 'bf-time-picker',
  templateUrl: './bf-time-picker.component.html',
  styleUrls: ['./bf-time-picker.component.scss']
})
export class BfTimePickerComponent implements OnInit, OnDestroy, OnChanges {
  /** A flag to determine if the is required validator is applied */
  @Input() isRequired = true;
  /** The initial time value if none is supplied it will default to the current time */
  @Input() currentTime: NgbTimeStruct;
  /** The minimum allowed time */
  @Input() minimumTime: NgbTimeStruct = null;
  /** The maximum allowed time */
  @Input() maximumTime: NgbTimeStruct = null;
  /** A flag to determine if the spinners should be shown */
  @Input() showSpinners = true;
  /** The parent form group (optional)  */
  @Input() formGroup: FormGroup;
  /** The name of the form control */
  @Input() controlName: string;
  /** The label for the element */
  @Input() controlLabel: string;
  /** The id for the element */
  @Input() controlId: string;
  /** A flag to show/hide validation messages generated in the component bf-dateTime-picker is the only place set to true */
  @Input() hideErrorMessage = false;
  /** An event that will send the current time struct and formatted string */
  @Output() timeChanged: EventEmitter<string> = new EventEmitter();
  /** An event that will return the current internal value of the time struct */
  @Output() currentTimeChange: EventEmitter<NgbTimeStruct> = new EventEmitter();

  timePickerControl: FormControl;
  minTimeErrorValidationTrans$: Observable<string>;
  maxTimeErrorValidationTrans$: Observable<string>;
  requiredErrorValidationTrans$: Observable<string>;

  _valueChangesSubscription: Subscription;

  constructor(private _bfTranslate: BfUILibTransService) { }

  ngOnInit(): void {
    if (this.currentTime === undefined) {
      this.currentTime = this.getTimeFromDate(new Date());
    }

    if (!this.controlId) {
      this.controlId = this._generateUniqueId();
    }

    /**
     * Using this component as a reactive form guinea pig as there are limited use cases
     * long term we should migrate existing components to leverage reactive forms
     */
    this.timePickerControl = new FormControl(this.currentTime);
    this.timePickerControl.setValidators(this._getValidators(this.maximumTime, this.minimumTime));

    if (this.formGroup) {
      if (this.controlName === undefined) {
        throw Error('If using a parent form group you must supply a control name!');
      }
      this.formGroup.addControl(this.controlName, this.timePickerControl);
    }

    this._valueChangesSubscription = this.timePickerControl.valueChanges.pipe(
      tap(this._timeUpdated.bind(this))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._valueChangesSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { minimumTime, maximumTime } = changes;

    if (this._isNotFirstChange(minimumTime)) {
      this.timePickerControl.updateValueAndValidity();
    }

    if (this._isNotFirstChange(maximumTime)) {
      this.timePickerControl.updateValueAndValidity();
    }
  }

  getTimeFromDate(dateTime: Date): NgbTimeStruct {
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();

    return {
      hour,
      minute,
      second: 0
    };
  }

  get isTooEarly(): boolean {
    return this.timePickerControl.hasError('minTimeExceeded');
  }

  get isTooLate(): boolean {
    return this.timePickerControl.hasError('maxTimeExceeded');
  }

  get isRequiredError(): boolean {
    return this.timePickerControl.hasError('required');
  }

  _timeUpdated(updatedTime: NgbTimeStruct): void {
    if (this.timePickerControl.valid) {
      this.timeChanged.emit(this._stringifyTimeStruct(updatedTime));
      this.currentTimeChange.emit(updatedTime);
    }
  }

  _getValidators(maximumTime: NgbTimeStruct, minimumTime: NgbTimeStruct): Array<ValidatorFn> {
    const validationFns = [];

    if (minimumTime !== null) {
      this.minTimeErrorValidationTrans$ = this._bfTranslate.getLabel$('components.timepicker.min_time_error', { minTime: minimumTime });
      validationFns.push(this._isCurrentTimeLessThanMinimum.bind(this));
    }

    if (maximumTime !== null) {
      this.maxTimeErrorValidationTrans$ = this._bfTranslate.getLabel$('components.timepicker.min_time_error', { maxTime: maximumTime });
      validationFns.push(this._isCurrentTimeGreaterThanMax.bind(this));
    }

    if (this.isRequired) {
      this.requiredErrorValidationTrans$ = this._bfTranslate.getLabel$('view.common.required_field');
      validationFns.push(Validators.required);
    }

    return validationFns;
  }

  _isCurrentTimeGreaterThanMax(currentTime: FormControl): ValidationErrors {
    const isHoursGreater = currentTime.value?.hour > this.maximumTime.hour;
    const isMinutesGreater = currentTime.value?.minute > this.maximumTime.minute && currentTime.value?.hour === this.maximumTime.hour;


    return isMinutesGreater || isHoursGreater
      ? { maxTimeExceeded: true }
      : null;
  }

  _isCurrentTimeLessThanMinimum(currentTime: FormControl): ValidationErrors {
    const isHoursLess = currentTime.value.hour < this.minimumTime.hour;
    const isMinutesLess = currentTime.value.minute < this.minimumTime.minute && currentTime.value?.hour === this.minimumTime.hour;

    return isMinutesLess || isHoursLess
      ? { minTimeExceeded: true }
      : null;
  }

  _stringifyTimeStruct(timeStuct: NgbTimeStruct): string {
    const { hour, minute } = timeStuct;
    return `${hour < 10 ? '0' : ''}${hour}:${minute}`;
  }

  _generateUniqueId(): string {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  _isNotFirstChange(change: SimpleChange): boolean {
    return change && !change.firstChange;
  }
}
