import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {BfUILibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'bf-label',
  templateUrl: './bf-label.component.html',
  styleUrls: ['./bf-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BfLabelComponent implements OnInit, OnChanges {
  @Input() bfText = '';
  @Input() bfRequired = false;
  @Input() bfValue = '';
  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;

  public bfTextTrans$: Observable<string> = of('');        // Translated text for the label
  public bfValueTrans$: Observable<string> = of('');       // Translated text for the value
  public bfTooltipTrans$: Observable<string> = of('');     // Translated text for the tooltip of the label

  constructor(private translate: BfUILibTransService) {
  }

  ngOnInit() {}

  ngOnChanges(change) {
    if (change.hasOwnProperty('bfText'))    { this.bfTextTrans$    = this.translate.getLabel$(this.bfText); }
    if (change.hasOwnProperty('bfTooltip')) { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
    if (change.hasOwnProperty('bfValue'))   { this.bfValueTrans$   = this.translate.getLabel$(this.bfValue); }
  }

}
