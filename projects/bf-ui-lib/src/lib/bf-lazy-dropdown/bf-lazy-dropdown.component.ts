import {Component, OnInit, Input, Output, forwardRef, ElementRef, EventEmitter} from '@angular/core';
import {OnChanges, OnDestroy,  AfterViewInit, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';
import BfObject from '../bf-prototypes/object.prototype';
import BfArray from '../bf-prototypes/array.prototypes';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {BfUILibTransService} from '../abstract-translate.service';
import {dCopy} from '../bf-prototypes/deep-copy';
import {debounceTime, filter} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';



// The control object (bfOnLoaded) emits
export interface IBfLazyDropdownCtrl {
  clearList   ?: { () };
  fetchItems  ?: { () };
  expand      ?: { () };
  collapse    ?: { () };
  toggle      ?: { () };
  type        ?: { (value: string) };
  setPristine ?: { () };
  removeError ?: { () };
  addError    ?: { (err) };
}

enum EListStatus {
  EMPTY,              // When there hasn't been any fetchItems() yet
  PARTIALLY_LOADED,   // When some items loaded, but length < count
  FULLY_LOADED,       // When all items are loaded (length == count) but with a backend filter
  COMPLETELY_LOADED,  // When everything is loaded (length == count) and there is no filter
}
const EMPTY             = EListStatus.EMPTY;
const PARTIALLY_LOADED  = EListStatus.PARTIALLY_LOADED;
const FULLY_LOADED      = EListStatus.FULLY_LOADED;
const COMPLETELY_LOADED = EListStatus.COMPLETELY_LOADED;

const defaultLazyLoadFn = () => Promise.resolve({ items: [], count: 0 });

@Component({
  selector: 'bf-lazy-dropdown',
  templateUrl: './bf-lazy-dropdown.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfLazyDropdownComponent),
    },
    {
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfLazyDropdownComponent),
    }
  ]
})
export class BfLazyDropdownComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit, OnDestroy {

  // Function to fetch items and add them to the list.
  // It must return a promise that resolves with an object that has { items[], count: 99 }
  @Input() bfLazyLoadFn: ({ offset, filter, items, isPristine, status, ngModel })
                          => Promise<{ items: Array<{ [key: string]: any }>, count: number, override?: boolean }>
                          = defaultLazyLoadFn;

  // Determines how the fetch method is called
  // Fetch on 'ini' -----> The first fetchItems() call is made once the component is initialized (ngInit)
  // Fetch on 'focus' ---> The first fetchItems() call is made once the list is expanded for the first time
  // Fetch on 'filter' --> The first fetchItems() call is made once something is typed on the input
  @Input() bfFetchOn: 'ini' | 'focus' | 'filter' = 'focus';

  @Input() bfDebounce: number | string = 300;      // Debounce time to trigger the search filter while typing
  @Input() bfMinSearchLength: number | string = 1; // Min length of the filter to trigger the search

  @Input() bfRender = '';         // How to display every option on the expanded list
  @Input() bfRenderFn;            // Function to be called to render the list items (when bfRender is not enough)
  @Input() bfRenderImg = 'img';   // Field of the object that contains the url of the image to display
  @Input() bfRenderIco = 'icon';  // Field of the object that contains the css class of the icon (icomoon) to display
  @Input() bfTranslate = false;   // Apply a translation on the values of the list before they are rendered
  @Input() bfSelect = '';         // What fields need to be selected on the model (from the list object)
  @Input() bfRequired: string | boolean = false; // Whether the model is required (can't be empty)
  @Input() bfDisabled: string | boolean = false; // Whether the dropdown is disabled
  @Input() bfDisabledTip = '';    // If dropdown disabled, tooltip to display on hover (label)

  @Input() bfLabel = '';          // Label to display above the dropdown
  @Input() bfTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() bfTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;  // If tooltip on the label, whether it is appended on the body
  @Input() bfNoMatchText = null;  // Value to be displayed in case of no match (if undefined, ngModel is rendered)
  @Input() bfLoadingLabel = 'views.dropdown.loading_more_items';  // Label to display when loading more items

  @Input() bfPlaceholder;         // Placeholder to show when no value selected. If bfEmptyLabel, this gets overridden
  @Input() bfEmptyLabel;          // Text of the emptyItem option (no label = 'Empty')
  @Input() bfEmptyValue: any = null;  // By default the empty option sets a "null" value to the ngModel.
                                      // You can add a custom value here to be set when the empty option is selected

  @Input() bfErrorOnPristine = false; // If true, errors will be shown in initial state too (by default pristine shows as valid always)
  @Input() bfErrorPos: 'default' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none' = 'default'; // Position of the error text
  @Input() bfErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() bfCustomPlacementList: 'top' | 'bottom';   // To force the direction the list is expanded.
                                                      // By default this is automatic based on the position on the window
  @Input() bfAutoCollapse = true; // If false, the dropdown does not collapse on focus out
  @Input() bfHtmlRender = false;  // When true display values can be rendered as html on the list (but not in the input)

