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
  public myValue = true;

  public instance2 = `<bf-checkbox bfLabel="Check me" [ngModel]="myValue" (ngModelChange)="myValue = $event"></bf-checkbox>`;
  public instance3 = `<bf-checkbox [(ngModel)]="myValue"></bf-checkbox>`;

  public instance4 = `<bf-checkbox [ngModel]="true"  bfLabel="Checked" [bfDisabled]="true"></bf-checkbox>
<bf-checkbox [ngModel]="false" bfLabel="Unchecked" [bfDisabled]="true"></bf-checkbox>`;

  public bootstrapHtmlStructure = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="">
  <label class="form-check-label" for="defaultCheck1">My Text</label>
</div>`;

  public bfHtmlStructure = `<div class="checkbox">
  <label>
    <input type="checkbox" [disabled]="bfDisabled"
           [ngModel]="ngModel" (ngModelChange)="onChange($event)">
    <span class="check-box icon-checkmark3"></span>
    <span class="check-text" [class.has-text]="!!bfLabel">{{bfLabel}}</span>
  </label>
</div>`;
  public inputCheckboxHtml = `<input type="checkbox">`;

  public blockExample = `<bf-checkbox bfLabel="Inline check 1"></bf-checkbox>
<bf-checkbox bfLabel="Inline check 2"></bf-checkbox>
<bf-checkbox bfLabel="Inline check 3"></bf-checkbox>
<bf-checkbox class="block" bfLabel="Block check 4"></bf-checkbox>
<bf-checkbox class="block" bfLabel="Block check 5"></bf-checkbox>
<bf-checkbox class="block" bfLabel="Block check 6"></bf-checkbox>`;

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


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = ``;
  public compConf = {
    bfLabel: 'view.common.username',
    isDisabled: false,
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: null, tooltipBody: 'true',
    isClassBlock: false,
  };
  public upComp = () => {
    this.customCompCode = `<bf-checkbox `;

    let compClasses = '';
    if (this.compConf.isClassBlock) { compClasses += (!!compClasses.length ? ' ' : '') + 'block'; }
    if (!!compClasses) { this.customCompCode += `class="${compClasses}"` + this.bsStr; }

    if (this.compConf.bfLabel) { this.customCompCode += `bfLabel="${this.compConf.bfLabel}"`; }

    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[isDisabled]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `bfTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `bfTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    this.customCompCode += (`>` + this.brStr + `</bf-checkbox>`);
  };


  constructor() { }

  ngOnInit() { }

}


export const BfCheckboxDoc = {
  name    : `bf-checkbox`,
  uiType  : 'component',
  desc    : `Generates a button.`,
  api     : `[(ngModel)]     : The ngModel directive is linked to the inner <input>, so that can be used as a form element with ngForm (status is propagated).  
[bfLabel]       : Text of the label (optional)
[bfDisabled]    : Boolean value to disable (true) the input
[bfTooltip]     : If set, an info bullet will be added before the label, with a tooltip of the text
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip`,
  instance: `<bf-checkbox [(ngModel)]="myValue" bfLabel="Check me"></bf-checkbox>`,
  demoComp: BfCheckboxDemoComponent
};
