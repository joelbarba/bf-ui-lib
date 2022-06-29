import { Component, Input, forwardRef, OnChanges, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
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
export class BfCheckboxComponent implements ControlValueAccessor, OnChanges {
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
  @Input() bfAriaLabel: string;

  public bfLabelText$ = of('');     // Translated text for the label
  public bfTooltipTrans$ = of('');  // Translated text for the tooltip

  constructor(
    private readonly translate: BfUILibTransService,
    public readonly elementRef: ElementRef
  ) { }

  // ------- ControlValueAccessor -----
  writeValue(value: any) {
    this.bfModel = !!value;
  }
  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  ngOnChanges(change) {
    if (change.hasOwnProperty('bfLabel'))   { this.bfLabelText$ = this.translate.getLabel$(this.bfLabel);  }
    if (change.hasOwnProperty('bfTooltip')) { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
  }

  onChange(value) {
    this.bfModel = value;
    this.propagateModelUp(value);
    // this.bfModelChange.emit(value);
  }

  keyPressed(evt: KeyboardEvent){
    if(evt.code === 'Space' && !this.bfDisabled){
      evt.preventDefault();
      this.bfModel = !this.bfModel;
      this.onChange(this.bfModel);
    }
  }

  public getAriaLabel(): Observable<string> {
    if (this.bfTooltip.length > 0) {
      return this.bfTooltipTrans$;
    }

    return this.translate.getLabel$(this.bfAriaLabel);
  }
}
