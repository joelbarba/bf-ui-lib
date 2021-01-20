import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {BfUILibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';

interface ColorSet {
  [status: string]: string;
}

@Component({
  selector: 'bf-status-badge',
  templateUrl: './bf-status-badge.component.html',
  styleUrls: []
})
export class BfStatusBadgeComponent implements OnInit, OnChanges {

  public defaultColorSet: ColorSet = {
    0: 'bf-color-first',
    1: 'bf-color-second',
    2: 'bf-color-third',
    3: 'bf-color-fourth',
    4: 'bf-color-fifth',
    5: 'bf-color-sixth',
    6: 'bf-color-seventh',
    7: 'bf-color-eighth'
  };

  public defaultLabels = ['view.common.active', 'view.common.inactive', 'view.common.pending'];

  @Input() bfStatus: boolean | number = 0;
  @Input() bfLabel: string | Array<string>  = '';
  @Input() bfColor  = '';
  @Input() bfCircle = false;
  @Input() bfColorSet: ColorSet;

  public bfCurrentLabel$: Observable<string> = of('');

  public bfCurrentStatus = 0;
  public bfStatusCss: ColorSet = {};
  public bfCurrentColor = '';

  constructor(private translate: BfUILibTransService, public elementRef: ElementRef) { }

  ngOnInit() {
    this.setStatus(this.bfStatus);
    this.setLabel();
  }

  ngOnChanges(change) {
    this.setStatus(this.bfStatus);
    this.setLabel();
  }

  setStatus(status) {
    if (typeof status === 'boolean') {
      this.bfCurrentStatus = this.bfStatus ? 0 : 1;
    } else if (typeof status === 'number') {
      this.bfCurrentStatus = typeof this.bfStatus === 'number' ? this.bfStatus : 0;
    }
    this.setColor();
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
    this.bfStatusCss = this.bfColorSet ? this.bfColorSet : this.defaultColorSet;

    // Verifying [bfColor]
    if (this.bfColor) {
      this.bfCurrentColor = this.bfColor.charAt(0) === '#' ? this.bfColor : '#' + this.bfColor;
    } else {
      this.bfCurrentColor = '';
    }
  }

}
