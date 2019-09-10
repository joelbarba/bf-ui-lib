import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, forwardRef, Inject, OnChanges} from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import {Observable, of} from 'rxjs';
import {AbstractTranslateService} from '../abstract-translate.service';

@Component({
  selector: 'bf-radio',
  templateUrl: './bf-radio.component.html',
  styleUrls: ['./bf-radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfRadioComponent),
    }
  ]
})
// export class BfCheckboxComponent implements OnInit {
export class BfRadioComponent implements ControlValueAccessor, OnInit, OnChanges {
  // @Input() bfModel: boolean = false;
  // @Output() bfModelChange = new EventEmitter<boolean>();
  public bfModel = false;
  @Input() bfLabel = '';
  @Input() bfValue: string = null;
  @Input() bfRadioGroup = 'radio-group';
  @Input() bfDisabled = false;
  @Input() bfRequired = false;


  public bfLabelTrans$: Observable<string> = of('');        // Translated text for the button

  constructor(
    @Inject('BfUILibTransService') private translate: AbstractTranslateService,
  ) { }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    if (value !== undefined) { this.bfModel = value; }
  }
  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  ngOnInit() {}

  onChange(value) {
    this.bfModel = value;
    this.propagateModelUp(value);
    // this.bfModelChange.emit(value);
  }

  ngOnChanges(change) {

    // Generate new observables for the dynamic text
    if (change.hasOwnProperty('bfLabel')) { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
  }
}
