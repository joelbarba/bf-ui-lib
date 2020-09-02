import { Component, OnInit } from '@angular/core';
import { BfUILibTransService } from 'projects/bf-ui-lib/src/public_api';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-bf-date-picker-demo',
  templateUrl: './bf-date-picker-demo.component.html',
  styleUrls: ['./bf-date-picker-demo.component.scss']
})
export class BfDatePickerDemoComponent implements OnInit {
  public name = BfDatePickerDoc.name;
  public desc = BfDatePickerDoc.desc;
  public api = BfDatePickerDoc.api;
  public instance = BfDatePickerDoc.instance;
  public model = '';
  public instance3 = '';

  public myDate2 = '2015-10-08T08:41:03.868793+00:00';
  public myDate = null;
  // public myDate = '2020-01-19';
  public myDate3;
  public bfTranslate = { currentLocale: 'en-US' };

  public instance2 = `<bf-date-picker [(ngModel)]="myDate"
                bfLabel="view.common.field_name3"
                [bfRequired]="true"
                [bfLocale]="bfTranslate.currentLocale"
                bfMinDate="2020-01-14"
                bfMaxDate="2020-02-09">
</bf-date-picker>`;

  public cssReset = `$date-picker-modal-day-color: #212529 !default; // default bootstrap $dropdown-color ;

$date-picker-optional-color  : $optional-color !default;
$date-picker-disabled-color  : $disabled-color !default;
$date-picker-required-color  : $required-color !default;
$date-picker-invalid-color   : $invalid-color !default;
$date-picker-valid-color     : $valid-color !default;`;

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

  public formatsList = [
    // { code: 'short',      name: `'M/d/yy, h:mm a' (6/15/15, 9:03 AM)` },
    // { code: 'medium',     name: `'MMM d, y, h:mm:ss a' (Jun 15, 2015, 9:03:01 AM)` },
    // { code: 'long',       name: `'MMMM d, y, h:mm:ss a z' (June 15, 2015 at 9:03:01 AM GMT+1)` },
    // { code: 'full',       name: `'EEEE, MMMM d, y, h:mm:ss a zzzz' (Monday, June 15, 2015 at 9:03:01 AM GMT+01:00)` },
    { code: 'shortDate',  name: `shortDate:  'M/d/yy' (6/15/15)` },
    { code: 'mediumDate', name: `mediumDate: 'MMM d, y' (Jun 15, 2015)` },
    { code: 'longDate',   name: `longDate:   'MMMM d, y' (June 15, 2015)` },
    { code: 'fullDate',   name: `fullDate:   'EEEE, MMMM d, y' (Monday, June 15, 2015)` },
    // { code: 'shortTime',  name: `'h:mm a' (9:03 AM)` },
    // { code: 'mediumTime', name: `'h:mm:ss a' (9:03:01 AM)` },
    // { code: 'longTime',   name: `'h:mm:ss a z' (9:03:01 AM GMT+1)` },
    // { code: 'fullTime',   name: `'h:mm:ss a zzzz' (9:03:01 AM GMT+01:00)` },
  ];

  public tooltipPosList = [
    { id: 'top',        text: 'top'    },
    { id: 'right',      text: 'right'  },
    { id: 'bottom',     text: 'bottom' },
    { id: 'left',       text: 'left'   },
  ];
  public tooltipBodyList = [
    { id: 'true',       text: 'true'   },
    { id: 'false',      text: 'false'  },
  ];