  @Input() extCtrl$: Observable<unknown>; // To trigger actions manually from an external observable (subject)

  // When the list is completely loaded, the component uses frontend filtering like the regular dropdown
  @Input() bfFilterFn: (list: Array<any>, value: string) => Array<any>; // Custom function to perform the list filtering

  // Accessibility inputs
  @Input() bfTabIndex = 0;        // To set to <input [tabindex]>
  @Input() bfAriaLabel: string;   // To set to <input [aria-label]>

  @Output() bfOnLoaded = new EventEmitter<IBfLazyDropdownCtrl>(); // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() bfOnListExpanded = new EventEmitter<any>();   // The moment when the list expands (focus in)
  @Output() bfOnListCollapsed = new EventEmitter<any>();  // The moment when the list collapses (select or blur)
  @Output() bfBeforeChange = new EventEmitter<any>();     // The moment before a value is set (selected)
  @Output() bfOnTyping = new EventEmitter<any>();         // When typing into the input


  // --------------


  public ngControl; // Reference to the external formControl
  public bfModel;   // Internal model, to hold the selected object of the list, or empty value

  public extList = [];                // Current list of items (partially) loaded and displayed
  public status: EListStatus = EMPTY; // Current status of the list, depending on the items loaded on it.

  public bfCandidate; // Pointer to the selected extList item that might be selected next but not yet
                      // (hovering / arrow scrolling). It sets the attr.aria-activedescendant

  public inputText = '';          // Text on the input (ngModel)
  public searchTxt = '';          // Last text that was typed into the <input>
  public selModelText = '';       // Text representation of the selected Model (to display on the input / placeholder)
  public inputPlaceholder = '';   // Text on the input placeholder
  public renderedPlaceholder = '';// Translated value of the custom placeholder

  public isModelEmpty = false;  // Whether the bfModel is holding the empty option
  public isInvalid = false;     // If the model holds an invalid option
  public isExpanded = false;    // Whether the list is shown (true) or hidden
  public isFocus = false;       // Whether the input is focused
  public isLoading = false;     // Whether to show the loading spinner animation on the expand button
  public fetchingPromise;       // The current fetch loading promise
  public lastFetchId: string;   // Reference to the last fetch promise, to avoid overlapping

  public showError = false; // Whether to show the error state (if invalid + not pristine)
  public errorPosition = 'default';
  public errors = {
    emptyRequired: false, // When no value and is required
    noMatch: false,       // When ngModel set externally and no match on the list
    manualErr: null,      // Manual error (set through addError() / removeError())
  };
  public expandUpward = false;  // Whether to expand the list upward (true) or downward (false)

  // Empty option item (in extList)
  public emptyItem = {
    $$index: 0,
    $$idRef: 'item-0',
    $$label: 'view.common.empty',
    $$renderedText: 'Empty',
    $$isMatch: true,
    $$img: null,
    $$icon: null,
  };

  public errorTextTrans$ = of('');       // Translated text for the error message
  public currentErrorMessage = '';
  public isBfDisabledPresent = false;  // If [bfDisabled] present, do not change it automatically on bfLoading
  public subs: {[ key: string]: Subscription } = {};  // Subscriptions holder
  public ignoreMouse: number;             // The setTimeout to ignore the mouseenter during scroll
  public isPristine = true; // To know when the list is first fetched.

  private readonly ctrlObject; // Object to expose control methods externally

  public ignoreHover = false; // When scrolling with the arrow keys, ignore mouse hover
  public listHeight; // Computed height of the expanded listContainer
  public arrowScroll$ = new Subject();
  public onInputType$: Subject<string> = new Subject(); // To debounce the typing on the input

  public inputId = this.generateUniqueId('inputId');         // Unique identifier for the input field
  public componentId = this.generateUniqueId('componentId'); // Unique identifier for the component

  @ViewChild('dropdownInput', { static: false }) elInput: ElementRef<HTMLInputElement>;
  @ViewChild('listContainer', { static: false }) listContainer: ElementRef<HTMLInputElement>;



