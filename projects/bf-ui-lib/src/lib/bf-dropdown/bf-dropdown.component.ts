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
  @Input() bfSelect = '';         // What fields need to be selected on the model (from the list object)
  @Input() bfRequired: unknown = false; // Whether the model is required (can't be empty)
  @Input() bfDisabled: unknown = false; // Whether the dropdown is disabled
  @Input() bfDisabledTip = '';    // If dropdown disabled, tooltip to display on hover (label)
  @Input() bfRenderImg = 'img';   // Field of the object that contains the url of the image to display
  @Input() bfRenderIco = 'icon';  // Field of the object that contains the css class of the icon (icomoon) to display

  @Input() bfLabel = '';          // Label to display above the dropdown
  @Input() bfTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() bfTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;  // If tooltip on the label, whether it is appened on the body

  @Input() bfEmptyLabel = 'view.common.empty';   // Label for the text of the emptyItem (when not required)
  @Input() bfEmptyValue: any = null;  // By default the empty option sets a "null" value to the ngModel.
                                      // You can add a custom value here to be set when the empty option is selected
  @Input() bfErrorOnPristine = false; // If true, errors will be shown in initial state too (by default pristine shows as valid always)

  @Input() extCtrl$: Observable<any>; // To trigger actions manually from an external observable (subject)

  @Output() bfOnLoaded = new EventEmitter<any>();     // Emitter to catch the moment when the component is ready (ngAfterViewInit)
  @Output() bfBeforeChange = new EventEmitter<any>(); // Emitter to catch the next value before it is set


  // --------------


  public ngControl;  // Reference to the external formControl

  public bfModel; // <--- internal ngModel
  public isModelEmpty = false;  // Whether the bfModel is holding the empty option
  public selModelText = '';  // Text representation of the selected Model (to display in the input / placeholder)
  public inputText = '';     // Text on the input (ngModel)
  public extList; // Make a copy from bfList to make sure we never modify the input array

  public isInvalid = false;   // If the model holds an invalid option
  public isExpanded = false;  // Whether the list is shown (true) or hidden
  public isFocus = false;     // Whether the input is focused

  // Empty option item (in extList)
  public emptyItem = {
    $index: 0,
    $label: 'view.common.empty',
    $renderedText: 'Empty',
    $isMatch: true,
    $img: null,
    $icon: null,
  };

  public bfLabelTrans$: Observable<string> = of('');         // Translated text for the label
  public bfTooltipTrans$: Observable<string> = of('');       // Translated text for the tooltip of the label
  public bfDisabledTipTrans$: Observable<string> = of('');   // Translated text for the disabled tooltip
  public langSubs;  // Subscription to language changes
  public ctrlSubs;  // Subscription to external control observable

  @ViewChild('dropdownInput', { static: false }) elInput: ElementRef<HTMLInputElement>;

  constructor(
    private translate: BfUILibTransService,
  ) {

    // Rerender the list labels on language change
    this.langSubs = this.translate.onLangChange$.subscribe(this.translateExtList);

  }

  ngOnChanges(changes) {

    // External control via extCtrl$
    if (changes.hasOwnProperty('extCtrl$')) {
      if (!!this.ctrlSubs) { this.ctrlSubs.unsubscribe(); }
      this.extCtrl$.subscribe((option: { action: string, value?: any }) => {
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
      });
    }

    // List generation
    if (!!changes.bfList) { this.generateExtList(); } // (bfList --> extList)

    // If values come as strings, convert them
    if (changes.hasOwnProperty('bfDisabled')) {
      if (this.bfDisabled === 'false') { this.bfDisabled = false; }
      if (this.bfDisabled === 'true')  { this.bfDisabled = true; }
    }

    // If values come as strings, convert them
    if (changes.hasOwnProperty('bfRequired')) {
      if (this.bfRequired === 'false') { this.bfRequired = false; }
      if (this.bfRequired === 'true')  { this.bfRequired = true; }
      this.toggleEmptyOption();
    }

    if (changes.hasOwnProperty('bfEmptyLabel')) {
      this.emptyItem.$label = this.bfEmptyLabel;
      this.translateExtList();
    }

    // Generate new observables for the dynamic text
    if (changes.hasOwnProperty('bfLabel'))        { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
    if (changes.hasOwnProperty('bfTooltip'))      { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
    if (changes.hasOwnProperty('bfDisabledTip'))  { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }
    // if (changes.hasOwnProperty('bfPlaceholder'))  { this.bfPlaceholderTrans$ = this.translate.getLabel$(this.bfPlaceholder); }

  }

  ngOnInit() { }

  // ngAfterContentInit() { }

  ngAfterViewInit() {
    this.bfOnLoaded.emit({});
  }

  ngOnDestroy() {
    if (!!this.langSubs) { this.langSubs.unsubscribe(); }
    if (!!this.ctrlSubs) { this.ctrlSubs.unsubscribe(); }
  }



  // Generates the extended list to be used internally (bfList --> extList)
  public generateExtList = () => {
    this.extList = BfArray.dCopy.call(this.bfList || []); // Make a copy

    // If bfRender starts with $$$, it's an eval() expression. If not, a single field
    const renderExpr = (this.bfRender && this.bfRender.slice(0, 3) === '$$$') ? this.bfRender.slice(4) : false;

    this.extList.forEach(($item, ind) => {
      let itemLabel = '';

      if (!!this.bfRender) {
        if (!renderExpr) { // Display single property
          itemLabel = $item[this.bfRender];

        } else {  // Display custom render expression
          // tslint:disable-next-line:no-eval
          itemLabel = eval(renderExpr);
        }

      } else { // If bfRender not provided: Display all props
        for (const prop in $item) {
          if ($item.hasOwnProperty(prop)) {
            if (!!itemLabel) { itemLabel += ', '; }
            itemLabel += $item[prop];
          }
        }
      }

      $item.$label = itemLabel;
      $item.$index = ind + 1;  // Internal unique index
      $item.$isMatch = true;   // filter none by default
      $item.$img = $item[this.bfRenderImg] || null;
      $item.$icon = $item[this.bfRenderIco] || null;
    });

    this.toggleEmptyOption(); // Set Empty option
    this.translateExtList(); // Set $renderedText
  };

  // Add or remove the "Empty" option to the extList
  public toggleEmptyOption = () => {
    if (!this.bfRequired) { // If not required, the list should have "Empty" option
      if (!this.extList.find(item => item.$index === 0)) {
        this.emptyItem.$renderedText = this.translate.doTranslate(this.emptyItem.$label);
        this.extList.unshift(this.emptyItem);  // Add it if not there yet
      }
    } else { // If required, the list shall not have "Empty" option
      BfArray.removeByProp.call(this.extList, '$index', this.emptyItem.$index); // remove empty item
    }

    // Check validity when Empty option is selected
    if (this.isModelEmpty) {
      if (!this.bfRequired && this.isInvalid) { this.setValidity(true); }  // It was invalid because if was required. Now it's valid
      if (this.bfRequired && !this.isInvalid) { this.setValidity(false); } // It was valid because if was not required. Now it's invalid
    }
  };

  // Sync translation for the values of the list ($label --> $renderedText)
  public translateExtList = () => {
    if (!!this.extList) {
      this.extList.forEach(item => item.$renderedText = this.translate.doTranslate(item.$label));
    }

    // Update empty translation (in case it was not on the list)
    this.emptyItem.$renderedText = this.translate.doTranslate(this.emptyItem.$label);

    // Update also the text display on the input (selected option)
    if (!this.isInvalid || this.isModelEmpty) {
      this.selModelText = this.bfModel ? this.bfModel.$renderedText : '';
      if (!this.isExpanded) { this.inputText = this.selModelText; }
    }
  };

  // Update isInvalid and propagate the state up
  public setValidity = (isValid: boolean) => {
    this.isInvalid = !isValid;
    if (!!this.ngControl) { this.ngControl.updateValueAndValidity(); }
  };




  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    // console.log('writeValue -> ', value);
    const wasPristine = (!!this.ngControl && this.ngControl.pristine);

    this.matchSelection(value);

    // External changes shan't turn pristine state (only internals). Set it back if so
    if (wasPristine) { this.ngControl.markAsPristine(); }
  }

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the internal state
  public validate = (extFormCtrl: FormControl) => {
    // console.log('validate', new Date());
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    if (this.isInvalid) {
      if (this.isModelEmpty) {
        return { required: true };  // No value on required
      } else {
        if (this.extList.indexOf(this.bfModel) === -1) {
          return { value: 'no match' }; // Unmatchable value
        }
      }
    }
    return null; // valid
  };

  // ------------------------------------





  // Focus on input (deferring it to next cycle)
  public deferExpand = () => { setTimeout(() => this.elInput.nativeElement.focus()); };

  // Click on the expand/collapse input button
  public onInputBtnClick = () => {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.elInput.nativeElement.focus();
    }
  };


  // On input focus in -> Expand the select list
  public expandList = () => {
    // console.log('focus in - expand');
    this.isFocus = true;
    this.isExpanded = true;
    this.inputText = '';  // Clear the text to work as a filter
    this.filterList('');
  };

  // On input focus out -> Collapse the select list
  public collapseList = () => {
    // console.log('focus out - collapse');
    this.isFocus = false;
    setTimeout(() => {
      this.isExpanded = false;
      this.inputText = this.selModelText; // Show the model text
    }, 100);
  };


  // React on key events (on the input)
  public triggerKey = (event) => {
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
    const patternVal = value.toLowerCase();
    this.extList.forEach(item => {
      item.$isMatch = item.$renderedText.toLowerCase().indexOf(patternVal) >= 0;
    });
    this.emptyItem.$isMatch = true; // Fix empty option as always visible
  };


  // Given an external object/value, find and select the match on the internal list
  public matchSelection = (value) => {
    let matchItem = null;

    if (value !== null && value !== undefined) {
      if (!!this.bfSelect) {
        if (this.bfSelect.indexOf(',') === -1) {  // Single prop
          matchItem = this.extList.getByProp(this.bfSelect, value);

        } else { // Multiple prop match
          matchItem = this.extList.filter(item => {
            return !!item.$index && (JSON.stringify(item.keyMap(this.bfSelect)) === JSON.stringify(value));
          })[0];
        }

      } else {  // Full object match
        matchItem = this.extList.filter(item => {
          const oriItem = BfObject.dCopy.call(item);
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

    if (!!value && this.extList.indexOf(matchItem) === -1) {
      // If value could not be matched
      this.bfModel = value;
      this.isModelEmpty = false;
      this.setValidity(false); // invalid

      // Show invalid value (if string)
      this.selModelText = (typeof value === 'string') ? value : '';
      this.inputText = this.selModelText;

    } else {
      this.setValidity(true);
      this.selectItem(matchItem); // select valid match
    }
  };


  // Select an item from extList to bfModel, and propagate ngModel up
  public selectItem = (selObj) => {
    // console.log('selectItem');

    if (selObj !== this.emptyItem && selObj !== null && selObj !== undefined) {
      this.bfModel = selObj;
      this.isModelEmpty = false;
    } else {
      this.bfModel = this.emptyItem;
      this.isModelEmpty = true;
    }

    this.setValidity(!(this.bfRequired && this.isModelEmpty));

    this.selModelText = this.bfModel ? this.bfModel.$renderedText : '';
    this.inputText = this.selModelText;


    let modelUp;  // Object to propagate up (to the formControl of the bf-dropdown)

    if (this.isModelEmpty) {
      modelUp = this.bfEmptyValue; // If empty value selected, return null (or the empty value)

    } else {
      if (!this.bfSelect) {
        const extModel = BfObject.dCopy.call(selObj);  // Select full object
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
          modelUp = selObj.keyMap(this.bfSelect);  // Select filtered props
        }
      }
    }

    // console.log('propagateModelUp', selModel);
    this.bfBeforeChange.emit({
      // currentValue: this.ngControl.value,  // TODO: find a better way
      nextValue: modelUp
    });
    this.propagateModelUp(modelUp);
  };
}
