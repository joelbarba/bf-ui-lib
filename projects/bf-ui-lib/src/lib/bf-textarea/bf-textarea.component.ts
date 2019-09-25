import { Component, OnInit, Input, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import {AbstractTranslateService, BfUILibTransService} from '../abstract-translate.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';

@Component({
  selector: 'bf-textarea',
  templateUrl: './bf-textarea.component.html',
  styleUrls: ['./bf-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfTextareaComponent),
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfTextareaComponent),
    }
  ]
})
export class BfTextareaComponent implements OnInit {
// export class BfInputComponent implements OnInit {
  // @Output() bfModelChange = new EventEmitter<string>();
  // @Input() bfModel: string;

  public bfModel: string; // Internal to hold the linked ngModel on the wrapper

  @Input() bfLabel: string = '';
  @Input() bfRequired: boolean = false;
  @Input() bfDisabled: boolean = false;
  @Input() bfRows = 4;
  @Input() bfPlaceholder: string = '';

  @Input() bfTooltip    : string = '';
  @Input() bfTooltipPos : string = 'top';
  @Input() bfTooltipBody : boolean = true;

  @Input() bfErrorPos: string = 'top-right';  // top-right, bottom-left, bottom-right

  @Output() bfOnKeyDown = new EventEmitter<any>();  // Emitter when a key is pressed
  @Output() bfOnEsc = new EventEmitter<any>();      // Emitter when esc key is pressed
  @Output() bfOnSave = new EventEmitter<any>();     // Emitter when Ctrl+Enter



  public status : string = 'pristine';      // pristine, valid, error, loading

  public bfLabelTrans: string = '';         // Translated text for the label
  public bfTooltipTrans: string = '';       // Translated text for the tooltip of the label

  public bfPlaceholderTrans: string = '';   // Translated text for the placeholder of the input
  public errorPosition: string = 'top-right';
  public errorText: string = 'Invalid value';

  @ViewChild('ngInputRef') ngInputRef: ElementRef;
  public inputCtrl: FormControl; // <-- ngInputRef.control

  constructor(
    private translate: BfUILibTransService,
    private config: NgbPopoverConfig) {
  }


  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    // console.log('writeValue -> ', value, this.ngInputRef);
    if (value !== undefined) {
      this.bfModel = value ? value: '';
      this.updateStatus();
      // this.inputCtrl.updateValueAndValidity(value);

      // After one cycle, set the value to the formControl, so the validate() gets the last
      // state in "inputCtrl.status" when updating ngModel outer link
      if (!!this.inputCtrl) {
        setTimeout(() => {
          // https://angular.io/api/forms/FormControl#setValue
          this.inputCtrl.setValue(this.bfModel, {
            emitViewToModelChange: false,
            // emitModelToViewChange: false,
            // emitEvent: false,
          });
        });
      }
    }
  }

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALIDATORS ---> outer formControl validation
  validate(control: FormControl) {
    // console.log('validate', this.inputCtrl.status, this.ngInputRef.status, this.ngInputRef.value);
    // control.updateValueAndValidity();

    if (!!this.inputCtrl && this.inputCtrl.status === 'INVALID') {  // If internal ngModel is invalid, external is invalid too
      // return {'incorrect': true};
      return { 'required': false };
      // control.setErrors({ notUnique: true });
      // control.updateValueAndValidity();
      // return { notUnique: true };
    } else {
      return null;
    }

    // TODO ---> https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
    // Check there how to do proper custom validators
  }

  public isValid = () => {
    return 'yes';
  }

  // ------------------------------------

  ngOnChanges(change) { // Translate bfText whenever it changes
    // console.log('ngOnChanges', change);
    // console.log('this.ngInputRef', this.ngInputRef);

    // Link the formControl form the <input #ngInputRef="ngModel"> to "this.inputCtrl"
    if (!!this.ngInputRef['control'] && !this.inputCtrl) {
      //noinspection TypeScriptUnresolvedVariable
      this.inputCtrl = this.ngInputRef['control'];
    }

    if (!!this.translate.doTranslate) {
      if (!!change.bfLabel)       { this.bfLabelTrans = this.translate.doTranslate(this.bfLabel); }
      if (!!change.bfTooltip)     { this.bfTooltipTrans = this.translate.doTranslate(this.bfTooltip); }
      if (!!change.bfPlaceholder) { this.bfPlaceholderTrans = this.translate.doTranslate(this.bfPlaceholder); }
    } else {
      if (!!change.bfLabel)       { this.bfLabelTrans = this.bfLabel; }
      if (!!change.bfTooltip)     { this.bfTooltipTrans = this.bfTooltip; }
      if (!!change.bfPlaceholder) { this.bfPlaceholderTrans = this.bfPlaceholder; }
    }

    this.propagateModelUp(this.bfModel);
    this.updateStatus();
  }


  ngOnInit() { }

  public updateStatus = () => {
    if (!!this.inputCtrl) {
      if (this.inputCtrl.pristine) { this.status = 'pristine'; }
      if (this.inputCtrl.dirty)    { this.status = 'dirty'; }

      // if (this.inputCtrl.status === 'INVALID') { // <--- If we have to show error on pristine
      if (this.inputCtrl.status === 'INVALID' && !this.inputCtrl.pristine)   {
        this.status = 'error';
      }
    }
  };


  public parseModelChange = (value) => {
    this.bfModel = value;
    // this.inputCtrl.updateValueAndValidity();
    // console.log('propagateModelUp -> ', this.bfModel);
    this.propagateModelUp(this.bfModel);
    this.updateStatus();
    // this.bfModelChange.emit(this.bfModel);
  }


  public triggerKey = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) { this.bfOnSave.emit(event); }
    if (event.key === 'Escape') { this.bfOnEsc.emit(event); }
    this.bfOnKeyDown.emit(event);
  }
}
