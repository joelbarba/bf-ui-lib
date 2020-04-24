import { Injectable } from '@angular/core';
import {BfConfirmComponent, IConfirmOptions} from './bf-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BfConfirmService {

  constructor(private modal: NgbModal) { }

  public open = (options: IConfirmOptions = {}) => {

    // https://ng-bootstrap.github.io/#/components/modal/api
    const modalRef = this.modal.open(BfConfirmComponent, { windowClass: 'modal-confirmation' });
    modalRef.componentInstance.options = options;
    return modalRef.result;

  }

}
