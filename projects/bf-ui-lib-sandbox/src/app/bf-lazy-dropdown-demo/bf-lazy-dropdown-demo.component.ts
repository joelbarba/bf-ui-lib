import { Component, OnInit } from '@angular/core';
import {BfTranslateService} from '../translate.service';
import {BfGrowlService} from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {data, fakeWebApi} from './fake-webapi';
import {dCopy} from '../../../../bf-ui-lib/src/lib/bf-prototypes/bf-prototypes';
import {IBfLazyDropdownCtrl} from '../../../../bf-ui-lib/src/lib/bf-lazy-dropdown/bf-lazy-dropdown.component';

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
  public isLinked = true;
  public selObj;
  public fakeTime = 2000;
  public myCtrl: IBfLazyDropdownCtrl;
  public bfSelectOptions = [
    { value: 'id' },
    { value: 'reference' },
    { value: 'description' },
    { value: 'active' },
    { value: 'cost' },
    { value: 'country_code' },
  ];
  public bfCustomPlacementList = [
    { value: 'top'},
    { value: 'bottom'},
  ];

  renderFnStr = `renderFn = (item, ind) => \`Rendered (\${ind}) -> \${item.reference}\`;`;

  lazyLoadExample = `lazyLoadItems = ({ offset, filter, items, isPristine, status, ngModel }) => {

  const qParams = { limit: 10, order_by: 'reference', offset };
  if (filter) { qParams.reference = filter; }

  return this.webApi.get('v1/products', qParams).then(data => {
    return { count: data.count, items: data.products, /* override: true */ };
  });
}`;


  public cssReset = `$dropdown-selection-bg    : rgba($quaternary_color, 0.35);
$dropdown-selection-hover : $primary_color;
$dropdown-valid-color     : $valid-color;
$dropdown-loading-bg      : rgba($optional-color, 0.25);`;

  public brStr = `
`;
  public bsStr = `
                  `;
  public code = '';




  public conf = {
    isRequired: false,        isErrorOnPristine: false,   isDisabled: false,    disabledTip: '',
    hasLabel: true,           bfLabel: 'views.lazy_dropdown.label',             bfAutoCollapse: true,
    hasTooltip: false,        tooltipText: 'view.tooltip.message', tooltipPos: 'top', tooltipBody: true,
    hasSelect: false,         selectField: 'id',          bfFetchOn: 'focus',
    bfDebounce: '300',        bfMinSearchLength: '1',
    hasRender: true,          bfRender: `reference`,      bfTranslate: false,   bfHtmlRender: false,
    hasRenderFn: false,
    bfEmptyFilterTip: 'views.dropdown.awaiting_filter',
    hasPlaceholder: true,     bfPlaceholder: 'views.dropdown.placeholder',
    hasEmptyLabel: false,     customEmptyLabel: 'view.common.all',
    hasEmptyValue: false,     customEmptyValue: 'everything',
    hasErrorText: false,      bfErrorText: `this ain't good`, errorPos: 'default',
    hasLoadingLabel: false,   bfLoadingLabel: 'views.dropdown.loading_more_items',
    hasNoMatchText: false,    bfNoMatchText: 'No Match Yet!',
    bfCustomPlacementList: null,
    hasFilterFn: false,

    hasControls: false,
    hasImages: false,       hasIcons: false,

    // css:
    hasFullWidth: true, hasFlat: false, extraBtn: false,
    isReadOnly: false,
  };
  public upComp = (conf = this.conf) => {
    const br = this.brStr;
    const bs = this.bsStr;

    let code = `<bf-lazy-dropdown `;
    let compClasses = '';
    if (conf.hasFullWidth) { compClasses = 'full-width'; }
    if (conf.hasFlat) { compClasses += (compClasses ? ' ' : '') + 'flat'; }
    if (!!compClasses) { code += `class="${compClasses}"` + bs; }

    code += `[(ngModel)]="val"` + bs;
    code += `[bfLazyLoadFn]="fetchItems"`;

    if (conf.hasLabel)        { code += bs + `bfLabel="${conf.bfLabel}"`; }
    if (conf.isRequired)      { code += bs + `[bfRequired]="true"`; }
    if (conf.isDisabled)      { code += bs + `[bfDisabled]="true"`; }
    if (conf.disabledTip)     { code += bs + `bfDisabledTip="${conf.disabledTip}"`; }
    if (!conf.bfAutoCollapse) { code += bs + `bfAutoCollapse="false"`; }

    if (conf.hasTooltip) {
      code += bs + `bfTooltip="${conf.tooltipText}"`;
      if (!!conf.tooltipPos)  { code += bs + `bfTooltipPos="${conf.tooltipPos}"`; }
      if (!!conf.tooltipBody) { code += bs + `bfTooltipBody="${conf.tooltipBody}"`; }
    }

    if (conf.hasSelect && !!conf.selectField) { code += bs + `bfSelect="${conf.selectField}"`; }
    if (conf.bfFetchOn !== 'focus')     { code += bs + `bfFetchOn="${conf.bfFetchOn}"`; }
    if (conf.bfDebounce !== '300')      { code += bs + `bfDebounce="${conf.bfDebounce}"`; }
    if (conf.bfMinSearchLength !== '1') { code += bs + `bfMinSearchLength="${conf.bfMinSearchLength}"`; }

    if (conf.hasRender)    { code += bs + `bfRender="${conf.bfRender}"`; }
    if (conf.hasRenderFn)  { code += bs + `[bfRenderFn]="renderFn"`; }
    if (conf.bfTranslate)  { code += bs + `[bfTranslate]="true"`; }
    if (conf.bfHtmlRender) { code += bs + `[bfHtmlRender]="true"`; }

    if (conf.bfEmptyFilterTip !== 'views.dropdown.awaiting_filter') {
      code += bs + `bfEmptyFilterTip="${conf.bfEmptyFilterTip}"`;
    }
    if (conf.hasPlaceholder) { code += bs + `bfPlaceholder="${conf.bfPlaceholder}"`; }
    if (conf.hasEmptyLabel)  { code += bs + `bfEmptyLabel="${conf.customEmptyLabel}"`; }
    if (conf.hasEmptyValue)  { code += bs + `bfEmptyValue="${conf.customEmptyValue}"`; }

    if (conf.hasErrorText)           { code += bs + `bfErrorText="${conf.bfErrorText}"`; }
    if (conf.errorPos !== 'default') { code += bs + `bfErrorPos="${conf.errorPos}"`; }
    if (conf.isErrorOnPristine)      { code += bs + `[bfErrorOnPristine]="true"`; }

    if (conf.hasLoadingLabel) { code += bs + `bfLoadingLabel="${conf.bfLoadingLabel}"`; }
    if (conf.hasNoMatchText)  { code += bs + `bfNoMatchText="${conf.bfNoMatchText}"`; }

    if (conf.bfCustomPlacementList === 'top' || conf.bfCustomPlacementList === 'bottom') {
      code += bs + `bfCustomPlacementList="${conf.bfCustomPlacementList}"`;
    }

    if (conf.hasControls) { code += bs + `(bfOnLoaded)="myCtrl = $event"`; }

    code += (`>` + br + `</bf-lazy-dropdown>`);

    if (conf.hasControls) {
      code += br + br + `public myCtrl: IBfLazyDropdownCtrl;`;
      code += br + `myCtrl.clearList(); myCtrl.fetchItems();`;
    }

    this.code = code;
  };



  constructor(
    private bfTranslate: BfTranslateService,
    public growl: BfGrowlService,
  ) {}

  ngOnInit() {
    this.upComp();
  }

  log(name, value) { console.log(`${name} ----->`, value); }

  fakeLoadData = ({ offset, filter, items, isPristine, status, ngModel }) => {
    // return Promise.reject('error AAA');
    // tslint:disable-next-line:variable-name
    const filter_by = this.conf.bfRender || 'reference';
    return fakeWebApi({ offset, filter, filter_by, limit: 10, timeout: this.fakeTime }).then((res: any) => {
      const products = res.products.map(i => {
        const item = { ...i };
        if (!this.conf.hasIcons)  { delete item.icon; }
        if (!this.conf.hasImages) { delete item.img; }
        return item;
      });
      return { items: products, count: res.count, override: false };
    });
  }

  renderFn = (item, ind) => `Rendered (${ind}) -> ${item.reference}`;
  bfFilterFn = (list) => list.filter(item => item.cost > 0);

  compLink() {
    this.reLink();
    this.upComp();
  }

  reLink() {
    this.isLinked = false;
    setTimeout(() => this.isLinked = true);
  }

  // To select objects of the list from outside the component
  setModel(ref) {
    this.selObj = dCopy(data.find(i => i.reference === ref));
    if (!this.conf.hasIcons)  { delete this.selObj.icon; }
    if (!this.conf.hasImages) { delete this.selObj.img; }
  }


}


