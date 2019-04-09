import { Component, OnInit } from '@angular/core';
import { BfGrowlService } from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';

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
  public instance1 = `constructor(private growl: BfGrowlService) { }

this.growl.success('Success message pushed');
this.growl.error('Error message pushed');
this.growl.pushMsg({ text: 'view.tooltip.message', timeOut: 4000, msgType: 'success', msgIcon: 'icon-cool' });`;

  public instance2 = `<bf-growl-pop-up></bf-growl-pop-up>`;
  public instance3 = `import { BfGrowlService } from '/bf-growl/bf-growl.service';
constructor(private growl: BfGrowlService) { }

this.growl.success('My message');`;


  public cssReset = `.growl-wrapper {
  .msg-box.success {
    background: mediumseagreen;
    color: white;
  }
  .msg-box.error {
    background: red;
    color: white;
  }
}`;

  constructor(private growl: BfGrowlService) { }
  ngOnInit() { }

  pushSuccess() {
    const nowTime = new Date();
    this.growl.success(`Success message pushed - ${nowTime}`);
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
  name    : `bf-growl`,
  desc    : `Growl Module to push notifications on the screen`,
  api     : `growl.success(text) : Pushes a successful notification
growl.error(text)   : Pushes a warning notification
growl.pushMsg(msg)  : Pushes a custom message with custom parameters. 
                      msg object contains: "text", "timeOut", "msgType" (success/error), "msgIcon" properties`,
  instance: `<bf-growl-pop-up>`,
  demoComp: BfGrowlDemoComponent
};