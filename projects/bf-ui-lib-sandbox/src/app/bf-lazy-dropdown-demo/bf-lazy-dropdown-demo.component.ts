// bf-lazy-dropdown = 'bf-btn'
// BfLazyDropdown = 'BfBtn'


import { Component, OnInit } from '@angular/core';
import {BfTranslateService} from '../translate.service';
import {BfGrowlService} from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';

// The control object (bfOnLoaded) emits
export interface IbfLazyDropdownCtrl {
  expand      ?: { () };
  collapse    ?: { () };
  toggle      ?: { () };
  type        ?: { (value: string) };
  setPristine ?: { () };
  removeError ?: { () };
  addError    ?: { (err) };
}

@Component({
  selector: 'app-bf-lazy-dropdown-demo',
  templateUrl: './bf-lazy-dropdown-demo.component.html',
  styleUrls: ['./bf-lazy-dropdown-demo.component.scss']
})
export class BfLazyDropdownDemoComponent implements OnInit {
  public name = BfLazyDropdownDoc.name;
  public desc = BfLazyDropdownDoc.desc;
  public api = BfLazyDropdownDoc.api;
  public instance = BfLazyDropdownDoc.instance;
  public fakeList = [
    { id:  0, username: 'joel.barba',   email: 'joel@barba.com', first_name: 'Joel', last_name: 'Barba' },
    { id:  2, username: 'syrax',        email: 'syrax@targaryen.com',        first_name: 'Syrax',        last_name: 'Targaryen' },
    { id:  3, username: 'vermithor',    email: 'vermithor@targaryen.com',    first_name: 'Vermithor',    last_name: 'Targaryen' },
    { id:  4, username: 'caraxes',      email: 'caraxes@targaryen.com',      first_name: 'Caraxes',      last_name: 'Targaryen' },
    { id:  5, username: 'silverwing',   email: 'silverwing@targaryen.com',   first_name: 'Silverwing',   last_name: 'Targaryen' },
    { id:  6, username: 'sunfyre',      email: 'sunfyre@targaryen.com',      first_name: 'Sunfyre',      last_name: 'Targaryen' },
    { id:  7, username: 'vhagar',       email: 'vhagar@targaryen.com',       first_name: 'Vhagar',       last_name: 'Targaryen' },
    { id:  8, username: 'tessarion',    email: 'tessarion@targaryen.com',    first_name: 'Tessarion',    last_name: 'Targaryen' },
    { id:  9, username: 'cannibal',     email: 'cannibal@targaryen.com',     first_name: 'Cannibal',     last_name: 'Targaryen' },
    { id: 10, username: 'meraxes',      email: 'meraxes@targaryen.com',      first_name: 'Meraxes',      last_name: 'Targaryen' },
    { id: 11, username: 'balerion',     email: 'balerion@targaryen.com',     first_name: 'Balerion',     last_name: 'Targaryen' },
    { id: 12, username: 'quicksilver',  email: 'quicksilver@targaryen.com',  first_name: 'Quicksilver',  last_name: 'Targaryen' },
    { id: 13, username: 'dreamfyre',    email: 'dreamfyre@targaryen.com',    first_name: 'Dreamfyre',    last_name: 'Targaryen' },
    { id: 14, username: 'meleys',       email: 'meleys@targaryen.com',       first_name: 'Meleys',       last_name: 'Targaryen' },
    { id: 15, username: 'seasmoke',     email: 'seasmoke@targaryen.com',     first_name: 'Seasmoke',     last_name: 'Targaryen' },
    { id: 16, username: 'vermax',       email: 'vermax@targaryen.com',       first_name: 'Vermax',       last_name: 'Targaryen' },
    { id: 17, username: 'arrax',        email: 'arrax@targaryen.com',        first_name: 'Arrax',        last_name: 'Targaryen' },
    { id: 18, username: 'tyraxes',      email: 'tyraxes@targaryen.com',      first_name: 'Tyraxes',      last_name: 'Targaryen' },
    { id: 19, username: 'moondancer',   email: 'moondancer@targaryen.com',   first_name: 'Moondancer',   last_name: 'Targaryen' },
    { id: 20, username: 'stormcloud',   email: 'stormcloud@targaryen.com',   first_name: 'Stormcloud',   last_name: 'Targaryen' },
    { id: 21, username: 'morghul',      email: 'morghul@targaryen.com',      first_name: 'Morghul',      last_name: 'Targaryen' },
    { id: 22, username: 'shrykos',      email: 'shrykos@targaryen.com',      first_name: 'Shrykos',      last_name: 'Targaryen' },
    { id: 23, username: 'greyghost',    email: 'greyghost@targaryen.com',    first_name: 'Greyghost',    last_name: 'Targaryen' },
    { id: 24, username: 'sheepstealer', email: 'sheepstealer@targaryen.com', first_name: 'Sheepstealer', last_name: 'Targaryen' },
  ];
  public isLinked = true;
  public selObj;
  public selObjExample1;
  public selObjExample2;
  public lazyItemExample1;
  public myCtrl: IbfLazyDropdownCtrl;
  public bfSelectOptions = [
    { value: 'id' },
    { value: 'username' },
    { value: 'email' },
    { value: 'first_name' },
    { value: 'last_name' },
  ];
  public bfCustomPlacementList = [
    { value: 'auto'},
    { value: 'top'},
    { value: 'bottom'},
  ];
    constructor(
    private bfTranslate: BfTranslateService,
    public growl: BfGrowlService,
  ) {}

