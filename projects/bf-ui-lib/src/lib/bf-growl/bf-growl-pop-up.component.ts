import { Component, ViewEncapsulation } from '@angular/core';
import { BfGrowlService } from './bf-growl.service';

@Component({
  selector: 'bf-growl-pop-up',
  templateUrl: './bf-growl-pop-up.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BfGrowlPopUpComponent {
  constructor(public growl: BfGrowlService) { }

  toggleTimeout = (msg) => {
    if (!!msg.cancelTimeout) {
      msg.cancelTimeout();
    } else {
      msg.remove();
    }
  }

}
