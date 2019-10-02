import {Component, OnInit, Input, Output, EventEmitter, Inject, forwardRef, OnChanges} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { BfUILibTransService} from '../abstract-translate.service';
import {Observable, of} from "rxjs";

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
export class BfTextareaComponent implements OnInit, OnChanges {
  public bfModel: string; // Internal to hold the linked ngModel on the wrapper

  @Input() bfLabel = '';
  @Input() bfRequired = false;
  @Input() bfDisabled = false;
  @Input() bfRows = 4;
  @Input() bfPlaceholder = '';

  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;

  @Input() bfErrorPos = 'top-right';  // top-right, bottom-left, bottom-right

  @Output() bfOnKeyDown = new EventEmitter<any>();  // Emitter when a key is pressed
  @Output() bfOnEsc = new EventEmitter<any>();      // Emitter when esc key is pressed
  @Output() bfOnSave = new EventEmitter<any>();     // Emitter when Ctrl+Enter



  public status = 'pristine';      // pristine, valid, error, loading

  public bfLabelTrans$: Observable<string> = of('');        // Translated text for the label
  public bfPlaceholderTrans$: Observable<string> = of('');  // Translated text for the placeholder
  public bfTooltipTrans$: Observable<string> = of('');      // Translated text for the tooltip


  public errorPosition = 'top-right';
  public errorText = 'Invalid value';

  @ViewChild('ngInputRef') ngInputRef: ElementRef;
  public inputCtrl: FormControl; // <-- ngInputRef.control

  constructor(private translate: BfUILibTransService) {}

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

    if (change.hasOwnProperty('bfLabel'))       { this.bfLabelTrans$       = this.translate.getLabel$(this.bfLabel); }
    if (change.hasOwnProperty('bfPlaceholder')) { this.bfPlaceholderTrans$ = this.translate.getLabel$(this.bfPlaceholder); }
    if (change.hasOwnProperty('bfTooltip'))     { this.bfTooltipTrans$     = this.translate.getLabel$(this.bfTooltip); }

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
  };


  public triggerKey = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) { this.bfOnSave.emit(event); }
    if (event.key === 'Escape') { this.bfOnEsc.emit(event); }
    this.bfOnKeyDown.emit(event);
  }
}