  renderFnStr = `renderFn = (item, ind) => bfTranslate.doTranslate('view.common.field_name') + ' ' + ind;`;
  renderInfo = `'views.item_number_lazy': 'Item number {{id}} - {{first_name}}'`;

  public cssReset = `$optional_input_color : $optional-color;
$focused_input_color  : $focused-color;
$required_input_color : $primary_color;
$invalid_input_color  : $invalid-color;
$valid_input_color    : $primary_color;
$disabled_input_color : $disabled-color;

.bf-lazy-dropdown-form-group {
  ...
}`;

  public brStr = `
`;
  public bsStr = `
             `;
  public code = ``;

  public instance2 = `<bf-lazy-dropdown [(ngModel)]="selObjExample2"
    [bfLazyLoad]="fakeLoadData"
    [bfRequired]="true"
  bfRender="email"
  bfLabel="LazyLoadedItem"
    ></bf-lazy-dropdown>
`;
  public conf = {
    isRequired: false,
    isDisabled: false, disabledTip: '',
    isLoading: false, isLoadingWithPromise: false,
    isErrorOnPristine: false,
    hasSelect: true,  selectField: 'username',
    hasRender: true,  hasRenderFn: false, renderExp: `email`, renderLabel: false,

    hasLabel: true,   labelText: 'views.lazy_dropdown.label',
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: 'top', tooltipBody: true,
    hasPlaceholder: true, bfPlaceholder: 'views.lazy_dropdown.placeholder',
    hasImages: false, hasIcons: false,
    hasErrorText: false, bfErrorText: `this ain't good`, errorPos: null,
    hasControls: false, bfCustomPlacementList: 'bottom',

    hasFullWidth: true, hasFlat: false,
  };
  public upComp = () => {
    if (this.conf.isLoading) { this.conf.isLoadingWithPromise = false; }

    this.code = `<bf-lazy-dropdown `;
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

    if (this.conf.hasSelect && !!this.conf.selectField) {
      this.code += this.bsStr + `bfSelect="${this.conf.selectField}"`;
    }
    if (this.conf.hasRender)   { this.code += this.bsStr + `bfRender="${this.conf.renderExp}"`; }  // this.reLink(0); }
    if (this.conf.hasRenderFn) { this.code += this.bsStr + `[bfRenderFn]="renderFn"`; } // this.reLink(0); }

    if (this.conf.hasPlaceholder) { this.code += this.bsStr + `bfPlaceholder="${this.conf.bfPlaceholder}"`; }
    if (this.conf.hasErrorText)   { this.code += this.bsStr + `bfErrorText="${this.conf.bfErrorText}"`; }
    if (this.conf.errorPos)       { this.code += this.bsStr + `bfErrorPos="${this.conf.errorPos}"`; }

    if (this.conf.bfCustomPlacementList === 'top' || this.conf.bfCustomPlacementList === 'bottom') {
      this.code += this.bsStr + `bfCustomPlacementList="${this.conf.bfCustomPlacementList}"`;
    }

    if (this.conf.hasControls) { this.code += this.bsStr + `(bfOnLoaded)="myCtrl = $event"`; }

    this.code += (`>` + this.brStr + `</bf-lazy-dropdown>`);

    if (this.conf.hasControls) {
      this.code += this.brStr + this.brStr + `public myCtrl: IbfDropdownCtrl;`;
      this.code += this.brStr + `myCtrl.toggle(); myCtrl.type('aaa');`;
    }
  };

