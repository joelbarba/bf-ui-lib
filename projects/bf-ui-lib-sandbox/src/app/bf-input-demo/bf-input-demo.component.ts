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

  public myModel:string = 'My default value';

  public instance2 =
`<bf-input</bf-input>`;

  constructor() { }

  ngOnInit() { }

}


export const BfInputDoc = {
  name    : `bf-input`,
  desc    : `Generates a button.`,
  api     : `([bfModel])     : Variable linked to the ngModel of the input.
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
