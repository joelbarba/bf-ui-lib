import { Component, ElementRef, forwardRef, HostListener, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { BfUILibTransService } from '../abstract-translate.service';


/****
 *  ATTRIBUTES

 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | *ngModel            | Where the selected object of the list is held                                      |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | *bfList             | The list of the options (array of object)                                          |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfRequired          | Whether the input is required or not                                               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | bfDisabled          | Disable the input                                                                  |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfLabel             | If present it adds a label above the input                                         |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfPlaceholder       | The placeholder of the input field                                                 |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | &      | afterInit           | Callback - called when the list is prepared, you receive the prepared list as      |
 * |        |                     | paramater                                                                          |
 * |        |                     |                                                                                    |
 * |        |                     | Params                                                                             |
 * |        |                     | - $itemList                                                                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|

 *****/

@Component({
  selector: 'bf-autocomplete',
  templateUrl: './bf-autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => BfAutocompleteComponent),
    },
    { // Custom validator
      provide: NG_VALIDATORS, multi: true,
      useExisting: forwardRef(() => BfAutocompleteComponent),
    }
  ]
})
export class BfAutocompleteComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() ngModel;
  @Input() bfList: Array<string>;    // List of options (array of strings)
  @Input() bfRequired: unknown = false; // Whether the model is required (can't be empty)
  @Input() bfDisabled: unknown = false; // Whether the autocomplete is disabled
  @Input() bfDisabledTip = '';    // If autocomplete is disabled, tooltip to display on hover (label)
  @Input() bfPlaceholder = '';    // Text to display in as placeholder
  @Input() bfLabel = '';          // Label to display above the dropdown
  @Input() bfTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() bfTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;  // If tooltip on the label, whether it is appended on the body
  @Input() bfValidType: 'integer' | 'number' | 'decimal' | 'email' = null;  // Predefined validator patterns. It overrides bfPattern
  @Input() bfPattern;

  // --------------

  ngControl;  // Reference to the external formControl

  bfModel = ''; // Aligned with ngModel
  textInput = '';
  list;
  isInvalid = false;   // If the model holds an invalid option
  isExpanded = false;  // Whether the list is shown (true) or hidden
  isFocus = false;     // Whether the input is focused

  bfLabelTrans$: Observable<string> = of('');         // Translated text for the label
  bfTooltipTrans$: Observable<string> = of('');       // Translated text for the tooltip of the label
  bfDisabledTipTrans$: Observable<string> = of('');   // Translated text for the disabled tooltip
  bfPlaceholderTrans$: Observable<string> = of('');   // Translated text for the placeholder

  @ViewChild('autocomplete', { static: true }) autocomplete: ElementRef<HTMLElement>;
  @ViewChild('autocompleteInputGroup', { static: false }) autocompleteInputGroup: ElementRef<HTMLElement>;
  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef<HTMLInputElement>;

  constructor(
    private translate: BfUILibTransService,
  ) { }

  @HostListener('document:click', ['$event'])
  outsideClick(event) {
    if (!this.autocompleteInputGroup.nativeElement.contains(event.target)) {
      this.collapse();
    }
  }

  ngOnChanges(changes) {
    // If values come as strings, convert them
    if (changes.hasOwnProperty('bfDisabled')) {
      if (this.bfDisabled === 'false') { this.bfDisabled = false; }
      if (this.bfDisabled === 'true')  { this.bfDisabled = true; }
    }

    // If values come as strings, convert them
    if (changes.hasOwnProperty('bfRequired')) {
      if (this.bfRequired === 'false') { this.bfRequired = false; }
      if (this.bfRequired === 'true')  { this.bfRequired = true; }
    }

    if (changes.hasOwnProperty('bfValidType')) { this.setPattern(); }

    // Generate new observables for the dynamic text
    if (changes.hasOwnProperty('bfLabel'))        { this.bfLabelTrans$ = this.translate.getLabel$(this.bfLabel); }
    if (changes.hasOwnProperty('bfTooltip'))      { this.bfTooltipTrans$ = this.translate.getLabel$(this.bfTooltip); }
    if (changes.hasOwnProperty('bfDisabledTip'))  { this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip); }
    if (changes.hasOwnProperty('bfPlaceholder'))  { this.bfPlaceholderTrans$ = this.translate.getLabel$(this.bfPlaceholder); }

    if (changes.hasOwnProperty('bfList')) { this.initList(); }
    if (changes.hasOwnProperty('ngModel')) {
      const val = this.ngModel ? this.ngModel : '';
      this.textInput = val;
      this.bfModel = val;
      this.filter();
    }
  }

  ngOnInit() {
    this.setPattern();
  }

  initList() {
    this.list = [ ...this.bfList ];
  }

  setPattern() {
    if (this.bfValidType) {
      this.bfPattern = {
        integer: '^[0-9]{1,5}$',
        number: '^-?[0-9]{1,8}$',
        decimal: '^-?[0-9]+(\\.[0-9]+)?$',
        email: '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
      }[this.bfValidType];
    }
  }

  // Update isInvalid and propagate the state up
  setValidity(isValid: boolean) {
    this.isInvalid = !isValid;
    if (!!this.ngControl) { this.ngControl.updateValueAndValidity(); }
  }

  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    // console.log('writeValue -> ', value);
    const wasPristine = (!!this.ngControl && this.ngControl.pristine);

    // this.matchSelection(value);

    // External changes shan't turn pristine state (only internals). Set it back if so
    if (wasPristine) { this.ngControl.markAsPristine(); }
  }

  propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the internal state
  validate(extFormCtrl: FormControl) {
    // console.log('validate', new Date());
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    if (this.isInvalid) {
      if (!!this.ngModel) {
        if (!!this.bfPattern) {
          if (!new RegExp(this.bfPattern).test(this.ngModel)) {
            return { value: 'Expected value type: ' + this.bfValidType }; // Mistype value
          }
        }
      } else {
        return { required: true };  // No value on required
      }
    }
    return null; // valid
  }

  // ------------------------------------

  toggle() {
      this.isExpanded ? this.collapse() : this.expand();
  }

  // On input focus in -> Expand the select list
  expand() {
    this.isExpanded = true;
    this.focus();
  }

  // On input focus out -> Collapse the select list
  collapse() {
    this.isFocus = false;
    setTimeout(() => {
      this.isExpanded = false;
    }, 100);
  }

  // React on key events (on the input)
  triggerKey(event) {
    const visibleList = this.list;
    const ind = visibleList.indexOf(this.bfModel);

    const navigate = () => {
      const nextIndex = {
        ArrowUp: (ind > 0) ? ind - 1 : visibleList.length - 1,
        ArrowDown: (ind >= 0 && ind < visibleList.length - 1) ? ind + 1 : 0
      }[event.key];
      this.textInput = visibleList[nextIndex];
      this.bfModel = visibleList[nextIndex];
    };

    const confirm = () => {
      this.select(this.bfModel);
      this.autocompleteInput.nativeElement.blur();
    };

    const collapse = () => this.collapse();

    const keyFunctions = {
      Tab: collapse,
      Escape: collapse,
      ArrowDown: navigate,
      ArrowUp: navigate,
      Enter: confirm
    };

    if (keyFunctions[event.key]) { keyFunctions[event.key](); }
  }

  typing = (value) => {
    this.bfModel = value;
    this.updateModel(value);
    this.filter();
    this.expand();
  };

  select = (value) => {
    this.bfModel = value;
    this.textInput = value;
    this.updateModel(value);
    this.collapse();
    this.filter();
  };

  reset() {
    this.textInput = '';
    this.bfModel = '';
    this.updateModel('');
    this.filter();
    this.expand();
    this.focus();
  }

  focus() {
    this.isFocus = true;
    this.autocompleteInput.nativeElement.focus();
  }

  // Given an external object/value, find and select the match on the internal list
  isMatch(value : string) : boolean {
    return value.toLowerCase().includes(this.textInput.trim().toLowerCase());
  }

  filter() {
    this.list = this.bfList.filter(item => this.isMatch(item));
  }

  checkValidity(value) {
    if (!!this.bfRequired) {
      if (!value) { return false; }
    }
    if (!!this.bfPattern && !!value) {
      if (!new RegExp(this.bfPattern).test(value)) { return false; }
    }
    return true;
  }

  // Select an item from extList to bfModel, and propagate ngModel up
  updateModel(value) {
    this.setValidity(this.checkValidity(value));

    this.propagateModelUp(value);
  }
}
