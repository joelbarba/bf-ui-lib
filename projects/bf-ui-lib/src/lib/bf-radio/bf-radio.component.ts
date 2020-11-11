import {Component, OnInit, Input, forwardRef, OnChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {of} from 'rxjs';
import {BfUILibTransService} from '../abstract-translate.service';

@Component({
  selector: 'bf-radio',
  templateUrl: './bf-radio.component.html',
  styleUrls: [],
  // encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfRadioComponent),
    }
  ]
})
// export class BfCheckboxComponent implements OnInit {
export class BfRadioComponent implements ControlValueAccessor, OnInit, OnChanges {
  public bfModel = false;
  @Input() bfLabel = '';
  @Input() bfValue: string = null;
  @Input() bfRadioGroup = 'radio-group';
  @Input() bfDisabled = false;
  @Input() bfRequired = false;
  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;
  @Input() bfIcon = '';


  public bfLabelTrans$ = of('');        // Translated text for the button
  public bfTooltipTrans$ = of('');  // Translated text for the tooltip

  constructor(
    private translate: BfUILibTransService,
  ) { }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    this.bfModel = value;
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
    if (change.hasOwnProperty('bfLabel'))   { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
    if (change.hasOwnProperty('bfTooltip')) { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
  }
}
