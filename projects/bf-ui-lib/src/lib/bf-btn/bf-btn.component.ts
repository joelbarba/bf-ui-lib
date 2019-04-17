import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Inject } from '@angular/core';
import { AbstractTranslateService } from '../abstract-translate.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bf-btn',
  templateUrl: './bf-btn.component.html',
  styleUrls: ['./bf-btn.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BfBtnComponent implements OnInit {
  @Output() bfClick = new EventEmitter<any>();
  @Input() bfText: string = '';
  @Input() bfType: string = ''; // save, update, add, delete, cancel
  @Input() bfIcon: string = 'icon-arrow-right3';
  @Input() bfDisabled: boolean = false;
  @Input() bfTooltip     : string = '';
  @Input() bfTooltipPos  : string = 'top';
  @Input() bfTooltipBody : boolean = true;

  public btnClass: string = 'primary';
  public bfTooltipTrans: string = '';     // Translated text for the tooltip of the label
  public isLoading: boolean = false;      // Whether the button is block waiting an async

  constructor(
    @Inject('TranslateService') private translate: AbstractTranslateService,
    private config: NgbPopoverConfig) {
  }

  ngOnInit() {
    // Common predefined type
    // this.isLoading = true;
  }

  ngOnChanges(change) {
    // console.log('ngOnChanges');
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


    if (!!this.translate.doTranslate) {
      if (!!change.bfTooltip)     { this.bfTooltipTrans = this.translate.doTranslate(this.bfTooltip); }
    } else {
      if (!!change.bfTooltip)     { this.bfTooltipTrans = this.bfTooltip; }
    }
  }

}
