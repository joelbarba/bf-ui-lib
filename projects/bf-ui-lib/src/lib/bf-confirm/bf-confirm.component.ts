import { Component, OnInit, Input, Inject } from '@angular/core';
import { AbstractTranslateService } from '../abstract-translate.service';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bf-confirm',
  templateUrl: './bf-confirm.component.html',
  styleUrls: ['./bf-confirm.component.scss']
})
export class BfConfirmComponent implements OnInit {
  @Input() options;
  public conf: {
    title            : string   // Title on the modal
    text             : string   // Description text of the confirmation
    showYes          : boolean  // Whether to display the "Yes" button
    showNo           : boolean  // Whether to display the "No" button
    showCancel       : boolean  // Whether to display the "Cancel" button
    yesButtonText    : string   // Text for the "Yes" button
    noButtonText     : string   // Text for the "No" button
    cancelButtonText : string   // Text for the "Cancel" button
  };

  constructor(
    public activeModal: NgbActiveModal,
    @Inject('TranslateService') private translate: AbstractTranslateService,
  ) {}

  ngOnInit() {
    const defaultOptions = {
      title : 'view.modal.confirm.title',
      text  : 'view.modal.confirm.text',
      showYes     : true,
      showNo      : false,
      showCancel  : true,
      yesButtonText   : 'view.common.yes',
      noButtonText    : 'view.common.no',
      cancelButtonText: 'view.common.cancel',
    };
    this.conf = { ...defaultOptions, ...this.options };

    if (!!this.translate.doTranslate) {
      this.conf.title = this.translate.doTranslate(this.conf.title);
      this.conf.text = this.translate.doTranslate(this.conf.text);
      this.conf.yesButtonText = this.translate.doTranslate(this.conf.yesButtonText);
      this.conf.noButtonText = this.translate.doTranslate(this.conf.noButtonText);
      this.conf.cancelButtonText = this.translate.doTranslate(this.conf.cancelButtonText);
    }
  }

}