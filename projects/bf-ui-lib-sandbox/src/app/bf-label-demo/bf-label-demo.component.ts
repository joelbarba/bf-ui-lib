import { TranslateService } from '../translate.service';
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

  public injectLibEx = `import { TranslateService } from './translate.service';

@NgModule({
 imports: [
  BfUiLibModule.forRoot({ TranslateService })`;


  public extendTransLib = `export class TranslateService extends AbstractTranslateService {
 constructor() { super(); }

 doTranslate(label ?: string): string { … }
}`;

  public cssReset = `label.is-required {
  color: $primary_color;
}`;


  constructor(
    private translate: TranslateService,
    private config: NgbPopoverConfig
  ) {
    // Popover default config
    // config.placement = 'top';
    // config.triggers = 'hover';
    // config.container = 'body';
  }

  ngOnInit() {
    // this.translate.doTranslate('AAAAAAAA');
  }

}


export const BfLabelDoc = {
  name    : `bf-label`,
  uiType  : 'component',
  desc    : `Generates a label to title an element into a form.`,
  api     : `[bfText]        : Text to display as label
[bfValue]       : Static value for the label (optional). 
[bfRequired]    : Whether the label is for a required field. It adds the class "is-required" on the label (to change the color), and an asterisk after the text.
[bfTooltip]     : If set, an info bullet will be added before the label, with a tooltip of the text
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent contaniner may affect the visibility of the tooltip`,
  instance: `<bf-label bfText="view.common.username"></bf-label>`,
  demoComp: BfLabelDemoComponent
};
