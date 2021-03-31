import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BfUILibTransService} from '../abstract-translate.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'bf-label',
  templateUrl: './bf-label.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class BfLabelComponent implements OnInit, OnChanges {
  @Input() bfText = '';
  @Input() bfRequired = false;
  @Input() bfValue = '';
  @Input() bfTooltip = '';
  @Input() bfValueTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = true;
  @Input() bfForElementId: string; // The element that the label should describe
  @Output() bfClick = new EventEmitter<any>();

  public bfTextTrans$: Observable<string> = of('');        // Translated text for the label
  public bfValueTrans$: Observable<string> = of('');       // Translated text for the value
  public bfTooltipTrans$: Observable<string> = of('');     // Translated text for the tooltip of the label
  public bfValueTooltipTrans$: Observable<string> = of('');     // Translated text for the tooltip of the value

  constructor(private translate: BfUILibTransService) {
  }

  ngOnInit() {}

  ngOnChanges(change) {
    if (change.hasOwnProperty('bfText'))    { this.bfTextTrans$    = this.translate.getLabel$(this.bfText); }
    if (change.hasOwnProperty('bfTooltip')) { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
    if (change.hasOwnProperty('bfValue'))   { this.bfValueTrans$   = this.translate.getLabel$(this.bfValue); }
    if (change.hasOwnProperty('bfValueTooltip'))   { this.bfValueTooltipTrans$   = this.translate.getLabel$(this.bfValueTooltip); }
  }

  valueEvent() {
    if(!!this.bfClick) {
      this.bfClick.emit();
    }
  }

}
