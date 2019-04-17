import { Injectable } from '@angular/core';
import { BfConfirmComponent } from './bf-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BfConfirmService {

  constructor(private modal: NgbModal) { }

  public open = (options = {}) => {

    // https://ng-bootstrap.github.io/#/components/modal/api
    let modalRef = this.modal.open(BfConfirmComponent, { windowClass: 'modal-confirmation' });
    modalRef.componentInstance.options = options;
    return modalRef.result;

  }

}
