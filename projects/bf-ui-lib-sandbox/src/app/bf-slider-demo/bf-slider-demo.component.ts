// bf-slider = 'bf-btn'
// BfSlider = 'BfBtn'


import { ChangeDetectionStrategy, Component } from '@angular/core';
import {LabelType} from 'ng5-slider';

@Component({
  selector: 'app-bf-slider-demo',
  templateUrl: './bf-slider-demo.component.html',
  styleUrls: ['./bf-slider-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfSliderDemoComponent {
  public name = BfSliderDoc.name;
  public desc = BfSliderDoc.desc;
  public api = BfSliderDoc.api;
  public instance = BfSliderDoc.instance;



  public cssReset = `$slider_bg           : $white !default;
$slider_color_default: $light !default;
$slider_color_primary: $primary_color !default;`;

  public slider1 = 50;
  public slider1Options = { start: 10, end: 20, step: 2, showTicks: true, showTicksValues: true };
  public instance1Obj = `valueOptions = {
  start: 10,
  end: 20,
  step: 2,
  showTicks: true,
  showTicksValues: true
}`;

  public slider2;
  public slider2Options = { start: 20, end: 120, showTicks: true, showTicksValues: true, tickStep: 10, tickValueStep: 20 };
  public instance2Obj = `valueOptions = {
  start: 20,
  end: 120,
  showTicks: true
  showTicksValues: true,
  tickStep: 10,
  tickValueStep: 20
}`;
  public instance2 = `<bf-slider [(ngModel)]="value"
           [(bfHighValue)]="valueHigh"
           [bfOptions]="valueOptions">
</bf-slider>`;

  public slider3 = 15;
  public slider3Options = { start: 0, end: 100, showTicks: true, tickArray: [5, 10, 15, 25, 40, 65, 100], maxLimit: 60, showSelectionBar: true, showTicksValues: true };
  public instance3Obj = `valueOptions = {
  start: 0,
  end: 100,
  showTicks: true
  tickArray: [5,10,15,25,40,65,100],
  maxLimit: 60,
  showSelectionBar: true,
  showTicksValues: true
}`;
  public instance3 = `<bf-slider [(ngModel)]="value"
           [bfOptions]="valueOptions">
</bf-slider>`;

  public slider4 = 15;
  public slider4Options = {start: 0, end: 100};
  public instance4Obj = `translateFunc = (value: number)=>{
  return value + ' $';
}`;
  public instance4 = `<bf-slider [(ngModel)]="value"
           [bfOptions]="valueOptions"
           [bfCustomSliderLabel]="translateFunc">
</bf-slider>`;

  /*public slider5 = 80;
  public slider5High = 180;
  public slider5Options = { start: 60, end: 300, showTicks: true, tickArray: [60, 120, 180, 240, 300], showTicksValues: true };
  public instance5Obj = `translateFunc(value: number, label: LabelType) {
  switch (label) {
    case LabelType.Low:
      return 'From:'+value;
    case LabelType.High:
      return 'To:'+value;
    default:
      return value;
  }
}`;
  public instance5 = `<bf-slider [(ngModel)]="value"
           [(bfHighValue)]="valueHigh"
           [bfOptions]="valueOptions"
           [bfTranslate]="translateFunc">
</bf-slider>`;*/


  public valueSlider = 50;
  // public valueSliderHigh = 100;
  public sliderOptions: any = {
    start: 0,
    end: 150
  };


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n           `;
  public customCompCode = `<bf-slider [(ngModel)]="selObj" [bfList]="myList"></bf-slider>`;
  public compConf: any = {
    // addSecondValue: false,
    // showOuterSection: false,
    isRequired: false,
    isDisabled: false,
    rows: null,
    hasLabel: false,   labelText: 'My Description',
    hasTooltip: false, tooltipText: 'Hello World', tooltipPos: null
  };

  public upComp = () => {
    this.customCompCode = `<bf-slider `;

    this.customCompCode += `[(ngModel)]="myVal"`;
    // if (this.compConf.addSecondValue) { this.customCompCode += this.bsStr + `[(bfHighValue)]="mySecondVal"`; }

    this.customCompCode += this.bsStr + `[bfOptions]="sliderOptions"`;

    // if (this.compConf.showOuterSection) { this.customCompCode += this.bsStr + `[bfShowOuterSection]="true"`; }
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `[bfRequired]="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[bfDisabled]="true"`; }

    if (this.compConf.hasLabel)   { this.customCompCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfLabelTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `bfLabelTooltipPos="${this.compConf.tooltipPos}"`; }
    }

    this.customCompCode += (`>` + this.brStr + `</bf-slider>`);

  };

  public newTranslate = (value: number): string => `${value} $`;

  public translate2 = (value: number, label: LabelType) => {
    const labelValue = `${Math.trunc(value / 60)}:${value % 60 > 10 ? value % 60 : '0' + value % 60}`;
    switch (label) {
      case LabelType.Low:
        return `From: ${labelValue}`;
      case LabelType.High:
        return `To: ${labelValue}`;
      default:
        return labelValue;
    }
  };



  constructor() { }
}


export const BfSliderDoc = {
  name    : `bf-slider`,
  uiType  : 'component',
  desc    : `Generates a slider component`,
  api     : `[(ngModel)]         : The ngModel directive is linked as value on the Slider
[bfOptions]          : The Config options for the Slider:
                       {
                         start        : Initial range
                         end          : Final range
                         step         : (Optional) Step between each value
                         showSelectionBar: (Optional) Set to true to show the selection bar before the slider handle
                         showSelectionBarEnd: (Optional) Set to true to show the selection bar after the slider handle
                         showTicks    : (Optional) Set to true to display a tick for each step on the slider
                         showTicksValues: (Optional) Set true to display the value for each tick
                         tickStep     : (Optional) Number - Set the steps to be ticked
                         tickArray    : (Optional) Array - Set specific steps to be ticked
                         tickValueStep: (Optional) Number - Set the steps to show the value
                         maxLimit     : (Optional) Number - max value authorized on the slider
                         minLimit     : (Optional) Number - min value authorized on the slider
                       }
[bfCustomSliderLabel]: [method] = (value: number, label LabelType: LabelType): string => return (The label to be shown as a label on the range)
[bfDisabled]         : Whether the slider is disabled or not

[bfLabel]            : Label of the input (automatically translated). If not provided, no label is displayed.
[bfLabelTooltips]    : If label provided, adds a info badge with a tooltip (automatically translated)
[bfLabelTooltipPos]  : Position of the tooltip (top by default)`,
  instance: `<bf-slider [(ngModel)]="value"
           bfLabel="Test 1"
           [bfOptions]="valueOptions">
</bf-slider>`,
  demoComp: BfSliderDemoComponent
};
