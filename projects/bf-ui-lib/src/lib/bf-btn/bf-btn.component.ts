import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BfUILibTransService } from '../abstract-translate.service';
import { BfArray } from '../bf-prototypes/bf-prototypes';
import { BfBtnType } from './abstractions/types/bf-btn.type';

@Component({
  selector: 'bf-btn',
  templateUrl: './bf-btn.component.html',
})
export class BfBtnComponent implements OnInit, OnChanges {
  @ViewChild('bfBtn') _btn: ElementRef<HTMLButtonElement>;

  @Input() bfAsyncPromise: Promise<any>;
  @Input() bfAsyncClick;

  @Output() bfClick = new EventEmitter<any>();
  @Input() bfText: string;
  @Input() bfType: BfBtnType; // save, update, add, delete, cancel
  @Input() bfIcon: string;
  @Input() bfIconPos      = 'right';
  @Input() bfDisabled     = false;
  @Input() bfTooltip      = '';
  @Input() bfTooltipPos   = 'top';
  @Input() bfTooltipBody  = true;
  @Input() bfDisabledTip  = '';
  @Input() bfTabIndex = 0;
  @Input() bfToggle = false;
  @Input() bfAriaLabel;
  @Output() bfToggleChange = new EventEmitter<boolean>();

  public btnClass = 'primary';
  public textLabel: string;  // Internal label to display (can be either from bfText or defaulted from bfType)
  public btnIcon: string;    // Internal icon to display (usually from bfIcon)
  public typeIcon: string;   // Default button icon preset by bfType

  public bfTextTrans$: Observable<string> = of('');        // Translated text for the button
  public bfTooltipTrans$: Observable<string> = of('');     // Translated text for the tooltip of the label
  public bfDisabledTipTrans$: Observable<string> = of(''); // Translated text for the tooltip when disabled

  public isToggle = false;  // Whether the button is used as a toggle
  public isLoading = false;

