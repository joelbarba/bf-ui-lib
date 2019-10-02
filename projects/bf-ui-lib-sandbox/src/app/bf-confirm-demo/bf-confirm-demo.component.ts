import { Component, OnInit } from '@angular/core';
import { BfConfirmService } from '../../../../bf-ui-lib/src/lib/bf-confirm/bf-confirm.service';

@Component({
  selector: 'app-bf-confirm-demo]',
  templateUrl: './bf-confirm-demo.component.html',
  styleUrls: ['./bf-confirm-demo.component.scss']
})
export class BfConfirmDemoComponent implements OnInit {
  public name = BfConfirmDoc.name;
  public desc = BfConfirmDoc.desc;
  public api = BfConfirmDoc.api;
  public instance = BfConfirmDoc.instance;

  public result = '';
  public example1 = `constructor(private confirm: BfConfirmService)

this.confirm.open().then( 
  (res) => { console.log('Ok'); }, 
  (res) => { console.log('Cancel'); 
});`;

  public example2 = `this.confirm.open({ 
    title            : 'view.modal.confirm.title',
    text             : 'view.common.custom_error',
    htmlContent      : '<h4 class="marT20">You want to delete user <span class="bold primary">Joel</span> ?</h4>',
    yesButtonText    : 'Yes, delete it',
    noButtonText     : 'No, keep it',
    showNo           : true,
}).then((res) => {
  if (res === 'yes') {
    console.log('Ok');
  } else {
    console.log('Ko');
  }
}, (res) => { console.log('Cancel', res); });`;

  public cssStyles = `.modal-confirmation .modal-content  {
  margin-top: -20px;
}`;







  constructor(private confirm: BfConfirmService) { }

  ngOnInit() {
    // setTimeout(this.openPopUp);
  }

  public openPopUp1 = () => {
    let promise = this.confirm.open().then(
      (res) => { this.result = '(resolved) Clicked on Yes'; },
      (res) => { this.result = '(rejected) Cancelled'; }
    );
  };

  public openPopUp2 = () => {
    this.confirm.open({
      text             : 'view.common.custom_error',
      htmlContent      : `<h4 class="marT20">You want to delete user <span class="bold primary">Joel</span> ?</h4>`,
      yesButtonText    : 'Yes, delete it',
      noButtonText     : 'No, keep it',
      showNo           : true
    }).then((res) => {
      if (res === 'yes') {
        this.result = '(resolved) Clicked on Yes';
      } else {
        this.result = '(resolved) Clicked on No';
      }
    }, (res) => { this.result = '(rejected) Cancelled'; });
  }



}


export const BfConfirmDoc = {
  name    : `bfConfirm`,
  uiType  : 'service',
  desc    : `Service to trigger a confirmation modal`,
  api     : `
.open()   It triggers a confirmation pop up before performing an action. It takes an optional parameter to config specific values:
            - title            (string)   - Title on the modal (view.modal.confirm.title)
            - text             (string)   - Description text of the confirmation (view.modal.confirm.text)
            - htmlContent      (string)   - Html content to display, in case we need a styled message
            - showYes          (boolean)  - Whether to display the "Yes" button (by default = true)
            - showNo           (boolean)  - Whether to display the "No" button (by default = false)
            - showCancel       (boolean)  - Whether to display the "Cancel" button (by default = true)
            - yesButtonText    (string)   - Text for the "Yes" button (view.common.yes)
            - noButtonText     (string)   - Text for the "No" button (view.common.no)
            - cancelButtonText (string)   - Text for the "Cancel" button (view.common.cancel)`,
  instance: `this.confirm.open().then(() => { });`,
  demoComp: BfConfirmDemoComponent
};
