import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-bf-slider-demo',
  templateUrl: './bf-slider-demo.component.html',
  styleUrls: ['./bf-slider-demo.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfSliderDemoComponent {
  public name = BfSliderDoc.name;
  public desc = BfSliderDoc.desc;
  public api = BfSliderDoc.api;
  public instance = BfSliderDoc.instance;

  public cssReset = `$slider-bg: $white !default;
$slider-bar-color: $light !default;
$slider-pointer-color: $primary_color !default;`;


  highlightOpts = [{ id: 'left' }, { id: 'right' }];
  tickOpts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];
  tickValOpts = [{id: 'all'}, {id: 'none'}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];
  paddingTest = 0;
  ngValue = 42;
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
    bfEndValue: 100,
    hasMin: false, bfMinValue: 0,
    hasMax: false, bfMaxValue: 100,
    bfStep: 1,
    hasRenderFn: true, bfRenderFnText: ``, bfRenderFn: (val) => val + ' %',
    bfHighlightBar: 'left',
    bfTicks: 5,
    bfTickLabels: 'all',
    useBfValue: false,
    flat: false,
    barTab: false,
    barPad: false,
    hideValue: false,
    tickLabelUp: false,
  };

  public upComp = () => {
    const conf = this.compConf;
    conf.bfRenderFnText = conf.hasRenderFn ? `bfRenderFn = (val) => val + ' %'` : `bfRenderFn`;

    let code = `<bf-slider `;
    if (!conf.useBfValue) { code += `[(ngModel)]="myVal"`; }
    if (conf.useBfValue)  { code += `[(bfValue)]="myVal"`; }

    if (conf.hasLabel)   { code += this.bsStr + `bfLabel="${conf.bfLabel}"`; }
    if (conf.hasTooltip) {
      code += this.bsStr + `bfTooltip="${conf.tooltipText}"`;
      if (!!conf.tooltipPos)  { code += this.bsStr + `bfLabelTooltipPos="${conf.tooltipPos}"`; }
    }
    if (conf.bfDisabled) { code += this.bsStr + `[bfDisabled]="true"`; }

    code += this.bsStr + `[bfIniValue]="${conf.bfIniValue}"`;
    code += this.bsStr + `[bfEndValue]="${conf.bfEndValue}"`;
    if (conf.hasMin) { code += this.bsStr + `[bfMinValue]="${conf.bfMinValue}"`; }
    if (conf.hasMax) { code += this.bsStr + `[bfMaxValue]="${conf.bfMaxValue}"`; }

    if (conf.bfStep !== 1) { code += this.bsStr + `[bfStep]="${conf.bfStep}"`; }
    if (conf.hasRenderFn) { code += this.bsStr + `[bfRenderFn]="renderFn"`; }
    if (conf.bfHighlightBar !== 'left') { code += this.bsStr + `[bfHighlightBar]="${conf.bfHighlightBar}"`; }

    if (conf.bfTicks !== 1) { code += this.bsStr + `[bfTicks]="${conf.bfTicks}"`; }
    if (conf.bfTickLabels) { code += this.bsStr + `[bfTickLabels]="${conf.bfTickLabels}"`; }

    code += (`>` + this.brStr + `</bf-slider>`);
    this.customCompCode = code;
  };

  constructor() { this.upComp(); }

}


export const BfSliderDoc = {
  name    : `bf-slider`,
  uiType  : 'component',
  desc    : `Generates a slider component`,
  api     : `[(ngModel)]          : The ngModel directive is linked as value on the Slider
[(bfValue)]          : It mirrors the ngModel value, but it doesn't update it while mouse moving the pointer
[bfLabel]            : Label of the input (automatically translated). If not provided, no label is displayed.
[bfLabelTooltips]    : If label provided, adds a info badge with a tooltip (automatically translated)
[bfLabelTooltipPos]  : Position of the tooltip (top by default)
[bfDisabled]         : Whether the slider is disabled or not
[bfStep]             : Increases bfStep values when moving left/right
[bfIniValue]         : Value at the start of the bar (left)
[bfEndValue]         : Value at the end of the bar (right)
[bfMinValue]         : Min value (must be >= start). Equals bfIniValue if not defined
[bfMaxValue]         : Max value (must be <= end). Equals bfEndValue if not defined
[bfTabIndex]         : Accessibility inputs to set to the pointer's [tabindex]
[bfRenderFn]         : Function to render the values on the pointer and the ticks
[bfHighlightBar]     : If left, it draws a colored bar from the start to the pointer
                       If right, it draws a colored bar from the pointer to the end

[bfTicks]            : 0 = shows no ticks on the bar at all
                       1 = shows the first and last tick on the bar (bfIniValue / bfEndValue) (default)
                       N = splits the bar in N sections, with ticks on every end of the section

[bfTickLabels]       : none = shows no values at all
                       all = shows the value of every tick (default)
                       N = shows the first and last ticks values + a value every N ticks`,
  instance: `<bf-slider [(ngModel)]="value" bfLabel="Test 1" [bfEndValue]="50"></bf-slider>`,
  demoComp: BfSliderDemoComponent
};
