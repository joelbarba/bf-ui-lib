import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {BfListSelection} from '../bf-list-selection/bf-list-selection';

@Component({
  selector: 'bf-list-checkbox',
  templateUrl: './bf-list-checkbox.component.html',
})
export class BfListCheckboxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selection: BfListSelection;
  @Input() id: string;
  @Input() actions: [{ id?, label: string, disabled?: boolean, fn?: (sel?: BfListSelection) => void }];
  @Output() actionClick = new EventEmitter<any>();

  private sub;
  public hasId = false;
  public actionsExp = false;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.hasId = this.id !== undefined;

    // If the actions panel is expanded, collapse it automatically when the selection changes
    if (this.selection) {
      if (!!this.sub) { this.sub.unsubscribe(); }
      this.selection.onChange$.subscribe(_ => this.actionsExp = false);
    }
  }

  ngOnDestroy() {
    if (!!this.sub) { this.sub.unsubscribe(); }
  }

  public clickAction = (action) => {
    if (!action.disabled) {
      this.actionClick.emit(action);
      if (action.fn && typeof action.fn === 'function') {
        action.fn(this.selection);
      }
      this.actionsExp = false; // Collapse panel
    }
  }

}
