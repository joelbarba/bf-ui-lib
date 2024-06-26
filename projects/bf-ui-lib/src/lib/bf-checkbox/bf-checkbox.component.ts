import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, forwardRef, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
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
export class BfCheckboxComponent implements ControlValueAccessor, OnChanges {
  @ViewChild('tooltip') tooltip: NgbTooltip;

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
    public readonly elementRef: ElementRef,
    private liveAnnouncer: LiveAnnouncer
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

  onKeyUp($event: KeyboardEvent) {
    if ($event.code === 'Tab' && this.bfTooltip) {
      this.tooltip?.open();
      this._announceForScreenReaders();
    }
  }

  public getAriaLabel(): Observable<string> {
    if (this.bfTooltip.length > 0) {
      return this.bfTooltipTrans$;
    }

    return this.translate.getLabel$(this.bfAriaLabel);
  }

  private _announceForScreenReaders() {
    const tooltipTranslation = this.translate.doTranslate(this.bfTooltip);
    this.liveAnnouncer.announce(tooltipTranslation);
  }
}