  // ---- This is the logic to manage autogenerated code example ----
  public brStr = `\n`;
  public bsStr = `\n                `;
  public customCompCode = null;
  public isCompLinked = true;
  public compConf: any = {
    isRequired: true,
    isDisabled: false,
    hasClearBtn: false,
    hasLabel: false, labelText: 'view.common.field_name3',
    hasTooltip: false, tooltipText: 'Hello World', tooltipPos: null, tooltipBody: false,
    hasErrorText: false, bfErrorText: 'view.common.custom_error',
    errorPos: '', errorPosOpts : [
      { id: 'top-right',    text: 'top-right',  },
      { id: 'bottom-left',  text: 'bottom-left',   },
      { id: 'bottom-right', text: 'bottom-right',  },
    ],
    hasCustomFormat: false,
    bfFormat: 'shortDate',
    bfLocale: null,
    bfMinDate: null,
    bfMaxDate: null,
    hasFlat: false, hasModalRight: false, hasNoMinWidth: false,
  };
  public upComp = () => {
    this.customCompCode = `<bf-date-picker `;

    let compClasses = '';
    if (this.compConf.hasFlat)       { compClasses += (!!compClasses.length ? ' ' : '') + 'flat'; }
    if (this.compConf.hasModalRight) { compClasses += (!!compClasses.length ? ' ' : '') + 'modal-right'; }
    if (this.compConf.hasNoMinWidth) { compClasses += (!!compClasses.length ? ' ' : '') + 'no-min-width'; }
    if (!!compClasses) { this.customCompCode += `class="${compClasses}"` + this.bsStr; }

    this.customCompCode += `[(ngModel)]="myVal"` + this.bsStr;
    this.customCompCode += `(ngModelChange)="doSomething($event)"`;

    if (this.compConf.hasLabel)   { this.customCompCode += this.bsStr + `bfLabel="${this.compConf.labelText}"`; }
    if (this.compConf.isRequired) { this.customCompCode += this.bsStr + `[bfRequired]="true"`; }
    if (this.compConf.isDisabled) { this.customCompCode += this.bsStr + `[isDisabled]="true"`; }
    if (this.compConf.bfHasClearBtn) { this.customCompCode += this.bsStr + `[bfHasClearBtn]="true"`; }

    if (this.compConf.hasCustomFormat) {
      this.customCompCode += this.bsStr + `bfFormat="${this.compConf.bfFormat}"`;
    }
    if (!this.compConf.bfLocale) {
      this.customCompCode += this.bsStr + `[bfLocale]="bfTranslate.currentLocale"`;
    } else {
      this.customCompCode += this.bsStr + `bfLocale="${this.compConf.bfLocale}"`;
    }

    if (!!this.compConf.bfMinDate) {
      this.customCompCode += this.bsStr + `bfMinDate="${this.compConf.bfMinDate}"`;
    }
    if (!!this.compConf.bfMaxDate) {
      this.customCompCode += this.bsStr + `bfMaxDate="${this.compConf.bfMaxDate}"`;
    }

    if (this.compConf.hasTooltip) {
      this.customCompCode += this.bsStr + `bfTooltip="${this.compConf.tooltipText}"`;
      if (!!this.compConf.tooltipPos)  { this.customCompCode += this.bsStr + `bfTooltipPos="${this.compConf.tooltipPos}"`; }
      if (!!this.compConf.tooltipBody) { this.customCompCode += this.bsStr + `bfTooltipBody="${this.compConf.tooltipBody}"`; }
    }
    if (this.compConf.hasErrorText)    { this.customCompCode += this.bsStr + `bfErrorText="${this.compConf.bfErrorText}"`; }
    if (this.compConf.errorPos)        { this.customCompCode += this.bsStr + `bfErrorPos="${this.compConf.errorPos}"`; }

    this.customCompCode += (`>` + this.brStr + `</bf-date-picker>`);
  };
  public relink = () => {
    this.isCompLinked = false;
    setTimeout(() => this.isCompLinked = true);
  };

  public locale: string;

  constructor(private translateService: BfUILibTransService) {
    this.translateService.locale$.asObservable()
      .pipe(
        tap(locale => {
          this.compConf.bfLocale = locale;
        })
      )
      .subscribe()
  }

  ngOnInit() { }

  public checkNewModel = (model) => {
    console.log('Selected date =', model);
  }

}


export const BfDatePickerDoc = {
  name    : `bf-date-picker`,
  uiType  : 'component',
  desc    : `Date component for forms`,
  api     : `[(ngModel)]     : The ngModel linked. It's a string with the default date format 'yyyy-mm-dd'
[bfLabel]       : Label of the input (automatically translated). If not provided, no label is displayed.
[bfRequired]    : Whether the value is required
[bfDisabled]    : Whether the value can be changed
[bfFormat]      : Format to display the date in the input. By default 'shortDate' (see https://angular.io/api/common/DatePipe#pre-defined-format-options)
[bfHasClearBtn] : (true/false) Whether to add a clear button on the input to reset the value
[bfMinDate]     : Minimum date. String with standard format 'yyyy-mm-dd'.
[bfMaxDate]     : Maximum date. String with standard format 'yyyy-mm-dd'.
[bfTooltip]     : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]  : Position of the tooltip (top by default)
[bfTooltipBody] : Whether the tooltip is append to the body (default true) or not (false)
[bfErrorText]   : Custom error text (label) to display when invalid value
[bfErrorPos]    : Custom position where to display the error text. Values = ['top-right', 'bottom-left', 'bottom-right', 'none']. None will hide the error text.`,
  instance: `<bf-date-picker bfLabel="My Date" [(ngModel)]="myDate"
                [bfLocale]="bfTranslate.currentLocale">
</bf-date-picker>`,
  demoComp: BfDatePickerDemoComponent
};