  constructor(
    private translate: BfUILibTransService,
    private elementRef: ElementRef,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.emptyItem.$$idRef = `${this.componentId}-item-0`;

    // Rerender the list labels on language change
    this.subs.langSubs = this.translate.onLangChange$.subscribe(() => this.renderExtList());

    // Give the browser .1s to scroll and avoid the mouseenter selecting a different item while using arrows up/down
    this.subs.scrollSub = this.arrowScroll$.pipe(debounceTime(100)).subscribe(() => this.ignoreHover = false);

    // Controller object
    this.ctrlObject = {
      clearList   : () => this.clearList(),
      fetchItems  : () => this.fetchItems(),
      expand      : () => !this.isExpanded && this.deferExpand(),
      collapse    : () => this.isExpanded && this.deferCollapse(),
      toggle      : () => this.isExpanded ? this.deferCollapse() : this.deferExpand(),
      setPristine : () => {
        if (this.ngControl) { this.ngControl.markAsPristine(); }
        this.runValidation();
      },
      type        : (value) => {
        setTimeout(() => {
          this.elInput.nativeElement.focus();
          this.inputText = value;
          this.onInputType(this.inputText);
        }, 100);
      },
      addError    : (value) => {
        if (JSON.stringify(this.errors.manualErr) !== JSON.stringify(value)) {
          this.errors.manualErr = value;
          this.runValidation();
        }
      },
      removeError : () => {
        if (this.errors.manualErr !== null) {
          this.errors.manualErr = null;
          this.runValidation();
        }
      },
    };
  }

  ngOnChanges(changes) {
    const changing = (prop) => changes.hasOwnProperty(prop);  // just a shortcut

    // External control via extCtrl$
    if (changing('extCtrl$')) {
      if (!!this.subs.ctrlSubs) { this.subs.ctrlSubs.unsubscribe(); }
      this.subs.ctrlSubs = this.extCtrl$.subscribe((option: { action: string, value?: any }) => {
        switch (option.action) {
          case 'clearList'  : this.ctrlObject.clearList(); break;
          case 'fetchItems' : this.ctrlObject.fetchItems(); break;
          case 'expand'     : this.ctrlObject.expand(); break;
          case 'collapse'   : this.ctrlObject.collapse(); break;
          case 'toggle'     : this.ctrlObject.toggle(); break;
          case 'type'       : this.ctrlObject.type(option.value); break;
          case 'setPristine': this.ctrlObject.setPristine(); break;
          case 'addError'   : this.ctrlObject.addError(option.value); break;
          case 'removeError': this.ctrlObject.removeError(); break;
          default: break;
        }
      });
    }

    // Refresh list values
    if (changing('bfRender') || changing('bfRenderFn') || changing('bfTranslate')) {
      this.setEmptyOption();
      this.renderExtList();
      this.renderLabels();
    }

    // In case the selected field changes, reselect the item to set the new ngModel.value
    if (changing('bfSelect') && !this.isModelEmpty && !changes.bfSelect.firstChange) {
      this.selectItem(this.bfModel);
    }

    // If values come as strings, convert them
    if (changing('bfDisabled')) {
      this.isBfDisabledPresent = true;
      if (this.bfDisabled === 'false') { this.bfDisabled = false; }
      if (this.bfDisabled === 'true')  { this.bfDisabled = true; }
    }

    if (changing('bfRequired')) {
      if (this.bfRequired === 'false') { this.bfRequired = false; }
      if (this.bfRequired === 'true')  { this.bfRequired = true; }
      this.setEmptyOption();
    }

    if (changing('bfPlaceholder')) { this.renderLabels(); }

    if (changing('bfEmptyLabel')) {
      this.emptyItem.$$label = this.bfEmptyLabel || 'view.common.empty';
      this.renderLabels();
    }

    if (changing('bfLoadingLabel')) {
      this.bfLoadingLabel = this.bfLoadingLabel || 'views.dropdown.loading_more_items';
    }

    if (changing('bfErrorPos')) { this.errorPosition = this.bfErrorPos || 'default'; }
    if (changing('bfErrorText') && this.isInvalid) { this.runValidation(); }
    if (changing('bfErrorOnPristine')) { this.runValidation(); }

    if (changing('bfDebounce') || changing('bfMinSearchLength')) { this.configFilter(); }
  }

  ngOnInit() {
    if (this.bfFetchOn === 'ini') { this.fetchItems(); }
    this.configFilter();
    this.renderLabels();
  }

  ngAfterViewInit() {
    this.bfOnLoaded.emit({ ...this.ctrlObject }); // Expose all control methods
  }

  ngOnDestroy() {
    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }



  // Listen to the typing on the input and trigger the search filter
  configFilter() { // In case it comes as string, convert it to a number
    let debounce = 300;
    if (typeof this.bfDebounce === 'number')  { debounce = this.bfDebounce; }
    else if (!isNaN(Number(this.bfDebounce))) { debounce = Number.parseInt(this.bfDebounce, 10); }

    let minLength = 1;
    if (typeof this.bfMinSearchLength === 'number')  { minLength = this.bfMinSearchLength; }
    else if (!isNaN(Number(this.bfMinSearchLength))) { minLength = Number.parseInt(this.bfMinSearchLength, 10); }

    if (this.subs.typing$) { this.subs.typing$.unsubscribe(); }
    this.subs.typing$ = this.onInputType$.pipe(
      debounceTime(debounce),
      filter(text => !text || text?.length >= minLength)
    ).subscribe(text => this.filterList(text));
  }

