import {Component, OnInit} from '@angular/core';
import { interval, range, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bf-progress-bar-demo',
  templateUrl: './bf-progress-bar-demo.component.html',
  styleUrls: ['./bf-progress-bar-demo.component.scss']
})
export class BfProgressBarDemoComponent implements OnInit {
  public name = BfProgressBarDoc.name;
  public desc = BfProgressBarDoc.desc;
  public api = BfProgressBarDoc.api;

  // Small RxJS trick to loop through 0 to 100
  public cyclingProgress = zip(interval(100), range(0, 101)).pipe(map((pair) => pair[1]));

  public instance1 = `<bf-progress-bar
  [bfValue]="cyclingProgress | async"
  [bfTotal]="100">
</bf-progress-bar>`;

  public instance2 = `<bf-progress-bar
  [bfLabel]="'Mobile Minutes 250'"
  [bfValue]="1299"
  [bfTotal]="2048"
  [bfUsedLabel]="\'view.minutes_used\'" // {{value}} minutes used
  [bfLeftLabel]="\'view.less_than_minute\'"> // less than a minute
</bf-progress-bar>`;

  public custom = {
    config: {
      hasValues: false,
      hasLabel: false,
      hasUsedLabel: false,
      hasLeftLabel: false,
    },
    obj: {
      bfValue: 10,
      bfTotal: 100,
      bfLabel: '',
      bfUsedLabel: '',
      bfLeftLabel: '',
      bfCompact: true,
      componentView: `<bf-progress-bar></bf-progress-bar>`
    },
    buildComponentView: () => {
      const obj = this.custom.obj;
      const config = this.custom.config;
      this.custom.obj.componentView = `<bf-progress-bar
  [bfValue]="${obj.bfValue}"
  [bfCompact]="${obj.bfCompact}"
  [bfTotal]="${obj.bfTotal}"` +
  (config.hasLabel ? `
  [bfLabel]="${obj.bfLabel}"` : ``) +
  (config.hasUsedLabel ? `
  [bfLeftLabel]="${obj.bfUsedLabel}"` : ``) +
  (config.hasLeftLabel ? `
  [bfUsedLabel]="${obj.bfLeftLabel}"` : ``) + `>` + `
</bf-progress-bar>`;
    }
  };

  public cssReset = `$progress-bar-bg: $primary_color !default;
$progress-bar-color: $white !default;
$progress-bar-used-label: $secondary_color !default;
$progress-bar-left-label: $primary_color !default;
$progress-bar-per-outside: $primary_color !default;`;

  constructor() {
  }

  ngOnInit() {
  }

}


export const BfProgressBarDoc = {
  name: `bf-progress-bar`,
  uiType: 'component',
  desc: `Display a progress bar by calculating the percentage from the current value and the max value, in plus, we can display
  2 sentences below using the actual value as param for the left sentence or the left value for the right sentence`,
  api: `  [bfLabel]: label on top of the component
  [bfTotal]: maximum value that can be reached
  [bfValue]: actual value
  [bfUsedLabel]: translation for the label below the component on the left and have the value as binding {{value}}
  [bfLeftLabel]: translation for the label below the component on the right and have the missing value as binding {{value}}

  For example: [bfUsedLabel]="'view.subscriptions.minutes_used'" -> {{value}} minutes used
               [bfLeftLabel]="'view.subscriptions.minutes_left'" -> {{value}} minutes left

  If you want to display a label without the values you might do a translation key without the value binding:
  [bfLeftLabel]="'view.subscriptions.less_than_minute'" -> less than a minute

  If you want to display only the values you might do a translation key with inside just the binding in this way:
  [bfUsedLabel]="'view.subscriptions.value_used'" -> {{value}}`,
  demoComp: BfProgressBarDemoComponent
};
