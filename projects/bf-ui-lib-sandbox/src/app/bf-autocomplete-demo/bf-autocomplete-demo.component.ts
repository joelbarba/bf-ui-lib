// bf-autocomplete = 'bf-btn'
// BfAutocomplete = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-autocomplete-demo]',
  templateUrl: './bf-autocomplete-demo.component.html',
  styleUrls: ['./bf-autocomplete-demo.component.scss']
})
export class BfAutocompleteDemoComponent implements OnInit {
  public name = BfAutocompleteDoc.name;
  public desc = BfAutocompleteDoc.desc;
  public api = BfAutocompleteDoc.api;
  public instance = BfAutocompleteDoc.instance;

  public instance2 = 
`<bf-autocomplete</bf-autocomplete>`;


  public cssReset = `$optional_input_color : $optional-color;
$focused_input_color  : $focused-color;
$required_input_color : $primary_color;
$invalid_input_color  : $invalid-color;
$valid_input_color    : $primary_color;
$disabled_input_color : $disabled-color;

.bf-autocomplete-form-group {
  ...
}`;





  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList"></bf-dropdown>`;
  public compConf: any = {
    isRequired: false,
    isDisabled: false,
    rows: null,
    hasLabel: false,   labelText: 'My Description',
    hasTooltip: false, tooltipText: 'Hello World', tooltipPos: null, tooltipBody: false,
  };
  public upComp = () => {
    this.customCompCode = `<bf-autocomplete `;

    let compClasses = '';
    if (this.compConf.hasFullWidth) { compClasses += (!!compClasses.length ? ' ' : '') + 'full-width'; }
    if (this.compConf.hasSquash)    { compClasses += (!!compClasses.length ? ' ' : '') + 'squash'; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + this.bsStr;
    }
    this.customCompCode += `[(ngModel)]="myVal"` + this.bsStr;
    this.customCompCode += `(ngModelChange)="doSomething($event)"`;

    if (this.compConf.hasLabel)   { this.customCompCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`; }
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `[bfRequired]="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[bfDisabled]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `bfTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `bfTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    this.customCompCode += (`>` + this.brStr + `</bf-autocomplete>`);
  }





  constructor() { }

  ngOnInit() { }

}


export const BfAutocompleteDoc = {
  name    : `bf-autocomplete`,
  uiType  : 'component',
  desc    : `Generates a ....`,
  api     : `[bfText]: The text... `,
  instance: `<bf-autocomplete></bf-autocomplete>`, 
  demoComp: BfAutocompleteDemoComponent
};
