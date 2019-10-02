import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'bf-progress-bar',
  templateUrl: './bf-progress-bar.component.html',
  styleUrls: ['./bf-progress-bar.component.scss']
})
export class BfProgressBarComponent implements OnInit, OnChanges {
  @Input() bfLabel: string;      // Label to translate and display on top of the progress bar
  @Input() bfTotal: number;      // Maximum value
  @Input() bfValue: number;      // Actual value
  @Input() bfUsedLabel: string;  // Sentence below the progress bar on the left with a data binding of the value
  @Input() bfLeftLabel: string;  // Sentence below the progress bar on the right with a data binding of the remaining value
  percentageValue: number;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    // Recalculate the percentage value
    this.percentageValue = Math.round(this.bfValue * 100 / this.bfTotal);
  }

  getUsedValue() {
    return Number(this.bfTotal) >= Number(this.bfValue) ? this.bfValue : this.bfTotal;
  }

  getLeftValue() {
    return Number(this.bfTotal) >= Number(this.bfValue) ? (this.bfTotal - this.bfValue) : 0;
  }

}