  // Update translation for empty options, placeholders and input value
  renderLabels() {
    this.emptyItem.$$renderedText = this.translate.doTranslate(this.emptyItem.$$label);
    this.renderedPlaceholder = this.translate.doTranslate(this.bfPlaceholder);
    if (!this.bfModel || this.isModelEmpty) {
      this.setModelText(this.emptyItem.$$renderedText);
    } else {
      const { $$renderedText } = this.renderItem(this.bfModel);
      this.setModelText($$renderedText);
    }
  }


  // Trigger bfLazyLoadFn to load more items onto the list, and set up the loading state of the component.
  // The bfLazyLoadFn() function should return a Promise that resolve to an object with:
  //    - items[] --> An array with the new items to add to the list
  //    - count   --> The total amount of items on the list without pagination
  fetchItems() {
    if (this.isLoading || this.status >= FULLY_LOADED) { return this.fetchingPromise; }
    if (this.isExpanded) { setTimeout(() => this.scrollToLoading()); } // scroll to show the loading row

    // Call external 'bfLazyLoadFn' to load items
    const promise = this.bfLazyLoadFn({
      filter     : this.searchTxt,
      offset     : this.getLoadedItems().length,
      items      : this.getLoadedItems().map(item => this.remove$$(item)),
      isPristine : this.isPristine,
      status     : this.status,
      ngModel    : dCopy(this.bfModel),
    });
    if (!promise?.then) { console.error('bfLazyLoadFn not returning a promise'); return; }

    // Generate a unique reference so we can ignore
    const fetchRef = this.generateUniqueId('fetch') + '-' + new Date();
    this.lastFetchId = fetchRef;

    this.isLoading = true;
    this.fetchingPromise = promise.then((result: { count: number, items: Array<any>, override?: boolean }) => {
      if (fetchRef === this.lastFetchId && result.items) {
        this.isLoading = false;

        // Some validations to make sure 'result' is correct
        if (!Array.isArray(result?.items) || typeof result?.count !== 'number') {
          console.warn('bfLazyDropdown: The [bfLazyLoadFn] should return an object with { items[], count }'); return;
        }
        const wrongItems = result.items.filter(item => typeof item !== 'object' || Array.isArray(item));
        if (wrongItems.length) { console.warn('bfLazyDropdown: Some items that are not objects', wrongItems); return; }


        // Add the new items to the list
        if (result.override) { this.clearList(); }
        this.extList.push(...dCopy(result.items));
        // console.log('Adding new items to extList:', result.items);

        // Determine the new status of the list
        if (this.getLoadedItems().length < result.count) {
          this.status = PARTIALLY_LOADED; // Still some items to load
        } else {
          this.status = this.searchTxt ? FULLY_LOADED : COMPLETELY_LOADED;
        }

        this.renderExtList(); // Add $$ extended props to the new items

        // If the candidate is not in the new list, clear it
        if (this.extList.indexOf(this.bfCandidate) < 0) { this.bfCandidate = null; }

        // If current model was not in the list, but matches any of the new added values and point at it
        if (this.bfModel && this.extList.indexOf(this.bfModel) < 0) {
          const bfModel = this.remove$$(this.bfModel);
          const match = this.extList.find(item => {
            if (this.bfSelect) { return item[this.bfSelect] === bfModel; }
            return BfObject.isEqualTo.call(this.remove$$(item), bfModel);
          });

          if (!match) { // If no match, keep the pointer but remove possible reference to the new list
            if (this.bfModel?.$$idRef || this.bfModel?.$$index) {
              this.bfModel.$$idRef = null;
              this.bfModel.$$index = null;
            }
          } else { // If match, point to the new element on the list
            this.bfModel = match;
            this.setModelText(this.bfModel.$$renderedText);
            if (!this.bfCandidate) { this.bfCandidate = match; }
          }
        }

        setTimeout(() => { // In case that the list changes its size
          this.listHeight = this.listContainer.nativeElement.getBoundingClientRect().height;
          this.scrollToCandidate();
        });
      }
    }, () => { if (fetchRef === this.lastFetchId) { this.isLoading = false; } });

    return this.fetchingPromise;
  }


  // Empty loaded items
  clearList() {
    this.extList = [];
    this.setEmptyOption();
    this.status = EMPTY;
    this.listContainer.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
  }


  // Filter the list to display items according to the input text
  filterList(value) {
    const hasFilterChanged = this.searchTxt !== value;
    this.searchTxt = value;

    // If the list is completely loaded, filter among the loaded items
    if (this.status === COMPLETELY_LOADED) {
      this.frontEndFilter(value);

    } else { // If the list is partially loaded, trigger a new
      if (hasFilterChanged) {
        this.clearList();
        this.isLoading = false;
        this.fetchItems().then(() => this.expandList());
      }
    }
  }


