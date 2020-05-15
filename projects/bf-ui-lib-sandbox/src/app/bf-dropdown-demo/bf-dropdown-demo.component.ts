import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {BfTranslateService} from '../translate.service';
import {BfGrowlService} from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';

@Component({
  selector: 'app-bf-dropdown-demo',
  templateUrl: './bf-dropdown-demo.component.html',
  styleUrls: ['./bf-dropdown-demo.component.scss']
})
export class BfDropdownDemoComponent implements OnInit {
  public name = BfDropdownDoc.name;
  public desc = BfDropdownDoc.desc;
  public api = BfDropdownDoc.api;
  public instance = BfDropdownDoc.instance;


  constructor(
    private bfTranslate: BfTranslateService,
    public growl: BfGrowlService,
  ) {
    // Make the list without "img" and "icon" fields
    this.myList = this.myList3.dCopy().map(el => {
      delete el.img;
      delete el.icon;
      return el;
    });
    this.dList = this.myList;
  }

  public isLinked = true;

  public myList;
  public myList2 = [
    { id:  1, username: 'view.common.name' },
    { id:  2, username: 'view.common.username' },
    { id:  3, username: 'view.common.yes' },
    { id:  4, username: 'view.common.no' },
  ];
  public myList3 = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba', icon: 'icon-smile2', img: 'assets/language-flags/ca.png' },
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen', icon: 'icon-home',          img: 'assets/language-flags/de.png' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen', icon: 'icon-office',        img: 'assets/language-flags/ja.png' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen', icon: 'icon-thumbs-up',     img3: 'assets/language-flags/cn.png' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen', icon: 'icon-phone2',        img: 'assets/language-flags/da.png' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen', icon: 'icon-bell2',         img: 'assets/language-flags/cat.png' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen', icon: 'icon-user',          img: 'assets/language-flags/el.png' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen', icon: 'icon-users',         img: 'assets/language-flags/es.png' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen', icon: 'icon-lock',          img: 'assets/language-flags/fi.png' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen', icon: 'icon-teapot',        img: 'assets/language-flags/fr.png' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen', icon: 'icon-plus',          img: 'assets/language-flags/gb.png' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen', icon: 'icon-minus',         img: 'assets/language-flags/ie.png' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen', icon: 'icon-notification2', img: 'assets/language-flags/it.png' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen', icon: 'icon-warning2',      img: 'assets/language-flags/ja.png' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen', icon: 'icon-checkmark',     img: 'assets/language-flags/nl.png' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen', icon: 'icon-rocket',        img: 'assets/language-flags/no.png' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen', icon: 'icon-bin',           img: 'assets/language-flags/pl.png' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen', icon: 'icon-shield',        img: 'assets/language-flags/pt.png' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen', icon: 'icon-switch',        img: 'assets/language-flags/sv.png' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen', icon: 'icon-list',          img: 'assets/language-flags/tw.png' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen', icon: 'icon-tree6',         img: 'assets/language-flags/us.png' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen', icon: 'icon-earth2',        img: 'assets/language-flags/zh.png' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen', icon2: 'icon-menu3',        img2: 'assets/language-flags/ca.png' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen', icon: 'icon-link',          img: 'assets/language-flags/de.png' },
  ];
  public myList4 = [
    { id:  1, name: 'first',  },
    { id:  2, name: 'second', },
    { id:  3, name: 'third',  },
    { id:  4, name: 'fourth', },
    { id:  5, name: 'fifth',  },
  ];
  public dList;

  public selObj = { id: 2, username: 'syrax', email: 'syrax@targaryen.com', first_name: 'Syrax', last_name: 'Targaryen' };
  public selObj2;
  public selObj3;
  public selObj4;
  public selObj5;
  public selObj6;
  public selObj7;
  public selObj8;
  public selObj9;
  public selObj10;
  public loadingPromise;

  public instance2 = `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList" bfSelect="username" bfRender="email">
</bf-dropdown>`;
  public instance3 = `<bf-dropdown [(ngModel)]="selObj"
             [bfList]="myList"
             bfSelect="username, first_name, last_name"
             bfRender="$$$ $item.first_name + ' ' + $item.last_name + ' (' + $item.email + ')'">
</bf-dropdown>`;
  public instance4 = `<bf-dropdown [(ngModel)]="selObj"
             [bfList]="myList"
             bfRender="email"
             bfLabel="Email"
             [bfRequired]="true"
             [bfDisabled]="false">
</bf-dropdown>`;
  public timeZones =  [
    { country_code: null, time_zone: 'Europe/Dublin',      img: 'assets/language-flags/ja.png' },
    { country_code: null, time_zone: 'Africa/Addis_Ababa', img: 'assets/language-flags/ja.png' },
    { country_code: null, time_zone: 'Africa/Algiers',     img: 'assets/language-flags/us.png' },
    { country_code: null, time_zone: 'Africa/Asmara',      img: 'assets/language-flags/ie.png' },
  ];
  public profileForm = { time_zone: 'Europe/Dublin' };

  public cssReset = `$dropdown-selection-bg: $quaternary_color !default;
$dropdown-selection-hover: $primary_color !default;
$dropdown-valid-color: $valid-color !default;`;



  public extCtrl$ = new Subject();
  public ctrlActions = [
    `{ action: 'expand' } ............... Expands the selection list`,
    `{ action: 'collapse' } ............. Collapses the selection list`,
    `{ action: 'toggle' } ............... Expands/Collapses the selection list`,
    `{ action: 'type', value: text } .... Sets the value in the search input`,
  ];
  public extCtrlExample = `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList" [extCtrl$]="extCtrl$"></bf-dropdown>

public extCtrl$ = new Subject();

<bf-btn (bfClick)="extCtrl$.next({ action: 'expand' })"></bf-btn>
<bf-btn (bfClick)="extCtrl$.next({ action: 'collapse' })"></bf-btn>
<bf-btn (bfClick)="extCtrl$.next({ action: 'toggle' })"></bf-btn>
<bf-btn (bfClick)="extCtrl$.next({ action: 'type', value: 'ax' })"></bf-btn>`;
  renderFnStr = `renderFn = (item, ind) => bfTranslate.doTranslate('view.common.field_name') + ' ' + ind;`;
  renderInfo = `'views.item_number': 'Item number {{id}} - {{name}}'`;

  public brStr = `
`;
  public bsStr = `
             `;
  public code = ``;
  public customExLinked = true;  // To link / unlink component
  public compSelFields = [{id: 'id'}, {id: 'username'}, {id: 'email'}, {id: 'first_name'}, {id: 'last_name'}];

  public conf = {
    isRequired: true,
    isDisabled: false, disabledTip: '',
    isLoading: false, isLoadingWithPromise: false, bfLoadingPromise: null,
    isErrorOnPristine: true,
    hasSelect: true,  selectField: 'username',
    hasRender: true,  hasRenderFn: false, renderExp: `email`, renderLabel: false,

    hasLabel: true,   labelText: 'view.common.field_name',
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: 'top', tooltipBody: true,
    hasEmptyLabel: false, customEmptyLabel: 'view.common.all',
    hasEmptyValue: false, customEmptyValue: 'everything',
    hasImages: false, hasIcons: false,

    hasErrorText: false, bfErrorText: `this ain't good`, errorPos: null,
    hasControls: true,

    hasFullWidth: true,
  };
  public upComp = () => {
    if (this.conf.isLoading) { this.conf.isLoadingWithPromise = false; }

    this.code = `<bf-dropdown `;
    let compClasses = '';
    if (this.conf.hasFullWidth) { compClasses = 'full-width'; }
    if (!!compClasses) { this.code += `class="${compClasses}"` + this.bsStr; }
    this.code += `[(ngModel)]="selObj"` + this.bsStr;
    this.code += `[bfList]="myList"`;

    if (this.conf.isRequired) { this.code += this.bsStr + `[bfRequired]="true"`; }
    if (this.conf.isDisabled) { this.code += this.bsStr + `[bfDisabled]="true"`; }
    if (this.conf.hasLabel)   { this.code += this.bsStr + `bfLabel="${this.conf.labelText}"`; }
    if (this.conf.hasSelect && !!this.conf.selectField) {
      this.code += this.bsStr + `bfSelect="${this.conf.selectField}"`;
    }

    if (this.conf.hasRender)   { this.code += this.bsStr + `bfRender="${this.conf.renderExp}"`; }  // this.reLink(0); }
    if (this.conf.hasRenderFn) { this.code += this.bsStr + `[bfRenderFn]="renderFn"`; } // this.reLink(0); }

    if (this.conf.hasTooltip) {
      this.code += this.bsStr + `bfTooltip="${this.conf.tooltipText}"`;
      if (!!this.conf.tooltipPos)  { this.code += this.bsStr + `bfTooltipPos="${this.conf.tooltipPos}"`; }
      if (!!this.conf.tooltipBody) { this.code += this.bsStr + `bfTooltipBody="${this.conf.tooltipBody}"`; }
    }

    if (this.conf.isDisabled) {
      this.code += this.bsStr + `[bfDisabled]="true"`;
      if (!!this.conf.disabledTip) { this.code += this.bsStr + `bfDisabledTip="${this.conf.disabledTip}"`; }
    }
    this.code += (`>` + this.brStr + `</bf-dropdown>`);

  };


  ngOnInit() { }

  public switchList = () => {
    this.dList = this.myList3.dCopy().map(el => {
      if (!this.conf.hasImages) { delete el.img; }
      if (!this.conf.hasIcons)  { delete el.icon; }
      return el;
    });
    if (!!this.selObj10) { this.selObj10 = this.dList.getById(this.selObj10.id); }
    this.customExLinked = false;
    setTimeout(() => {
      this.upComp();
      this.customExLinked = true;
    });
  };

  public loadWithPromise = () => {
    this.conf.isLoading = false;
    this.conf.isLoadingWithPromise = true;
    this.conf.bfLoadingPromise = new Promise(resolve => setTimeout(resolve, 4000));
    this.growl.success('4 second Promise set as bfLoading');
  };



  public mockAutoSelect = () => {
    this.selObj10 = {...this.myList.getById(13)};
  };


  reLink = (time = 500) => {
    this.isLinked = false;
    setTimeout(() => this.isLinked = true, time);
  };


  renderFn = (item, ind) => {
    return this.bfTranslate.doTranslate('view.common.field_name') + ' ' + ind;
  };




}