  constructor(
    private translate: BfUILibTransService,
    public elementRef: ElementRef
  ) { }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('bfToggle') && this.bfToggle !== null) { this.isToggle = true; }

    if (changes.hasOwnProperty('bfType')) {
      if (!!this.bfType) { this.btnClass = this.bfType; }
      let typeText = '';
      const onlyIcon = BfArray.getLast.call((this.bfType || '').split('-')) === 'icon';
      const bfType = (this.bfType || '').split('-icon')[0]; // Remove -icon suffix

      if (bfType === 'search')   { this.btnClass = 'primary';    this.typeIcon = 'icon-search';         typeText = 'view.common.search';  }
      if (bfType === 'edit')     { this.btnClass = 'primary';    this.typeIcon = 'icon-pencil';         typeText = 'view.common.edit';    }
      if (bfType === 'save')     { this.btnClass = 'primary';    this.typeIcon = 'icon-checkmark3';     typeText = 'view.common.save';    }
      if (bfType === 'update')   { this.btnClass = 'primary';    this.typeIcon = 'icon-arrow-right3';   typeText = 'views.common.update'; }
      if (bfType === 'add')      { this.btnClass = 'primary';    this.typeIcon = 'icon-plus';           typeText = 'view.common.add';     }
      if (bfType === 'delete')   { this.btnClass = 'tertiary';   this.typeIcon = 'icon-bin';            typeText = 'view.common.delete';  }
      if (bfType === 'remove')   { this.btnClass = 'tertiary';   this.typeIcon = 'icon-minus';          typeText = 'view.common.remove';  }
      if (bfType === 'cancel')   { this.btnClass = 'secondary';  this.typeIcon = 'icon-blocked';        typeText = 'view.common.cancel';  }
      if (bfType === 'view')     { this.btnClass = 'primary';    this.typeIcon = 'icon-eye';            typeText = 'view.common.view'; }
      if (bfType === 'prev')     { this.btnClass = 'quaternary'; this.typeIcon = 'icon-arrow-left6';    typeText = 'view.common.previous'; }
      if (bfType === 'next')     { this.btnClass = 'primary';    this.typeIcon = 'icon-arrow-right3';   typeText = 'view.common.next'; }
      if (bfType === 'download') { this.btnClass = 'primary';    this.typeIcon = 'icon-download52';     typeText = 'view.common.download'; }
      if (bfType === 'upload')   { this.btnClass = 'primary';    this.typeIcon = 'icon-upload5';        typeText = 'view.common.upload'; }
      if (bfType === 'reset')    { this.btnClass = 'secondary';  this.typeIcon = 'icon-blocked';        typeText = 'view.common.resetFilters'; }
      if (bfType === 'refresh')  { this.btnClass = 'primary';    this.typeIcon = 'icon-loop2';          typeText = 'view.common.refresh'; }
      if (bfType === 'import')   { this.btnClass = 'primary';    this.typeIcon = 'icon-download52';     typeText = 'view.common.import'; }
      if (bfType === 'export')   { this.btnClass = 'secondary';  this.typeIcon = 'icon-upload5';        typeText = 'view.common.export'; }

      if (bfType === 'expand')   { this.btnClass = 'secondary'; this.typeIcon = 'icon-arrow-down3'; }
      if (bfType === 'collapse') { this.btnClass = 'secondary'; this.typeIcon = 'icon-arrow-up3'; }
      if (bfType === 'copy')     { this.btnClass = 'secondary'; this.typeIcon = 'icon-files-empty'; }
      if (bfType === 'menu')     { this.btnClass = 'secondary'; this.typeIcon = 'icon-menu5'; }

      if (this.bfType === 'back') { this.btnClass = 'secondary'; this.typeIcon = 'icon-undo2'; this.bfIconPos = 'left'; }

      if (!this.bfText && !onlyIcon) {
        this.textLabel = typeText;
        this.bfTextTrans$ = this.translate.getLabel$(this.textLabel);
      }
    }

    // Generate new observables for the dynamic text
    if (changes.hasOwnProperty('bfText')) {
      this.textLabel = this.bfText;
      this.bfTextTrans$ = this.translate.getLabel$(this.textLabel);
    }
    if (changes.hasOwnProperty('bfTooltip'))     { this.bfTooltipTrans$     = this.translate.getLabel$(this.bfTooltip); }
    if (changes.hasOwnProperty('bfDisabledTip')) { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }


    // If new async blocking promise, block buttons until that is resolved
    if (changes.hasOwnProperty('bfAsyncPromise')) {
      this.initLoadingPromise();
    }

    this.setDefaultIcon();
  }

  ngOnInit() {
    if (!this.btnIcon) { this.setDefaultIcon(); }
  }

  private setDefaultIcon = () => {

    if (this.bfIcon) {
      this.btnIcon = this.bfIcon;

    } else if (this.isToggle) {
      this.btnIcon = this.bfToggle ? 'icon-arrow-up3' : 'icon-arrow-down3';

    } else if (!!this.typeIcon) {
      this.btnIcon = this.typeIcon;

    } else if (!this.textLabel) {
      this.btnIcon = 'icon-arrow-right3';

    } else {
      this.btnIcon = null;
    }
  };


  private initLoadingPromise = () => {
    if (!!this.bfAsyncPromise && Object.prototype.toString.call(this.bfAsyncPromise) === '[object Promise]') {
      this.isLoading = true;
      this.bfAsyncPromise.then(() => this.isLoading = false, () => this.isLoading = false);
    } else {
      this.isLoading = false;
    }
  };


  public btnClick = ($event) => {
    // If there's an async click callback function, trigger it and wait for the promise
    if (!!this.bfAsyncClick && typeof this.bfAsyncClick === 'function') {
      this.bfAsyncPromise = this.bfAsyncClick();
      this.initLoadingPromise();
    }

    // Toggle option
    if (this.isToggle) {
      this.bfToggle = !this.bfToggle;
      this.bfToggleChange.emit(this.bfToggle);
      this.setDefaultIcon();
    }

    this.bfClick.emit($event);
  };

  focus() {
    this._btn.nativeElement.focus();
  }

}

