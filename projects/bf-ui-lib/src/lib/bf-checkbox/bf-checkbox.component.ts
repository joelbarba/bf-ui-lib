import {Component, OnInit, Input, forwardRef, OnChanges} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import {BfUILibTransService} from '../abstract-translate.service';

@Component({
  selector: 'bf-checkbox',
  templateUrl: './bf-checkbox.component.html',
  styleUrls: [],
  // encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfCheckboxComponent),
    }
  ]
})
// export class BfCheckboxComponent implements OnInit {
export class BfCheckboxComponent implements ControlValueAccessor, OnInit, OnChanges {
  // @Input() bfModel: boolean = false;
  // @Output() bfModelChange = new EventEmitter<boolean>();
  public bfModel = false;
  @Input() bfLabel = '';
  @Input() bfDisabled = false;
  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;
  @Input() bfImg: string;
  @Input() bfTabIndex = 0;
  @Input() bfAriaLabel;

  public bfLabelText$ = of('');     // Translated text for the label
  public bfTooltipTrans$ = of('');  // Translated text for the tooltip

  constructor(private translate: BfUILibTransService) { }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    this.bfModel = !!value;
  }
  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  ngOnInit() {}

  ngOnChanges(change) {
    if (change.hasOwnProperty('bfLabel'))   { this.bfLabelText$ = this.translate.getLabel$(this.bfLabel);  }
    if (change.hasOwnProperty('bfTooltip')) { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
  }

  onChange(value) {
    this.bfModel = value;
    this.propagateModelUp(value);
    // this.bfModelChange.emit(value);
  }

  keyPressed(evt){
    console.log(evt);
    if(evt.code === 'Enter' || evt.code === 'Space'){
      this.bfModel = !this.bfModel;
      this.onChange(this.bfModel);
    }
  }

}
