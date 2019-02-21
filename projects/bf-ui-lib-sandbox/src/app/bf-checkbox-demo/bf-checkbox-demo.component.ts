import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-checkbox-demo]',
  templateUrl: './bf-checkbox-demo.component.html',
  styleUrls: ['./bf-checkbox-demo.component.scss']
})
export class BfCheckboxDemoComponent implements OnInit {
  public name = BfCheckboxDoc.name;
  public desc = BfCheckboxDoc.desc;
  public api = BfCheckboxDoc.api;
  public instance = BfCheckboxDoc.instance;

  public instance2 = 
`<bf-checkbox bfLabel="Check me" [bfModel]="myValue" (bfModelChange)="myValue = $event"></bf-checkbox>`;
  public instance3 = `<bf-checkbox [(bfModel)]="myValue"></bf-checkbox>`;

  public instance4 = `<bf-checkbox [bfModel]="true"  bfLabel="Checked" [bfDisabled]="true"></bf-checkbox>
<bf-checkbox [bfModel]="false" bfLabel="Unchecked" [bfDisabled]="true"></bf-checkbox>`;

  public bootstrapHtmlStructure = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="">
  <label class="form-check-label" for="defaultCheck1">My Text</label>
</div>`;

  public bfHtmlStructure = `<div class="checkbox">
  <label>
    <input type="checkbox" [disabled]="bfDisabled"
           [ngModel]="bfModel" (ngModelChange)="onChange($event)">
    <span class="check-box icon-checkmark3"></span>
    <span class="check-text" [class.has-text]="!!bfLabel">{{bfLabel}}</span>
  </label>
</div>`;
  public inputCheckboxHtml = `<input type="checkbox">`;


  public cssReset = `div.checkbox label input[type='checkbox'] {
  + span.check-box {  // Box unmarked (unchecked)
    background: $white;
    border-color: $primary_color;
  }

  &:checked + span.check-box {  // Box marked (checked)
    background: $primary_color;
    border-color: darken($primary_color, 3%);
    &:before { color: $white; }
  }

  &[disabled] + span.check-box {  // Box disabled (checked or unchecked)
    background: $disabled-color;
    border-color: darken($disabled-color, 3%);
  }
}`;



  constructor() { }

  ngOnInit() { }

}


export const BfCheckboxDoc = {
  name    : `bf-checkbox`,
  desc    : `Generates a button.`, 
  api     : `[(bfModel)]     : Boolean value to be linked (one or two way)
(bfModelChange) : Triggered when the value changes
[bfLabel]       : Text of the label (optional)
[bfDisabled]    : Boolean value to disable (true) the input`,
  instance: `<bf-checkbox [(bfModel)]="myValue" bfLabel="Check me"></bf-checkbox>`,
  demoComp: BfCheckboxDemoComponent
};