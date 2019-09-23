import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {BfUILibTransService} from '../abstract-translate.service';

@Component({
  selector: 'bf-progress-bar',
  templateUrl: './bf-progress-bar.component.html',
  styleUrls: ['./bf-progress-bar.component.scss'],
})
export class BfProgressBarComponent implements OnInit, OnChanges {
  @Input() bfLabel: string; // Label to translate and display on top of the progress bar
  @Input() bfTotal: number; // Maximum value
  @Input() bfValue: number; // Actual value
  @Input() bfUsedLabel: string; // Sentence below the progress bar on the left
  @Input() bfLeftLabel: string; // Sentence below the progress bar on the right
  @Input() bfShowValues: boolean; // Display the values under the bar
  percentageValue: number;

  constructor(private translate: BfUILibTransService) { }

  ngOnInit() {
    // Translate
    if (!!this.translate.doTranslate) {
      this.bfLabel = this.translate.doTranslate(this.bfLabel);
      this.bfUsedLabel = this.translate.doTranslate(this.bfUsedLabel, {value: this.bfValue});
      this.bfLeftLabel = this.translate.doTranslate(this.bfLeftLabel, {value: this.bfTotal - this.bfValue});
    }
  }

  ngOnChanges() {
    // Recalculate the percentage value
    this.percentageValue = Math.round(this.bfValue * 100 / this.bfTotal);
  }


}
