import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bf-dual-checkbox-demo',
  templateUrl: './bf-dual-checkbox-demo.component.html',
  styleUrls: ['./bf-dual-checkbox-demo.component.scss']
})

export class BfDualCheckboxDemoComponent implements OnInit {
  public name = BfDualCheckboxDoc.name;
  public desc = BfDualCheckboxDoc.desc;
  public api = BfDualCheckboxDoc.api;
  public instance = BfDualCheckboxDoc.instance;
  public value;
  public printValue;
  public label = 'view.common.active';
  public ngModelValue;

  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = ``;
  public compConf = {
    bfLabel: 'view.common.active',
    ngModelValue: this.ngModelValue,
    isDisabled: false,
    isClassBlock: false,
    labelOne: 'view.common.yes',
    labelTwo: 'view.common.no'
  };

  public dualCheckboxHtmlStructure = `<div class="dual-checkbox">
  <bf-label [bfText]="bfLabel"></bf-label>
  <div>
    <bf-checkbox
      [bfLabel]="bfLabelOptionOne"
      [(ngModel)]="checkboxes.yes"
      (ngModelChange)="onChange('yes')"
      [bfDisabled]="bfDisabled"
    ></bf-checkbox>
    <bf-checkbox
      [bfLabel]="bfLabelOptionTwo"
      [(ngModel)]="checkboxes.no"
      (ngModelChange)="onChange('no')"
      [bfDisabled]="bfDisabled"
    ></bf-checkbox>
  </div>
</div>`;

  public checkboxHtmlStructure = `<div class="checkbox">
  <label>
    <input type="checkbox" [disabled]="bfDisabled"
           [ngModel]="ngModel" (ngModelChange)="onChange($event)">
    <span class="check-box icon-checkmark3"></span>
    <span class="check-text" [class.has-text]="!!bfLabel">{{bfLabel}}</span>
  </label>
</div>`;

  public blockExample = `<bf-dual-checkbox bfLabel="Inline Dual Checkbox"></bf-dual-checkbox>
<bf-dual-checkbox class="block" bfLabel="Block Dual Checkbox"></bf-dual-checkbox>`;

  public upComp = () => {
    this.customCompCode = `<bf-dual-checkbox `;

    let compClasses = '';
    if (this.compConf.isClassBlock) { compClasses += (!!compClasses.length ? ' ' : '') + 'block'; }

    if (!!compClasses) { this.customCompCode += `class="${compClasses}"` + this.bsStr; }

    if (this.compConf.bfLabel) { this.customCompCode += `[bfLabel]="${this.compConf.bfLabel}"`; }

    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[bfDisabled]="true"`; }

    if (this.compConf.labelOne) { this.customCompCode += this.bsStr + `[bfLabelOptionOne]="${this.compConf.labelOne}"`; }

    if (this.compConf.labelTwo) { this.customCompCode += this.bsStr + `[bfLabelOptionTwo]="${this.compConf.labelTwo}"`; }

    this.customCompCode += (`>` + this.brStr + `</bf-dual-checkbox>`);
  };

  public returnedValues = () => {
    return this.printValue = this.value === undefined ? 'undefined' : this.value;
  };

  ngOnInit() { }
}
export const BfDualCheckboxDoc = {
  name    : `bf-dual-checkbox`,
  uiType  : 'component',
  desc    : `Implements bf-checkbox to generate a dual boolean checkbox.`,
  api     : `
[(ngModel)]        : The ngModel directive is linked to the bf-checkbox boolean value.
[bfDisabled]       : Optional - Boolean value to disable (true) the input
[bfLabel]          : Optional - set dual checkbox label
[bfLabelOptionOne] : Optional - set custom checkbox 'true' option label, default = Yes
[bfLabelOptionTwo] : Optional - set custom checkbox 'false' option label, default = No`,
  instance: `<bf-dual-checkbox [(ngModel)]="defaultValue" bfLabel="Check me"></bf-dual-checkbox>`,
  demoComp: BfDualCheckboxDemoComponent
};