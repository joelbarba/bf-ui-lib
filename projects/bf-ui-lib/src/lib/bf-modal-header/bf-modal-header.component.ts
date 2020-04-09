import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bf-modal-header',
  templateUrl: './bf-modal-header.component.html'
})
export class BfModalHeaderComponent implements OnInit {
  @Input() bfTitle: string;
  @Input() bfDescription: string = null;
  @Output() bfClose = new EventEmitter();

  public bfAriaLabel = 'view.common.modal.close.button';

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.bfClose.emit();
  }

}
