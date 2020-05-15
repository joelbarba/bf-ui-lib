import {
  Component,
  OnInit,
  Input,
  Output,
  forwardRef,
  OnChanges,
  ViewChild,
  ElementRef,
  OnDestroy, EventEmitter, AfterViewInit
} from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import BfObject from '../bf-prototypes/object.prototype';
import BfArray from '../bf-prototypes/array.prototypes';
import {Observable, of} from 'rxjs';
import { BfUILibTransService} from '../abstract-translate.service';
import {BfDefer} from "../bf-defer/bf-defer";
import {dCopy} from "../bf-prototypes/deep-copy";


/****
 *  ATTRIBUTES

 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | *ngModel            | Where the selected object of the list is held                                      |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | *bfList             | The list of the options (array of object)                                          |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfRender            | Field to display on the list (property from bfList items)                          |
 * |        |                     | It can also be an eval() expression. Start with a '$$$' and use $item reference:   |                                              |
 * |        |                     | bfRender="$$$ $item.first_name + ' ' + $item.last_name"                            |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfSelect            | Select one or more fields of the selected object (keyMap syntax) of the list       |
 * |        |                     | to set it into the ngModel. If only one selected field, no object wrap             |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfRequired          | Whether the input is required or not                                               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | bfDisabled          | Disable the input                                                                  |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfLabel             | If present it adds a label above the input                                         |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfPlaceholder       | The placeholder of the input field                                                 |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | onItemSelected      | Callback - Called when the user select a value from the list, the value is passed  |
 * |        |                     | as parameter                                                                       |
 * |        |                     |                                                                                    |
 * |        |                     | Params                                                                             |
 * |        |                     | - $item                                                                            |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | customEmptyText     | Replace the default text of the empty option                                       |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | customEmptyVal      | Replace the default empty value (ONLY STRING ALLOWED IN THIS VERSION)              |
 *
 *
 *

 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfOrderBy           | The field to order the list                                                        |
 * |--------|----------------------------------------------------------------------------------------------------------|


 * | @      | groupBy             |  group the list by one field of the objects                                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | email               | Require email validation                                                           |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | orderReverse        | Reverse the ordering                                                               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | customMainIcon      | Replace the default lens icon with a custom one, specify the classes               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | customIcon          | Replace the default lens icon with a custom one, specify the classes               |
 * |        |                     | (FOR CUSTOM BUTTON)                                                                |

 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | customPlacementList | The current dropdown list is displaying the list according to the screen size      |
 * |        |                     | This parameter will display the dropdown list just to one side                     |
 * |        |                     | Allowed placement:                                                                 |
 * |        |                     | -     top                                                                          |
 * |        |                     | -     bottom                                                                       |
 * |--------|---------------------|------------------------------------------------------------------------------------|



 * | &      | lazyLoad            | Function to retrieve the list lazy loaded list, MUST return a promise              |
 * |        |                     |                                                                                    |
 * |        |                     | Params                                                                             |
 * |        |                     | - $search                                                                          |
 * |        |                     |                                                                                    |
 * |        |                     |  REQUIRED if you do not provide list                                               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | minSearchLength     |  The min length to start a search and open the list, values > 0 will hide the      |
 * |        |                     |  search button                                                                     |
 * |        |                     |  DEFAULT 0                                                                         |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | ngRequired          |  you can specify if the input is required or not by expression                     |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | resultsNumber       | if true, returns all instances in the list, without checking if they closely match.|
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | noCloseOnClick      | (only in the multiselect version)                                                  |
 * |        |                     | Prevent the close of the list if you select an item                                |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | bfPopupTemplate     | The template of the bfPopupSelector, see bfPopupSelector and bfPopupSelectorTable  |
 * |        |                     | documentation                                                                      |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | customAction        | Callback - custom action, replaces the default reset                               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | customDisable       | Enable/disable custom button                                                       |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | afterInit           | Callback - called when the list is prepared, you receive the prepared list as      |
 * |        |                     | paramater                                                                          |
 * |        |                     |                                                                                    |
 * |        |                     | Params                                                                             |
 * |        |                     | - $itemList                                                                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | onFocus             | Callback - called when the focus event is fired on the input search element        |
 * |        |                     |                                                                                    |
 * |        |                     | Params                                                                             |
 * |        |                     | - $itemList                                                                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | onItemRemoved       | (only in the multiselect version)                                                  |
 * |        |                     | Callback - Called when the user removes a items from the multiselect list          |
 * |        |                     |                                                                                    |
 * |        |                     | Params                                                                             |
 * |        |                     | - $item                                                                            |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | onReset             | Callback - Called when the lens is clicked and the form is resetted                |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | onBlur              | Callback - Called when the blur event is fired on the input search element         |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | generateImageLink   | Callback - Called for generate an image link (put on the right of the element)     |
 * |        |                     | You must return a string with the link of the image, you receive in input the      |
 * |        |                     | item for the row                                                                   |
 * |        |                     |                                                                                    |
 * |        |                     | Params                                                                             |
 * |        |                     | - $item                                                                            |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | generateIconClass   | Callback - Called for generate an image icon classes (put on the right of the      |
 * |        |                     | element). You must return a string with the link of the image, you receive in      |
 * |        |                     | input the item for the row                                                         |
 * |        |                     |                                                                                    |
 * |        |                     | Params                                                                             |
 * |        |                     | - $item                                                                            |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | <      | loading             | Boolean - control the spinner from outside                                         |
 * |        |                     | IMPORTANT: you can use this only if the bfdropdown is not lazyloaded               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | <      | eventListenerName   | String - If provided, bfdropdown listens to an event with the name                 |
 * |        |                     | "bfdropdown:[eventListenerName]", so we can control some of its actions outside.   |
 * |        |                     | The paramater must be an object with the property "action". Depending on that      |
 * |        |                     | the event will trigger the corresponding internal function:                        |
 * |        |                     |   - toggleList : Expand / collapse the list                                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
*****/

