import {
  Component,
  OnInit,
  Input,
  forwardRef,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef, Inject
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BfUILibTransService} from '../abstract-translate.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import BfString from '../bf-prototypes/string.prototype';
import {DatePipe, registerLocaleData} from "@angular/common";
import localeZhCN from "@angular/common/locales/zh-Hans";

@Component({
  selector: 'bf-date-picker',
  templateUrl: './bf-date-picker.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfDatePickerComponent)
    },
  ]
})
export class BfDatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  public bfModel: NgbDateStruct; // Internal to hold the ngModel inside the wrapper

  @Input() bfLabel = '';
  @Input() bfRequired = false;
  @Input() bfDisabled = false;
  @Input() bfLocale = 'en-IE';      // To format the date to display in the input. MAKE SURE THEY ARE CONFIG registerLocaleData(localeZhCN, 'zh-CN');
  @Input() bfFormat = 'shortDate';  // Format to display the date
  @Input() bfIcon = 'icon-calendar4';
  @Input() bfMinDate: string;   // 'yyyy-mm-dd'
  @Input() bfMaxDate: string;   // 'yyyy-mm-dd'

  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;

  @Input() bfErrorPos = 'top-right';  // top-right, bottom-left, bottom-right
  @Input() bfErrorText = 'view.common.invalid_value'; // Error text to display when invalid value


  @ViewChild('ngInputRef') ngInputRef: ElementRef;
  public inputCtrl: FormControl; // <-- ngInputRef.control

  public status = 'pristine';      // pristine, valid, error, loading
  public errorPosition = 'default';
  public bfFormattedValue = '10/01/2020';   // String to display in the input


  // public bfModelControl = new FormControl();
  //
  // @Input() bfTimeZone: string;
  // @Input() bfFormat: string;
  // @Input() bfTime: string;
  //
  // private modelInput: string;
  // private modelDate: NgbDate;
  // private haveFooterButtons = true;
  // private originalModel: moment.Moment;
  // private datePickerConfig = {
  //   maxDate: null,
  //   minDate: null
  // };
  // private bfModelControlSubscription: Subscription;

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
    console.log('writeValue -> ', value);

    this.bfModel = this.parseModelIn(value);
    setTimeout(this.onInternalModelChange);  // Update status (after internal ngModel cycle)

    // Set the value to the internal formControl to force the internal validators run
    // so when the external validate() is triggered after this it gets the last value
    if (!!this.inputCtrl) {
      this.inputCtrl.setValue(this.bfModel, { // https://angular.io/api/forms/FormControl#setValue
        emitViewToModelChange: false,
        // emitModelToViewChange: false,
        // emitEvent: false,
      });
    }
  };


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the state of the internal ngModel
  public validate = (extFormCtrl: FormControl) => {
    // extFormCtrl     <-- FormControl of the external ngModel
    // this.inputCtrl  <-- FormControl of the internal ngModel
    // this.ngInputRef <-- This is the reference of the internal <input> tag
    let result = null;  // null means valid

    // If internal ngModel is invalid, external is invalid too
    if (!!this.inputCtrl && this.inputCtrl.status === 'INVALID') { // status: [VALID, INVALID, PENDING, DISABLED]
      result = this.inputCtrl.errors;
    }
    // console.log('validate', 'Internal FormControl:', this.inputCtrl.status, ' / External FormControl:', extFormCtrl.status, result);
    return result;
  };



  ngOnInit() {
    // moment.locale(this.bfLocale || moment.locale());
    // this.bfIcon = this.bfIcon || 'icon-calendar4';
    // this.bfFormat = this.bfFormat || 'L';
    // this.originalModel = this.existTheControlValue() ? moment(this.bfModelControl.value) : null;
    // this.bfModelControlSubscription = this.bfModelControl.valueChanges.subscribe(() => {
    //   this.setModelInput();
    //   this.updateCalendar();
    //   this.createRangeDatepickerConfig();
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.bfLocale) {
      this.onInternalModelChange();
    }
  }

  ngOnDestroy() {
    // this.bfModelControlSubscription.unsubscribe();
  }

  public updateStatus = () => {
    // if (!!this.inputCtrl) {
    //   if (this.inputCtrl.pristine) { this.status = 'pristine'; }
    //   if (this.inputCtrl.dirty)    { this.status = 'dirty'; }
    //
    //   // if (this.inputCtrl.status === 'INVALID') { // <--- If we have to show error on pristine
    //   if (this.inputCtrl.status === 'INVALID' && !this.inputCtrl.pristine)   {
    //     this.status = 'error';
    //
    //     if (!this.bfErrorText) {
    //       if (this.inputCtrl.errors.required)  { this.errorTextTrans$ = this.errTxtRequired$; }
    //       if (this.inputCtrl.errors.minlength) { this.errorTextTrans$ = this.errTxtMinLen$; }
    //       if (this.inputCtrl.errors.maxlength) { this.errorTextTrans$ = this.errTxtMaxLen$; }
    //     }
    //   }
    // }
  };

  // Convert incoming string to ngb  '2020-01-19' --> { day: 19, month: 1, year: 2020 }
  public parseModelIn = (value: string): NgbDateStruct => {
    console.log('parseModelIn', value);
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

    // Validate date
    // const date1 = new Date(this.parseModelOut(modelOut));
    // if (modelOut.day !== date1.getDate() ||
    //     modelOut.month !== (date1.getMonth() + 1) ||
    //     modelOut.year !== date1.getFullYear()) {
    //   console.warn('Invalid date', modelOut);
    //   return null;
    // }

    return modelOut;
  };

  // Convert incoming ngb to string   { day: 19, month: 1, year: 2020 } --> '2020-01-19'
  public parseModelOut = (value: NgbDateStruct): string => {
    console.log('parseModelOut', value);
    if (!value) { return null; }
    const year  = BfString.pad.call('' + (value.year  || 1), 4).slice(0, 4);
    const month = BfString.pad.call('' + (value.month || 1), 2).slice(0, 2);
    const day   = BfString.pad.call('' + (value.day   || 1), 2).slice(0, 2);
    return year + '-' + month + '-' + day;
  };



  public onInternalModelChange = () => {
    console.log('onInternalModelChange');

    // https://angular.io/api/common/DatePipe
    this.bfFormattedValue = new DatePipe(this.bfLocale).transform(this.parseModelOut(this.bfModel), this.bfFormat);

    this.propagateModelUp(this.parseModelOut(this.bfModel));
    this.updateStatus();
  };



  // Click on "X" button to clear the value (turn it null)
  public clearValue = ($event, dpRef) => {
    this.bfModel = null;
    this.onInternalModelChange();

    dpRef.close();
    $event.stopPropagation();
  };

  public setToday = () => {
    const today = new Date();
    this.bfModel = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.onInternalModelChange();
  }














  // createRangeDatepickerConfig() {
  //   this.bfMaxDate = !!this.bfMinDate && this.bfMinDate.isAfter(this.bfMaxDate) ? moment(this.bfMinDate) : this.bfMaxDate;
  //   if (this.existTheControlValue() && !!this.bfMinDate && this.bfMinDate.isAfter(this.bfModelControl.value)) {
  //     this.writeValue(this.bfMinDate);
  //   }
  //   if (this.existTheControlValue() && !!this.bfMaxDate && this.bfMaxDate.isBefore(this.bfModelControl.value)) {
  //     this.writeValue(this.bfMaxDate);
  //   }
  //   this.datePickerConfig = {
  //     maxDate: this.momentToNgbDate(this.bfMaxDate),
  //     minDate: this.momentToNgbDate(this.bfMinDate)
  //   };
  // }
  //
  // existTheControlValue() {
  //   return !!this.bfModelControl && !!this.bfModelControl.value && typeof this.bfModelControl.value !== 'function';
  // }
  //
  // selectDateForNgModel(date: NgbDateStruct) {
  //   this.writeValue(moment([date.year, date.month - 1, date.day]));
  // }
  //
  // momentToNgbDate(date: moment.Moment): NgbDate {
  //   return !!date ? new NgbDate(date.year(), date.month() + 1, date.date()) : null;
  // }
  //
  // updateCalendar() {
  //   const date = this.momentToNgbDate(this.bfModelControl.value);
  //   if (!date || !this.modelDate || !date.equals(this.modelDate)) {
  //     this.modelDate = date;
  //   }
  // }
  //
  // setModelInput() {
  //   // tslint:disable-next-line:max-line-length
  //   this.modelInput = this.existTheControlValue() ? this.bfModelControl.value.format(this.bfFormat) + (!!this.bfTime ? ' ' + this.bfTime : '') + (!!this.bfTimeZone ? ' - ' + this.bfTimeZone : '') : null;
  // }
  //
  // today(calendar) {
  //   const now = new Date();
  //   this.selectDateForNgModel({
  //     year: now.getFullYear(),
  //     month: now.getMonth(),
  //     day: now.getDay()
  //   });
  //   this.close(calendar);
  // }
  //
  // cancel() {
  //   this.writeValue(this.originalModel);
  // }
  //
  // close(calendar) {
  //   this.originalModel = moment(this.bfModelControl.value);
  //   calendar.toggle();
  // }
  //
  // // ------- ControlValueAccessor ----- //
  //
  // onChange: any = (_: any) => {};
  // onTouch: any = () => {};
  //
  // // this method sets the value programmatically
  // writeValue(value) {
  //   // Set the value in model control
  //   this.bfModelControl.setValue(value);
  //   // Propagate to the parent model
  //   this.onChange(this.bfModelControl.value);
  // }
  //
  // // Upon UI element value changes, this method gets triggered
  // registerOnChange(fn: any) {
  //   this.onChange = fn;
  // }
  // // Upon touching the element, this method gets triggered
  // registerOnTouched(fn: any) {
  //   this.onTouch = fn;
  // }

}
