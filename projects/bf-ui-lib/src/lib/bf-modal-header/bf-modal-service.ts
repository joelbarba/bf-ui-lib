import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BfModalService {

  constructor(private modal: NgbModal) { }

  public open = (component, options = {}) => {
    // https://ng-bootstrap.github.io/#/components/modal/api
    const modalRef = this.modal.open(component, { windowClass: 'modal-confirmation' });
    modalRef.componentInstance.options = options;
    return modalRef.result;
  }
}
