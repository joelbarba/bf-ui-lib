import {Component, OnInit, Input, forwardRef, OnDestroy, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Inject} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BfUILibTransService} from '../abstract-translate.service';
import {NgbDateStruct, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import BfString from '../bf-prototypes/string.prototype';
import {DatePipe} from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { generateId } from '../generate-id';


@Component({
  selector: 'bf-date-picker',
  templateUrl: './bf-date-picker.component.html',
  styleUrls: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfDatePickerComponent)
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfDatePickerComponent),
    }
  ]
})
export class BfDatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  private ngControl;  // Reference to the parent model controller
  public bfModel: NgbDateStruct; // Internal to hold the ngModel inside the wrapper

  @Input() bfLabel = '';
  @Input() bfRequired = false;
  @Input() bfDisabled = false;
  @Input() bfLocale: string;        // To fix a format for the date to display (overrides translation.locale$)
  @Input() bfFormat = 'shortDate';  // Format to display the date
  @Input() bfHasClearBtn = false;   // Whether to add a clear button on the input
  @Input() bfMinDate: string;   // 'yyyy-mm-dd'
  @Input() bfMaxDate: string;   // 'yyyy-mm-dd'

  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;

  @Input() bfErrorPos = 'top-right';  // top-right, bottom-left, bottom-right
  @Input() bfErrorText: string;       // Error text to display when invalid value
  @Input() bfIsInlineDatePicker: boolean; // flag to determine if the date-picker should be inline or not

  @ViewChild('dpRef', { static: true }) datePickerRef: NgbInputDatepicker;

  public isPristine = true;
  public status = 'valid';            // valid, error
  public errorPosition = 'default';   // where to display the error message (from bfErrorPos)
  public bfFormattedValue = '';       // String to display in the input
  public errorText = 'view.common.invalid_value';  // Internal error label (from bfErrorText)
  public ngbMinDate: NgbDateStruct = null;
  public ngbMaxDate: NgbDateStruct = null;
  public isTodayValid = true;         // Whether the min/max validation allows today as a valid option
  public locale: string;
  public clearButtonText: string;
  public inputId: string = generateId(4);

  private localeSubscription$: Subscription;
  public bfLabelTrans$: Observable<string> = of('');

  constructor(
    @Inject(BfUILibTransService) private translate: BfUILibTransService,
  ) {}


  // ------- ControlValueAccessor -----

  public propagateModelUp = (_: any) => {};
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ControlValueAccessor --> writes a new value from the external ngModel into the internal ngModel
  // This is triggered by setUpControl in FormControl directive outside this component
  public writeValue = (value: any) => {
    // console.log('writeValue -> ', value);

    this.bfModel = this.parseModelIn(value);
    setTimeout(() => this.onInternalModelChange(true)); // Update status (after internal ngModel cycle)
  };


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the status of the form element
  public validate = (extFormCtrl: FormControl) => {
    this.ngControl = extFormCtrl; // Save the reference

    if (this.status === 'error') {
      return { error: this.errorText };
    } else {
      return null; // valid
    }
  };

  ngOnInit() {
    this.clearButtonText = this.translate.doTranslate('view.common.clear');
    if (this.translate.locale$) {
      this.localeSubscription$ = this.translate.locale$.subscribe(locale => {
        this.locale = locale;
        this.onInternalModelChange(true);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.bfLocale) { this.onInternalModelChange(true); }
    if (!!changes.bfFormat) { this.onInternalModelChange(true); }
    if (!!changes.hasOwnProperty('bfMinDate')) { this.ngbMinDate = this.parseModelIn(this.bfMinDate); this.updateStatus(); }
    if (!!changes.hasOwnProperty('bfMaxDate')) { this.ngbMaxDate = this.parseModelIn(this.bfMaxDate); this.updateStatus(); }

    if (changes.hasOwnProperty('bfErrorPos') && this.bfErrorPos) { this.errorPosition = this.bfErrorPos; }

    if (changes.hasOwnProperty('bfLabel')) { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
  }

  ngOnDestroy() {
    if (this.localeSubscription$) {
      this.localeSubscription$.unsubscribe();
    }
  }


  // Convert incoming string to ngb  '2020-01-19' --> { day: 19, month: 1, year: 2020 }
  public parseModelIn = (value: string): NgbDateStruct => {
    if (!value) { return null; }

    // Check expected format 'yyyy-mm-dd'
    if (isNaN(+value[0]) || isNaN(+value[1]) || isNaN(+value[2]) || isNaN(+value[3]) || value[4] !== '-' ||
        isNaN(+value[5]) || isNaN(+value[6]) || value[7] !== '-' || isNaN(+value[8]) || isNaN(+value[9])) {
      console.warn(`Unexpected format: ${value} !== 'yyyy-mm-dd'`);
    }

    const dateArr: Array<string> = value.split('-');

    // Extract year
    const year = parseInt(dateArr[0].slice(0, 4));
    if (Number.isNaN(year)) { return null; }
    const modelOut: NgbDateStruct = { year: +year, month: 1, day: 1 };

    // Extract month
    if (dateArr.length >= 2) {
      const month = parseInt(dateArr[1].slice(0, 2));
      if (!Number.isNaN(month)) { modelOut.month = +month; }
    }

    // Extract day
    if (dateArr.length >= 3) {
      const day = parseInt(dateArr[2].slice(0, 2));
      if (!Number.isNaN(day)) { modelOut.day = +day; }
    }

    return modelOut;
  };

  // Convert incoming ngb to string   { day: 19, month: 1, year: 2020 } --> '2020-01-19'
  public parseModelOut = (value: NgbDateStruct): string => {
    if (!value) { return null; }
    const year  = BfString.pad.call('' + (value.year  || 1), 4).slice(0, 4);
    const month = BfString.pad.call('' + (value.month || 1), 2).slice(0, 2);
    const day   = BfString.pad.call('' + (value.day   || 1), 2).slice(0, 2);
    return year + '-' + month + '-' + day;
  };


  // When the internal modal changes
  public onInternalModelChange = (externalTrigger = false) => {
    if (!externalTrigger) { this.isPristine = false; }

    // https://angular.io/api/common/DatePipe
    this.bfFormattedValue = new DatePipe(this.bfLocale || this.locale || 'en-IE').transform(this.parseModelOut(this.bfModel), this.bfFormat) || '';

    this.updateStatus();
    this.propagateModelUp(this.parseModelOut(this.bfModel), );
    if (!!this.ngControl && this.isPristine) { this.ngControl.markAsPristine(); } // Do not dirty it if pristine
  };


  // Update the internal status of the component
  public updateStatus = () => {
    this.status = 'valid';

    if (this.bfRequired && !this.bfModel) {
      this.status = 'error';
      this.errorText = this.bfErrorText || 'view.common.required_field';
    }

    const minVal = this.getNumDate(this.ngbMinDate, 0);
    const maxVal = this.getNumDate(this.ngbMaxDate, 99999999);
    const modelVal = this.getNumDate(this.bfModel);

    // Check valid range bfMinDate <= bfMaxDate
    if (this.ngbMinDate && this.ngbMaxDate) {
      if (minVal > maxVal) {
        console.warn(`bfMinDate (${this.bfMinDate}) > bfMaxDate (${this.bfMaxDate})`);
        this.ngbMinDate = null;
        this.ngbMaxDate = null;
      }
    }

    if (this.ngbMinDate && this.bfModel && modelVal < minVal) {
      console.warn('Value lower than min', this.bfMinDate, this.bfModel);
      this.status = 'error';
      this.errorText = this.bfErrorText || 'view.common.invalid_value';
    }

    if (this.ngbMaxDate && this.bfModel && modelVal > maxVal) {
      console.warn('Value greater than max', this.bfMaxDate, this.bfModel);
      this.status = 'error';
      this.errorText = this.bfErrorText || 'view.common.invalid_value';
    }

    const today = new Date();
    const todayNum = this.getNumDate({ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }, 0);
    this.isTodayValid = (todayNum >= minVal && todayNum <= maxVal);
  };

  private getNumDate = (date: NgbDateStruct, defaultValue = null): number => {
    return !!date ? (date.year * 10000) + (date.month * 100) + date.day : defaultValue;
  };


  // Click on "X" button to clear the value (turn it null)
  public clearValue = ($event, dpRef) => {
    if(this.bfDisabled)return;
    this.bfModel = null;
    this.onInternalModelChange();

    dpRef.close();
    $event.stopPropagation();
  };


  // Set date to current day
  public setToday = ($event, dpRef) => {
    const today = new Date();
    this.bfModel = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.onInternalModelChange();
    dpRef.close();
  }


  public onEnterPressed = ($event: KeyboardEvent, dpRef: NgbInputDatepicker) => {
    if(this.bfDisabled)return;
    if(!dpRef.isOpen()){
      dpRef.open();
    }
    $event.stopPropagation();
  }

}
