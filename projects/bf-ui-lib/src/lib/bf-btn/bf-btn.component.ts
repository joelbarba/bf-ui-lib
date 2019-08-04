import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Inject } from '@angular/core';
import { AbstractTranslateService } from '../abstract-translate.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { BfUiLibService } from '../bf-ui-lib.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'bf-btn',
  templateUrl: './bf-btn.component.html',
  styleUrls: ['./bf-btn.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BfBtnComponent implements OnInit {

  @Input() bfAsyncPromise;
  @Input() bfAsyncClick;

  @Output() bfClick = new EventEmitter<any>();
  @Input() bfText: string = '';
  @Input() bfType: string = ''; // save, update, add, delete, cancel
  @Input() bfIcon: string = 'icon-arrow-right3';
  @Input() bfIconPos: string = 'right';
  @Input() bfDisabled: boolean = false;
  @Input() bfTooltip     : string = '';
  @Input() bfTooltipPos  : string = 'top';
  @Input() bfTooltipBody : boolean = true;
  @Input() bfDisabledTip : string = '';

  public btnClass: string = 'primary';

  public bfTextTrans$: Observable<string> = of('');        // Translated text for the button
  public bfTooltipTrans$: Observable<string> = of('');     // Translated text for the tooltip of the label
  public bfDisabledTipTrans$: Observable<string> = of(''); // Translated text for the tooltip when disabled


  constructor(
    @Inject('TranslateService') private translate: AbstractTranslateService,
    private config: NgbPopoverConfig,
    public libService: BfUiLibService
  ) {
  }

  ngOnInit() { }

  ngOnChanges(change) {
    if (!this.bfIcon) { this.bfIcon = 'icon-arrow-right3'; }

    if (change.hasOwnProperty('bfType')) {
      if (!!this.bfType) { this.btnClass = this.bfType; }
      if (this.bfType === 'edit')     { this.btnClass = 'primary';   this.bfIcon = 'icon-pencil'; }
      if (this.bfType === 'save')     { this.btnClass = 'primary';   this.bfIcon = 'icon-arrow-right3'; }
      if (this.bfType === 'update')   { this.btnClass = 'primary';   this.bfIcon = 'icon-arrow-right3'; }
      if (this.bfType === 'add')      { this.btnClass = 'primary';   this.bfIcon = 'icon-plus'; }
      if (this.bfType === 'delete')   { this.btnClass = 'tertiary';  this.bfIcon = 'icon-cross'; }
      if (this.bfType === 'cancel')   { this.btnClass = 'secondary'; this.bfIcon = 'icon-blocked'; }
      if (this.bfType === 'expand')   { this.btnClass = 'secondary'; this.bfIcon = 'icon-arrow-down3'; }
      if (this.bfType === 'collapse') { this.btnClass = 'secondary'; this.bfIcon = 'icon-arrow-up3'; }
    }

    // Generate new observables for the dynamic text
    if (change.hasOwnProperty('bfText'))        { this.bfTextTrans$        = this.translate.getLabel$(this.bfText); }
    if (change.hasOwnProperty('bfTooltip'))     { this.bfTooltipTrans$     = this.translate.getLabel$(this.bfTooltip); }
    if (change.hasOwnProperty('bfDisabledTip')) { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }

    // If new async blocking promise, block buttons until that is resolved
    if (change.hasOwnProperty('bfAsyncPromise')) {
      this.initLoadingPromise();
    }
  }

  private initLoadingPromise = () => {
    if (!!this.bfAsyncPromise && Object.prototype.toString.call(this.bfAsyncPromise) === '[object Promise]') {
      this.libService.loadingPromise = this.bfAsyncPromise;
      this.libService.isBtnLoading = true;

      this.libService.loadingPromise.then(
        () => { this.libService.isBtnLoading = false; },
        () => { this.libService.isBtnLoading = false; });
    } else {
      this.libService.isBtnLoading = false;
    }
  };


  public btnClick = ($event) => {
    // If there's an async click callback function, trigger it and wait for the promise
    if (!!this.bfAsyncClick && typeof this.bfAsyncClick === 'function') {
      this.bfAsyncPromise = this.bfAsyncClick();
      this.initLoadingPromise();
    }

    this.bfClick.emit($event);
  };

}

