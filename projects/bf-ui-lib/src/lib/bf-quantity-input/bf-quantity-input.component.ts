import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'bf-quantity-input',
  templateUrl: './bf-quantity-input.component.html',
  styleUrls: ['./bf-quantity-input.component.scss']
})
export class BfQuantityInputComponent implements OnInit, OnChanges {
  @Input()  bfName: string;
  @Input() @Output()  bfValue: number;
  @Output() bfOnChange: () => void;
  @Input()  bfMinVal: number;
  @Input()  bfMaxVal: number;
  @Input()  bfSizeMode: 'small' | 'large' | 'input-fit' | 'button-fit';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = changes.bfValue;
    if (value && value.currentValue !== value.currentValue) {
      this.bfOnChange();
    }
  }

}
