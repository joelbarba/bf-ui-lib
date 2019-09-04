import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'bf-quantity-input',
  templateUrl: './bf-quantity-input.component.html',
  styleUrls: ['./bf-quantity-input.component.scss']
})
export class BfQuantityInputComponent implements OnInit {
  @Input()  bfName: string;
  @Input()  bfOnChange: (obj) => void;
  @Input()  bfMinVal: number;
  @Input()  bfMaxVal: number;
  @Input()  bfSizeMode: 'small' | 'large' | 'input-fit' | 'button-fit';
  @Input()  bfDisableControls: boolean;
  @Input()  bfValue: number;
  @Output() bfValueChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.bfSizeMode = this.bfSizeMode || 'input-fit'; // default value
    this.setMinMaxValues();
  }

  setMinMaxValues() {
    this.bfMinVal = (typeof this.bfMinVal === 'string' ? parseInt(this.bfMinVal, 10) : this.bfMinVal) || 1;
    this.bfMaxVal = (typeof this.bfMaxVal === 'string' ? parseInt(this.bfMaxVal, 10) : this.bfMaxVal) || 100;
  }

  increaseQuantity() {
    if (!this.bfDisableControls && (this.bfMaxVal === undefined || this.bfValue < this.bfMaxVal)) {
      this.bfValue++;
      this.checkValidations();
    }
  }

  decreaseQuantity() {
    if (!this.bfDisableControls && (this.bfMinVal === undefined || this.bfValue > this.bfMinVal)) {
      this.bfValue--;
      this.checkValidations();
    }
  }

  checkValidations(value = this.bfValue) {
    this.bfValue = value;
    if (this.bfValue < this.bfMinVal || !this.bfValue) {
      this.bfValue = this.bfMinVal;
    } else if (this.bfValue > this.bfMaxVal) {
      this.bfValue = this.bfMaxVal;
    }

    if (typeof this.bfOnChange === 'function') {
      this.bfOnChange({ quantity: this.bfValue });
    }

    this.bfValueChange.emit(this.bfValue);
  }



}
