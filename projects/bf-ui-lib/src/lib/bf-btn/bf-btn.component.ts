import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BfUILibTransService} from '../abstract-translate.service';
import { BfUiLibService } from '../bf-ui-lib.service';
import { Observable, of} from 'rxjs';

@Component({
  selector: 'bf-btn',
  templateUrl: './bf-btn.component.html',
  // encapsulation: ViewEncapsulation.None
})
export class BfBtnComponent implements OnInit, OnChanges {
  @Input() bfAsyncPromise: Promise<any>;
  @Input() bfAsyncGroup = 'all';
  @Input() bfAsyncClick;

  @Output() bfClick = new EventEmitter<any>();
  @Input() bfText: string;
  @Input() bfType = ''; // save, update, add, delete, cancel
  @Input() bfIcon = 'icon-arrow-right3';
  @Input() bfIconPos      = 'right';
  @Input() bfDisabled     = false;
  @Input() bfTooltip      = '';
  @Input() bfTooltipPos   = 'top';
  @Input() bfTooltipBody  = true;
  @Input() bfDisabledTip  = '';

  @Input() bfToggle = false;
  @Output() bfToggleChange = new EventEmitter<boolean>();

  public btnClass = 'primary';
  public textLabel: string;  // Internal label to display (can be either from bfText or defaulted from bfType)

  public bfTextTrans$: Observable<string> = of('');        // Translated text for the button
  public bfTooltipTrans$: Observable<string> = of('');     // Translated text for the tooltip of the label
  public bfDisabledTipTrans$: Observable<string> = of(''); // Translated text for the tooltip when disabled

  private hasIcon = false;  // If a bfIcon is linked, do not set it internally

  public isLoading = false;

  constructor(
    private translate: BfUILibTransService,
    public libService: BfUiLibService
  ) { }

  ngOnInit() { }

  ngOnChanges(change) {
    // console.log('BF-BTN', new Date(), this.translate);
    if (change.hasOwnProperty('bfIcon') && !!change.bfIcon.currentValue) { this.hasIcon = true; }

    if (!this.hasIcon) { this.bfIcon = 'icon-arrow-right3'; }
    if (!this.hasIcon && change.hasOwnProperty('bfToggle')) {
      this.bfIcon = this.bfToggle ? 'icon-arrow-up3' : 'icon-arrow-down3';
    }

    if (change.hasOwnProperty('bfType')) {
      if (!!this.bfType) { this.btnClass = this.bfType; }
      let typeText = '';
      if (this.bfType === 'search')   { this.btnClass = 'primary';   this.bfIcon = 'icon-search';       typeText = 'view.common.search';  }
      if (this.bfType === 'edit')     { this.btnClass = 'primary';   this.bfIcon = 'icon-pencil';       typeText = 'view.common.edit';    }
      if (this.bfType === 'save')     { this.btnClass = 'primary';   this.bfIcon = 'icon-arrow-right3'; typeText = 'view.common.save';    }
      if (this.bfType === 'update')   { this.btnClass = 'primary';   this.bfIcon = 'icon-arrow-right3'; typeText = 'views.common.update'; }
      if (this.bfType === 'add')      { this.btnClass = 'primary';   this.bfIcon = 'icon-plus';         typeText = 'view.common.add';     }
      if (this.bfType === 'delete')   { this.btnClass = 'tertiary';  this.bfIcon = 'icon-cross';        typeText = 'view.common.delete';  }
      if (this.bfType === 'cancel')   { this.btnClass = 'secondary'; this.bfIcon = 'icon-blocked';      typeText = 'view.common.cancel';  }
      if (this.bfType === 'expand')   { this.btnClass = 'secondary'; this.bfIcon = 'icon-arrow-down3'; }
      if (this.bfType === 'collapse') { this.btnClass = 'secondary'; this.bfIcon = 'icon-arrow-up3'; }
      if (!this.bfText) {
        this.textLabel = typeText;
        this.bfTextTrans$ = this.translate.getLabel$(this.textLabel);
      }
    }

    // Generate new observables for the dynamic text
    if (change.hasOwnProperty('bfText')) {
      this.textLabel = this.bfText;
      this.bfTextTrans$ = this.translate.getLabel$(this.textLabel);
    }
    if (change.hasOwnProperty('bfTooltip'))     { this.bfTooltipTrans$     = this.translate.getLabel$(this.bfTooltip); }
    if (change.hasOwnProperty('bfDisabledTip')) { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }


    // If new async blocking promise, block buttons until that is resolved
    if (change.hasOwnProperty('bfAsyncPromise') || change.hasOwnProperty('bfAsyncGroup')) {
      this.initLoadingPromise();
    }

  }

  private initLoadingPromise = () => {
    if (!!this.bfAsyncPromise && Object.prototype.toString.call(this.bfAsyncPromise) === '[object Promise]') {
      this.isLoading = true;
      this.bfAsyncPromise.then(() => {
        this.isLoading = false;
      });
      // this.libService[this.bfAsyncGroup] = new BehaviorSubject(false);
      // this.bfAsyncPromise.then(
      //   () => { delete this.libService[this.bfAsyncGroup]; },
      //   () => { delete this.libService[this.bfAsyncGroup]; }
      // );
    } else {
      this.isLoading = false;
      // delete this.libService[this.bfAsyncGroup];
    }
  };


  public btnClick = ($event) => {
    // If there's an async click callback function, trigger it and wait for the promise
    if (!!this.bfAsyncClick && typeof this.bfAsyncClick === 'function') {
      this.bfAsyncPromise = this.bfAsyncClick();
      this.initLoadingPromise();
    }

    // Internal toggle
    this.bfToggle = !this.bfToggle;
    this.bfToggleChange.emit(this.bfToggle);

    this.bfClick.emit($event);
  };

}