  // Set the item.$$isMatch flags to determine which elements on extList should be displayed.
  // This filtering is only performed when the list is COMPLETELY_LOADED, so all items are in memory.
  frontEndFilter = (value = this.searchTxt) => {
    if (this.status === COMPLETELY_LOADED) {
      if (!this.isExpanded) { this.expandList(); }

      if (this.bfFilterFn) {
        const fList = this.bfFilterFn(this.extList, value);
        this.extList.forEach(item => item.$$isMatch = !!fList.find(e => e.$$idRef === item.$$idRef));
      } else {
        const patternVal = value.toLowerCase();
        this.extList.forEach(item => {
          item.$$isMatch = item.$$renderedText && item.$$renderedText.toLowerCase().indexOf(patternVal) >= 0;
        });
        this.emptyItem.$$isMatch = true; // Fix empty option as always visible
      }

      this.extList.filter(i => i.$$index !== 0).forEach(i => { i.$$index = null; i.$$isLast = false; });

      // Re sequence the $$index value on the filtered items (omitting Empty value, which is always 0)
      const visibleItems = this.extList.filter(i => i.$$isMatch);
      visibleItems.filter(i => i.$$index !== 0).forEach((item, ind) => item.$$index = ind + 1);

      if (visibleItems.length) { visibleItems.getLast().$$isLast = true; } // Set the new $$isLast

      // If the candidate is now not on the list, activate the first item
      if (!this.bfCandidate?.$$isMatch) { this.bfCandidate = this.extList.find(item => item.$$isMatch); }
    }
  };


  // Generates the internal $$ values for the extList
  renderExtList() {
    if (!!this.extList) {
      const last = this.extList.getLast();
      this.getLoadedItems().forEach((item, ind) => {
        item.$$index = ind + 1; // To sequence displayed values ($$isMatch = true). The frontEndFilter() changes it
        item.$$idRef = `${this.componentId}-item-${ind + 1}`; // to determine aria-activedescendant
        item.$$img = item[this.bfRenderImg] || null;
        item.$$icon = item[this.bfRenderIco] || null;
        item.$$isMatch = true; // filter none by default
        item.$$isLast = item.$$idRef === last.$$idRef; // Whether it is the last item of the list

        const { $$label, $$renderedText } = this.renderItem(item, ind);
        item.$$label = $$label;
        item.$$renderedText = $$renderedText;

      });
      if (this.status === COMPLETELY_LOADED) { this.frontEndFilter(); }
    }
  }


