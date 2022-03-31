import {Component, Input, OnChanges} from '@angular/core';

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

  constructor() { }

  ngOnChanges(): void {
    this.firstItem = undefined;
    this.expList = [];
    if (this.bfList && this.bfList.length > 0) {
      this.firstItem = this.bfList[0];
      this.expList = this.bfList.slice(1);
    }
  }

}