  fakeLoadData = (filter) =>  {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = this.fakeList.filter(item => JSON.stringify(item).toLowerCase().includes(filter));
        resolve(data);
      }, 4000);
    });
  }

  fakeObservableData = () => {

  }

  ngOnInit() {
    this.lazyItemExample1 = this.fakeList[3];
    this.upComp();
  }

  public renderFn = (item, ind) => {
    return this.bfTranslate.doTranslate('view.common.field_name') + ' ' + ind;
  };

}


export const BfLazyDropdownDoc = {
  name    : `bf-lazy-dropdown`,
  uiType  : 'component',
  desc    : `Generates a dropdown which by searching will call a function to retrieve a list`,
  api     : `*[(ngModel)]         : The model holding the value of the selected item.
*[bfLazyLoad]        : Promise that will return the list of item to display
[bfLazyLoadItem]     : it contains the item for which will be executed the first bfLazyLoad and it will be selected once retrieved
[bfDebounce]         : Time to wait until execution of BfLazyLoad. Default: 300
[bfMinSearchLength]  : Minimum length of text string to execute BfLazyLoad. Default: 3
[bfSelect]           : Field to be set to the ngModel once selected (property from loaded items). If empty, the full object is set.
[bfRender]           : Field to display on the list (property from loaded items).
                         It is the param sent to the bfLazyLoad to search the list.
                         If empty, a row with all properties will be displayed.
[bfRenderFn]         : Function to determine how to render the items of list. Called for every item and should return the string that will be displayed.
                       It overrides [bfRender]. The function is passed 'item' and 'index' parameters.
[bfLabel]            : If provided, a <bf-label> is added above the selector with the given text
[bfTooltip]          : If label provided, adds a info badge with a tooltip (automatically translated)
[bfTooltipPos]       : Position of the tooltip (top by default)
[bfTooltipBody]      : Whether the tooltip is append to the body (default true) or next the the html element (false). The parent container may affect the visibility of the tooltip
[bfRequired]         : Whether the value is required. If not, and "Empty" option will be added a the top of the list
[bfDisabled]         : Whether the selector is disabled or not
[bfDisabledTip]      : Text with the tooltip to display on hover when the input is disabled

[bfPlaceholder]      : Placeholder to show when no value is selected. If bfEmptyLabel has a custom label, this is never shown.
[bfErrorOnPristine]  : If true, errors will be shown in pristine state too (by default pristine shows always as valid, even if it's not).
[bfErrorText]        : Custom error text (label) to display when invalid value.
[bfErrorPos]         : Custom position where to display the error text. Values = ['top-right', 'bottom-left', 'bottom-right', 'none']. None will hide the error text.
[bfCustomPlacementList] : By default the list expands up/down depending on its position on the screen. To force it: 'top' | 'bottom'.

[extCtrl$]           : Observable to trigger actions. Its .next() should emit an object with "action"/"value"
(bfOnLoaded)         : Emitter to catch the moment when the component is ready. It also emits the control object.
(bfBeforeChange)     : Emitter to catch the next value before it is set. It returns both (currentValue, nextValue)
(bfOnListExpanded)   : Emitter to catch the moment when the list expands (focus in)
(bfOnListCollapsed)  : Emitter to catch the moment when the list collapses (select or blur)`,
  instance: `<bf-lazy-dropdown [(ngModel)]="selObjExample1"
                        [bfLazyLoad]="fakeLoadData"
                        [bfLazyLoadItem]="lazyItemExample1"
                        bfRender="email"
></bf-lazy-dropdown>`,
  demoComp: BfLazyDropdownDemoComponent,
};