export const BfLazyDropdownDoc = {
  name    : `bf-lazy-dropdown`,
  uiType  : 'component',
  desc    : `Generates a dropdown that loads its content asynchronously`,
  api     : `*[(ngModel)]   : The model holding the value of the selected item.

[bfLazyLoadFn] : Function to fetch the items on the list.
                 It must return a promise that resolves with an object that has { items[], count: 99 }
                 On its call, it passes the parameters: ({ offset, filter, items, isPristine, status, ngModel })

[bfFetchOn]    : Determines how the fetch function is called. By default = 'focus'.
                 'ini' -----> The first fetchItems() call is made once the component is initialized (ngInit)
                 'focus' ---> The first fetchItems() call is made once the component is focused for the first time
                 'filter' --> The first fetchItems() call is made once something is typed on the input

[bfDebounce]         : On typing on the input, debounce time to trigger the search filter. Default = 300.
[bfMinSearchLength]  : On typing on the input, min length of the text filter to trigger the search. Default = 1.
[bfSelect]           : Field to be set to the ngModel once selected (property from items[]). If empty, the full object is set.
[bfRender]           : Field to be displayed on the list of options representing every item (property from items[]).
[bfRenderFn]         : Function to determine how to render the items of list. Called for every item and should return the string that will be displayed.
                       It overrides [bfRender]. The function is passed 'item' and 'index' parameters.

[bfRenderImg]        : Name of the field containing the url of the image to display on the item ("img" by default)
[bfRenderIcon]       : Name of the field containing the css class of the (icomoon) icon to display on the item ("icon" by default)
[bfHtmlRender]       : When true, displayed values can be rendered as html on the list (but not in the input). Default = false.
[bfTranslate]        : Whether to apply a translation on the values of the list before they are rendered. Default = true.

[bfRequired]         : Whether the value is required. If not, and "Empty" option will be added a the top of the list
[bfDisabled]         : Whether the selector is disabled or not.
[bfDisabledTip]      : Text with the tooltip to display on hover when the input is disabled.
[bfLabel]            : If provided, a <bf-label> is added above the selector with the given text.
[bfTooltip]          : If label provided, adds a info badge with a tooltip (automatically translated).
[bfTooltipPos]       : Position of the tooltip (top by default).
[bfTooltipBody]      : Whether the tooltip is append to the body (default true) or next the the html element (false).
[bfNoMatchText]      : Value to be displayed in the input in case of no match (if undefined, ngModel is rendered).
[bfLoadingLabel]     : Label to display when loading more items. Default = 'views.dropdown.loading_more_items'.
[bfEmptyFilterTip]   : When bfFetchOn=filter, a tip text is displayed on the empty expanded list to help understand that something needs to be typed
                       for the component to trigger a search. This changes the text of the tip. Set it '' to hide the tip. 

[bfCustomPlacementList] : By default the list expands up/down depending on its position on the screen. To force it: 'top' | 'bottom'.

[bfPlaceholder]      : Placeholder to show when no value is selected. If bfEmptyLabel has a custom label, this is never shown.
[bfEmptyLabel]       : By default the empty option shows the "view.common.empty" label. To display a different label, add it here.
[bfEmptyValue]       : By default the empty option sets "null" value to the ngModel. To set a different value, add it here.
[bfErrorOnPristine]  : If true, errors will be shown in pristine state too (by default pristine shows always as valid, even if it's not).
[bfErrorText]        : Custom error text (label) to display when invalid value.
[bfErrorPos]         : Custom position where to display the error text. Values = ['top-right', 'bottom-left', 'bottom-right', 'none']. None will hide the error text.
[bfFilterFn]         : When the list is completely loaded, function to perform a customized front-end filtering.
[bfAutoCollapse]     : When false, the list does not collapse automatically on focus out (only on button click). Default = true.
[bfAriaLabel]        : If no label is supplied or it does not provide enough contextual information a value can be passed to the aria-label attribute.
[bfTabIndex]         : A tabindex to provide to the element. If this element needs to be removed from the accessibility tree supply a value of -1. Default = 0.

[extCtrl$]           : Observable to trigger actions. Its .next() should emit an object with "action"/"value"
(bfOnLoaded)         : Emitter to catch the moment when the component is ready. It also emits the control object.
(bfOnListExpanded)   : Emitter to catch the moment when the list expands (focus in)
(bfOnListCollapsed)  : Emitter to catch the moment when the list collapses (select or blur)
(bfBeforeChange)     : Emitter to catch the next value before it is set. It returns both (currentValue, nextValue)
(bfOnTyping)         : Emitter to catch when typing into the input\`,

(bfListChange)       : Emits the internal loaded list every time that changes (empty item excluded)
(bfMatch)            : Emits the selected item of the list every time the ngModel is matched. That can happen when the ngModel or the loaded list changes.

`,
  instance: `<bf-lazy-dropdown [(ngModel)]="selObjExample1"
                        [bfLazyLoad]="fakeLoadData"
                        [bfLazyLoadItem]="lazyItemExample1"
                        bfRender="email"
></bf-lazy-dropdown>`,
  demoComp: BfLazyDropdownDemoComponent,
};
