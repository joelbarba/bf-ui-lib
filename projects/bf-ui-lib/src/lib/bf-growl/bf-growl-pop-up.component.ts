import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BfGrowlService } from './bf-growl.service';

@Component({
  selector: 'bf-growl-pop-up',
  templateUrl: './bf-growl-pop-up.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BfGrowlPopUpComponent implements OnInit {
  constructor(public growl: BfGrowlService) { }

  ngOnInit() { }

  toggleTimeout = (msg) => {
    if (!!msg.cancelTimeout) {
      msg.cancelTimeout();
    } else {
      msg.remove();
    }
  }

}
