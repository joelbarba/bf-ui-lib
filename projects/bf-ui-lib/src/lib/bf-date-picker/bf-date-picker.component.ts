import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  forwardRef,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
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
  @Input() bfIcon: string;
  @Input() bfTimeZone: string;
  @Input() bfLocale: string;
  @Input() bfFormat: string;

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
    this.datePipe = new DatePipe(this.bfLocale || 'en-US');
    this.bfFormat = this.bfFormat || 'shortDate';
    this.bfIcon = this.bfIcon || 'clock';
    this.bfModelControl = new FormControl(null);
    this.bfModelControlSubscription = this.bfModelControl.valueChanges.subscribe(() => {
      this.setModelInput();
      this.updateCalendar();
    });
    // tslint:disable-next-line:max-line-length
    this.originalModel = !!this.bfModelControl.value && typeof this.bfModelControl.value !== 'function' ? new Date(this.bfModelControl.value) : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.bfMaxDate.previousValue !== changes.bfMaxDate.currentValue) {
    //   this.datePickerConfig.maxDate = this.dateToNgbDate(changes.bfMaxDate.currentValue);
    // }
    // if (changes.bfMinDate.previousValue !== changes.bfMinDate.currentValue) {
    //   this.datePickerConfig.minDate = this.dateToNgbDate(changes.bfMinDate.currentValue);
    // }
    // if (changes.bfLocale.previousValue !== changes.bfLocale.currentValue) {
    //   this.datePipe = new DatePipe(changes.bfLocale.currentValue || 'en-IE');
    //   this.setModelInput();
    // }
    // if (changes.bfTimeZone.previousValue !== changes.bfTimeZone.currentValue) {
    //   this.setModelInput();
    // }
  }

  ngOnDestroy() {
    this.bfModelControlSubscription.unsubscribe();
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
    this.modelInput = !!this.bfModelControl.value && typeof this.bfModelControl.value !== 'function' ? this.datePipe.transform(this.bfModelControl.value, this.bfFormat) + (this.bfTimeZone ? (' - ' + this.bfTimeZone) : '') : null;
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
