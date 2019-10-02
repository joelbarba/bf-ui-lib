import { Component, OnInit, Input, Inject } from '@angular/core';
import {AbstractTranslateService, BfUILibTransService} from '../abstract-translate.service';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {Observable, of} from "rxjs";

@Component({
  selector: 'bf-confirm',
  templateUrl: './bf-confirm.component.html',
  styleUrls: ['./bf-confirm.component.scss']
})
export class BfConfirmComponent implements OnInit {
  @Input() options;
  public conf = {
    title           : 'view.modal.confirm.title', // Title on the modal
    text            : '',                         // Description text of the confirmation
    htmlContent     : '',                         // Description html content (to customize how to display the message better)
    showYes         : true,                       // Whether to display the "Yes" button
    showNo          : false,                      // Whether to display the "No" button
    showCancel      : true,                       // Whether to display the "Cancel" button
    yesButtonText   : 'view.common.yes',      // Text for the "Yes" button
    noButtonText    : 'view.common.no',       // Text for the "No" button
    cancelButtonText: 'view.common.cancel',   // Text for the "Cancel" button
  };

  public trans = {
    title$: of(''),
    text$: of(''),
    yesButtonText$: of(''),
    noButtonText$: of(''),
    cancelButtonText$: of(''),
  };

  public customHtmlContent: SafeHtml; // Sanitized html content

  constructor(
    // @Inject('BfUILibTransService') private translate: AbstractTranslateService,
    private translate: BfUILibTransService,
    public activeModal: NgbActiveModal,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.conf = { ...this.conf, ...this.options };

    if (!this.conf.text && !this.conf.htmlContent) {
      this.conf.text = 'view.modal.confirm.text';
    }

    if (!!this.translate) {
      this.trans.title$ = this.translate.getLabel$(this.conf.title);
      this.trans.text$ = this.translate.getLabel$(this.conf.text);
      this.trans.yesButtonText$ = this.translate.getLabel$(this.conf.yesButtonText);
      this.trans.noButtonText$ = this.translate.getLabel$(this.conf.noButtonText);
      this.trans.cancelButtonText$ = this.translate.getLabel$(this.conf.cancelButtonText);
    }

    if (!!this.conf.htmlContent) {
      this.customHtmlContent = this.domSanitizer.bypassSecurityTrustHtml(this.conf.htmlContent);
    }
  }

}
