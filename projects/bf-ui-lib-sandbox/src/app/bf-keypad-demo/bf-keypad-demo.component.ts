import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-bf-keypad-demo',
  templateUrl: './bf-keypad-demo.component.html',
  styleUrls: ['./bf-keypad-demo.component.scss']
})
export class BfKeypadDemoComponent implements OnInit {
  public name = BfKeypadDoc.name;
  public desc = BfKeypadDoc.desc;
  public api = BfKeypadDoc.api;
  public instance = BfKeypadDoc.instance;

  numberSelected: string;

  ngOnInit() {
  }

}

export const BfKeypadDoc = {
  name    : `bf-keypad`,
  uiType  : 'component',
  desc    : `This component is for display a keypad.`,
  api     : `[bfPlaceholder]     : Text to display as placeholder on the number input
(valueChanges)      : Triggered a new values`,
  demoComp: BfKeypadDemoComponent,
  instance: `<bf-keypad>`
};
