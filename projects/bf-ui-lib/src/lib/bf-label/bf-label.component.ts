import { Component, OnInit, Input, Inject } from '@angular/core';
import { AbstractTranslateService } from '../abstract-translate.service';

@Component({
  selector: 'bf-label',
  templateUrl: './bf-label.component.html',
  styleUrls: ['./bf-label.component.scss']
})
export class BfLabelComponent implements OnInit {
  @Input() bfText       : string = '';
  @Input() bfRequired   : boolean = false;
  @Input() bfTooltip    : string = '';
  @Input() bfTooltipPos : string = 'top';

  public bfTextTranslated: string;

  constructor(@Inject('TranslateService') private translate: AbstractTranslateService) { }

  ngOnInit() {
  }

  ngOnChanges() { // Translate bfText whenever it changes
    if (!!this.translate.doTranslate) {
      this.bfTextTranslated = this.translate.doTranslate(this.bfText);
    } else {
      this.bfTextTranslated = this.bfText;
    }
  }

}
