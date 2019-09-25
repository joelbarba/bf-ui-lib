import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

interface IOrderConf {
  fields: Array<string>;
  reverse: boolean;
  setField ?: (orderField) => void;
}


@Component({
  selector: 'bf-list-header-col',
  templateUrl: './bf-list-header-col.component.html',
  styleUrls: ['./bf-list-header-col.component.scss']
})
export class BfListHeaderColComponent implements OnInit, OnChanges {
  @Input() colTitle: string = null;
  @Input() fieldName: string = null;
  @Input() orderConf: IOrderConf;
  @Output() bfOnChange = new EventEmitter<IOrderConf>();

  constructor() { }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('orderConf')) {
      this.orderConf.fields = this.orderConf.fields || [];
    }
  }

  ngOnInit() { }

  clickOrder = () => {
    if (!!this.orderConf && !!this.orderConf.setField && typeof this.orderConf.setField === 'function') {
      this.orderConf.setField(this.fieldName);
    }
    this.bfOnChange.emit(this.orderConf);
  }

}



