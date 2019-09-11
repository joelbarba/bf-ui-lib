// bf-slider = 'bf-btn'
// BfSlider = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-slider-demo]',
  templateUrl: './bf-slider-demo.component.html',
  styleUrls: ['./bf-slider-demo.component.scss']
})
export class BfSliderDemoComponent implements OnInit {
  public name = BfSliderDoc.name;
  public desc = BfSliderDoc.desc;
  public api = BfSliderDoc.api;
  public instance = BfSliderDoc.instance;

  public instance2 = 
`<bf-slider</bf-slider>`;


  public cssReset = `$optional_input_color : $optional-color;
$focused_input_color  : $focused-color;
$required_input_color : $primary_color;
$invalid_input_color  : $invalid-color;
$valid_input_color    : $primary_color;
$disabled_input_color : $disabled-color;

.bf-slider-form-group {
  ...
}`;





  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList"></bf-dropdown>`;
  public compConf:any = {
    isRequired: false,
    isDisabled: false,
    rows: null,
    hasLabel: false,   labelText: 'My Description',
    hasTooltip: false, tooltipText: 'Hello World', tooltipPos: null, tooltipBody: false,
  };
  public upComp = () => {
    this.customCompCode = `<bf-slider `;

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

    this.customCompCode += (`>` + this.brStr + `</bf-slider>`);
  };





  constructor() { }

  ngOnInit() { }

}


export const BfSliderDoc = {
  name    : `bf-slider`,
  uiType  : 'component',
  desc    : `Generates a ....`,
  api     : `[bfText]: The text... `,
  instance: `<bf-slider></bf-slider>`, 
  demoComp: BfSliderDemoComponent
};
