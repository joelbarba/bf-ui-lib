// bf-textarea = 'bf-btn'
// BfTextarea = 'BfBtn'


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-textarea-demo]',
  templateUrl: './bf-textarea-demo.component.html',
  styleUrls: ['./bf-textarea-demo.component.scss']
})
export class BfTextareaDemoComponent implements OnInit {
  public name = BfTextareaDoc.name;
  public desc = BfTextareaDoc.desc;
  public api = BfTextareaDoc.api;
  public instance = BfTextareaDoc.instance;
  public instance2 = `<bf-textarea</bf-textarea>`;
  public myVal = '';

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
    this.customCompCode = `<bf-textarea `;

    // let compClasses = '';
    // if (this.compConf.hasFullWidth) { compClasses = 'full-width'; }
    // // if (this.compConf.hasSquash) {
    // //   if (!!compClasses) { compClasses += ' '; }
    // //   compClasses += 'squash';
    // // }
    // if (!!compClasses) {
    //   this.customDropdownCode += `class="${compClasses}"` + this.bsStr;
    // }
    this.customCompCode += `[(ngModel)]="myVal"` + this.bsStr;
    this.customCompCode += `(ngModelChange)="doSomething($event)"`;

    if (this.compConf.hasLabel) {
      this.customCompCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`;
    }
    if (this.compConf.isRequired) {
      this.customCompCode += this.bsStr + `[bfRequired]="true"`;
    }
    if (this.compConf.isDisabled) {
      this.customCompCode += this.bsStr + `[bfDisabled]="true"`;
    }


    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos) {
        this.customCompCode += this.bsStr + `bfTooltipPos="${this.compConf.tooltipPos}"`;
      }
      if (!!this.compConf.tooltipBody) {
        this.customCompCode += this.bsStr + `bfTooltipBody="${this.compConf.tooltipBody}"`;
      }
    }

    this.customCompCode += (`>` + this.brStr + `</bf-textarea>`);
  };

  constructor() { }

  ngOnInit() { }

}


export const BfTextareaDoc = {
  name    : `bf-textarea`,
  desc    : `Generates a textarea component.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <textarea>, so that can be used as a form element with ngForm (status is propagated).
[bfRows]        : Number of rows of the <textarea> (4 by default).
[bfLabel]       : Label of the input (automatically translated). If not provided, no label is displayed.
[bfRequired]    : Whether the input is required or not
[bfDisabled]    : Whether the input is disabled or not
[bfPlaceholder] : Placeholder text (automatically translated)
[bfTooltip]     : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the toolt`,
  instance: `<bf-textarea [(ngModel)]="myVal" bfLabel="My Text"></bf-textarea>`,
  demoComp: BfTextareaDemoComponent
};