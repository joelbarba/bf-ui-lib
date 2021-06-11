import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BfUILibTransService } from '../abstract-translate.service';

@Component({
  selector: 'bf-progress-bar',
  templateUrl: './bf-progress-bar.component.html',
  styleUrls: []
})
export class BfProgressBarComponent implements OnInit, OnChanges {
  @Input() bfLabel: string;      // Label to translate and display on top of the progress bar
  @Input() bfTotal: number;      // Maximum value
  @Input() bfValue: number;      // Actual value
  @Input() bfUsedLabel: string;  // Sentence below the progress bar on the left with a data binding of the value
  @Input() bfLeftLabel: string;  // Sentence below the progress bar on the right with a data binding of the remaining value
  percentageValue: number;

  bfUsedLabel$: Observable<string> = of('');
  bfLeftLabel$: Observable<string> = of('');
  
  constructor(private translate: BfUILibTransService) { }

  ngOnInit() { }

  ngOnChanges() {
    // Recalculate the percentage value
    this.percentageValue = Math.round(Number(this.bfValue) * 100 / Number(this.bfTotal));

    this.bfUsedLabel$ = this.translate.getLabel$(this.bfUsedLabel, { value: this.getUsedValue() });
    this.bfLeftLabel$ = this.translate.getLabel$(this.bfLeftLabel, { value: this.getLeftValue() });
  }

  getUsedValue() {
    return Number(this.bfTotal) >= Number(this.bfValue) ? this.bfValue : this.bfTotal;
  }

  getLeftValue() {
    return Number(this.bfTotal) >= Number(this.bfValue) ? (this.bfTotal - this.bfValue) : 0;
  }

}
