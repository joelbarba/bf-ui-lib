import {BfTranslateService} from '../translate.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bf-label-demo]',
  templateUrl: './bf-label-demo.component.html',
  styleUrls: ['./bf-label-demo.component.scss']
})
export class BfLabelDemoComponent implements OnInit {
  public name = BfLabelDoc.name;
  public desc = BfLabelDoc.desc;
  public api = BfLabelDoc.api;
  public instance = BfLabelDoc.instance;

  public instance2 =
`<bf-label bfText="view.common.name" [bfRequired]="true"></bf-label>`;
  public instance3 =
`<bf-label bfText="view.common.email" bfRequired="true"
          bfTooltip="view.tooltip.message">
</bf-label>`;
  public instance4 =
`<bf-label bfText="view.common.name"
          bfTooltip="view.tooltip.message" bfTooltipPos="left" [bfTooltipBody]="false">
</bf-label>`;
  public instance5 = `<bf-label class="no-bold" bfText="No Bold Label"></bf-label>`;
  public instance6 = `<bf-label class="no-colon" bfText="No Colon Label"></bf-label>
<bf-label class="colon value-inline" bfValue="Colon with no label"></bf-label>`;

  public bfHtmlStructure =
`<label class="is-required">
  <span class="info-badge" [ngbTooltip]="bfTooltip" [placement]="bfTooltipPos" triggers="hover" container="body">
    <span class="icon-info"></span>
  </span>
  <span>{{bfTextTranslated}}</span>:
  <span class="asterisk">*</span>
</label>`;

  public valueInlineExample = `<bf-label bfText="Label" bfValue="The second value" class="value-inline"></bf-label>`;
  public valueListExample = `<bf-label class="value-list-3" bfText="User Name"   bfValue="Joel Barba" ></bf-label>
<bf-label class="value-list-3" bfText="Email"       bfValue="joel.barba@blueface.com"></bf-label>
<bf-label class="value-list-3" bfText="Number"      bfValue="+353 089 422 6474"></bf-label>
<bf-label class="value-list-3" bfText="Description" bfValue="He is a very nice guy"></bf-label>`;

  public transAbsService = `export abstract class AbstractTranslateService {
  constructor() { }

  // Synchronous translation
  abstract doTranslate(label ?: string): string;
}`;

  public injectLibEx = `import { BfTranslateService } from './translate.service';

@NgModule({
 imports: [
  BfUiLibModule.forRoot({ TranslateService: BfTranslateService })`;


  public extendTransLib = `export class TranslateService extends AbstractTranslateService {
 constructor() { super(); }

 doTranslate(label ?: string): string { … }
}`;

  public cssReset = `label.is-required {
  color: $primary_color;
}`;


  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n          `;
  public customCompCode = ``;
  public compConf = {
    hasLabel: true, text: 'view.common.username',
    hasValue: false, value: 'view.common.field_name',
    isRequired: true,
    hasTooltip: true, tooltipText: 'view.tooltip.message', tooltipPos: null, tooltipBody: 'true',
    hasNoBold: false,
    hasNoColon: false,
    hasColon: false,
    hasValueInline: false,
    hasValueList: false,
    hasValueBold: false,
    hasValueLight: false,
    hasEllipsis: false,
    textSize: null,
    valueList: null,
    valueMar: null,
  };
  public textSizes = [];
  public valueLists = [];
  public valueMars = [];
  public upComp = () => {
    this.customCompCode = `<bf-label `;

    let compClasses = '';
    if (this.compConf.hasNoColon)     { compClasses += (!!compClasses.length ? ' ' : '') + 'no-colon'; }
    if (this.compConf.hasColon)       { compClasses += (!!compClasses.length ? ' ' : '') + 'colon'; }
    if (this.compConf.hasValueInline) { compClasses += (!!compClasses.length ? ' ' : '') + 'value-inline'; }
    if (this.compConf.hasValueList)   { compClasses += (!!compClasses.length ? ' ' : '') + 'value-list'; }
    if (this.compConf.hasNoBold)      { compClasses += (!!compClasses.length ? ' ' : '') + 'no-bold'; }
    if (this.compConf.hasValueBold)   { compClasses += (!!compClasses.length ? ' ' : '') + 'value-bold'; }
    if (this.compConf.hasValueLight)  { compClasses += (!!compClasses.length ? ' ' : '') + 'value-light'; }
    if (this.compConf.hasEllipsis)    { compClasses += (!!compClasses.length ? ' ' : '') + 'ellipsis'; }
    if (this.compConf.textSize)       { compClasses += (!!compClasses.length ? ' ' : '') + this.compConf.textSize; }
    if (this.compConf.valueMar)       { compClasses += (!!compClasses.length ? ' ' : '') + this.compConf.valueMar; }
    if (this.compConf.valueList)      { compClasses += (!!compClasses.length ? ' ' : '') + this.compConf.valueList; }
    if (!!compClasses) {
      this.customCompCode += `class="${compClasses}"` + this.bsStr;
    }

    if (this.compConf.hasLabel) { this.customCompCode += `bfText="${this.compConf.text}"`; }
    if (this.compConf.hasValue) { this.customCompCode += (!this.compConf.hasLabel ? '' : this.bsStr) + `bfValue="${this.compConf.value}"`; }

    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `[bfRequired]="true"`; }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `bfTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `bfTooltipBody="${this.compConf.tooltipBody}"`; }
    }

    this.customCompCode += (`>` + this.brStr + `</bf-label>`);
  };




  constructor(
    private translate: BfTranslateService,
    private config: NgbPopoverConfig
  ) {
    // Popover default config
    // config.placement = 'top';
    // config.triggers = 'hover';
    // config.container = 'body';

    for (let t = 30; t >= 1; t--) { this.textSizes.push({id: 'text-' + t }); }
    for (let t = 1; t <= 10; t++) { this.valueLists.push({id: 'value-list-' + t }); }
    for (let t = 0; t <=  6; t++) { this.valueMars.push({id: 'value-mar-' + (t * 5) }); }
  }

  ngOnInit() {
    // this.translate.doTranslate('AAAAAAAA');
  }

}


export const BfLabelDoc = {
  name    : `bf-label`,
  uiType  : 'component',
  desc    : `Generates a label to title an element in a form.`,
  api     : `[bfText]        : Text to display as label
[bfValue]       : Static value for the label (optional). 
[bfRequired]    : Whether the label is for a required field. It adds the class "is-required" on the label (to change the color), and an asterisk after the text.
[bfTooltip]     : If set, an info bullet will be added before the label, with a tooltip of the text
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip`,
  instance: `<bf-label bfText="view.common.username"></bf-label>`,
  demoComp: BfLabelDemoComponent
};