export const BfDropdownDoc = {
  name    : `bf-dropdown`,
  uiType  : 'component',
  desc    : `Generates a dropdown selector list.`,
  api     : `*[(ngModel)]         : The ngModel directive is linked to the inner <select>, so that can be used as a form element with ngForm (status is propagated).
*[bfList]            : Array of objects with the list to be displayed in the dropdown
[bfSelect]           : The name of the property to be selected from the object of the list. If empty, all object selected. If multiple props add a keyMap list ('prop1, prop2, ...')
[bfRender]           : Field to display on the list (property from bfList items).
                         If empty, a row with all properties will be displayed.
                         It can also be an eval() expression. Start with a '$$$' and use $item reference for eval. Example: bfRender="$$$ $item.first_name + ' ' + $item.last_name"
[bfRenderFn]         : Function to render the list. It is called for every item and should return the string that will be displayed.
                       It overrides [bfRender]. The function is passed 'item' and 'index' parameters.
[bfRenderImg]        : Name of the field that contains the url of the image to display on the item ("img" by default)
[bfRenderIcon]       : Name of the field that contains the css class of the (icomoon) icon to display on the item ("icon" by default)
[bfLabel]            : If provided, a <bf-label> is added above the selector with the given text
[bfRequired]         : Whether the value is required. If not, and "Empty" option will be added a the top of the list
[bfDisabled]         : Whether the selector is disabled or not
[bfDisabledTip]      : Text with the tooltip to display on hover when the input is disabled
[bfEmptyLabel]       : By default the empty option shows the "view.common.empty" label. In case you need to display a different label, add it here.
[bfEmptyValue]       : By default the empty option sets "null" value to the ngModel. If you need a different value being set in this case, add it here.
[bfErrorOnPristine]  : If true, errors will be shown in pristine state too (by default pristine shows always as valid).
[extCtrl$]           : Observable to trigger external actions. Its .next() should emit an object with "action"/"value". Actions: ['expand', 'collapse', 'toggle', 'type']
(bfOnLoaded)         : Emitter to catch the moment when the component is ready (ngAfterViewInit)
(bfBeforeChange)     : Emitter to catch the next value before it is set. It returns both (currentValue, nextValue)
`,
  instance: `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList"></bf-dropdown>`,
  demoComp: BfDropdownDemoComponent
};
