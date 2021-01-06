import {Component, OnInit, Input, Output, EventEmitter, OnChanges, ElementRef} from '@angular/core';
import { Observable } from 'rxjs';
import {BfUILibTransService} from '../abstract-translate.service';

interface IOrderConf {
  fields: Array<string>;
  reverse: boolean;
  setField ?: (orderField) => void;
}


@Component({
  selector: 'bf-list-header-col',
  templateUrl: './bf-list-header-col.component.html',
  styleUrls: []
})
export class BfListHeaderColComponent implements OnInit, OnChanges {
  @Input() colTitle: string = null;
  @Input() fieldName: string = null;
  @Input() orderConf: IOrderConf;
  @Input() bfTooltip: string;
  @Input() bfTooltipPos = 'top';

  @Output() bfOnChange = new EventEmitter<IOrderConf>();

  public colTitle$;
  public bfTooltipTrans$: Observable<string>;

  constructor(private translate: BfUILibTransService, public elementRef: ElementRef) {}

  ngOnChanges(changes) {
    if (changes.orderConf) { this.orderConf.fields = this.orderConf.fields || []; }
    if (changes.colTitle) { this.colTitle$ = this.translate.getLabel$(this.colTitle); }
  }

  ngOnInit() {
    this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip);
  }

  clickOrder = () => {
    if (!!this.orderConf && !!this.orderConf.setField && typeof this.orderConf.setField === 'function') {
      this.orderConf.setField(this.fieldName);
    }
    this.bfOnChange.emit(this.orderConf);
  }

}



