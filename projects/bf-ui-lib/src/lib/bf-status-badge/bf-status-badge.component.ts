import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {BfUILibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';

interface ColorSet {
  type: 'class' | 'code' | 'default';
  set: Array<ColorDefault | string>;
}
type ColorDefault = 'active' | 'inactive' | 'pending' | 'other' | 'other-2' | 'other-3' | 'other-4' | 'submitted';

export class  BfStatusColorSet {
  private defaultList: ColorDefault[] = ['active', 'inactive', 'pending', 'other', 'other-2', 'other-3', 'other-4', 'submitted'];
  private default: ColorSet = {
    type: 'default',
    set: this.defaultList
  };
  private orderList: ColorDefault[] = ['pending', 'other', 'active', 'inactive', 'other-2', 'other-3', 'submitted'];
  private order: ColorSet = {
    type: 'default',
    set: this.orderList
  };
  private contractsList: ColorDefault[] = ['other-2', 'active', 'inactive'];
  private contracts: ColorSet = {
    type: 'default',
    set: this.contractsList
  };
  private quotesList: ColorDefault[] = ['other', 'pending', 'other-2', 'inactive', 'active'];
  private quotes: ColorSet = {
    type: 'default',
    set: this.quotesList
  };

  getDefault = () => this.default;

  getOrder = () => this.order;

  getContract = () => this.contracts;

  getQuotes = () => this.quotes;

  addClassColorSet(className: string[]): ColorSet { return { type: 'class', set: className }; }

  addCodeColorSet(colorCode: string[]): ColorSet { return { type: 'code', set: colorCode }; }

  updateDefaultColorSet(defaultClass: ColorDefault[]): ColorSet { return { type: 'default', set: defaultClass }; }
}

@Component({
  selector: 'bf-status-badge',
  templateUrl: './bf-status-badge.component.html',
  styleUrls: ['./bf-status-badge.component.scss']
})
export class BfStatusBadgeComponent implements OnInit, OnChanges {

  public defaultColorSet = new BfStatusColorSet().getDefault();

  public defaultLabels = ['view.common.active', 'view.common.inactive', 'view.common.pending'];

  @Input() bfStatus: boolean | number = 0;
  @Input() bfLabel: string | Array<string>  = '';
  @Input() bfColor  = '';
  @Input() bfCircle = false;
  @Input() bfColorSet: ColorSet;

  public bfCurrentLabel$: Observable<string> = of('');

  public bfCurrentStatus = 0;
  public bfStatusCss = '';
  public bfCurrentColor = '';

  constructor(private translate: BfUILibTransService) { }

  ngOnInit() {
    this.setStatus(this.bfStatus);
    this.setLabel();
  }

  ngOnChanges(change) {
    this.setStatus(this.bfStatus);
    this.setLabel();
    // if (change.hasOwnProperty('bfStatus')) { this.setStatus(this.bfStatus); }
    // if (change.hasOwnProperty('bfLabel')) { this.setLabel(); }
  }

  setStatus = (status) => {
    if (typeof status === 'boolean') {
      this.bfCurrentStatus = this.bfStatus ? 0 : 1;
    } else if (typeof status === 'number') {
      this.bfCurrentStatus = typeof this.bfStatus === 'number' ? this.bfStatus : 0;
    }
    this.setColor();
    // this.bfStatusCss = this.bfModule !== 'default' ? this.statusClases[this.bfModule][this.bfCurrentStatus] : this.statusClases.default[this.bfCurrentStatus];
  }

  setLabel = () => {
    if (this.bfLabel) {
      if (typeof this.bfLabel === 'string') { this.bfCurrentLabel$ = this.translate.getLabel$(this.bfLabel); }
      if (typeof this.bfLabel === 'object') { this.bfCurrentLabel$ = this.translate.getLabel$(this.bfLabel[this.bfCurrentStatus]); }
    } else {
      this.bfCurrentLabel$ = this.translate.getLabel$(this.defaultLabels[this.bfCurrentStatus] || this.defaultLabels[0]);
    }
  }

  setColor = () => {
    // Default class set by default
    this.bfStatusCss = 'bf-status-badge-' + this.defaultColorSet.set[this.bfCurrentStatus];

    // Verifying [bfColor]
    if (this.bfColor) {
      this.bfCurrentColor = this.bfColor.charAt(0) === '#' ? this.bfColor : '#' + this.bfColor;
    } else {
      this.bfCurrentColor = '';
    }

    // Verifying [bfColorSet]
    if (this.bfColorSet) {
      if (this.bfColorSet.type === 'default') {
        this.bfStatusCss = 'bf-status-badge-' + this.bfColorSet.set[this.bfCurrentStatus];
      }
      if (this.bfColorSet.type === 'class') {
        this.bfStatusCss = this.bfColorSet.set[this.bfCurrentStatus];
      }
      if (this.bfColorSet.type === 'code') {
        const color = this.bfColorSet.set[this.bfCurrentStatus];
        this.bfCurrentColor = color.charAt(0) === '#' ? color : '#' + color;
      }
    }
  }

}
