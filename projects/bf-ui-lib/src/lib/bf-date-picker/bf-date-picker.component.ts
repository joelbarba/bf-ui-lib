import {
  Component,
  OnInit,
  Input,
  forwardRef,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidatorFn
} from '@angular/forms';
import { Subscription} from 'rxjs';

@Component({
  selector: 'bf-date-picker',
  templateUrl: './bf-date-picker.component.html',
  styleUrls: ['./bf-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BfDatePickerComponent)
    },
  ]
})
export class BfDatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  public bfModelControl: FormControl;

  @Input() bfLabel: string;
  @Input() bfRequired: boolean;
  @Input() bfMinDate: Date;
  @Input() bfMaxDate: Date;
  @Input() bfTimeZone: string;
  @Input() bfLocale: string;
  @Input() bfFormat: string;
  @Input() bfTime: string;
  @Input() bfIcon: string;

  private modelInput: string;
  private modelDate: NgbDate;
  private haveFooterButtons = true;
  private originalModel: Date;
  private datePipe: DatePipe;
  private datePickerConfig = {
    maxDate: null,
    minDate: null
  };
  private bfModelControlSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.bfIcon = this.bfIcon || 'icon-calendar4';
    this.datePipe = new DatePipe(this.bfLocale || 'en-IE');
    this.bfFormat = this.bfFormat || 'shortDate';
    this.bfModelControl = new FormControl(null);
    // tslint:disable-next-line:max-line-length
    this.originalModel = this.existTheControlValue() ? new Date(this.bfModelControl.value) : null;
    this.createRangeDatepickerConfig();
    this.bfModelControlSubscription = this.bfModelControl.valueChanges.subscribe(() => {
      this.setModelInput();
      this.updateCalendar();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.bfTime && changes.bfTime.previousValue !== changes.bfTime.currentValue) {
      this.setModelInput();
    }
    // tslint:disable-next-line:max-line-length
    if (changes.bfMinDate && changes.bfMinDate.previousValue !== changes.bfMinDate.currentValue || changes.bfMaxDate && changes.bfMaxDate.previousValue !== changes.bfMaxDate.currentValue) {
      this.createRangeDatepickerConfig();
    }
  }

  ngOnDestroy() {
    this.bfModelControlSubscription.unsubscribe();
  }

  createRangeDatepickerConfig() {
    this.bfMaxDate = this.bfMinDate > this.bfMaxDate ? new Date(this.bfMinDate) : this.bfMaxDate;
    if (this.existTheControlValue() && this.bfMinDate > this.bfModelControl.value) {
      this.writeValue(this.bfMinDate);
    }
    if (this.existTheControlValue() && this.bfMaxDate < this.bfModelControl.value) {
      this.writeValue(this.bfMaxDate);
    }
    this.datePickerConfig = {
      maxDate: this.dateToNgbDate(this.bfMaxDate),
      minDate: this.dateToNgbDate(this.bfMinDate)
    };
  }

  existTheControlValue() {
    return !!this.bfModelControl && !!this.bfModelControl.value && typeof this.bfModelControl.value !== 'function';
  }

  selectDateForNgModel(date: NgbDateStruct) {
    let value = this.bfModelControl.value;
    if (!!value) {
      value.setFullYear(date.year, date.month - 1, date.day);
    } else {
      value = new Date(date.year, date.month - 1, date.day);
    }
    this.writeValue(value);
  }

  dateToNgbDate(date: Date): NgbDate {
    return !!date ? new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()) : null;
  }

  updateCalendar() {
    const date = this.dateToNgbDate(this.bfModelControl.value);
    if (!date || !this.modelDate || !date.equals(this.modelDate)) {
      this.modelDate = date;
    }
  }

  setModelInput() {
    // tslint:disable-next-line:max-line-length
    this.modelInput = this.existTheControlValue() ? this.datePipe.transform(this.bfModelControl.value, this.bfFormat) + (this.bfTime || '') + ( this.bfTimeZone || '') : null;
  }

  today(calendar) {
    const now = new Date();
    this.selectDateForNgModel({
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDay()
    });
    this.close(calendar);
  }

  cancel() {
    this.writeValue(this.originalModel);
  }

  close(calendar) {
    this.originalModel = new Date(this.bfModelControl.value);
    calendar.toggle();
  }

  // ------- ControlValueAccessor ----- //

  onChange: any = (_: any) => {};
  onTouch: any = () => {};

  // this method sets the value programmatically
  writeValue(value) {
    // Set the value in model control
    this.bfModelControl.setValue(value);
    // Propagate to the parent model
    this.onChange(this.bfModelControl.value);
  }

  // Upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  // Upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

}

/*
* @todo here....
*   - Design  : HTML tags and css style that we need to replicate the view from splice-ui. Must override some stuffs of the ngb-datepicker
*   - Update locale  : Research about how to handle the locale updating
*   - Update Timezone  : Research about how to play with the timezone
*   - Min and Max validation
*   - Prepare the component for reuse in bf-time-picker
*   - Refactoring: function and variable names. Check each function to make it more simple and understandable
*/
