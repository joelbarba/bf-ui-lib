import { Component, OnInit } from '@angular/core';
import { BfGrowlService } from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {BfUILibTransService} from '../../../../bf-ui-lib/src/lib/abstract-translate.service';

@Component({
  selector: 'app-bf-growl-demo',
  templateUrl: './bf-growl-demo.component.html',
  styleUrls: ['./bf-growl-demo.component.scss'],
})
export class BfGrowlDemoComponent implements OnInit {
  public name = BfGrowlDoc.name;
  public desc = BfGrowlDoc.desc;
  public api = BfGrowlDoc.api;
  public instance = BfGrowlDoc.instance;
  public instance1 = `import { BfGrowlService } from 'bf-ui-lib';
constructor(private growl: BfGrowlService) { }

this.growl.success('Success message pushed');
this.growl.error('Error message pushed');
this.growl.pushMsg({ text: 'view.tooltip.message', timeOut: 4000, msgType: 'success', msgIcon: 'icon-cool' });
this.growl.success('view.common.customer_changed_successfully', { customer_name: 'Other Guy' })`;

  public instance2 = `<bf-growl-pop-up></bf-growl-pop-up>`;
  public instance3 = `import { BfGrowlService } from 'bf-ui-lib';
constructor(private growl: BfGrowlService) { }`;


  public cssReset = `$growl-border: rgba($white, 0.4) !default;

$growl-success: $white !default;
$growl-success-bg: darken($primary_color, 15%) !default;

$growl-error: $white !default;
$growl-error-bg: $warning_color !default;`;

  public text$;

  constructor(private growl: BfGrowlService, private translate: BfUILibTransService) { }
  ngOnInit() {
    this.text$ = this.translate.getLabel$('view.common.customer_changed_successfully', { customer_name: 'Other Guy' });
  }

  pushSuccess() {
    this.growl.success(`view.tooltip.message`);
    // const nowTime = new Date();
    // this.growl.success(`Success message pushed - ${nowTime}`);
  }
  pushError() {
    const nowTime = new Date();
    this.growl.error(`Error message pushed - ${nowTime}`);
  }
  pushCustom() {
    const nowTime = new Date();
    this.growl.pushMsg({
      text: `view.tooltip.message`,
      timeOut: 4000,
      msgType: 'success',
      msgIcon: 'icon-cool'
    });
  }

}





export const BfGrowlDoc = {
  name    : `bfGrowl`,
  uiType  : 'module',
  desc    : `Growl Module to push notifications on the screen`,
  api     : `growl.success(text) : Pushes a successful notification
growl.error(text)   : Pushes a warning notification
growl.pushMsg(msg)  : Pushes a custom message with custom parameters. 
                      msg object contains: "text", "timeOut", "msgType" (success/error), "msgIcon" properties`,
  instance: `<bf-growl-pop-up>`,
  demoComp: BfGrowlDemoComponent
};
