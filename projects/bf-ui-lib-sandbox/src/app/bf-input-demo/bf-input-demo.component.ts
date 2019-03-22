import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-bf-input-demo]',
  templateUrl: './bf-input-demo.component.html',
  styleUrls: ['./bf-input-demo.component.scss']
})
export class BfInputDemoComponent implements OnInit {
  public name = BfInputDoc.name;
  public desc = BfInputDoc.desc;
  public api = BfInputDoc.api;
  public instance = BfInputDoc.instance;
  public val1 = 'Joel';
  public val2 = 'Barba';

  public myModel:string = 'My default value';

  public instance2 =
`<bf-input</bf-input>`;


  public formExampleInput100 = `<form #myForm="ngForm">
  
  <bf-input [bfRequired]="true" ngModel="val1" #firstRef="ngModel" name="first">
  </bf-input>
  
  <bf-input [bfRequired]="true" ngModel="val2" #lastRef="ngModel" name="last">
  </bf-input>
  
  <bf-btn bfText="Save Form" [bfDisabled]="myForm.invalid"></bf-btn>

</form>`;

  public flatExample = '<bf-input class="flat" [ngModel]="bfModel"></bf-input>';

  constructor() { }
  ngOnInit() { }
}


export const BfInputDoc = {
  name    : `bf-input`,
  desc    : `Generates a button.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated).
[bfLabel]       : Label of the input (automatically translated). If not provided, no label is displayed.
[bfRequired]    : Whether the input is required or not
[bfDisabled]    : Whether the input is disabled or not
[bfPlaceholder] : Placeholder text (automatically translated)
[bfTooltip]     : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip
`,
  instance: `<bf-input></bf-input>`,
  demoComp: BfInputDemoComponent
};
