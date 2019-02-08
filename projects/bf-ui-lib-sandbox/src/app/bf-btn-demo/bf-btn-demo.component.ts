import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-btn-demo',
  templateUrl: './bf-btn-demo.component.html',
  styleUrls: ['./bf-btn-demo.component.scss']
})
export class BfBtnDemoComponent implements OnInit {
  public name = BfBtnDoc.name;
  public desc = BfBtnDoc.desc;
  public api = BfBtnDoc.api;
  public instance = BfBtnDoc.instance;

  public instance2 = 
`<bf-btn [bfText]="'Save User'" (click)="myFunc()">
</bf-btn>`;

  public instance3 = 
`<bf-btn [bfText]="'Add User'" [bfIcon]="'icon-plus'"
        (click)="myFunc()">
</bf-btn>`;

  constructor() { }

  ngOnInit() {
  }

}


export const BfBtnDoc = {
  name    : `bf-btn`,
  desc    : `Generates a button.`, 
  api     : `[bfText]: Button text
[bfIcon]: Icon of the button (icomoon class)`,
  instance: `<bf-btn></bf-btn>`, 
  demoComp: BfBtnDemoComponent
}