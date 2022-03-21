import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-range-slider-demo',
  templateUrl: './bf-range-slider-demo.component.html',
  styleUrls: ['./bf-range-slider-demo.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfRangeSliderDemoComponent implements OnInit {
  public name = BfRangeSliderDoc.name;
  public desc = BfRangeSliderDoc.desc;
  public api = BfRangeSliderDoc.api;
  public instance = BfRangeSliderDoc.instance;

  public cssReset = `$slider-bg: $white !default;
$slider-bar-color: #d8e0f3 !default; // bootstrap $light
$slider-pointer-color: $primary_color !default;
$slider-disabled-color: #d8e0f3 !default; // bootstrap $light`;


  tickOpts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];
  tickValOpts = [{id: 'all'}, {id: 'none'}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];
  paddingTest = 0;
  ngValue = { min: 120, max: 900 };
  bfValue = 42;

  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n           `;
  public customCompCode = ``;
  public compConf: any = {
    hasLabel: true,    bfLabel: 'Discount Price',
    hasTooltip: false, bfTooltip: 'Hello World', bfTooltipPos: null,
    bfDisabled: false,
    bfIniValue: 0,
    bfEndValue: 1439,
    hasMin: false, bfMinValue: 0,
    hasMax: false, bfMaxValue: 100,
    bfStep: 1,
    hasRenderFn: true, bfRenderFnText: ``, bfRenderFn: (val, tick, pointer) => {
      // if (pointer === 1) { return `From: ${val}`; }
      // if (pointer === 2) { return `To: ${val}`; }
      // return val;
      const hour = Math.trunc(val / 60);
      const minute = val % 60;
      const timeString = `${hour < 10 ? `0${hour}` : `${hour}`}:${minute < 10 ? `0${minute}` : `${minute}`}`;
      if (pointer === 1) { return `From: ${timeString}`; }
      if (pointer === 2) { return `To: ${timeString}`; }
      return ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '23:59'][tick];
    },
    bfAllowInverse: true,
    bfOuterRange: true,
    bfTicks: 8,
    bfTickLabels: 'all',
    useBfValue: false,
    flat: false,
    barTab: false,
    barPad: false,
    hideValue: false,
    tickLabelUp: false,
    showAsDisabled: false,
  };

  public upComp = () => {
    const bs = this.bsStr;
    const conf = this.compConf;
    conf.bfRenderFnText = conf.hasRenderFn ? `bfRenderFn = (val) => val + ' %'` : `bfRenderFn`;

    let code = `<bf-slider `;
    let compClasses = '';
    if (conf.flat) { compClasses = 'flat'; }
    if (conf.barTab) { compClasses += (compClasses ? ' ' : '') + 'bar-tab'; }
    if (conf.barPad) { compClasses += (compClasses ? ' ' : '') + 'bar-pad'; }
    if (conf.hideValue) { compClasses += (compClasses ? ' ' : '') + 'hide-value'; }
    if (conf.tickLabelUp) { compClasses += (compClasses ? ' ' : '') + 'tick-label-up'; }
    if (conf.showAsDisabled) { compClasses += (compClasses ? ' ' : '') + 'show-as-disabled'; }
    if (!!compClasses) { code += `class="${compClasses}"` + bs; }

    code += `[(ngModel)]="myVal"`;

    if (conf.hasLabel)   { code += bs + `bfLabel="${conf.bfLabel}"`; }
    if (conf.hasTooltip) {
      code += bs + `bfTooltip="${conf.tooltipText}"`;
      if (!!conf.tooltipPos)  { code += bs + `bfLabelTooltipPos="${conf.tooltipPos}"`; }
    }
    if (conf.bfDisabled) { code += bs + `[bfDisabled]="true"`; }

    code += bs + `[bfIniValue]="${conf.bfIniValue}"`;
    code += bs + `[bfEndValue]="${conf.bfEndValue}"`;
    if (conf.hasMin) { code += bs + `[bfMinValue]="${conf.bfMinValue}"`; }
    if (conf.hasMax) { code += bs + `[bfMaxValue]="${conf.bfMaxValue}"`; }

    if (conf.bfStep !== 1) { code += bs + `[bfStep]="${conf.bfStep}"`; }
    if (conf.hasRenderFn) { code += bs + `[bfRenderFn]="renderFn"`; }
    if (!conf.bfAllowInverse) { code += bs + `[bfAllowInverse]="false"`; }
    if (!conf.bfOuterRange) { code += bs + `[bfOuterRange]="false"`; }

    if (conf.bfTicks !== 1) { code += bs + `[bfTicks]="${conf.bfTicks}"`; }
    if (conf.bfTickLabels !== 'all') { code += bs + `[bfTickLabels]="${conf.bfTickLabels}"`; }

    code += (`>` + this.brStr + `</bf-slider>`);
    this.customCompCode = code;
  };

  constructor() { this.upComp(); }

  ngOnInit() { }

  newValue(minMax: 'min' | 'max', inc) {
    if (minMax === 'min') {
      this.ngValue = { ...this.ngValue, min: this.ngValue.min + inc };
    } else {
      this.ngValue = { ...this.ngValue, max: this.ngValue.max + inc };
    }
  }

  change(event) {
    // console.log('ngModelChange', event);
  }
}


export const BfRangeSliderDoc = {
  name    : `bf-range-slider`,
  uiType  : 'component',
  desc    : `Generates a range slider component`,
  api     : `[(ngModel)]         : The ngModel is linked as an Object on the Range Slider:
[bfLabel]            : Label of the input (automatically translated). If not provided, no label is displayed.
[bfLabelTooltips]    : If label provided, adds a info badge with a tooltip (automatically translated)
[bfLabelTooltipPos]  : Position of the tooltip (top by default)
[bfDisabled]         : Whether the slider is disabled or not

[bfStep]             : Increases bfStep values when moving left/right (default=1)
[bfIniValue]         : Value at the start of the bar (left)
[bfEndValue]         : Value at the end of the bar (right)
[bfMinValue]         : Min value (must be >= start). Equals bfIniValue if not defined
[bfMaxValue]         : Max value (must be <= end). Equals bfEndValue if not defined
[bfTabIndex1]        : Accessibility inputs to set to the pointer's [tabindex] 1
[bfTabIndex2]        : Accessibility inputs to set to the pointer's [tabindex] 2
[bfRenderFn]         : Function to render the values on the pointer and the ticks. It passes 3 parameters: (value, tickNum, pointer)
[bfAllowInverse]     : Whether to allow an inverse range (pointer 2 < pointer 1)
[bfOuterRange]       : How to show the bar when inverted range
                       false = show the bar between the pointers
                       true = (default) show the outer selection. 2 Bars, 1 from start to pointer2, another from pointer 1 to the end

[bfTicks]            : Number of tick dots to show on the bar (default = 1)
                       0 = shows no ticks on the bar at all
                       1 = shows the first and last tick on the bar (bfIniValue / bfEndValue) (default)
                       N = splits the bar in N sections, with ticks on every end of the section

[bfTickLabels]       : If and how many value labels to show next to every tick (default = 'all')
                       none = shows no values at all
                       all = shows the value of every tick (default)
                       N = shows the first and last ticks values + a value every N ticks`,
  instance: `<bf-range-slider [(ngModel)]="value"
                 [bfIniValue]="0"
                 [bfEndValue]="100"
                 [bfTicks]="5">
</bf-range-slider>`,
  demoComp: BfRangeSliderDemoComponent
};
