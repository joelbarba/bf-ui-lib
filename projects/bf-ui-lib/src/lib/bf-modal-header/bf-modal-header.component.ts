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

  public bfCurrentTitle$: Observable<string> = of('');
  public bfCurrentDescription$: Observable<string> = of('');

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
  }

  close() {
    this.closeModal.emit();
  }

}
