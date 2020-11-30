import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'bf-expandable-list',
  templateUrl: './bf-expandable-list.component.html',
})
export class BfExpandableListComponent implements OnInit, OnChanges {
  @Input() bfList = [];
  public isCollapsed = true;
  public firstItem;
  public expList = [];

  constructor() { }

  ngOnChanges(): void {
    this.firstItem = undefined;
    this.expList = [];
    if (this.bfList && this.bfList.length > 0) {
      this.firstItem = this.bfList[0];
      this.expList = this.bfList.slice(1);
    }
  }

  ngOnInit(): void {}

}
