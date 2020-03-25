import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BfUILibTransService } from '../abstract-translate.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'bf-modal-header',
  templateUrl: './bf-modal-header.component.html'
})
export class BfModalHeaderComponent implements OnInit {
  @Input() bfTitle: string;
  @Input() bfDescription: string = null;

  @Output() closeModal = new EventEmitter();

  public bfAriaLabel = 'view.common.modal.close.button';
  public bfCurrentTitle$: Observable<string>;
  public bfCurrentDescription$: Observable<string>;
  public bfAriaLabel$: Observable<string>;

  constructor(private translate: BfUILibTransService) { }

  ngOnInit() {
    this.setLabel();
  }

  setLabel = () => {
    if (this.bfTitle) {
      this.bfCurrentTitle$ = this.translate.getLabel$(this.bfTitle);
    }

    if (this.bfDescription) {
      this.bfCurrentDescription$ = this.translate.getLabel$(this.bfDescription);
    }

    this.bfAriaLabel$ = this.translate.getLabel$(this.bfAriaLabel);
  }

  close() {
    this.closeModal.emit();
  }

}
