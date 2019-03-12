import { Component, OnInit, Input, Output, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import '../prototypes';

/*
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
*/

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
    //   useExisting: forwardRef(() => BfInputComponent),
    // }
  ]
})
export class BfDropdownComponent implements ControlValueAccessor {
  public bfModel; // <--- internal ngModel
  public extList; // Make a copy from bfList to make sure we never modify the input array

  @Input() bfList: Array<any>;
  @Input() bfRender: string = '';
  @Input() bfSelect: string = '';
  @Input() bfRequired: boolean = false;
  @Input() bfDisabled: boolean = false;
  @Input() bfLabel: string = '';

    // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    if (value !== undefined) {
      // this.bfModel = value;
      // this.updateStatus();
    }
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


  constructor() { }

  ngOnChanges(changes) {

    // Extend the input list adding $index and $renderedText
    if (!!changes.bfList) {
      this.extList = this.bfList.copy();

      let renderExpr;
      if (this.bfRender.slice(0,3) !== '$$$') {
        renderExpr = false; // Render one property

      } else { // Parse the expression to render
        renderExpr = this.bfRender.slice(4);
      }

      this.extList.forEach(($item, ind) => {
        let $renderedText = '';

        // If bfRender starts with $$$, it's an eval() expression.
        // If not, it's a single the property of $item
        if (!!this.bfRender) {

          if (!renderExpr) { // Display single property
            $renderedText = $item[this.bfRender];

          } else {  // Display custom render expression
            $renderedText = eval(renderExpr);
          }

        } else { // If bfRender not provided: Display all props
          for (let prop in $item) {
            if (!!$renderedText) { $renderedText += ', '; }
            $renderedText += $item[prop];
          }
        }

        $item.$renderedText = $renderedText;
        $item.$index = ind + 1;  // Internal unique index
      });

    }

    if (!this.bfRequired) { // If not required, add the empty option to the list
      if (!this.extList.length || this.extList[0].$index > 0) {
        this.extList.unshift({$index: 0, $renderedText: 'Empty'});
      }

    } else { // If there is empty value on the top of the list, get rid of it
      if (this.extList.length > 0 && this.extList[0].$index === 0) {
        this.extList.shift();
      }
    }

  }

  ngOnInit() {  }


  selectItem = (selObj) => {
    this.bfModel = selObj;
    let selModel;  // Object to export (output)


    if (selObj.$index === 0) {
      selModel = null; // If empty value selected, return allways null

    } else {
      if (!this.bfSelect) {
        selModel = selObj.copy();   // Select full object
        delete selModel.$index;
        delete selModel.$renderedText;

      } else {
        if (this.bfSelect.indexOf(',') === -1) {
          selModel = selObj[this.bfSelect];  // Select 1 prop
        } else {
          selModel = selObj.keyMap(this.bfSelect);  // Select filtered props
        }
      }
    }

    console.log('selModel', selModel);
    this.propagateModelUp(selModel);
  }

}
