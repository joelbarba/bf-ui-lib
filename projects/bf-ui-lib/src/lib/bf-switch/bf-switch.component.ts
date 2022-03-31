import { Component, forwardRef, HostBinding, Inject, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BfUILibTransService } from '../abstract-translate.service';
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
export class BfSwitchComponent implements ControlValueAccessor{
  @Input() bfDisabled = false;
  @Input() bfOnText = 'scripts.common.directives.on_label';
  @Input() bfOffText = 'scripts.common.directives.off_label';

  @Input() bfLabel: string;
  @Input() bfTooltip: string;
  @Input() bfTooltipPos = 'top';
  @Input() bfDisabledTip = '';
  @Input() bfTooltipBody: boolean;
  @Input() bfTabIndex = 0;

  @ViewChild('tooltip') tooltip: NgbTooltip;

  public bfModel = false; // Internal holding of the ngModel


  // Keep these 2 to allow retro-compatibility
  @Input() bfLabelPos: 'top' | 'left';
  @Input() bfValueTextPos: 'left' | 'right' = 'right';
  @HostBinding('class.horizontal')
  public get labelHorizontal(): boolean { return this.bfLabelPos === 'left'; }
  @HostBinding('class.value-left')
  public get labelLeft(): boolean { return this.bfValueTextPos === 'left'; }


  constructor(
    @Inject(BfUILibTransService) private translate: BfUILibTransService,
    private liveAnnouncer: LiveAnnouncer
  ) {}

  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    this.bfModel = !!value;
  }
  public propagateModelUp = (_: boolean) => { }; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }

  // ----------------


  public onSwitch() {
    if (!this.bfDisabled) {
      this.bfModel = !this.bfModel;
      this.propagateModelUp(this.bfModel);
    }
  }

  onKeyUp($event) {
    if ($event.code === 'Tab' && this.bfTooltip) {
      this.tooltip.open();
      // TODO dynamically assign aria-describedby to the tooltip element rather then screen announcer
      this.announceForScreenReaders();
    }
    if ($event.code === 'Space') {
      $event.preventDefault();
      this.onSwitch();
    }
  }

  onKeyDown($event) {
    if ($event.code === 'Tab' && this.bfTooltip) {
      this.tooltip.close();
    }
    if ($event.code === 'Space') {
      $event.preventDefault();
    }
  }

  announceForScreenReaders() {
    const tooltipTranslation = this.translate.doTranslate(this.bfTooltip);
    this.liveAnnouncer.announce(tooltipTranslation);
  }

}
