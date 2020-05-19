import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {BfTranslateService} from '../translate.service';
import {BfGrowlService} from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {IbfDropdownCtrl} from '../../../../bf-ui-lib/src/lib/bf-dropdown/bf-dropdown.component';

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



  public cssReset = `$dropdown-selection-bg: $quaternary_color !default;
$dropdown-selection-hover: $primary_color !default;
$dropdown-valid-color: $valid-color !default;`;


  public myCtrl: IbfDropdownCtrl;
  public myCtrl2: IbfDropdownCtrl;
  public extCtrl$ = new Subject();
  public ctrlActions1 = [
    `expand()............... Expands the selection list`,
    `collapse()............. Collapses the selection list`,
    `toggle()............... Expands/Collapses the selection list`,
    `type(text) ............ Sets the value in the search input`,
    `setPristine().......... Resets the pristine state`,
    `addError() ............ Adds a manual error`,
    `removeError(text)...... Removes the manual error`,
  ];
  public ctrlActions2 = [
    `{ action: 'expand' } ................. Expands the selection list`,
    `{ action: 'collapse' } ............... Collapses the selection list`,
    `{ action: 'toggle' } ................. Expands/Collapses the selection list`,
    `{ action: 'type', value: text } ...... Sets the value in the search input`,
    `{ action: 'setPristine' } ............ Resets the pristine state`,
    `{ action: 'addError', value: err } ... Adds a manual error`,
    `{ action: 'removeError' } ............ Removes the manual error`,
  ];
  public extCtrlExample1 = `<bf-dropdown .... (bfOnLoaded)="myCtrl = $event"></bf-dropdown>

public myCtrl: IbfDropdownCtrl;

myCtrl.expand()
myCtrl.collapse()
myCtrl.toggle()
myCtrl.type('ax')
myCtrl.setPristine()
myCtrl.addError('wrong')
myCtrl.removeError()`;

  public extCtrlExample2 = `<bf-dropdown .... [extCtrl$]="extCtrl$"></bf-dropdown>

public extCtrl$ = new Subject();

extCtrl$.next({ action: 'expand' })
extCtrl$.next({ action: 'collapse' })
extCtrl$.next({ action: 'toggle' })
extCtrl$.next({ action: 'type', value: 'ax' })
extCtrl$.next({ action: 'setPristine' })
extCtrl$.next({ action: 'addError' })
extCtrl$.next({ action: 'removeError', value: 'wrong' })`;

  renderFnStr = `renderFn = (item, ind) => bfTranslate.doTranslate('view.common.field_name') + ' ' + ind;`;
  renderInfo = `'views.item_number': 'Item number {{id}} - {{name}}'`;

  public brStr = `
`;
  public bsStr = `
             `;
  public code = ``;

  public conf = {
    isRequired: false,
    isDisabled: false, disabledTip: '',
    isLoading: false, isLoadingWithPromise: false, bfLoadingPromise: null,
    isErrorOnPristine: false,
    hasSelect: true,  selectField: 'username',
    hasOrder: false, bfOrderBy: 'last_name, -username',
    hasRender: true,  hasRenderFn: false, renderExp: `email`, renderLabel: false,

    hasLabel: true,   labelText: 'view.common.field_name',
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: 'top', tooltipBody: true,
    hasPlaceholder: true, bfPlaceholder: 'views.dropdown.placeholder',
    hasEmptyLabel: false, customEmptyLabel: 'view.common.all',
    hasEmptyValue: false, customEmptyValue: 'everything',
    hasImages: false, hasIcons: false,

    hasErrorText: false, bfErrorText: `this ain't good`, errorPos: null,
    hasControls: false, bfCustomPlacementList: undefined,

    hasFullWidth: true, hasFlat: false,
  };
  public upComp = () => {
    if (this.conf.isLoading) { this.conf.isLoadingWithPromise = false; }

    this.code = `<bf-dropdown `;
    let compClasses = '';
    if (this.conf.hasFullWidth) { compClasses = 'full-width'; }
    if (this.conf.hasFlat) { compClasses += (compClasses ? ', ' : '') + 'flat'; }
    if (!!compClasses) { this.code += `class="${compClasses}"` + this.bsStr; }
    this.code += `[(ngModel)]="val"` + this.bsStr;
    this.code += `[bfList]="myList"`;

    if (this.conf.hasLabel)   { this.code += this.bsStr + `bfLabel="${this.conf.labelText}"`; }
    if (this.conf.isErrorOnPristine) { this.code += this.bsStr + `[bfErrorOnPristine]="true"`; }
    if (this.conf.isRequired) { this.code += this.bsStr + `[bfRequired]="true"`; }
    if (this.conf.isDisabled) { this.code += this.bsStr + `[bfDisabled]="true"`; }
    if (this.conf.disabledTip) { this.code += this.bsStr + `bfDisabledTip="${this.conf.disabledTip}"`; }
    if (this.conf.hasTooltip) {
      this.code += this.bsStr + `bfTooltip="${this.conf.tooltipText}"`;
      if (!!this.conf.tooltipPos)  { this.code += this.bsStr + `bfTooltipPos="${this.conf.tooltipPos}"`; }
      if (!!this.conf.tooltipBody) { this.code += this.bsStr + `bfTooltipBody="${this.conf.tooltipBody}"`; }
    }

    if (this.conf.hasOrder)  { this.code += this.bsStr + `bfOrderBy="${this.conf.bfOrderBy}"`; }
    if (this.conf.isLoading) {
      if (this.conf.isLoadingWithPromise) {
        this.code += this.bsStr + `bfLoading="myPromise"`;
      } else {
        this.code += this.bsStr + `bfLoading="${this.conf.isLoading}"`;
      }
    }

    if (this.conf.hasSelect && !!this.conf.selectField) {
      this.code += this.bsStr + `bfSelect="${this.conf.selectField}"`;
    }
    if (this.conf.hasRender)   { this.code += this.bsStr + `bfRender="${this.conf.renderExp}"`; }  // this.reLink(0); }
    if (this.conf.hasRenderFn) { this.code += this.bsStr + `[bfRenderFn]="renderFn"`; } // this.reLink(0); }

    if (this.conf.hasPlaceholder) { this.code += this.bsStr + `bfPlaceholder="${this.conf.bfPlaceholder}"`; }
    if (this.conf.hasEmptyLabel)  { this.code += this.bsStr + `bfEmptyLabel="${this.conf.customEmptyLabel}"`; }
    if (this.conf.hasEmptyValue)  { this.code += this.bsStr + `bfEmptyValue="${this.conf.customEmptyValue}"`; }
    if (this.conf.hasErrorText)   { this.code += this.bsStr + `bfErrorText="${this.conf.bfErrorText}"`; }
    if (this.conf.errorPos)       { this.code += this.bsStr + `bfErrorPos="${this.conf.errorPos}"`; }

    if (this.conf.bfCustomPlacementList === 'top' || this.conf.bfCustomPlacementList === 'bottom') {
      this.code += this.bsStr + `bfCustomPlacementList="${this.conf.bfCustomPlacementList}"`;
    }

    if (this.conf.hasControls) { this.code += this.bsStr + `(bfOnLoaded)="myCtrl = $event"`; }

    this.code += (`>` + this.brStr + `</bf-dropdown>`);

    if (this.conf.hasControls) {
      this.code += this.brStr + this.brStr + `public myCtrl: IbfDropdownCtrl;`;
      this.code += this.brStr + `myCtrl.toggle(); myCtrl.type('aaa');`;
    }
  };


  ngOnInit() { }

  public switchList = () => {
    this.dList = this.myList3.dCopy().map(el => {
      if (!this.conf.hasImages) { delete el.img; }
      if (!this.conf.hasIcons)  { delete el.icon; }
      return el;
    });
    if (!!this.selObj10) { this.selObj10 = this.dList.getById(this.selObj10.id); }
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
  api     : `*[(ngModel)]         : The model holding the value of the selected item.
*[bfList]            : Array of objects with representing the list to be displayed when expanded.
[bfSelect]           : Field to be set to the ngModel once selected (property from bfList items). If empty, the full object is set. 
                       You can also select multiple properties with a keyMap list 'prop1, prop2, ...'
[bfRender]           : Field to display on the list (property from bfList items).
                         If empty, a row with all properties will be displayed.
                         If a translation label is provided, that will be translated applying the object of the list as translation parameters
[bfRenderFn]         : Function to determine how to render the items of list. Called for every item and should return the string that will be displayed.
                       It overrides [bfRender]. The function is passed 'item' and 'index' parameters.
[bfRenderImg]        : Name of the field containing the url of the image to display on the item ("img" by default)
[bfRenderIcon]       : Name of the field containing the css class of the (icomoon) icon to display on the item ("icon" by default)
[bfOrderBy]          : Field (or fields separated by ,). If prefixed by '-', desc order is applied for the field. 
[bfLabel]            : If provided, a <bf-label> is added above the selector with the given text
[bfTooltip]          : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]       : Position of the tooltip (top by default)
[bfTooltipBody]      : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent container may affect the visibility of the tooltip
[bfRequired]         : Whether the value is required. If not, and "Empty" option will be added a the top of the list
[bfDisabled]         : Whether the selector is disabled or not
[bfDisabledTip]      : Text with the tooltip to display on hover when the input is disabled

[bfPlaceholder]      : Placeholder to show when no value is selected. If bfEmptyLabel has a custom label, this is never shown.
[bfEmptyLabel]       : By default the empty option shows the "view.common.empty" label. To display a different label, add it here.
[bfEmptyValue]       : By default the empty option sets "null" value to the ngModel. To set a different value, add it here.
[bfErrorOnPristine]  : If true, errors will be shown in pristine state too (by default pristine shows always as valid, even if it's not).
[bfErrorText]        : Custom error text (label) to display when invalid value.
[bfErrorPos]         : Custom position where to display the error text. Values = ['top-right', 'bottom-left', 'bottom-right', 'none']. None will hide the error text.
[bfLoading]          : To show a loading spinner on the left button.
                       Either a boolean (true=show, false=hide), or a promise that will automatically show the spinner while not resolved. 
[bfCustomPlacementList] : By default the list expands up/down depending on its position on the screen. To force it: 'top' | 'bottom'.
  
[extCtrl$]           : Observable to trigger actions. Its .next() should emit an object with "action"/"value"
(bfOnLoaded)         : Emitter to catch the moment when the component is ready. It also emits the control object.
(bfBeforeChange)     : Emitter to catch the next value before it is set. It returns both (currentValue, nextValue)
(bfOnListExpanded)   : Emitter to catch the moment when the list expands (focus in)
(bfOnListCollapsed)  : Emitter to catch the moment when the list collapses (select or blur)`,
  instance: `<bf-dropdown [(ngModel)]="selObj" [bfList]="myList"></bf-dropdown>`,
  demoComp: BfDropdownDemoComponent
};
