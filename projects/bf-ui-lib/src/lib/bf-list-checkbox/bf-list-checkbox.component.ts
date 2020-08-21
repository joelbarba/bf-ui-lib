import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BfListSelection} from '../bf-list-selection/bf-list-selection';

@Component({
  selector: 'bf-list-checkbox',
  templateUrl: './bf-list-checkbox.component.html',
})
export class BfListCheckboxComponent implements OnInit, OnChanges {
  @Input() selection: BfListSelection;
  @Input() id: string;

  public hasId = false;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.hasId = this.id !== undefined;
  }

}
