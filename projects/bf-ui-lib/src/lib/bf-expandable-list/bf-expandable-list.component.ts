import { Component, HostBinding, HostListener, Input, OnChanges } from '@angular/core';
import { BfUILibTransService } from '../abstract-translate.service';

@Component({
  selector: 'bf-expandable-list',
  templateUrl: './bf-expandable-list.component.html',
})
export class BfExpandableListComponent implements OnChanges {
  @Input() bfList = [];
  @Input() bfExpandText: string;    // Number to display on the expanding button (+N)

  public isCollapsed = true;
  public firstItem;
  public expList = [];

  @HostBinding('tabindex') @Input() bfTabIndex = 0;

  @HostBinding('attr.aria-expanded')
  public get IsExpanded() { return !this.isCollapsed; }

  constructor(
    private _translate: BfUILibTransService
  ) {}

  ngOnChanges(): void {
    this.firstItem = undefined;
    this.expList = [];
    if (this.bfList && this.bfList.length > 0) {
      this.firstItem = this.bfList[0];
      this.expList = this.bfList.slice(1);
    }
  }

  getTranslatedAriaLabel(label: string, params: any = {}): string {
    return this._translate.doTranslate(label, params);
  }

  @HostListener('keydown.enter')
  onEnterKeyDown() {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('keydown.space')
  onSpaceKeyDown() {
    this.isCollapsed = !this.isCollapsed;
  }
}
