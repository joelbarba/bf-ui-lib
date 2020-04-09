import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bf-modal-demo',
  templateUrl: './bf-modal-demo.component.html',
  styleUrls: ['./bf-modal-demo.component.sass']
})
export class BfModalDemoComponent implements OnInit {
  @Input() options;
  public compConf = {
    title: 'view.common.modal.title',
    description: 'view.common.modal.description',
    hasDescription: false
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.compConf = { ...this.compConf, ...this.options };
  }

  close() {
    this.activeModal.close();
  }

}
