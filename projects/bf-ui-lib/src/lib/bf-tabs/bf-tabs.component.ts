import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';

export interface BfTab {
  id: string | number;
  label?: string;
  tooltip?: string;
  icon?: string;
  active?: boolean;
}

@Component({
  selector: 'bf-tabs',
  templateUrl: './bf-tabs.component.html',
  styleUrls: []
})
export class BfTabsComponent implements OnChanges {

  @Input() bfTabs: BfTab[];
  @Output() tabSelected: EventEmitter<BfTab> = new EventEmitter();
  @ViewChildren('tabElement') tabElements: QueryList<ElementRef>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


  selectTab(tab: BfTab) {
    this.bfTabs.forEach(tab => tab.active = false);
    tab.active = true;
    this.tabSelected.emit(tab);
  }

  keyDown(evt: KeyboardEvent, tab: BfTab) {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(evt.key) === -1) return;
    evt.preventDefault();
    let nextTabIndex: number;
    const currentTabIndex: number = this.bfTabs.findIndex(({ id }) => id === tab.id);

    switch(evt.key){
      case 'ArrowRight':
        nextTabIndex = !!this.bfTabs[currentTabIndex + 1] ? currentTabIndex + 1 : 0;
        break;
      case 'ArrowLeft':
        nextTabIndex = (currentTabIndex - 1 >= 0) ? currentTabIndex - 1 : this.bfTabs.length - 1;
        break;
      case 'Home':
        nextTabIndex = 0;
        break;
      case 'End':
        nextTabIndex = this.bfTabs.length - 1;
        break;
    }

    this.selectTab(this.bfTabs[nextTabIndex]);
    this.tabElements.get(nextTabIndex).nativeElement.focus();
  }


}
