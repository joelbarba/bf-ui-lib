import { Component, ElementRef, HostBinding, HostListener, Input, OnChanges } from '@angular/core';
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
    private _translate: BfUILibTransService,
    public elementRef: ElementRef
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

  @HostListener('keydown.enter', ['$event'])
  onEnterKeyDown($event: KeyboardEvent) {
    $event.stopImmediatePropagation();
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('keydown.escape', ['$event'])
  onEscapeKeyDown($event: KeyboardEvent) {
    $event.stopImmediatePropagation();
    this.isCollapsed = true;
  }

  @HostListener('keydown.space', ['$event'])
  onSpaceKeyDown($event: KeyboardEvent) {
    $event.stopImmediatePropagation();
    this.isCollapsed = !this.isCollapsed;
  }
}
