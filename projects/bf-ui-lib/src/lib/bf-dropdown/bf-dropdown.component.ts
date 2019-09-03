import {Component, OnInit, Input, Output, forwardRef, OnChanges, Inject, ViewChild, ElementRef} from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import BfObject from '../bf-prototypes/object.prototype';
import BfArray from '../bf-prototypes/array.prototypes';
import {Observable, of} from 'rxjs';
import {AbstractTranslateService} from '../abstract-translate.service';


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
 * | @      | customEmptyText     | Replace the default text of the empty option                                       |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | customEmptyVal      | Replace the default empty value (ONLY STRING ALLOWED IN THIS VERSION)              |
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
  styleUrls: ['./bf-dropdown.component.scss'],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfDropdownComponent),
    },
      // { // Custom validator
      //   provide: NG_VALIDATORS, multi: true,
      //   useValue: (val: FormControl) => {
      //     console.log('useValue', val);
      //     // let err = { rangeError: { given: c.value, max: 10, min: 0 } };
      //     // return (c.value > 5 || c.value < 10) ? err : null;
      //     return true;
      //   }
      // }

      // { // Custom validator
    //   provide: NG_VALIDATORS, multi: true,
    //   useExisting: forwardRef(() => BfDropdownComponent),
    // }
  ]
})
export class BfDropdownComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() bfList: Array<any>;
  @Input() bfRender = '';
  @Input() bfSelect = '';
  @Input() bfRequired: boolean | string = false;
  @Input() bfDisabled = false;
  @Input() bfLabel = '';

  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;
  @Input() bfDisabledTip = '';    // Label for the text of the tooltip to display when the input is disabled

  public bfModel; // <--- internal ngModel
  public selModelText = '';  // Text representation of the selected Model (to display in the input / placeholder)
  public inputText = '';     // Text on the input (ngModel)
  public extList; // Make a copy from bfList to make sure we never modify the input array

  public isInvalid = false;   // If the model holds an invalid option
  public isExpanded = false;  // Whether the list is shown (true) or hidden
  public isFocus = false;     // Whether the input is focused
  public isPristine = true;  // Whether the input is focused

  public bfLabelTrans$: Observable<string> = of('');         // Translated text for the label
  public bfTooltipTrans$: Observable<string> = of('');       // Translated text for the tooltip of the label

  @ViewChild('dropdownInput') elInput: ElementRef<HTMLInputElement>;

  constructor(
    @Inject('TranslateService') private translate: AbstractTranslateService,
  ) { }

  ngOnChanges(changes) {

    // Extend the input list (bfList --> extList)
    if (!!changes.bfList) {
      this.extList = BfArray.dCopy.call(this.bfList || []); // Make a copy

      // If bfRender starts with $$$, it's an eval() expression. If not, a single field
      const renderExpr = (this.bfRender.slice(0, 3) === '$$$') ? this.bfRender.slice(4) : false;

      this.extList.forEach(($item, ind) => {
        let $renderedText = '';

        if (!!this.bfRender) {
          if (!renderExpr) { // Display single property
            $renderedText = $item[this.bfRender];

          } else {  // Display custom render expression
            // tslint:disable-next-line:no-eval
            $renderedText = eval(renderExpr);
          }

        } else { // If bfRender not provided: Display all props
          for (const prop in $item) {
            if ($item.hasOwnProperty(prop)) {
              if (!!$renderedText) { $renderedText += ', '; }
              $renderedText += $item[prop];
            }
          }
        }

        $item.$renderedText = $renderedText;
        $item.$index = ind + 1;  // Internal unique index
        $item.$isMatch = true;   // filter none by default
      });
    }

    if (this.bfRequired === 'false') { this.bfRequired = false; }

    if (!this.bfRequired) { // If not required, add the empty option to the list
      if (!this.extList.length || this.extList[0].$index > 0) {
        this.extList.unshift({$index: 0, $renderedText: 'Empty'});
      }
      if (this.isInvalid && (this.bfModel === null || this.bfModel === undefined)) { this.isInvalid = false; }

    } else { // If there is empty value on the top of the list, get rid of it
      if (this.extList.length > 0 && this.extList[0].$index === 0) {
        this.extList.shift();
      }
      if (!this.isInvalid && (this.bfModel === null || this.bfModel === undefined)) { this.isInvalid = true; }
    }

    // Generate new observables for the dynamic text
    if (changes.hasOwnProperty('bfLabel'))        { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
    if (changes.hasOwnProperty('bfTooltip'))      { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
    // if (changes.hasOwnProperty('bfPlaceholder'))  { this.bfPlaceholderTrans$ = this.translate.getLabel$(this.bfPlaceholder); }
    // if (changes.hasOwnProperty('bfDisabledTip'))  { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }


  }

  ngOnInit() {  }




  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    console.log('writeValue -> ', value);
    this.bfModel = value;
    this.matchSelection(value);
  }

  public propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALIDATORS ---> outer formControl validation
  // validate(control: FormControl) {
  // if (this.inputCtrl.status === 'INVALID') {  // If internal ngModel is invalid, external is invalid too
  // return {'incorrect': true};
  // return { 'required': false };
  // }
  // }

  // ------------------------------------






  // Click on the expand/collapse input button
  public onInputBtnClick = () => {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.elInput.nativeElement.focus();
    }
  };


  // Click on the expand/collapse input button
  public onFocusIn = () => {
    this.isFocus = true;
    this.isExpanded = true;
    this.inputText = '';  // Clear the text to work as a filter
    this.filterList('');
    this.isPristine = false;
  };

  public onFocusOut = () => {
    console.log('focus out');
    this.isFocus = false;
    setTimeout(() => {
      this.isExpanded = false;
      this.inputText = this.selModelText; // Show the model text
    }, 100);
  };

  // Filter the list to display according to the input text
  public filterList = (value) => {
    const patternVal = value.toLowerCase();
    this.extList.forEach(item => {
      item.$isMatch = item.$renderedText.toLowerCase().indexOf(patternVal) >= 0;
    });
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
          let oriItem = BfObject.dCopy.call(item);
          delete oriItem.$index;
          delete oriItem.$renderedText;
          delete oriItem.$isMatch;

          // Stringify comparison is quite bad. TODO: Add a better object compare here
          // Ideas:
          // https://lodash.com/docs/4.17.11#isEqual
          // https://www.npmjs.com/package/is-equal
          // https://www.npmjs.com/package/fast-equals
          return !!oriItem && (JSON.stringify(oriItem) === JSON.stringify(value));
        })[0];
      }
    }

    // If value could not be matched, tha
    this.isInvalid = (!!value && this.extList.indexOf(matchItem) === -1);
    if (this.isInvalid) {
      this.selModelText = value;
      this.inputText = this.selModelText;

    } else {
      this.selectItem(matchItem); // select valid match
    }
  };



  public selectItem = (selObj) => {
    console.log('selectItem');
    this.selModelText = selObj ? selObj.$renderedText : '';
    this.inputText = this.selModelText;

    this.bfModel = selObj;
    this.isInvalid = (this.bfRequired && (selObj === null || selObj === undefined));

    let modelUp;  // Object to propagate up (to the formControl of the bf-dropdown)

    if (!selObj || selObj.$index === 0) {
      modelUp = null; // If empty value selected, return always null

    } else {
      if (!this.bfSelect) {
        let extModel = BfObject.dCopy.call(selObj);  // Select full object
        delete extModel.$index;
        delete extModel.$renderedText;
        delete extModel.$isMatch;
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
    this.propagateModelUp(modelUp);
  };
}
