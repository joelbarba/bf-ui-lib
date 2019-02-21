import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bf-checkbox',
  templateUrl: './bf-checkbox.component.html',
  styleUrls: ['./bf-checkbox.component.scss']
})
export class BfCheckboxComponent implements OnInit {
  @Input() bfModel: boolean = false;
  @Output() bfModelChange = new EventEmitter<boolean>();
  @Input() bfLabel: string = '';
  @Input() bfDisabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onChange(value) {
    console.log('changing checkbox', value);
    this.bfModelChange.emit(value);
  }

}
