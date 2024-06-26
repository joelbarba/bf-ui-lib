import {Component, OnInit, Input, Output, forwardRef, ElementRef, EventEmitter, SimpleChanges} from '@angular/core';
import {OnChanges, OnDestroy,  AfterViewInit, ViewChild, ViewChildren} from '@angular/core';
import {UntypedFormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';
import {isObservable, Observable, of, Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import BfObject from '../bf-prototypes/object.prototype';
import {BfUILibTransService} from '../abstract-translate.service';
import {dCopy} from '../bf-prototypes/deep-copy';
import { IbfDropdownCtrl } from '../bf-dropdown/bf-dropdown.component';
import {isEqualTo} from '../bf-prototypes/deep-equal';
import { generateId } from '../generate-id';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'bf-multi-selector',
  templateUrl: './bf-multi-selector.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfMultiSelectorComponent),
    },
    {
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfMultiSelectorComponent),
    }
  ]
})
export class BfMultiSelectorComponent implements ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
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

  @Input() bfLabel = '';          // Label to display above the dropdown
  @Input() bfTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() bfTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;  // If tooltip on the label, whether it is appended on the body

  @Input() bfPlaceholder;   // Placeholder to show when no value selected
  @Input() bfEmptyValue = [];  // By default the empty option sets a blank array to the ngModel
                                      // You can add a custom value here to be set when the empty option is selected
  @Input() bfErrorOnPristine = false; // If true, errors will be shown in initial state too (by default pristine shows as valid always)
  @Input() bfErrorPos: 'default' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none' = 'default'; // Position of the error text
  @Input() bfErrorText: string;   // Custom error text (label) to display when invalid value
  @Input() bfCustomPlacementList: 'top' | 'bottom';   // To force the direction the list is expanded.
                                                      // By default this is automatic based on the position on the window

  @Input() bfLoading: boolean | Promise<any> | Observable<boolean>;  // To display the loading animation on the expand button

  @Input() extCtrl$: Observable<unknown>; // To trigger actions manually from an external observable (subject)
  @Input() bfFilterFn: (list: Array<any>, value: string) => Array<any>; // Custom function to perform the list filtering
  @Input() bfKeepSearch = false;  // false = resets the search string every time the list is expanded, removing the previous filter
  @Input() bfKeepSelection = false; // retain the selected values if the list changes
  @Input() bfUniqueByProperty: string; // filter the list by this property - if the same item appears in several lists we don't show it if it's already selected

  // accessibility inputs
  @Input() bfTabIndex = 0;
  @Input() bfAriaLabel: string;

  @Output() bfOnLoaded = new EventEmitter<IbfDropdownCtrl>();         // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() bfOnListExpanded = new EventEmitter<any>();   // The moment when the list expands (focus in)
  @Output() bfOnListCollapsed = new EventEmitter<any>();  // The moment when the list collapses (select or blur)
  @Output() bfBeforeChange = new EventEmitter<any>();     // The moment before a value is set (selected)
  @Output() bfOnTyping = new EventEmitter<any>();         // When typing into the input


  // --------------
  public bfInputId = 'inputId-' + generateId();
  public bfListBoxId = 'listBoxId-' + generateId();

  private activeDescendent: string;
  public currentErrorMessage: string;

  public ngControl; // Reference to the external formControl
  public bfModel = [];   // Internal model, to hold the selected objects of the list
  private prevModel;
  private externallyProvidedValueArrLength = -1; // Match lengths of externally provided value array with bfModel

  public inputPlaceholder = '';   // Text on the input placeholder
  public inputText = '';          // Text on the input (ngModel)
  public extList = [];            // A copy from bfList to make sure we never modify the input array
  public visibleExtList = [];     // A copy from extList for managing visible options post selection
  public bfCandidate;             // Pointer to a visibleExtList item that might be selected next but not yet (hovering / arrow scrolling)

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
    $activeId: null
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
  public arrowScroll$ = new Subject<void>();
  public listHeight: number; // Computed height of the expanded listContainer
  public allRows; // Reference to the optionRows.toArray() html elements array
  public searchTxt = '';

  @ViewChild('dropdownInput', { static: false }) elInput: ElementRef<HTMLInputElement>;
  @ViewChild('listContainer', { static: false }) listContainer: ElementRef<HTMLInputElement>;
  @ViewChildren('optionRow') optionRows;

  constructor(
    private translate: BfUILibTransService,
    private htmlEl: ElementRef,
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

  // TODO check here for future bugs
  ngOnChanges(changes: SimpleChanges) {
    const changing = (propName: string) => changes.hasOwnProperty(propName);  // just a shortcut

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
    if (changing('bfList') || changing('bfOrderBy') || changing('bfRender') || changing('bfRenderFn')) {
      this.generateExtList();
      if (changing('bfList')) { // If the list changes, match the ngModel with the new list
        setTimeout(() => {
          if(!this.bfKeepSelection){
            this.matchSelection(this.ngControl ? this.ngControl.value : this.bfModel);
          }
          if (this.bfKeepSearch && this.isExpanded) { setTimeout(() => this.inputText = this.searchTxt); }
          if (this.ngControl) {
            this.ngControl.updateValueAndValidity();
          }
        });
      }
    }

    // In case the selected field changes, reselect the item to set the new ngModel.value
    if (changing('bfSelect') && !!this.bfModel.length && !changes.bfSelect.firstChange) {
      this.manageModels();
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
      this.runValidation();
    }

    if (changing('bfPlaceholder')) { this.renderLabels(); }

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
      if (!!this.ngControl) {
        this.ngControl.updateValueAndValidity();
      }
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
      item.$index = ind;  // Internal unique index
      item.$isMatch = true;   // filter none by default
      item.$img = item[this.bfRenderImg] || null;
      item.$icon = item[this.bfRenderIco] || null;
      item.$activeId = `${this.bfListBoxId}-item-${ind}`; // used to determine aria-activedescendant
    });

    // Order the list
    if (this.bfOrderBy) {
      const fields = this.bfOrderBy.split(',').map(field => field.trim()).reverse();
      this.extList = this.extList.sort((itemA, itemB) => {
        let diff = 0;
        fields.forEach(field => {
          if (field.charAt(0) === '-') {
            if (itemA[field.slice(1)] < itemB[field.slice(1)]) { diff =  1; }
            if (itemA[field.slice(1)] > itemB[field.slice(1)]) { diff = -1; }
          } else {
            if (itemA[field] < itemB[field]) { diff = -1; }
            if (itemA[field] > itemB[field]) { diff =  1; }
          }
        });
        return diff;
      });
    }

    this.renderExtList(); // Set $renderedText

    // set initial active decendant
    if (this.extList[0]) {
      this.setActiveDescendant(this.extList[0].$activeId);
    }
  };

  // Sync translation for the values of the list ($label --> $renderedText)
  public renderExtList = () => {
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

    this.renderLabels();

    this.generateVisibleExtList();
  };

  // Update translation for empty options and placeholders
  public renderLabels = () => {
    this.emptyItem.$renderedText = this.translate.doTranslate(this.emptyItem.$label);
    this.renderedPlaceholder =  !!this.bfModel.length ? '' : this.translate.doTranslate(this.bfPlaceholder);
    this.setModelText();
  };

  // Generate option list with visible options (extList --> visibleExtList)
  public generateVisibleExtList = () => {
    // Filter options list based on the already selected values
    this.visibleExtList = this.extList.filter(item => {
      let isItemNotInSelection;
      if(this.bfKeepSelection){
        // Don't match objects by index if more than one list - items can have the same index so they won't appear in multiple lists
        isItemNotInSelection = !this.bfModel.some(value => item[this.bfUniqueByProperty] === value[this.bfUniqueByProperty]);
      }else {
        isItemNotInSelection = !this.bfModel.some(value => item.$index === value.$index);
      }
      return isItemNotInSelection;
    });
  }

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
      const wasPristine = this.ngControl.pristine; // FIXME pristine not reset on relink (unlike dropdown)

      this.matchSelection(value);

      // External changes shan't turn pristine state (only internals). Set it back if so
      if (wasPristine) { this.ngControl.markAsPristine(); }

      this.externallyProvidedValueArrLength =
        value === null || value === undefined
          ? 0
          : Array.isArray(value)
            ? value.length
            : 1;
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
  public validate = (extFormCtrl: UntypedFormControl) => {
    let result = null;  // null is valid
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    this.errors.emptyRequired = !!(this.bfRequired && !this.bfModel.length);
    this.errors.noMatch = this.externallyProvidedValueArrLength !== -1 && this.externallyProvidedValueArrLength !== this.bfModel.length;
    this.externallyProvidedValueArrLength = -1;

    this.isInvalid = !!this.errors.emptyRequired || !!this.errors.noMatch || !!this.errors.manualErr;
    this.showError = this.isInvalid && !this.isLoading && (!this.ngControl.pristine || this.bfErrorOnPristine);

    // Determine the error to display
    if (this.isInvalid) {
      let errLabel = 'view.common.invalid_value';
      if (this.errors.emptyRequired) { result = { error: 'required' }; errLabel = 'view.common.required_field'; }
      if (this.errors.noMatch)       { result = { error: 'no match' }; errLabel = 'view.common.error.invalid_option'; }
      if (this.errors.manualErr)     { result = { error: this.errors.manualErr }; errLabel = this.errors.manualErr; }

      this.errorTextTrans$ = this.translate.getLabel$(this.bfErrorText || errLabel);
      this.setCurrentErrorText(this.bfErrorText || errLabel);
      this._announceError();
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
    this._announceError();
    // If the dropdown is to close to the bottom of the window, expand it upward so the list doesn't fall off
    if (this.htmlEl && !this.bfCustomPlacementList) {
      const renderedShadowRect = this.htmlEl.nativeElement.getBoundingClientRect();
      this.expandUpward = (window.innerHeight - renderedShadowRect.bottom) < 350;

    } else { // Force the direction the list is expanded towards
      this.expandUpward = this.bfCustomPlacementList === 'top';
    }

    this.bfCandidate = this.visibleExtList[0];
    this.isFocus = true;
    this.isExpanded = true;
    this.inputText = this.bfKeepSearch ? this.searchTxt : '';  // Reset the search string
    this.filterList(this.inputText);

    // If the selected element is down in the list, auto scroll so it's immediately visible
    setTimeout(() => {
      if (this.optionRows && this.listContainer) {
        this.allRows = this.optionRows.toArray();
        this.listHeight = this.listContainer.nativeElement.getBoundingClientRect().height;
        const selectedEl = this.allRows.find(el => el.nativeElement.classList.contains('selected'));
        if (selectedEl) {
          this.setActiveDescendant(selectedEl.nativeElement.id);
          this._scrollItemIntoView(selectedEl.nativeElement);
        }
      }
    });

    this.bfOnListExpanded.emit();
  };

  // On input focus out -> Collapse the select list
  public collapseList = () => {
    this.isFocus = false;
    setTimeout(() => {
      this.isExpanded = false;
      this.inputText = ''; // Take back the selected text
      this.bfOnListCollapsed.emit();
    }, 100);
  };

  // React on key events (on the input)
  public triggerKey = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      this.isExpanded = false;
      this.elInput.nativeElement.blur();
      this.bfOnListCollapsed.emit();
    }

    if (event.code === 'Enter') {
      event.preventDefault();
      if (this.isExpanded) {
        this.selectRow(this.getActiveDescendant());
      } else {
        this.expandList();
      }
    }

    if (event.code === 'ArrowDown') {
      event.preventDefault();
      const currentElement = this._getCurrentElement(this.listContainer.nativeElement.children);
      if (currentElement) {
        const selectedElement = this._onNextItemFocused(currentElement);
        if (this.isExpanded) {
          this._scrollItemIntoView(selectedElement);
        }
      } else {
        this._selectFirstListItem();
      }
    }

    if (event.code === 'ArrowUp') {
      event.preventDefault();
      const currentElement = this._getCurrentElement(this.listContainer.nativeElement.children);
      if (currentElement) {
        const selectedElement = this._onPreviousItemFocused(currentElement);
        if (this.isExpanded) {
          this._scrollItemIntoView(selectedElement);
        }
      } else {
        this._selectLastListItem();
      }
    }
  };

  public inputType = (value: string) => {
    this.searchTxt = value;
    this.bfOnTyping.emit(value);
    this.filterList(value);
  }

  // Filter the list to display according to the input text
  public filterList(value: string) {
    if (this.bfFilterFn) {
      const fList = this.bfFilterFn(this.visibleExtList, value);
      this.visibleExtList.forEach(item => item.$isMatch = !!fList.find(e => e.$index === item.$index));

    } else {
      const patternVal = value.toLowerCase();
      this.visibleExtList.forEach(item => {
        item.$isMatch = item.$renderedText && item.$renderedText.toLowerCase().indexOf(patternVal) >= 0;
      });
      this.emptyItem.$isMatch = true; // Fix empty option as always visible
    }

    if (value.length > 0) {
      const firstElement = this.extList.find(item => item.$isMatch);

      if (firstElement) {
        this.setActiveDescendant(firstElement.$activeId);
      }
    }
  };

  // Given an external object/value array, find and select the matches on the internal list
  public matchSelection = (valueArray: any[]) => {
    if (valueArray === null || valueArray === undefined) {
      valueArray = [];
    }
    if (!Array.isArray(valueArray)) {
      valueArray = [valueArray];
    }
    let matchItems = [];

    if (valueArray.length) {
      if (!!this.bfSelect) {
        if (this.bfSelect.indexOf(',') === -1) {  // Single prop
          valueArray.forEach(value => {
            const matchedItem = this.extList.getByProp(this.bfSelect, value);
            if (matchedItem) {
              matchItems.push(matchedItem);
            }
          });

        } else { // Multiple prop match
          valueArray.forEach(value => {
            const matchedItem = this.extList.find(item => {
              return !!item.$index && (JSON.stringify(BfObject.keyMap.call(item, this.bfSelect)) === JSON.stringify(value));
            });
            if (matchedItem) {
              matchItems.push(matchedItem);
            }
          });
        }

      } else {  // Full object match
        matchItems = this.extList.filter(decoratedValue => {
          const isItemFound = valueArray.some(value => {
            const mainValue = this._getOriginalObject(decoratedValue);
            const isItemSelected = JSON.stringify(value) === JSON.stringify(mainValue);
            return isItemSelected;
          });
          return isItemFound;
        });
      }
    }

    // FIXME does it need a "no-match"? If so, how to implement?
    // Don't clear the model when the list changes if we keep the selected items
    if(!this.bfKeepSelection){
      this.bfModel = [];
    }
    if (matchItems.length) {
      matchItems.forEach(item => this.selectItem(item));
    } else {
      this.manageModels();
    }
  };

  // Select item into the selected list
  public selectItem = (selectedObj: any) => {
    if (selectedObj !== this.emptyItem && selectedObj !== null && selectedObj !== undefined) {
      this.bfModel.push(selectedObj);
    }
    this.manageModels();
  }

  // Remove item from the selected list
  public deselectItem = (selectedObj: any, event?: KeyboardEvent) => {
    if(!!event && (event.code !== 'Enter' && event.code !== 'Space')) return;

    if(!!event) {
      event.preventDefault();
    }

    this.bfModel = this.bfModel.filter(value => value.$index !== selectedObj.$index);
    this.manageModels();
  }

  // Set bfModel, and propagate ngModel up
  public manageModels = () => {
    this.generateExtList();

    let modelUp: any;  // Object to propagate up (to the formControl of the bf-dropdown)

    if (!this.bfModel.length) {
      modelUp = this.bfEmptyValue; // If no values selected, return [] (or the empty value)
    } else {
      // Don't change the model if we're keeping the selection
      if(this.bfKeepSelection){
        modelUp = this.bfModel;
      } else {
        // Filter selected items from bfList and set modelUp
        modelUp = this.bfList.filter(item => {
          const isItemFound = this.bfModel.some(decoratedValue => {
            const mainValue = this._getOriginalObject(decoratedValue);
            const isItemSelected = JSON.stringify(item) === JSON.stringify(mainValue);
            return isItemSelected;
          });
          return isItemFound;
        });
      }

      // In case only particular props have to be selected from the option objects
      if (this.bfSelect) {
        if (this.bfSelect.indexOf(',') === -1) {
          // Select 1 prop
          modelUp = modelUp.map((item: any) => item[this.bfSelect]);
        } else {
          // Select filtered props
          modelUp = modelUp.map((item: any) => BfObject.keyMap.call(item, this.bfSelect));
        }
      }
    }

    // console.log(new Date(), 'propagateModelUp', selModel);
    this.bfBeforeChange.emit({
      // currentValue: this.ngControl.value,  // TODO: find a better way (maintain same in bf-dropdown)
      nextValue: modelUp
    });

    // TODO check if the removed condition in this commit was absolutely necessary
    if (!isEqualTo(this.prevModel, modelUp)) {
      this.propagateModelUp(modelUp); // This triggers NG_VALIDATORS -> validate()
      this.prevModel = modelUp;
    }

  };

  public selectRow = (rowId: string) => {
    if(this.bfModel.getByProp('$activeId', rowId)) return;
    const item = this.extList.getByProp('$activeId', rowId);
    this.selectItem(item);
    this.isExpanded = false;
    this.bfOnListCollapsed.emit();
  }

  // Determine how to display the selected option on the input
  public setModelText = () => {
    this.inputText = '';
    this.inputPlaceholder = this.renderedPlaceholder;
  };

  public getOptionId(index: number): string {
    return `${this.bfListBoxId}-item-${index}`;
  }

  public getActiveDescendant(): string {
    return this.activeDescendent || this.getOptionId(0);
  }

  public isActiveDescendant(id: string): boolean {
    return this.getActiveDescendant() === id;
  }

  public setItemActive(event: MouseEvent) {
    let activeId = null;
    if (!!event) {
      activeId = (event.target as HTMLElement).getAttribute('id');
    }
    this.setActiveDescendant(activeId);
  }

  public setActiveDescendant(id: string) {
    this.activeDescendent = id;
  }

  public setCurrentErrorText(errorText: string) {
    this.currentErrorMessage = errorText;
  }

  public isSelected(item: any): boolean {
    return item === this.bfModel;
  }

  private _scrollItemIntoView(selectedElement: HTMLElement): void {
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

  private _getCurrentElement(options: HTMLCollection): Element | null {
    return Array.from(options).find((element) => this.isActiveDescendant(element.id));
  }

  private _announceError() {
    if (this.isInvalid && this.showError) {
      this.liveAnnouncer.announce(this.translate.doTranslate(this.currentErrorMessage));
    }
  }

  private _onNextItemFocused(currentElement: Element): HTMLElement {
    const nextElement = currentElement.nextElementSibling;

    if (nextElement) {
      this.setActiveDescendant(nextElement.id);
      return nextElement as HTMLElement;
    } else {
      return this._selectFirstListItem();
    }
  }

  private _onPreviousItemFocused(currentElement: Element): HTMLElement {
    const previousElement = currentElement.previousElementSibling;

    if (previousElement) {
      this.setActiveDescendant(previousElement.id);
      return previousElement as HTMLElement;
    } else {
      return this._selectLastListItem();
    }
  }

  private _selectFirstListItem(): HTMLElement {
    const firstElement = this.listContainer.nativeElement.children.item(0);
    this.setActiveDescendant(firstElement.id);
    return firstElement as HTMLElement;
  }

  private _selectLastListItem(): HTMLElement {
    const listItems = this.listContainer.nativeElement.children;
    const lastElement = listItems.item(listItems.length - 1);
    this.setActiveDescendant(lastElement.id);
    return lastElement as HTMLElement;
  }

  private _getOriginalObject(item) {
    const { $index, $label, $renderedText, $isMatch, $img, $icon, $activeId, ...mainValue } = item;
    return mainValue;
  }

}
