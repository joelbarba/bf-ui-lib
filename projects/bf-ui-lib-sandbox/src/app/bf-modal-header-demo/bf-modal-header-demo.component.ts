import { Component, OnInit } from '@angular/core';
import { BfModalDemoComponent } from './bf-modal-demo/bf-modal-demo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bf-modal-header-demo',
  templateUrl: './bf-modal-header-demo.component.html',
  styleUrls: ['./bf-modal-header-demo.component.sass']
})
export class BfModalHeaderDemoComponent implements OnInit {
  public name = BfModalHeaderDoc.name;
  public desc = BfModalHeaderDoc.desc;
  public api = BfModalHeaderDoc.api;


  public brStr = `\n`;
  public customCompCode = ``;

  public compConf = {
    title: 'view.common.modal.title',
    description: 'view.common.modal.description',
    hasDescription: false
  };

  public cssReset = `.modal-header modal-header--description{
    color: $primary-color;
  }`;

  constructor(private modal: NgbModal) { }

  ngOnInit() {
    this.upComp();
  }

  public upComp = () => {
    this.customCompCode = `<bf-modal-header ` + this.brStr;

    if (this.compConf.title) { this.customCompCode += ` [bfTitle]="${this.compConf.title}"` + this.brStr; }
    if (this.compConf.hasDescription) { this.customCompCode += ` [bfDescription]="${this.compConf.description}"` + this.brStr; }

    this.customCompCode += ' (bfClose)="doSomething($event)"';

    this.customCompCode += (`>` + this.brStr + `</bf-modal-header>`);
  }

  public openModal() {
    this.open({});
  }

  public openModalWDescription() {
    this.open({ hasDescription : true });
  }

  open(options) {
    const modalRef = this.modal.open(BfModalDemoComponent, { windowClass: 'modal-confirmation' });
    modalRef.componentInstance.options = options;
  }
}

export const BfModalHeaderDoc = {
  name    : `bf-modal-header`,
  uiType  : 'component',
  desc    : `Generates a title for a modal.`,
  api     : `[bfTitle]        : Text to display as title
[bfDescription]  : Text to display as description (optional).
(bfClose)        : Emitter to catch the click event on close icon.`,
  instance: `<bf-modal-header bfTitle="view.common.username"></bf-modal-header>`,
  demoComp: BfModalHeaderDemoComponent
};