  // Set the $$renderedText (text to be displayed) and $$label values from the item
  renderItem(item, ind = 0) {
    let $$label = '';
    let $$renderedText = '';

    // Set the label to be translated as a value on the list
    if (!!this.bfRender) {
      $$label = '' + item.hasOwnProperty(this.bfRender) ? item[this.bfRender] : this.bfRender;  // Display item property / string label
    } else if (!this.bfRenderFn) { // If render function, $$label will be calculated later
      $$label = '' + Object.values(item).join(', '); // If no rendering defined: Display all props
    }

    if (this.bfRenderFn && typeof this.bfRenderFn === 'function') { // If render function, call it
      $$renderedText = this.bfRenderFn(item, ind);

    } else if (this.bfTranslate) { // Display the translated item.$$label
      const params = {};  // Take as translation params those primitives on the same item
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === 'string' || typeof value === 'number') { params[key] = value; }
      }
      $$renderedText = this.translate.doTranslate($$label, params);

    } else { $$renderedText = $$label; }

    return { $$label, $$renderedText };
  }


  // Add or remove the "Empty" option to the extList
  setEmptyOption() {
    if (!this.bfRequired) { // If not required, the list should have "Empty" option
      if (!this.extList.find(item => item.$$idRef === this.emptyItem.$$idRef)) {
        this.emptyItem.$$renderedText = this.translate.doTranslate(this.emptyItem.$$label);
        this.extList.unshift(this.emptyItem);  // Add it if not there yet
      }
    } else { // If required, the list shall not have "Empty" option
      BfArray.removeByProp.call(this.extList, '$$idRef', this.emptyItem.$$idRef); // remove empty item
    }

    // Check validity when Empty option is selected
    this.runValidation(); // That might set emptyRequired error
  }


  // Expand the list of options
  expandList() {
    if (this.isExpanded) { return; }

    this.announceError();

    // If the dropdown is to close to the bottom of the window, expand it upward so the list doesn't fall off
    if (!this.bfCustomPlacementList && this.elementRef) {
      const renderedShadowRect = this.elementRef.nativeElement.getBoundingClientRect();
      this.expandUpward = (window.innerHeight - renderedShadowRect.bottom) < 350;

    } else { // Force the direction the list is expanded towards
      this.expandUpward = this.bfCustomPlacementList === 'top';
    }

    if (this.bfModel?.$$idRef) { this.bfCandidate = this.bfModel; } // Reset candidate to current selection
    this.isExpanded = true;
    this.inputText = this.searchTxt;
    this.bfOnListExpanded.emit();

    // If the selected element is down in the list, auto scroll so it's immediately visible
    setTimeout(() => {
      if (this.listContainer) {
        this.listHeight = this.listContainer.nativeElement.getBoundingClientRect().height;
        this.scrollToCandidate();
      }
    });
  }


  // Collapse the list of options
  collapseList() {
    if (!this.isExpanded) { return; }
    this.isExpanded = false;
    this.inputText = this.selModelText; // Take back the text of the selected item
    this.bfOnListCollapsed.emit();
    this.listContainer.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
  }


  deferExpand() {
    setTimeout(() => this.elInput.nativeElement.focus());
  }

  deferCollapse() {
    setTimeout(() => { if (this.bfAutoCollapse) { this.collapseList(); }}, 100);
  }





  // ----------------------- Html events ----------------------------

  onInputType(value: string) { // When typing on the input, trigger a search
    this.onInputType$.next(value);
    this.bfOnTyping.emit(value);
  }

  onInputFocusIn() {
    this.isFocus = true; // Trigger the first fetch when it's first focused (and empty)
    if (this.bfFetchOn === 'focus' && this.status === EMPTY) { this.fetchItems(); }
    this.expandList();
  }

  onInputFocusOut() {
    this.isFocus = false;
    this.deferCollapse();
  }

  onInputBtnClick() { // Click on the expand/collapse input button
    if (!this.isExpanded) {
      this.elInput.nativeElement.focus();
      this.expandList();
    } else {
      this.collapseList();
    }
  }

  onResetFilter() {
    this.filterList('');
    this.inputText = '';
    this.elInput.nativeElement.focus();
    const bfAutoCollapse = this.bfAutoCollapse;
    this.bfAutoCollapse = false; // Prevent onInputFocusOut -> deferCollapse
    setTimeout(() => this.bfAutoCollapse = bfAutoCollapse, 120);
  }

  onScroll() { // If reaching the bottom of the list while scrolling, trigger a fetch to load more items
    const list = this.listContainer.nativeElement;
    if (this.isExpanded && list.clientHeight + list.scrollTop >= list.scrollHeight) {
      if (!this.bfCandidate?.$$isLast && this.status < FULLY_LOADED) {
        this.bfCandidate = this.extList.find(i => i.$$isLast);
      }
      this.fetchItems();
    }
  }

  onMouseEnter(event: MouseEvent) {
    if (this.ignoreMouse) { return; }
    const idRef = (event.target as HTMLElement).getAttribute('id');
    this.bfCandidate = this.extList.getByProp('$$idRef', idRef); // Set the hovering item as the candidate
  }

  onMouseLeave() {
    if (this.ignoreMouse) { return; }
    this.bfCandidate = null;
  }

  onKeyDown(event: KeyboardEvent) { // React on key events (on the input)
    if (event.key === 'Escape')    { this.onEscKey(); }
    if (event.key === 'Tab')       { this.onTabKey(event); }
    if (event.key === 'Enter')     { event.preventDefault(); this.onEnterKey(); }
    if (event.key === 'ArrowDown') { event.preventDefault(); this.activateNextItem(); }
    if (event.key === 'ArrowUp')   { event.preventDefault(); this.activatePrevItem(); }
    if (event.key === 'PageDown')  { event.preventDefault(); this.activateNextItem(8); }
    if (event.key === 'PageUp')    { event.preventDefault(); this.activatePrevItem(8); }

    // If there is text on the input, use these keys to navigate through the text
    if (!this.inputText) { // If no text (no filter) navigate the list
      if (event.key === 'End')     { event.preventDefault(); this.activateLastItem(); }
      if (event.key === 'Home')    { event.preventDefault(); this.activateFirstItem(); }
    }
  }

  onEscKey() {  // Collapse the list
    if (this.isExpanded) {
      this.collapseList();
      this.inputText = this.selModelText; // Set back the selected text
    }
  }

  onEnterKey() {  // Toggle expanding the list or selecting the candidate
    if (!this.isExpanded) {
      this.expandList();
    } else {
      if (this.bfCandidate) { this.selectItem(this.bfCandidate); }
      this.collapseList();
    }
  }

  onTabKey(event) {  // Select candidate
    if (this.isExpanded) {
      event.preventDefault();
      this.selectItem(this.bfCandidate);
      this.collapseList();
    }
  }

  activateNextItem(inc = 1) { // Find next item (first one if no candidate)
    const lastItem = this.extList.find(i => i.$$isLast);
    const nextIndex = this.bfCandidate ? this.bfCandidate.$$index + inc : this.getFirstMatch()?.$$index;
    this.bfCandidate = this.extList.getByProp('$$index', nextIndex) || lastItem || null;
    if (this.bfCandidate.$$isLast) { this.fetchItems(); } // If last, trigger fetch
    if (!this.isExpanded) { this.selectItem(this.bfCandidate); }
    this.scrollToCandidate();
  }

  activatePrevItem(inc = 1) { // Find previous item (first one if no candidate)
    const firstItem = this.getFirstMatch();
    const nextIndex = (this.bfCandidate?.$$index - inc) || firstItem?.$$index;
    this.bfCandidate = this.extList.getByProp('$$index', nextIndex) || firstItem || null;
    if (!this.isExpanded) { this.selectItem(this.bfCandidate); }
    this.scrollToCandidate();
  }

  activateLastItem() {
    this.bfCandidate = this.extList.find(i => i.$$isLast) || null;
    this.fetchItems();
    this.scrollToCandidate();
  }

  activateFirstItem() {
    this.bfCandidate = this.getFirstMatch() || null;
    this.scrollToCandidate();
  }

  getFirstMatch() {
    return this.extList.filter(i => i.$$isMatch)[0];
  }

  scrollToCandidate() {
    if (this.isExpanded && this.extList.indexOf(this.bfCandidate) >= 0) {
      const children = this.listContainer.nativeElement.children;
      let htmlElement = Array.from(children).find(el => el.id === this.bfCandidate?.$$idRef);

      // If scrolling to the last while loading, scroll a bit more to show the loading row
      if (this.bfCandidate?.$$isLast && this.isLoading) { htmlElement = children.item(children.length - 1); }

      this.scrollItemIntoView(htmlElement as HTMLElement);
    }
  }

  // Scroll to the loading last row
  scrollToLoading() {
    if (this.isExpanded && this.isLoading) {
      const children = this.listContainer.nativeElement.children;
      const loadingEl = children.item(children.length - 1);
      if (loadingEl) { this.scrollItemIntoView(loadingEl as HTMLElement); }
    }
  }

  scrollItemIntoView(selectedElement: HTMLElement): void {
    if (selectedElement) {
      const offsetTop = selectedElement.offsetTop;
      const clientHeight = selectedElement.clientHeight;
      const scrollTop = this.listContainer.nativeElement.scrollTop;
      const posY = offsetTop - scrollTop;

      if (posY < 0) { // Scroll up
        this.listContainer.nativeElement.scrollTo({ top: scrollTop + posY - 5, behavior: 'auto' });
      }
      if (posY + clientHeight > this.listHeight) { // Scroll down
        this.listContainer.nativeElement.scrollTo({ top: scrollTop + posY + 5 + clientHeight - this.listHeight, behavior: 'auto' });
      }

      // To avoid falling back to the mouse point when auto scrolling
      if (this.ignoreMouse) { clearTimeout(this.ignoreMouse); }
      this.ignoreMouse = setTimeout(() => this.ignoreMouse = null, 100);
    }
  }




  // ------- ControlValueAccessor -----

  propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALUE_ACCESSOR --> This is triggered every time the [ngModel] changes (propagate down)
  // It is also triggered twice when the component is first initialized
  //   1 - Before ngAfterViewInit (value always null)
  //   2 - After ngAfterViewInit (initial ngModel value from outside)
  writeValue(value: any) {
    if (this.ngControl) { // Ignore first trigger before ngAfterViewInit
      const wasPristine = this.ngControl.pristine;

      this.matchSelection(value);

      // External changes shan't turn pristine state (only internals). Set it back if so
      if (wasPristine) { this.ngControl.markAsPristine(); }
    }
  }

  // Run ngModel validation safely
  runValidation() {
    if (this.ngControl) { this.ngControl.updateValueAndValidity(); } // This triggers NG_VALIDATORS -> validate()
  }

  // NG_VALIDATORS: To determine the <bf-input [ngModel]> formControl status. Triggered:
  //   - After writeValue()
  //   - After propagateModelUp()
  //   - After this.ngControl.updateValueAndValidity()
  validate(extFormCtrl: FormControl) {
    let result = null;  // null is valid
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    this.errors.emptyRequired = !!(this.bfRequired && this.isModelEmpty);

    this.isInvalid = !!this.errors.emptyRequired || !!this.errors.manualErr; // || !!this.errors.noMatch;
    this.showError = this.isInvalid && !this.isLoading && (!this.ngControl.pristine || this.bfErrorOnPristine);

    // Determine the error to display
    if (this.isInvalid) {
      let errLabel = 'view.common.invalid_value';
      if (this.errors.emptyRequired) {
        result = { error: 'required' };
        errLabel = 'view.common.required_field';
      }

      if (this.errors.manualErr) {
        result = { error: this.errors.manualErr };
        errLabel = this.errors.manualErr;
      }

      this.announceError(this.bfErrorText || errLabel);
      this.errorTextTrans$ = this.translate.getLabel$(this.bfErrorText || errLabel);
      if (this.bfErrorText === 'none') { this.errorTextTrans$ = of(''); }
    } else {
      this.liveAnnouncer.clear();
    }

    return result;
  }



  // -------------------- Matching and Selection -----------------------


  // Given an external object/value, find and select the match on the internal list
  matchSelection(value) {
    // console.log('matchSelection', value);
    let matchItem = null;

    if (value !== null && value !== undefined) {
      if (!!this.bfSelect) {
        if (this.bfSelect.indexOf(',') === -1) {  // Single prop
          matchItem = BfArray.getByProp.call(this.extList, this.bfSelect, value);

        } else { // Multiple prop match
          matchItem = this.extList.filter(item => {
            return !!item.$$index && (JSON.stringify(BfObject.keyMap.call(item, this.bfSelect)) === JSON.stringify(value));
          })[0];
        }

      } else { // Full object match (without $$ props)
        matchItem = this.extList.find(item => BfObject.isEqualTo.call(value, this.remove$$(item)));
      }
    }

    if (!!value && value !== this.bfEmptyValue && this.extList.indexOf(matchItem) < 0) { // In case of "no match"
      this.bfModel = value;
      this.isModelEmpty = false;

      let modelText = '';
      if (this.bfNoMatchText !== null) { modelText = this.bfNoMatchText; }
      else if (typeof value === 'string') { modelText = value; }
      else if (typeof value === 'object' && !Array.isArray(value)) {
        const { $$renderedText } = this.renderItem(value);
        modelText = $$renderedText;
      }
      this.setModelText(modelText); // Show the value of the selected model that is not in extList[]

    } else {
      this.selectItem(matchItem, { value }); // select valid match
    }
  }


  // Select an item from extList to bfModel, and propagate ngModel up
  selectItem(selObj, writeValue?) {
    // console.log('selectItem', selObj);

    if (selObj !== this.emptyItem && selObj !== null && selObj !== undefined) {
      this.bfModel = selObj;
      this.isModelEmpty = false;
      this.setModelText(this.bfModel.$$renderedText);

    } else {
      this.bfModel = this.emptyItem;
      this.isModelEmpty = true;
      this.setModelText(this.emptyItem.$$renderedText);
    }

    let nextValue;  // Object to propagate up (to the formControl of the bf-dropdown)

    if (this.isModelEmpty) {
      nextValue = this.bfEmptyValue; // If empty value selected, return null (or the empty value)

    } else {
      if (!this.bfSelect) { // Select the whole object
        nextValue = this.remove$$(this.extList.find(item => item.$$idRef === selObj.$$idRef));

      } else {
        if (this.bfSelect.indexOf(',') === -1) {
          nextValue = selObj[this.bfSelect];  // Select 1 prop
        } else {
          nextValue = BfObject.keyMap.call(selObj, this.bfSelect); // Select filtered props
        }
      }
    }

    this.bfBeforeChange.emit({ nextValue });

    // In case this comes from NG_VALUE_ACCESSOR -> writeValue(), the ngModel is already set (no need to propagate up)
    if (!writeValue || writeValue.value !== nextValue) {
      this.propagateModelUp(nextValue); // This triggers NG_VALIDATORS -> validate()
    }
  }

  // Determine how to display the selected option on the input
  setModelText(value) {
    if (!this.isModelEmpty || this.bfEmptyLabel) { // When item selected, show the rendered value on the input
      this.selModelText = value;

      // If rendering html on the list, when selecting an item we need to strip out the html to display it into the input
      if (this.bfHtmlRender) { this.selModelText = value.replace(/<.*?>/g, ''); }

      this.inputText = this.selModelText;
      this.inputPlaceholder = this.selModelText; // Keep it, so when expanding (and clear inputText) still display it

    } else {  // When selecting 'Empty' (with no custom label), leave the input blank
      this.selModelText = '';
      this.inputText = '';
      this.inputPlaceholder = this.renderedPlaceholder;
    }
  }



  isCandidate(item) { return item?.$$idRef === this.bfCandidate?.$$idRef; }
  isSelected(item)  { return item?.$$idRef === this.bfModel?.$$idRef; }

  // Returns extList without the 'Empty' option (if any)
  getLoadedItems() {
    return this.extList ? this.extList.filter(i => i.$$idRef !== this.emptyItem.$$idRef) : [];
  }

  // Returns an object with all internal properties (prefixed with $$) removed
  remove$$(item) {
    if (!item || typeof this.bfModel !== 'object') { return item; }
    return dCopy(BfObject.keyFilter.call(item, (val, key) => key.slice(0,2) !== '$$'));
  }

  generateUniqueId(base: string): string {
    const hexString = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${base}-${hexString}`;
  }

  announceError(message = this.currentErrorMessage) {
    this.currentErrorMessage = message;
    if (this.isInvalid && this.showError) { this.liveAnnouncer.announce(this.translate.doTranslate(message)); }
  }
}
