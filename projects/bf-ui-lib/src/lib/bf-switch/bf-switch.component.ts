import { Component, forwardRef, Inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BfUILibTransService } from '../abstract-translate.service';
import { Observable, of } from 'rxjs';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'bf-switch',
  templateUrl: './bf-switch.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfSwitchComponent),
    },
  ]
})
export class BfSwitchComponent implements ControlValueAccessor, OnInit, OnChanges {

  // @Output() bfClick = new EventEmitter<any>();
  @Input() bfDisabled = false;
  @Input() bfOnText = 'scripts.common.directives.on_label';
  @Input() bfOffText = 'scripts.common.directives.off_label';

  @Input() bfLabel: string;
  @Input() bfLabelPos: 'top' | 'left' = 'top';
  @Input() bfTooltip: string;
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody: boolean;
  @Input() bfTabIndex = 0;

  @ViewChild('tooltip') tooltip: NgbTooltip;

  public bfModel = false; // Internal holding of the ngModel

  public bfOnText$: Observable<string> = of(''); // Translated text for the ON label
  public bfOffText$: Observable<string> = of(''); // Translated text for the OFF label
  constructor(
    @Inject(BfUILibTransService) private translate: BfUILibTransService,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.bfOnText$ = this.translate.getLabel$(this.bfOnText);
    this.bfOffText$ = this.translate.getLabel$(this.bfOffText);
  }

  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    this.bfModel = !!value;
  }
  public propagateModelUp = (_: boolean) => { }; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ----------------


  ngOnInit() { }

  ngOnChanges(change) {
    if (change.hasOwnProperty('bfOnText')) { this.bfOnText$ = this.translate.getLabel$(this.bfOnText); }
    if (change.hasOwnProperty('bfOffText')) { this.bfOffText$ = this.translate.getLabel$(this.bfOffText); }
  }

  public onSwitch() {
    if (!this.bfDisabled) {
      this.bfModel = !this.bfModel;
      this.propagateModelUp(this.bfModel);
    }
  }

  onKeyUp($event) {
    if ($event.code === 'Tab' && this.bfTooltip) {
      this.tooltip.open();
      this.announceForScreenReaders();
    }
    if ($event.code === 'Space') {
      $event.preventDefault();
      this.onSwitch();
    }
  };

  onKeyDown($event) {
    if ($event.code === 'Tab' && this.bfTooltip) {
      this.tooltip.close();
    }
    if ($event.code === 'Space') {
      $event.preventDefault();
    }
  };

  announceForScreenReaders() {
    const tooltipTranslation = this.translate.doTranslate(this.bfTooltip);
    this.liveAnnouncer.announce(tooltipTranslation);
  }

}
