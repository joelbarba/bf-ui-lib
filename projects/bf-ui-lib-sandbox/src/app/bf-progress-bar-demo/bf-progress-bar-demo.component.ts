import { Component, OnInit } from '@angular/core';
import { interval, range, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bf-progress-bar-demo]',
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
  [bfLeftLabel]="\'view.minutes_left\'"> // {{leftValue}} minutes left
</bf-progress-bar>`;

  public custom = {
    config: {
      hasValues: false,
      hasLabel: false,
      hasUsedLabel: false,
      hasLeftLabel: false
    },
    obj: {
      bfValue: 10,
      bfTotal: 100,
      bfLabel: '',
      bfUsedLabel: '',
      bfLeftLabel: '',
      componentView: `<bf-progress-bar></bf-progress-bar>`
    },
    buildComponentView: () => {
      const obj = this.custom.obj;
      const config = this.custom.config;
      this.custom.obj.componentView = `<bf-progress-bar
  [bfValue]="${obj.bfValue}"
  [bfTotal]="${obj.bfTotal}"` +
  (config.hasLabel ? `
  [bfLabel]="${obj.bfLabel}"` : ``) +
  (config.hasUsedLabel ? `
  [bfLeftLabel]="${obj.bfLeftLabel}"` : ``) +
  (config.hasLeftLabel ? `
  [bfUsedLabel]="${obj.bfUsedLabel}"` : ``) + `>` + `
</bf-progress-bar>`;
    }
  };

  public cssReset = `.bf-progress-bar {
  .progress {
    color: $white;
    .progress-bar {
      background-color: $primary_color;
    }
  }
  .used-label {
    color: $secondary_color;
  }
  .left-label {
    color: $primary_color;
  }
  .percentage-outside {
    span {
      color: $primary_color;
    }
  }
}
`;

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
  [bfLeftLabel]: translation for the label below the component on the right and have the missing value as binding {{leftValue}}
  
  For example: [bfUsedLabel]="'view.subscriptions.minutes_used'" -> {{value}} minutes used
               [bfLeftLabel]="'view.subscriptions.minutes_left'" -> {{leftValue}} minutes left
               
  If you want to display only the values you might do a translation key with inside just the binding in this way:
  [bfUsedLabel]="'view.subscriptions.value_used'" -> {{value}}`,
  demoComp: BfProgressBarDemoComponent
};
