import { Component } from '@angular/core';
import { ColourType } from '../../../../bf-ui-lib/src/lib/bf-dot-badge/abstractions/types/colour.type';

@Component({
  selector: 'app-bf-dot-badge-demo',
  templateUrl: './bf-dot-badge-demo.component.html',
  styleUrls: ['./bf-dot-badge-demo.component.scss']
})
export class BfDotBadgeDemoComponent {
  public readonly name = BfDotBadgeDoc.name;
  public readonly desc = BfDotBadgeDoc.desc;
  public readonly api = BfDotBadgeDoc.api;

  public readonly cssReset = `$bf-dot-badge-colors: (
  'primary': $primary_color,
  'secondary': $secondary_color,
  'tertiary': $tertiary_color,
  'quaternary': $quaternary_color,
  'extra': $extra_color,
  'success': $primary_color,
  'warning': $warning_color,
) !default;

$badge-dot-size: 0.5rem !default;`;

  public readonly brStr = `\n`;
  public readonly bsStr = `\n              `;

  public customComponentCode = `<bf-dot-badge bfType="primary"
              bfText="Primary"
              bfLabelDisplayType="auto"
></bf-dot-badge>`;

  public config: {
    type: ColourType;
    text: string;
    labelDisplayType: 'tooltip' | 'label' | 'auto'
  } = {
    type: 'primary',
    text: 'My label',
    labelDisplayType: 'auto',
  };

  public typeList = [
    { type: 'primary' },
    { type: 'secondary' },
    { type: 'tertiary' },
    { type: 'quaternary' },
    { type: 'extra' },
    { type: 'success' },
    { type: 'warning' }
  ];


  activeExample = `<bf-dot-badge [bfStatus]="1"></bf-dot-badge>`;
  activeExample2 = `<bf-dot-badge [bfStatus]="true"></bf-dot-badge>`;

  inactiveExample = `<bf-dot-badge [bfStatus]="0"></bf-dot-badge>`;
  inactiveExample2 = `<bf-dot-badge [bfStatus]="false"></bf-dot-badge>`;

  responsiveExample = `<bf-dot-badge bfType="secondary" bfText="Responsive at 1280px" [bfBreakpoint]="1280"></bf-dot-badge>`;


  constructor() { }

  getInstance(type: ColourType, text?: string, bfLabelDisplayType?: 'tooltip' | 'label' | 'auto'): string {
    let base = `<bf-dot-badge bfType="${type}"
              bfText="${text ?? (type[0].toLocaleUpperCase() + type.slice(1))}"`;

    if (bfLabelDisplayType) base += `${this.bsStr}bfLabelDisplayType="${bfLabelDisplayType}"`;

    return `${base}${this.brStr}></bf-dot-badge>`;
  }

  updateComponent(valueChange: { key: string; value: any }) {
    if (valueChange) this.config[valueChange.key] = valueChange.value;

    this.customComponentCode = `<bf-dot-badge `;

    this.customComponentCode += `bfType="${this.config.type}"`;
    this.customComponentCode += this.bsStr + `bfLabelDisplayType="${this.config.labelDisplayType}"`;
    this.customComponentCode += this.bsStr + `bfText="${this.config.text}"`;

    this.customComponentCode += this.brStr + `></bf-dot-badge>`;
  };
}

export const BfDotBadgeDoc = {
  name: `bf-dot-badge`,
  uiType: 'component',
  desc: `Generate a dot badge`,
  api: `[bfType]             : Customize type for the dot, determines the color.
[bfText]             : (String) The text to show with the dot
[bfLabelDisplayType] : How the label should be displayed, either always as a label, a tooltip or swap between them based on the screen size`,
  instance: `<bf-dot-badge bfType="primary" bfText="Primary"></bf-dot-badge>`,
  demoComp: BfDotBadgeDemoComponent
};
