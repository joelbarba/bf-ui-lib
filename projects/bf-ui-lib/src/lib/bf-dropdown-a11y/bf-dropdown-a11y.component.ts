import {Component, OnInit, Input, Output, forwardRef, ElementRef, EventEmitter} from '@angular/core';
import {OnChanges, OnDestroy,  AfterViewInit, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';
import BfObject from '../bf-prototypes/object.prototype';
import BfArray from '../bf-prototypes/array.prototypes';
import {isObservable, Observable, of, Subject, Subscription} from 'rxjs';
import {BfUILibTransService} from '../abstract-translate.service';
import {dCopy} from '../bf-prototypes/deep-copy';
import {debounceTime} from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';

// The control object (bfOnLoaded) emits
export interface IbfDropdownA11yCtrl {
  expand      ?: { () };
  collapse    ?: { () };
  toggle      ?: { () };
  type        ?: { (value: string) };
  setPristine ?: { () };
  removeError ?: { () };
  addError    ?: { (err) };
}


@Component({
  selector: 'bf-dropdown-a11y',
  templateUrl: './bf-dropdown-a11y.component.html',
  styleUrls: [],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfDropdownA11yComponent),
    },
    {
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfDropdownA11yComponent),
    }
  ]
})
export class BfDropdownA11yComponent implements ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  @Input() bfList: Array<any>;    // List of options (array of objects)
  @Input() bfRender = '';         // How to display every option on the expanded list
  @Input() bfRenderFn;            // Function to be called to render the list items (when bfRender is not enough)
  @Input() bfRenderImg = 'img';   // Field of the object that contains the url of the image to display
  @Input() bfRenderIco = 'icon';  // Field of the object that contains the css class of the icon (icomoon) to display
  @Input() bfSelect = '';         // What fields need to be selected on the model (from the list object)
  @Input() bfRequired: unknown = false; // Whether the model is required (can't be empty)
  @Input() bfDisabled: unknown = false; // Whether the dropdown is disabled
  @Input() bfDisabledTip = '';    // If dropdown disabled, tooltip to display on hover (label)
  @Input() bfOrderBy = '';        // Field (or fields separated by ,). If prefixed by '-', desc order for the field
  @Input() bfGroupBy = '';        // Group the elements of the list by this field

  @Input() bfLabel = '';          // Label to display above the dropdown
  @Input() bfTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() bfTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;  // If tooltip on the label, whether it is appended on the body

  @Input() bfPlaceholder;   // Placeholder to show when no value selected. If bfEmptyLabel, this gets overridden
  @Input() bfEmptyLabel;    // Text of the emptyItem option (no label = 'Empty')
  @Input() bfEmptyValue: any = null;  // By default the empty option sets a "null" value to the ngModel.
                                      // You can add a custom value here to be set when the empty option is selected
  @Input() bfErrorOnPristine = false; // If true, errors will be shown in initial state too (by default pristine shows as valid always)
  @Input() bfErrorPos: 'default' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none' = 'default'; // Position of the error text
  @Input() bfErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() bfCustomPlacementList: 'top' | 'bottom';   // To force the direction the list is expanded.
                                                      // By default this is automatic based on the position on the window
  @Input() bfAutoCollapse = true; // If false, the dropdown does not collapse on focus out

  @Input() bfLoading: boolean | Promise<any> | Observable<boolean>;  // To display the loading animation on the expand button

  @Input() extCtrl$: Observable<unknown>; // To trigger actions manually from an external observable (subject)
  @Input() bfFilterFn: (list: Array<any>, value: string) => Array<any>; // Custom function to perform the list filtering
  @Input() bfKeepSearch = false;  // false = resets the search string every time the list is expanded, removing the previous filter
  @Input() bfHtmlRender = false;   // When true display values can be rendered as html on the list (but not in the input)

  @Input() bfTabIndex = 0;

  // accessibility inputs
  @Input() bfAriaLabel: string;

  @Output() bfOnLoaded = new EventEmitter<IbfDropdownA11yCtrl>();         // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() bfOnListExpanded = new EventEmitter<any>();   // The moment when the list expands (focus in)
  @Output() bfOnListCollapsed = new EventEmitter<any>();  // The moment when the list collapses (select or blur)
  @Output() bfBeforeChange = new EventEmitter<any>();     // The moment before a value is set (selected)
  @Output() bfOnTyping = new EventEmitter<any>();         // When typing into the input


  // --------------


  public ngControl; // Reference to the external formControl
  public bfModel;   // Internal model, to hold the selected object of the list, or empty value

  public isModelEmpty = false;    // Whether the bfModel is holding the empty option
  public selModelText = '';       // Text representation of the selected Model (to display in the input / placeholder)
  public inputPlaceholder = '';   // Text on the input placeholder
  public inputText = '';          // Text on the input (ngModel)
  public extList;     // A copy from bfList to make sure we never modify the input array
  public bfCandidate; // Pointer to a extList item that might be selected next but not yet (hovering / arrow scrolling)

  public isInvalid = false;   // If the model holds an invalid option
  public isExpanded = false;  // Whether the list is shown (true) or hidden
  public isFocus = false;     // Whether the input is focused
  public isLoading = false;   // Whether to show the loading spinner animation on the expand button

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
    $index: 0,
    $label: 'view.common.empty',
    $renderedText: 'Empty',
    $isMatch: true,
    $img: null,
    $icon: null,
    $activeId: '',
  };

  public bfLabelTrans$ = of('');         // Translated text for the label
  public bfTooltipTrans$ = of('');       // Translated text for the tooltip of the label
  public bfDisabledTipTrans$ = of('');   // Translated text for the disabled tooltip
  public errorTextTrans$ = of('');       // Translated text for the error message
  public renderedPlaceholder;   // Translated value of the custom placeholder
  public lastLoadPromise; // Reference to avoid bfLoading promise overlap
  public isBfDisabledPresent = false;  // If [bfDisabled] present, do not change it automatically on bfLoading
  public subs: {[ key: string]: Subscription } = {};  // Subscriptions holder

  private readonly ctrlObject; // Object to expose control methods externally

  public ignoreHover = false; // When scrolling with the arrow keys, ignore mouse hover
  public arrowScroll$ = new Subject();
  public listHeight; // Computed height of the expanded listContainer
  public allRows; // Reference to the optionRows.toArray() html elements array
  public searchTxt = '';
  public bfInputId = this.generateUniqueId('inputId');
  public bfListboxId = this.generateUniqueId('listBoxId');

  private activeDecendent: string;
  private currentErrorMessage: string;

  @ViewChild('dropdownInput', { static: false }) elInput: ElementRef<HTMLInputElement>;
  @ViewChild('listContainer', { static: false }) listContainer: ElementRef<HTMLInputElement>;
  @ViewChildren('optionRow') optionRows;

  constructor(
    private translate: BfUILibTransService,
    private elementRef: ElementRef,
    private liveAnnouncer: LiveAnnouncer
  ) {

    // Rerender the list labels on language change
    this.subs.langSubs = this.translate.onLangChange$.subscribe(() => this.renderExtList());

    // Give the browser .1s to scroll and avoid the mouseenter selecting a different item while using arrows up/down
    this.subs.scrollSub = this.arrowScroll$.pipe(debounceTime(100)).subscribe(() => this.ignoreHover = false);

    // Controller object
    this.ctrlObject = {
      expand      : () => !this.isExpanded && this.deferExpand(),
      collapse    : () => this.isExpanded && this.collapseList(),
      toggle      : () => this.isExpanded ? this.collapseList() : this.deferExpand(),
      setPristine : () => {
        if (this.ngControl) { this.ngControl.markAsPristine(); }
        this.runValidation();
      },
      type        : (value) => {
        setTimeout(() => {
          this.elInput.nativeElement.focus();
          this.inputText = value;
          this.inputType(this.inputText);
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

    // List generation (bfList --> extList)
    if (changing('bfList') || changing('bfOrderBy') || changing('bfGroupBy') || changing('bfRender') || changing('bfRenderFn')) {
      this.generateExtList();

      if (changing('bfList')) { // If the list changes, match the ngModel with the new list
        setTimeout(() => {
          this.matchSelection(this.ngControl ? this.ngControl.value : this.bfModel);
          if (this.bfKeepSearch && this.isExpanded) { setTimeout(() => this.inputText = this.searchTxt); }
          this.ngControl.updateValueAndValidity();
        });
      }
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

    // If values come as strings, convert them
    if (changing('bfRequired')) {
      if (this.bfRequired === 'false') { this.bfRequired = false; }
      if (this.bfRequired === 'true')  { this.bfRequired = true; }
      this.setEmptyOption();
    }

    if (changing('bfPlaceholder')) { this.renderLabels(); }

    if (changing('bfEmptyLabel')) {
      this.emptyItem.$label = this.bfEmptyLabel || 'view.common.empty';
      this.renderLabels();
    }

    // Generate new observables for the dynamic text
    if (changing('bfLabel'))        { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
    if (changing('bfTooltip'))      { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
    if (changing('bfDisabledTip'))  { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }

    if (changing('bfErrorPos')) { this.errorPosition = this.bfErrorPos || 'default'; }
    if (changing('bfErrorText') && this.isInvalid) { this.runValidation(); }
    if (changing('bfErrorOnPristine')) { this.runValidation(); }


    // bfLoading can come in as a 'boolean' or a promise. In this case, we'll automatically manage isLoading
    if (changing('bfLoading')) {
      this.isLoading = false;
      const bfLoading = changes.bfLoading.currentValue;
      if (bfLoading && typeof bfLoading === 'boolean') { this.isLoading = bfLoading; }
      if (bfLoading && typeof bfLoading === 'string')  { this.isLoading = bfLoading !== 'false'; }
      if (bfLoading && typeof bfLoading === 'object' && typeof bfLoading.then === 'function') {
        this.isLoading = true;
        this.lastLoadPromise = bfLoading;
        bfLoading.then(() => {
          if (this.lastLoadPromise === bfLoading) { this.afterLoaded(); }
        }, () => {});
      }

      // In case of bfLoading coming as an observable
      if (bfLoading && isObservable(bfLoading)) {
        this.isLoading = true;
        if (!!this.subs.loading) { this.subs.loading.unsubscribe(); }
        this.subs.loading = bfLoading.subscribe(isLoading => {
            if (isLoading) {
              this.isLoading = true;
              if (!this.isBfDisabledPresent) { this.bfDisabled = true; }
            } else {
              this.afterLoaded();
            }
          },
          () => { this.afterLoaded(); },
          () => { this.afterLoaded(); }
        );
      }

      // Detect when bfLoading finishes (changes from 'true' --> 'false')
      if (changes.bfLoading.previousValue === true && changes.bfLoading.currentValue === false) {
        this.afterLoaded();
      }

      // If no bfDisable, control it automatically, disabling the dropdown while is loading
      if (!this.isBfDisabledPresent) { this.bfDisabled = !!this.bfLoading; }
    }

  }

  ngAfterViewInit() {
    this.bfOnLoaded.emit({ ...this.ctrlObject }); // Expose all control methods
  }

  ngOnDestroy() {
    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }


  // After loading (bfLoading=false), automatically match again the ngModel with the items of the list
  public afterLoaded = () => {
    this.isLoading = false;
    setTimeout(() => {  // Wait until the new [bfList] is loaded, and match the ngModel again
      const value = !!this.ngControl ? this.ngControl.value : this.bfModel;
      this.matchSelection(value);
      this.ngControl.updateValueAndValidity();
      if (!this.isBfDisabledPresent) { this.bfDisabled = false; }
    });
  };


  // Generates the extended list to be used internally (bfList --> extList)
  public generateExtList = () => {
    this.extList = dCopy(this.bfList || []); // Make a copy

    // If bfRender starts with $$$, it's an eval() expression. If not, a single field
    // const renderExpr = (this.bfRender && this.bfRender.slice(0, 3) === '$$$') ? this.bfRender.slice(4) : false;
    // if (renderExpr) { console.warn('bfDropdown - bfRender - Consider using [bfRenderFn] instead of an eval expression'); }
    // itemLabel = eval(renderExpr); // We'll keep this for back compatibility, but better use [bfRenderFn]

    this.extList.forEach((item, ind) => {
      let itemLabel = '';

      if (!!this.bfRender) {
        itemLabel = item.hasOwnProperty(this.bfRender) ? item[this.bfRender] : this.bfRender;  // Display item property / string label

      } else if (!this.bfRenderFn) { // If render function, $label will be calculated later
        itemLabel = Object.values(item).join(', '); // If no rendering defined: Display all props
      }

      item.$label = itemLabel + '';
      item.$index = ind + 1;  // Internal unique index
      item.$isMatch = true;   // filter none by default
      item.$img = item[this.bfRenderImg] || null;
      item.$icon = item[this.bfRenderIco] || null;
      item.$activeId = `${this.bfListboxId}-item-${ind + 1}`; // used to determine aria-activedecendant
    });

    // Order the list
    if (this.bfOrderBy || this.bfGroupBy) {
      const fields = (this.bfOrderBy || '').split(',').map(field => field.trim()).reverse();
      if (this.bfGroupBy) { fields.push(this.bfGroupBy); }  // If grouping, bfGroupBy has to be 1st order
      this.extList = this.extList.sort((itemA, itemB) => {
        let diff = 0;
        fields.forEach(field => {
          if (field.charAt(0) === '-') { field = field.slice(1); }
          const valueA = itemA[field] !== undefined ? itemA[field] : '';
          const valueB = itemB[field] !== undefined ? itemB[field] : '';
          if (valueA < valueB) { diff = -1; }
          if (valueA > valueB) { diff =  1; }
        });
        return diff;
      });
    }

    // Add .$groupHeader to the first item of every group
    if (this.bfGroupBy) {
      let lastHeader = '';
      for (const item of this.extList) {
        if (item[this.bfGroupBy] !== lastHeader) {
          item.$groupHeader = item[this.bfGroupBy];
          lastHeader = item.$groupHeader;
        }
      }
    }

    this.setEmptyOption(); // Set Empty option
    this.renderExtList(); // Set $renderedText

    // set initial active decendant
    if (this.extList[0]) {
      this.setActiveDecendant(this.extList[0].$activeId);
    }
  };

  // Add or remove the "Empty" option to the extList
  public setEmptyOption = () => {
    if (!this.bfRequired) { // If not required, the list should have "Empty" option
      if (!this.extList.find(item => item.$index === this.emptyItem.$index)) {
        this.emptyItem.$renderedText = this.translate.doTranslate(this.emptyItem.$label);
        this.emptyItem.$activeId = `${this.bfListboxId}-item-0`;
        this.extList.unshift(this.emptyItem);  // Add it if not there yet
      }
    } else { // If required, the list shall not have "Empty" option
      BfArray.removeByProp.call(this.extList, '$index', this.emptyItem.$index); // remove empty item
    }

    // Check validity when Empty option is selected
    this.runValidation(); // That might set emptyRequired error
  };

  // Sync translation for the values of the list ($label --> $renderedText)
  public renderExtList = () => {
    if (!!this.extList) {
      this.extList.forEach((item, ind) => {

        if (this.bfRenderFn && typeof this.bfRenderFn === 'function') { // If render function, call it
          item.$renderedText = this.bfRenderFn(item, ind);

        } else {
          const params = {};  // Take as translation params those primitives on the same item
          for (const [key, value] of Object.entries(item)) {
            if (typeof value === 'string' || typeof value === 'number') { params[key] = value; }
          }
          item.$renderedText = this.translate.doTranslate(item.$label, params);

          // It seems that this above is in some cases overkilling??? Is it probably the doTranslate mock?
          // const time = new Date();  console.log(time.getSeconds() + '.' + time.getMilliseconds(), 'translate', item.username);
        }
      });
    }

    this.renderLabels();
  };

  // Update translation for empty options and placeholders
  public renderLabels = () => {
    this.emptyItem.$renderedText = this.translate.doTranslate(this.emptyItem.$label);
    this.renderedPlaceholder = this.translate.doTranslate(this.bfPlaceholder);
    this.setModelText(this.bfModel ? this.bfModel.$renderedText : this.emptyItem.$renderedText);
  };



  // ------- ControlValueAccessor -----

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
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
  public runValidation = () => {
    if (this.ngControl) { this.ngControl.updateValueAndValidity(); } // This triggers NG_VALIDATORS -> validate()
  };

  // NG_VALIDATORS: To determine the <bf-input [ngModel]> formControl status. Triggered:
  //   - After writeValue()
  //   - After propagateModelUp()
  //   - After this.ngControl.updateValueAndValidity()
  public validate = (extFormCtrl: FormControl) => {
    let result = null;  // null is valid
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    this.errors.emptyRequired = !!(this.bfRequired && this.isModelEmpty);
    this.errors.noMatch = !!(!this.isModelEmpty && this.extList.indexOf(this.bfModel) === -1);

    this.isInvalid = !!this.errors.emptyRequired || !!this.errors.noMatch || !!this.errors.manualErr;
    this.showError = this.isInvalid && !this.isLoading && (!this.ngControl.pristine || this.bfErrorOnPristine);

    // Determine the error to display
    if (this.isInvalid) {
      let errLabel = 'view.common.invalid_value';
      if (this.errors.emptyRequired) {
        result = { error: 'required' };
        errLabel = 'view.common.required_field';
      }
      if (this.errors.noMatch) {
        result = { error: 'no match' };
        errLabel = 'view.common.error.invalid_option';
      }

      if (this.errors.manualErr) {
        result = { error: this.errors.manualErr };
        errLabel = this.errors.manualErr;      }

      this.errorTextTrans$ = this.translate.getLabel$(this.bfErrorText || errLabel);
      this.setCurrentErrorText(this.bfErrorText || errLabel);
      this.annouceError();
      if (this.bfErrorText === 'none') { this.errorTextTrans$ = of(''); }
    } else {
      this.liveAnnouncer.clear();
    }

    return result;
  };

  // Focus on input (deferring it to next cycle)
  public deferExpand = () => {
    setTimeout(() => this.elInput.nativeElement.focus());
  };

  // Click on the expand/collapse input button
  public onInputBtnClick = () => {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.elInput.nativeElement.focus();
    }
  };


  // On input focus in -> Expand the select list
  public expandList = () => {
    this.annouceError();
    // If the dropdown is to close to the bottom of the window, expand it upward so the list doesn't fall off
    if (this.elementRef && !this.bfCustomPlacementList) {
      const renderedShadowRect = this.elementRef.nativeElement.getBoundingClientRect();
      this.expandUpward = (window.innerHeight - renderedShadowRect.bottom) < 350;

    } else { // Force the direction the list is expanded towards
      this.expandUpward = this.bfCustomPlacementList === 'top';
    }

    this.bfCandidate = this.bfModel;
    this.isFocus = true;
    this.isExpanded = true;
    this.inputText = this.bfKeepSearch ? this.searchTxt : '';  // Reset the search string
    this.filterList(this.inputText);

    // if we have an existing value update active decendant to that item
    if (this.bfModel) {
      const selectedItem = this.extList.find(this.isSelected.bind(this));
      this.setActiveDecendant(selectedItem.$activeId);
    }

    // If the selected element is down in the list, auto scroll so it's immediately visible
    setTimeout(() => {
      if (this.optionRows && this.listContainer) {
        this.allRows = this.optionRows.toArray();
        this.listHeight = this.listContainer.nativeElement.getBoundingClientRect().height;
        const selectedEl = this.allRows.find(el => this.isActiveDecendant(el.nativeElement.id));
        if (selectedEl) {
          this.setActiveDecendant(selectedEl.nativeElement.id);
          this.scrollItemIntoView(selectedEl);
        }
      }
    });

    this.bfOnListExpanded.emit();
  };

  // On input focus out -> Collapse the select list
  public collapseList = () => {
    if (this.bfAutoCollapse) {
      this.isFocus = false;
      setTimeout(() => {
        this.isExpanded = false;
        this.inputText = this.selModelText; // Take back the selected text
        this.bfOnListCollapsed.emit();
      }, 100);
    }
  };

  // React on key events (on the input)
  public triggerKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.isExpanded = false;
      this.inputText = this.selModelText; // Take back the selected text
      this.bfOnListCollapsed.emit();
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (!this.isExpanded) {
        this.expandList();
      } else {
        const activeItemIndex = this.allRows.findIndex((element) => element.nativeElement.id === this.getActiveDecendant());
        const itemToSelect = this.extList[activeItemIndex];
        this.selectItem(itemToSelect);

        this.isExpanded = false;
        this.bfOnListCollapsed.emit();
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const currentElement = this.getCurrentElement(this.listContainer.nativeElement.children);

      if (currentElement) {
        const selectedElement = this.onNextItemFocused(currentElement);
        this.scrollItemIntoView(selectedElement);
      }
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const currentElement = this.getCurrentElement(this.listContainer.nativeElement.children);

      if (currentElement) {
        const selectedElement = this.onPreviousItemFocused(currentElement);
        this.scrollItemIntoView(selectedElement);
      }
    }
  };

  public inputType = (value) => {
    this.searchTxt = value;
    this.bfOnTyping.emit(value);
    this.filterList(value);
  }

  // Filter the list to display according to the input text
  public filterList = (value) => {
    if (!this.isExpanded) {
      this.expandList();
    }

    if (this.bfFilterFn) {
      const fList = this.bfFilterFn(this.extList, value);
      this.extList.forEach(item => item.$isMatch = !!fList.find(e => e.$index === item.$index));
    } else {
      const patternVal = value.toLowerCase();
      this.extList.forEach(item => {
        item.$isMatch = item.$renderedText && item.$renderedText.toLowerCase().indexOf(patternVal) >= 0;
      });
      this.emptyItem.$isMatch = true; // Fix empty option as always visible
    }

    if (this.bfGroupBy) { // If grouping, hide headers that have no matches
      this.extList.filter(i => !!i.$groupHeader).forEach(item => {
        item.$hideHeader = !this.extList.filter(gi => gi.$isMatch && gi[this.bfGroupBy] === item[this.bfGroupBy]).length;
      });
    }

    if (value.length > 0) {
      const firstElement = this.extList.find(item => item.$isMatch);

      if (firstElement) {
        this.setActiveDecendant(firstElement.$activeId);
      }
    }
  };

  // Given an external object/value, find and select the match on the internal list
  public matchSelection = (value) => {
    let matchItem = null;

    if (value !== null && value !== undefined) {
      if (!!this.bfSelect) {
        if (this.bfSelect.indexOf(',') === -1) {  // Single prop
          matchItem = BfArray.getByProp.call(this.extList, this.bfSelect, value);

        } else { // Multiple prop match
          matchItem = this.extList.filter(item => {
            return !!item.$index && (JSON.stringify(BfObject.keyMap.call(item, this.bfSelect)) === JSON.stringify(value));
          })[0];
        }

      } else {  // Full object match (without $ props)
        matchItem = this.extList.filter(item => {
          const oriItem = dCopy(BfObject.keyFilter.call(item, (val, key) => key.slice(0,1) !== '$'));
          return !!oriItem && BfObject.isEqualTo.call(oriItem, value);
        })[0];
      }
    }

    if (!!value && value !== this.bfEmptyValue && this.extList.indexOf(matchItem) === -1) { // In case of "no match"
      this.bfModel = value;
      this.isModelEmpty = false;
      this.setModelText((typeof value === 'string') ? value : '');  // Show the invalid value (if string)

    } else {
      this.selectItem(matchItem, { value }); // select valid match
    }
  };


  // Select an item from extList to bfModel, and propagate ngModel up
  public selectItem = (selObj, writeValue?) => {

    if (selObj !== this.emptyItem && selObj !== null && selObj !== undefined) {
      this.bfModel = selObj;
      this.isModelEmpty = false;
      this.setModelText(this.bfModel.$renderedText);

    } else {
      this.bfModel = this.emptyItem;
      this.isModelEmpty = true;
      this.setModelText(this.emptyItem.$renderedText);
    }

    let modelUp;  // Object to propagate up (to the formControl of the bf-dropdown)

    if (this.isModelEmpty) {
      modelUp = this.bfEmptyValue; // If empty value selected, return null (or the empty value)

    } else {
      if (!this.bfSelect) {
        // extModel = selObject without $ prefixed props
        const extModel = dCopy(BfObject.keyFilter.call(selObj, (val, key) => key.slice(0,1) !== '$'));

        modelUp = this.bfList.find(item => JSON.stringify(item) === JSON.stringify(extModel));

      } else {
        if (this.bfSelect.indexOf(',') === -1) {
          modelUp = selObj[this.bfSelect];  // Select 1 prop
        } else {
          modelUp = BfObject.keyMap.call(selObj, this.bfSelect); // Select filtered props
        }
      }
    }

    this.bfBeforeChange.emit({
      // currentValue: this.ngControl.value,  // TODO: find a better way
      nextValue: modelUp
    });

    // In case this comes from NG_VALUE_ACCESSOR -> writeValue(), the ngModel is already set (no need to propagate up)
    if (!writeValue || writeValue.value !== modelUp) {
      this.propagateModelUp(modelUp); // This triggers NG_VALIDATORS -> validate()
    }
  };

  // Determine how to display the selected option on the input
  public setModelText = (value) => {
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
  };

  public getOptionId(index): string {
    return `${this.bfListboxId}-item-${index}`;
  }

  public isSelected(item: any): boolean {
    return item === this.bfModel;
  }

  public getActiveDecendant(): string {
    return this.activeDecendent || this.getOptionId(0);
  }

  public isActiveDecendant(id: string): boolean {
    return this.getActiveDecendant() === id;
  }

  private setActiveDecendant(id: string) {
    this.activeDecendent = id;
  }

  private getCurrentElement(options: HTMLCollection): any {
    const currentElement = Array.from(options).find((element) => this.isActiveDecendant(element.id));
    return currentElement;
  }

  private onNextItemFocused(currentElement): HTMLElement {
    const nextElement = currentElement.nextElementSibling;

    if (nextElement) {
      this.setActiveDecendant(nextElement.id);
      return nextElement;
    } else {
      return this.selectFirstListItem();
    }
  }

  private onPreviousItemFocused(currentElement: any): HTMLElement {
    const previousElement = currentElement.previousElementSibling;

    if (previousElement) {
      this.setActiveDecendant(previousElement.id);
      return previousElement;
    } else {
      return this.selectLastListItem();
    }
  }

  private selectFirstListItem(): HTMLElement {
    const firstElement = this.listContainer.nativeElement.children.item(0);
    this.setActiveDecendant(firstElement.id);
    return firstElement as HTMLElement;
  }

  private selectLastListItem(): HTMLElement {
    const listItems = this.listContainer.nativeElement.children;
    const lastElement = listItems.item(listItems.length - 1);
    this.setActiveDecendant(lastElement.id);
    return lastElement as HTMLElement;
  }

  private scrollItemIntoView(selectedElement: HTMLElement): void {
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
    }
  }

  private generateUniqueId(component: string): string {
    const hexString = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${component}-${hexString}`;
  }

  private annouceError() {
    if (this.isInvalid && this.showError) {
      this.liveAnnouncer.announce(this.translate.doTranslate(this.currentErrorMessage));
    }
  }

  private setCurrentErrorText(errorText: string) {
    this.currentErrorMessage = errorText;
  }
}
