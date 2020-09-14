// bf-time-picker = 'bf-btn'
// BfTimePicker = 'BfBtn'


import { Component, OnInit } from '@angular/core';
import { of, timer, Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';
import { BfUILibTransService } from 'projects/bf-ui-lib/src/public_api';

@Component({
  selector: 'app-bf-time-picker-demo',
  templateUrl: './bf-time-picker-demo.component.html',
  styleUrls: ['./bf-time-picker-demo.component.scss']
})
export class BfTimePickerDemoComponent implements OnInit {
  public name = BfTimePickerDoc.name;
  public desc = BfTimePickerDoc.desc;
  public api = BfTimePickerDoc.api;
  public instance = BfTimePickerDoc.instance;
  public count = 0;
  public minTime = new Date();
  public maxTime = new Date();
  public defaultTimezone: any;
  public defaultStartDate: Date;
  public supportedTimezones: Array<{ country_code: string, time_zone: string }>;
  public instance2: string;
  public instance3: string;

  public cssReset = `$optional_input_color : $optional-color;
$focused_input_color  : $focused-color;
$required_input_color : $primary_color;
$invalid_input_color  : $invalid-color;
$valid_input_color    : $primary_color;
$disabled_input_color : $disabled-color;

.bf-time-picker-form-group {
  ...
}`;

  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n             `;
  public customCompCode = `
    <bf-time-picker
      [(bfSelectedTime)]="selectedTime"
      [(bfSelectedTimezone)]="selectedTimezone"
      [bfSupportedTimezones]="supportedLocales">
    </bf-time-picker>`;

  public compConf: any = {
    isDisabled: false,
    minTime: null,
    maxTime: null,
    bfLocale: null
  };

  public localesList = [
    { code: 'zh-CN',  name: 'zh-CN' },
    { code: 'zh-TW',  name: 'zh-TW' },
    { code: 'da',     name: 'da' },
    { code: 'nl',     name: 'nl' },
    { code: 'en-CA',  name: 'English CA (en-CA)' },
    { code: 'en-GB',  name: 'English GB (en-GB)' },
    { code: 'en-IE',  name: 'English IE (en-IE)' },
    { code: 'en-US',  name: 'English US (en-US)' },
    { code: 'fi',     name: 'fi' },
    { code: 'fr',     name: 'fr' },
    { code: 'de',     name: 'de' },
    { code: 'el',     name: 'el' },
    { code: 'it',     name: 'it' },
    { code: 'ja',     name: 'ja' },
    { code: 'no',     name: 'no' },
    { code: 'pl',     name: 'pl' },
    { code: 'sv',     name: 'sv' },
    { code: 'es-ES',  name: 'es-ES' },
    { code: 'es-MX',  name: 'es-MX' },
    { code: 'pt-PT',  name: 'pt-PT' },
    { code: 'pt-BR',  name: 'pt-BR' },
    { code: 'in',     name: 'in' },
    { code: 'ar',     name: 'ar' },
    { code: 'ru',     name: 'ru' },
    { code: 'ms-SG',  name: 'ms-SG' },
    { code: 'ms-MY',  name: 'ms-MY' },
    { code: 'ms-ID',  name: 'ms-ID' },
    { code: 'tr',     name: 'tr' },
    { code: 'kr',     name: 'kr' }
  ];

  public upComp = () => {
    this.customCompCode = `
     <bf-time-picker
        [(bfSelectedTime)]="selectedTime"
        [(bfSelectedTimezone)]="selectedTimeZone"
        [bfSupportedTimezones]="supportedTimezones"
        [bfDisabled]="${this.compConf.isDisabled}${this.compConf.minTime !== null ? ' [bfMinTime]="' + this.compConf.minTime + '"' : ''}${this.compConf.maxTime !== null ? ' [bfMaxTime]="' + this.compConf.maxTime + '"' : ''}">
      </bf-time-picker>`;

    this.translateService.locale$.next(this.compConf.bfLocale);
  };

  constructor(private translateService: BfUILibTransService) {}

  ngOnInit() {
    this.translateService.locale$.asObservable()
      .pipe(
        tap((locale: string) => {
          this.compConf.bfLocale = locale;
        })
      )
      .subscribe();

    this.supportedTimezones = [
      'Europe/Budapest',
      'Europe/Dublin',
      'Europe/London',
      'US/Arizona'
    ].map(timezone => ({ country_code: null, time_zone: timezone }));

    this.defaultStartDate = new Date();
    this.defaultStartDate.addHours(1);

    this.maxTime.addDays(2);
    this.minTime.addHours(-2);
    this.defaultTimezone = 'Europe/Dublin';
    this.instance2 = `
      <bf-time-picker
        [bfSelectedTime]="defaultStartDate"
        [bfMinTime]="minTime"
        [bfMaxTime]="maxTime"
        [bfDefaultTimezone]="defaultTimezone"
        [bfSupportedTimezones]="supportedTimezones">
      </bf-time-picker>`;

    this.instance3 = `
      <bf-time-picker
        [bfSelectedTime]="defaultStartDate"
        [bfMinTime]="minTime"
        [bfMaxTime]="maxTime"
        [bfDefaultTimezone]="defaultTimezone"
        [bfSupportedTimezones]="supportedTimezones"
        [bfDisabled]="true">
      </bf-time-picker>
    `;
  }
}


export const BfTimePickerDoc = {
  name    : `bf-time-picker`,
  uiType  : 'component',
  desc    : `Generates a ....`,
  api     : `
    [bfLabel]: The label to apply to the component if necessary
    [bfSelectedTime]: The value that will recieve updates to date/time can supply default value
    [bfSelectedTimezone]: The value of the desired timezone
    [bfSupportedTimezones]: An list of supported timezones
    [bfDisabled]: A flag to determine if the time-picker is disabled
    [bfMinTime]: The minimum allowable datetime
    [bfMaxTime]: The maximum allowable datetime
    [bfPlacement]: The position to render the dropdown container. Default value is 'bottom' see <a href="https://ng-bootstrap.github.io/#/components/dropdown/api">Angular Bootstap</a> for all possible values

    (bfSelectedTimeChange): An event emitted when the selected time has been changed
    (bfSelectedTimezoneChange): An event emitted when the selected timezone has changed
  `,
  instance: `
    <bf-time-picker
      [bfSelectedTimezone]="'Europe/Dublin'"
      [bfSupportedTimezones]="[{ country_code: null, time_zone: 'Europe/Dublin' }, { country_code: null, time_zone: 'US/Arizona' }]">
    </bf-time-picker>
  `,
  demoComp: BfTimePickerDemoComponent
};
