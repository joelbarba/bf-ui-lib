import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {BfUILibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'bf-status-badge',
  templateUrl: './bf-status-badge.component.html',
  styleUrls: ['./bf-status-badge.component.scss']
})
export class BfStatusBadgeComponent implements OnInit, OnChanges {

  public defaultLabels = ['view.common.active', 'view.common.inactive', 'view.common.pending'];
  // public defaultLabels = ['Active', 'Inactive', 'Pending'];
  public defaultStatusClasses = [
    'bf-status-badge-active',
    'bf-status-badge-inactive',
    'bf-status-badge-pending',
    'bf-status-badge-other',
    'bf-status-badge-other-2',
    'bf-status-badge-other-3',
    'bf-status-badge-other-4'];

  @Input() bfStatus: boolean | number = 0;
  @Input() bfLabel: string | Array<string>  = '';
  @Input() bfColor  = '';
  @Input() bfCircle = false;

  public bfCurrentLabel$: Observable<string> = of('');

  public bfCurrentStatus = 0;
  public bfStatusCss = '';
  public bfCurrentColor = '';

  constructor(private translate: BfUILibTransService) { }

  ngOnInit() {
    this.setStatus(this.bfStatus);
    this.setLabel();
    this.setColor();
  }

  ngOnChanges(change) {
    this.setStatus(this.bfStatus);
    this.setLabel();
    this.setColor();
    // if (change.hasOwnProperty('bfStatus')) { this.setStatus(this.bfStatus); }
    // if (change.hasOwnProperty('bfLabel')) { this.setLabel(); }
  }

  setStatus = (status) => {
    if (typeof status === 'boolean') {
      this.bfCurrentStatus = this.bfStatus ? 0 : 1;
    } else if (typeof status === 'number') {
      this.bfCurrentStatus = typeof this.bfStatus === 'number' ? this.bfStatus : 0;
    }
    this.bfStatusCss = this.defaultStatusClasses[this.bfCurrentStatus];
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
    if (this.bfColor) {
      if (this.bfColor.charAt(0) === '#') {
        this.bfCurrentColor = this.bfColor;
      } else {
        this.bfCurrentColor = '#' + this.bfColor;
      }
    } else {
      this.bfCurrentColor = '';
    }
  }

}