@Component({
  selector: 'bf-dropdown',
  templateUrl: './bf-dropdown.component.html',
  styleUrls: [],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfDropdownComponent),
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfDropdownComponent),
    }
  ]
})
export class BfDropdownComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() bfList: Array<any>;    // List of options (array of objects)
  @Input() bfRender = '';         // How to display every option on the expanded list
  @Input() bfRenderFn;            // Function to be called to render the list items (when bfRender is not enough)
  @Input() bfRenderImg = 'img';   // Field of the object that contains the url of the image to display
  @Input() bfRenderIco = 'icon';  // Field of the object that contains the css class of the icon (icomoon) to display
  @Input() bfSelect = '';         // What fields need to be selected on the model (from the list object)
  @Input() bfRequired: unknown = false; // Whether the model is required (can't be empty)
  @Input() bfDisabled: unknown = false; // Whether the dropdown is disabled
  @Input() bfDisabledTip = '';    // If dropdown disabled, tooltip to display on hover (label)

  @Input() bfLabel = '';          // Label to display above the dropdown
  @Input() bfTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() bfTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;  // If tooltip on the label, whether it is appened on the body

  @Input() bfPlaceholder;   // Placeholder to show when no value selected. If bfEmptyLabel, this gets overridden
  @Input() bfEmptyLabel;    // Text of the emptyItem option (no label = 'Empty')
  @Input() bfEmptyValue: any = null;  // By default the empty option sets a "null" value to the ngModel.
                                      // You can add a custom value here to be set when the empty option is selected
  @Input() bfErrorOnPristine = false; // If true, errors will be shown in initial state too (by default pristine shows as valid always)
  @Input() bfErrorPos = 'top-right';  // top-right, bottom-left, bottom-right
  @Input() bfErrorText: string;   // Custom error text (label) to display when invalid value

  @Input() bfLoading: boolean | Promise<any>;  // To display the loading animation on the expand button

  @Input() extCtrl$: Observable<any>; // To trigger actions manually from an external observable (subject)

  @Output() bfOnLoaded = new EventEmitter<any>();     // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() bfBeforeChange = new EventEmitter<any>(); // Emitter to catch the next value before it is set


  // --------------


  public ngControl;  // Reference to the external formControl

  public bfModel; // <--- internal ngModel
  public isModelEmpty = false;    // Whether the bfModel is holding the empty option
  public selModelText = '';       // Text representation of the selected Model (to display in the input / placeholder)
  public inputPlaceholder = '';   // Text on the input placeholder
  public inputText = '';          // Text on the input (ngModel)
  public extList; // Make a copy from bfList to make sure we never modify the input array

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

  // Empty option item (in extList)
  public emptyItem = {
    $index: 0,
    $label: 'view.common.empty',
    $renderedText: 'Empty',
    $isMatch: true,
    $img: null,
    $icon: null,
  };

  public bfLabelTrans$ = of('');         // Translated text for the label
  public bfTooltipTrans$ = of('');       // Translated text for the tooltip of the label
  public bfDisabledTipTrans$ = of('');   // Translated text for the disabled tooltip
  public errorTextTrans$ = of('');       // Translated text for the error message
  public renderedPlaceholder;   // Translated value of the custom placeholder
  public langSubs;  // Subscription to language changes
  public ctrlSubs;  // Subscription to external control observable
  public lastLoadPromise; // Reference to avoid bfLoading promise overlap

  private readonly ctrlObject; // Hold an object with the input controller and the action methods
  private inputCtrlDefer = new BfDefer();  // This is resolved once inputCtrl is initialized


  @ViewChild('dropdownInput', { static: false }) elInput: ElementRef<HTMLInputElement>;

  constructor(
    private translate: BfUILibTransService,
  ) {
    console.log(new Date(), 'constructor');
    // Rerender the list labels on language change
    this.langSubs = this.translate.onLangChange$.subscribe(() => {
      console.log(new Date(), 'translate.onLangChange$');
      this.renderExtList();
    });

    // const updateCtrl = () => { if (this.ngControl) { this.ngControl.updateValueAndValidity(); }};
    // this.ctrlObject = {
    //   setFocus    : () => this.elementRef.nativeElement.querySelector('input').focus({ preventScroll: false }),
    //   setBlur     : () => this.elementRef.nativeElement.querySelector('input').blur(),
    //   setDirty    : (opts?) => { this.inputCtrl.markAsDirty(opts); updateCtrl(); },
    //   setPristine : (opts?) => { this.inputCtrl.markAsPristine(opts); updateCtrl(); },
    //   refresh     : () => updateCtrl(),
    //   removeError : ()      => {
    //     if (this.manualError !== null) { this.manualError = null; updateCtrl(); }
    //   },
    //   addError : (err)   => {
    //     if (JSON.stringify(this.manualError) !== JSON.stringify(err)) { this.manualError = err; updateCtrl(); }
    //   },
    // };
  }

  ngOnChanges(changes) {
    console.log(new Date(), 'ngOnChanges', changes);

    const changing = (prop) => changes.hasOwnProperty(prop);  // just a shortcut

    // External control via extCtrl$
    if (changing('extCtrl$')) {
      if (!!this.ctrlSubs) { this.ctrlSubs.unsubscribe(); }
      this.ctrlSubs = this.extCtrl$.subscribe((option: { action: string, value?: any }) => {
        console.log(new Date(), 'bf-dropdown --> extCtrl$');
        if (option.action === 'expand' && !this.isExpanded)  { this.deferExpand(); }
        if (option.action === 'collapse' && this.isExpanded) { this.collapseList(); }
        if (option.action === 'toggle') { this.isExpanded ? this.collapseList() : this.deferExpand(); }
        if (option.action === 'type') {
          setTimeout(() => {
            this.elInput.nativeElement.focus();
            this.inputText = option.value;
            this.filterList(this.inputText);
          }, 100);
        }
        if (option.action === 'addError') {
          if (JSON.stringify(this.errors.manualErr) !== JSON.stringify(option.value)) {
            this.errors.manualErr = option.value;
            this.runValidation(1);
          }
        }
        if (option.action === 'removeError') {
          if (this.errors.manualErr !== null) {
            this.errors.manualErr = null;
            this.runValidation(2);
          }
        }
      });
    }

    // List generation (bfList --> extList)
    if (changing('bfList') || changing('bfRender') || changing('bfRenderFn')) {
      this.generateExtList();
    }

    // In case the selected field changes, reselect the item to set the new ngModel.value
    if (changing('bfSelect') && !this.isModelEmpty && !changes.bfSelect.firstChange) {
      this.selectItem(this.bfModel);
    }

    // If values come as strings, convert them
    if (changing('bfDisabled')) {
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
    if (changing('bfErrorText') && this.isInvalid) { this.runValidation(3); }


    // bfLoading can come in as a 'boolean' or a promise. In this case, we'll automatically manage isLoading
    if (changing('bfLoading')) {
      this.isLoading = false;
      const bfLoading = changes.bfLoading.currentValue;
      if (bfLoading && typeof bfLoading === 'boolean') { this.isLoading = bfLoading; }
      if (bfLoading && typeof bfLoading === 'object' && typeof bfLoading.then === 'function') {
        this.isLoading = true;
        this.lastLoadPromise = bfLoading;
        bfLoading.then(() => {
          if (this.lastLoadPromise === bfLoading) { this.isLoading = false; }
        }, () => {});
      }
    }


  }

  ngOnInit() {}

  // ngAfterContentInit() { }

  ngAfterViewInit() {
    this.bfOnLoaded.emit({});
  }

  ngOnDestroy() {
    console.log(new Date(), 'ngOnDestroy');
    if (!!this.langSubs) { this.langSubs.unsubscribe(); }
    if (!!this.ctrlSubs) { this.ctrlSubs.unsubscribe(); }
  }



  // Generates the extended list to be used internally (bfList --> extList)
  public generateExtList = () => {
    console.log(new Date(), 'generateExtList');
    this.extList = dCopy(this.bfList || []); // Make a copy

    // If bfRender starts with $$$, it's an eval() expression. If not, a single field
    // const renderExpr = (this.bfRender && this.bfRender.slice(0, 3) === '$$$') ? this.bfRender.slice(4) : false;
    // if (renderExpr) { console.warn('bfDropdown - bfRender - Consider using [bfRenderFn] instead of an eval expression'); }
    // itemLabel = eval(renderExpr); // We'll keep this for back compatibility, but better use [bfRenderFn]

    this.extList.forEach(($item, ind) => {
      let itemLabel = '';

      if (!!this.bfRender) {
        itemLabel = $item[this.bfRender] || this.bfRender;  // Display item property / string label

      } else if (!this.bfRenderFn) { // If render function, $label will be calculated later
        itemLabel = Object.keys($item).join(', '); // If no rendering defined: Display all props
      }

      $item.$label = itemLabel + '';
      $item.$index = ind + 1;  // Internal unique index
      $item.$isMatch = true;   // filter none by default
      $item.$img = $item[this.bfRenderImg] || null;
      $item.$icon = $item[this.bfRenderIco] || null;
    });

    this.setEmptyOption(); // Set Empty option
    this.renderExtList(); // Set $renderedText
  };

  // Add or remove the "Empty" option to the extList
  public setEmptyOption = () => {
    console.log(new Date(), 'setEmptyOption');
    if (!this.bfRequired) { // If not required, the list should have "Empty" option
      if (!this.extList.find(item => item.$index === this.emptyItem.$index)) {
        this.emptyItem.$renderedText = this.translate.doTranslate(this.emptyItem.$label);
        this.extList.unshift(this.emptyItem);  // Add it if not there yet
      }
    } else { // If required, the list shall not have "Empty" option
      BfArray.removeByProp.call(this.extList, '$index', this.emptyItem.$index); // remove empty item
    }

    // Check validity when Empty option is selected
    this.runValidation(4); // That might set emptyRequired error
  };

  // Sync translation for the values of the list ($label --> $renderedText)
  public renderExtList = () => {
    console.log(new Date(), 'renderExtList', this.extList ? this.extList.length : '0');
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
    console.log(new Date(), 'writeValue -> ', value);
    if (this.ngControl) { // Ignore first trigger before ngAfterViewInit
      const wasPristine = this.ngControl.pristine;

      this.matchSelection(value);

      // External changes shan't turn pristine state (only internals). Set it back if so
      if (wasPristine) { this.ngControl.markAsPristine(); }
    }
  }


  public runValidation = (num) => {
    if (this.ngControl) {
      console.log(new Date(), 'runValidation(', num, ')', this.errors);
      this.ngControl.updateValueAndValidity();
    } // This triggers NG_VALIDATORS -> validate()
  };

  // NG_VALIDATORS: To determine the <bf-input [ngModel]> formControl status. Triggered:
  //   - After writeValue()
  //   - After propagateModelUp()
  //   - After this.ngControl.updateValueAndValidity()
  public validate = (extFormCtrl: FormControl) => {
    console.log(new Date(), 'validate');
    let result = null;  // null is valid
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    this.errors.emptyRequired = !!(this.bfRequired && this.isModelEmpty);
    this.errors.noMatch = !!(!this.isModelEmpty && this.extList.indexOf(this.bfModel) === -1);

    this.isInvalid = !!this.errors.emptyRequired || !!this.errors.noMatch || !!this.errors.manualErr;
    this.showError = this.isInvalid && (!this.ngControl.pristine || this.bfErrorOnPristine);

    // Determine the error to display
    if (this.isInvalid) {
      let errLabel = 'view.common.invalid_value';
      if (this.errors.emptyRequired) { result = { error: 'required' }; errLabel = 'view.common.required_field'; }
      if (this.errors.noMatch)       { result = { error: 'no match' }; errLabel = 'view.common.error.invalid_option'; }
      if (this.errors.manualErr)     { result = { error: this.errors.manualErr }; errLabel = this.errors.manualErr; }

      this.errorTextTrans$ = this.translate.getLabel$(this.bfErrorText || errLabel);
      if (this.bfErrorText === 'none') { this.errorTextTrans$ = of(''); }
    }

    return result;
  };

  // ------------------------------------





  // Focus on input (deferring it to next cycle)
  public deferExpand = () => {
    console.log(new Date(), 'deferExpand');
    setTimeout(() => this.elInput.nativeElement.focus());
  };

  // Click on the expand/collapse input button
  public onInputBtnClick = () => {
    console.log(new Date(), 'onInputBtnClick');
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.elInput.nativeElement.focus();
    }
  };


  // On input focus in -> Expand the select list
  public expandList = () => {
    console.log(new Date(), 'expandList: focus in - expand');
    this.isFocus = true;
    this.isExpanded = true;
    this.inputText = '';  // Clear the text to work as a filter
    this.filterList('');
  };

  // On input focus out -> Collapse the select list
  public collapseList = () => {
    console.log(new Date(), 'collapseList: focus out - collapse');
    this.isFocus = false;
    setTimeout(() => {
      this.isExpanded = false;
      this.inputText = this.selModelText; // Take back the selected text
    }, 100);
  };


  // React on key events (on the input)
  public triggerKey = (event) => {
    console.log(new Date(), 'triggerKey');
    if (event.key === 'Escape' && this.isExpanded) { this.elInput.nativeElement.blur(); } // make it lose the focus

    // Use bfModel as a temporary pointer to the highlighted item on the list while moving up/down with arrows
    const visibleList = this.extList.filter(item => item.$isMatch);
    const ind = visibleList.indexOf(this.bfModel);

    if (event.key === 'ArrowDown') {
      const nextInd = (ind >= 0 && ind < visibleList.length - 1) ? ind + 1 : 0;
      this.bfModel = visibleList[nextInd];
    }
    if (event.key === 'ArrowUp') {
      const nextInd = (ind > 0) ? ind - 1 : visibleList.length - 1;
      this.bfModel = visibleList[nextInd];
    }

    if (event.key === 'Enter') {
      this.selectItem(this.bfModel);
      this.elInput.nativeElement.blur();
    }
  };


  // Filter the list to display according to the input text
  public filterList = (value) => {
    console.log(new Date(), 'filterList');
    const patternVal = value.toLowerCase();
    this.extList.forEach(item => {
      item.$isMatch = item.$renderedText && item.$renderedText.toLowerCase().indexOf(patternVal) >= 0;
    });
    this.emptyItem.$isMatch = true; // Fix empty option as always visible
  };


  // Given an external object/value, find and select the match on the internal list
  public matchSelection = (value) => {
    console.log(new Date(), 'matchSelection');
    let matchItem = null;

    if (value !== null && value !== undefined) {
      if (!!this.bfSelect) {
        if (this.bfSelect.indexOf(',') === -1) {  // Single prop
          matchItem = this.extList.getByProp(this.bfSelect, value);

        } else { // Multiple prop match
          matchItem = this.extList.filter(item => {
            return !!item.$index && (JSON.stringify(BfObject.keyMap.call(item, this.bfSelect)) === JSON.stringify(value));
          })[0];
        }

      } else {  // Full object match
        matchItem = this.extList.filter(item => {
          const oriItem = dCopy(item);
          delete oriItem.$index;
          delete oriItem.$label;
          delete oriItem.$renderedText;
          delete oriItem.$isMatch;
          delete oriItem.$img;
          delete oriItem.$icon;


          // Stringify comparison is quite bad. TODO: Add a better object compare here
          // Ideas:
          // https://lodash.com/docs/4.17.11#isEqual
          // https://www.npmjs.com/package/is-equal
          // https://www.npmjs.com/package/fast-equals
          return !!oriItem && (JSON.stringify(oriItem) === JSON.stringify(value));
        })[0];
      }
    }

    if (!!value && this.extList.indexOf(matchItem) === -1) { // In case of "no match"
      this.bfModel = value;
      this.isModelEmpty = false;
      this.setModelText((typeof value === 'string') ? value : '');  // Show the invalid value (if string)

    } else {
      this.selectItem(matchItem, { value }); // select valid match
    }
  };


  // Select an item from extList to bfModel, and propagate ngModel up
  public selectItem = (selObj, writeValue?) => {
    console.log(new Date(), 'selectItem', selObj);

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
        const extModel = dCopy(selObj);  // Select full object
        delete extModel.$index;
        delete extModel.$label;
        delete extModel.$renderedText;
        delete extModel.$isMatch;
        delete extModel.$img;
        delete extModel.$icon;
        modelUp = this.bfList.find(item => JSON.stringify(item) === JSON.stringify(extModel));

      } else {
        if (this.bfSelect.indexOf(',') === -1) {
          modelUp = selObj[this.bfSelect];  // Select 1 prop
        } else {
          modelUp = BfObject.keyMap.call(selObj, this.bfSelect); // Select filtered props
        }
      }
    }

    // console.log(new Date(), 'propagateModelUp', selModel);
    this.bfBeforeChange.emit({
      // currentValue: this.ngControl.value,  // TODO: find a better way
      nextValue: modelUp
    });

    // In case this comes from NG_VALUE_ACCESSOR -> writeValue(), the ngModel is already set (no need to propagate up)
    if (!writeValue || writeValue.value !== modelUp) {
      if (writeValue) { console.warn(new Date(), 'NG_VALUE_ACCESSOR updated: ', writeValue.value, ' --> ', modelUp); }
      console.warn(new Date(), 'propagateModelUp', modelUp);

      this.propagateModelUp(modelUp); // This triggers NG_VALIDATORS -> validate()
    }

  };


  // Determine how to display the selected option on the input
  public setModelText = (value) => {
    if (!this.isModelEmpty || this.bfEmptyLabel) { // When item selected, show the rendered value on the input
      this.selModelText = value;
      this.inputText = this.selModelText;
      this.inputPlaceholder = this.selModelText; // Keep it, so when expanding (and clear inputText) still display it

    } else {  // When selecting 'Empty' (with no custom label), leave the input blank
      this.selModelText = '';
      this.inputText = '';
      this.inputPlaceholder = this.renderedPlaceholder;
    }
  };

}
