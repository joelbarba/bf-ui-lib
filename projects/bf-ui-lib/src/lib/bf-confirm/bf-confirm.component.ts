import { Component, OnInit, Input } from '@angular/core';
import { BfUILibTransService } from '../abstract-translate.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtml } from '@angular/platform-browser';
import { of } from 'rxjs';

export type IConfirmOptions = Partial<{
  title           : string;
  text            : string;
  htmlContent     : string;
  showYes         : boolean;
  showNo          : boolean;
  showCancel      : boolean;
  yesButtonText   : string;
  noButtonText    : string;
  cancelButtonText: string;
}>;

@Component({
  selector: 'bf-confirm',
  templateUrl: './bf-confirm.component.html',
  styleUrls: []
})
export class BfConfirmComponent implements OnInit {
  @Input() options;
  public conf: IConfirmOptions = {
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
      this.customHtmlContent = this.conf.htmlContent;
    }
  }

}
