import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BfTranslateService } from 'projects/bf-ui-lib-sandbox/src/app/translate.service';

export interface BfTab {
  id: string;
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
export class BfTabsComponent {

  @Input() bfTabs: BfTab[];
  @Output() tabSelected: EventEmitter<BfTab> = new EventEmitter();

  constructor() { }

  selectTab(tab: BfTab){
    this.bfTabs.forEach(tab => tab.active = false);
    tab.active = true;
    this.tabSelected.emit(tab);
  }

}
