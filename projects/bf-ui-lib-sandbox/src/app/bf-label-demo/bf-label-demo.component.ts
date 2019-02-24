import { TranslateService } from '../translate.service';
import { Component, OnInit, Inject } from '@angular/core';

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
`<bf-label bfText="Email" [bfRequired]="true"></bf-label>`;
  public instance3 =
`<bf-label bfText="User Name" 
          bfTooltip="Helping message" 
          bfRequired="true">
</bf-label>`;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.doTranslate('AAAAAAAA');
  }

}


export const BfLabelDoc = {
  name    : `bf-label`,
  desc    : `Generates a button.`,
  api     : `[bfText]       : Text to display as label
[bfRequired]   : Whether the label is for a required field
[bfTooltip]    : If set, an info bullet will be added before the label, with the tooltip of this text
[bfTooltipPos] : Position of the tooltip (top by default)`,
  instance: `<bf-label bfText="User Name"></bf-label>`,
  demoComp: BfLabelDemoComponent
};
