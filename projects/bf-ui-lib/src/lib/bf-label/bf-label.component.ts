import { Component, OnInit, Input, Inject } from '@angular/core';
import { AbstractTranslateService, BfUILibTransService} from '../abstract-translate.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bf-label',
  templateUrl: './bf-label.component.html',
  styleUrls: ['./bf-label.component.scss']
})
export class BfLabelComponent implements OnInit {
  @Input() bfText       : string = '';
  @Input() bfRequired   : boolean = false;
  @Input() bfValue      : string = '';
  @Input() bfTooltip    : string = '';
  @Input() bfTooltipPos : string = 'top';
  @Input() bfTooltipBody : boolean = true;

  public bfTextTranslated: string;
  public bfTooltipTranslated: string;

  constructor(
    // @Inject('BfUILibTransService') private translate: AbstractTranslateService,
    private translate: BfUILibTransService,
    private config: NgbPopoverConfig) {
  }

  ngOnInit() {
    // console.log(this.config);
    // this.config.openDelay = 2000;
    // this.config.closeDelay = 2000;
  }

  ngOnChanges() { // Translate bfText whenever it changes
    if (!!this.translate.doTranslate) {
      this.bfTextTranslated = this.translate.doTranslate(this.bfText);
      this.bfTooltipTranslated = this.translate.doTranslate(this.bfTooltip);
    } else {
      this.bfTextTranslated = this.bfText;
      this.bfTooltipTranslated = this.bfTooltip;
    }

    // console.log('this.bfTooltipPos', this.bfTooltipPos);
    // this.config.placement = this.bfTooltipPos;
    // this.config.triggers = 'hover';
    // this.config.container = 'body';
  }

}
