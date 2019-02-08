import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bf-list-header-col',
  templateUrl: './bf-list-header-col.component.html',
  styleUrls: ['./bf-list-header-col.component.scss']
})
export class BfListHeaderColComponent implements OnInit {
  @Input() colTitle: string = null;
  @Input() fieldName: string = null;
  @Input() orderConf: {
    field    : string,
    reversed : boolean,
    onChange?: Function
  } = null;

  @Output() onChange = new EventEmitter<string>();

  constructor() { }
  ngOnInit() { }

  clickOrder = () => {
    if (!!this.orderConf && !!this.orderConf.onChange) {
      this.orderConf.onChange(this.fieldName)
    }
    this.onChange.emit(this.orderConf.field);
  }

}



