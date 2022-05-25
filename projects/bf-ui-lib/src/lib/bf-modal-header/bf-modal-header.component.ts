import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bf-modal-header',
  templateUrl: './bf-modal-header.component.html'
})
export class BfModalHeaderComponent  {
  @Input() bfTitle: string;
  @Input() bfDescription: string = null;
  @Output() bfClose = new EventEmitter();

  public bfAriaLabel = 'view.common.modal.close.button';

  constructor() { }

  close(evt) {
    evt.preventDefault();
    this.bfClose.emit();
  }
}
