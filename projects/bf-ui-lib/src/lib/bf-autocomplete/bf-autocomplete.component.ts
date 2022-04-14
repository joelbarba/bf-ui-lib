import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import { BfUILibTransService } from '../abstract-translate.service';
import { Patterns } from '../patterns';
import {debounceTime, takeUntil} from 'rxjs/operators';
import { generateId } from '../generate-id';


/****
 *  ATTRIBUTES

 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | *ngModel            | Where the selected string of the list is held                                      |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | *bfList             | The list of the options (array of string)                                          |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfRequired          | Whether the input is required or not                                               |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | bfDisabled          | Disable the input                                                                  |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | =      | bfDisabledTip       | If autocomplete is disabled, tooltip to display on hover (label)                   |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfLabel             | If present it adds a label above the input                                         |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfPlaceholder       | The placeholder of the input field                                                 |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfTooltip           | Add a badge next to the label with the tooltip to give more info                   |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfTooltipPos        | If tooltip on the label, specific position (top by default)                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfTooltipBody       | If tooltip on the label, whether it is appended on the body                        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfEmptyText         | When no suggestion are matched display a text (default: 'No results found')        |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfValidType         | Sets a default pattern: 'integer' | 'number' | 'decimal' | 'email'                 |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfPattern           | Custom BfPattern                                                                   |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfErrorOnPristine   | If true, validate on pristine                                                      |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 * | @      | bfSelect            | Event emitter, select or enter an item in the list                                       |
 * |--------|---------------------|------------------------------------------------------------------------------------|
 *
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
export class BfAutocompleteComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() ngModel: string;
  @Input() bfList: Array<string>;    // List of options (array of strings)
  @Input() bfRequired = false; // Whether the model is required (can't be empty)
  @Input() bfDisabled = false; // Whether the autocomplete is disabled
  @Input() bfDisabledTip = '';    // If autocomplete is disabled, tooltip to display on hover (label)
  @Input() bfPlaceholder = '';    // Text to display in as placeholder
  @Input() bfLabel = '';          // Label to display above the dropdown
  @Input() bfTooltip = '';        // Add a badge next to the label with the tooltip to give more info
  @Input() bfTooltipPos = 'top';  // If tooltip on the label, specific position (top by default)
  @Input() bfTooltipBody = true;  // If tooltip on the label, whether it is appended on the body
  @Input() bfValidType: keyof typeof Patterns;  // Predefined validator patterns. It overrides bfPattern
  @Input() bfPattern;
  @Input() bfErrorOnPristine;
  @Input() bfMinLength = 0;   // [optional] Number of keys needed to start showing suggestions. If absent, shows the list on focus.

  // accessibility inputs
  @Input() bfTabIndex = 0;
  @Input() bfAriaLabel: string;

  @Output() bfOnEnter = new EventEmitter<any>();
  @Output() bfSelect = new EventEmitter<any>();

  // --------------

  ngControl;  // Reference to the external formControl

  list;
  bfCandidate; // Pointer to a extList item that might be selected next but not yet (hovering / arrow scrolling)
  ignoreHover;
  ignoreHover$ = new BehaviorSubject<boolean>(false); // When scrolling with the arrow keys, ignore mouse hover
  arrowScroll$ = new Subject<void>();
  subs: {[ key: string]: Subscription } = {};  // Subscriptions holder
  destroyed$: Subject<boolean> = new Subject<boolean>();

  isInvalid = false;   // If the model holds an invalid option
  isFocus = false;     // Whether the input is focused

  bfDisabledTipTrans$: Observable<string> = of('');   // Translated text for the disabled tooltip
  bfPlaceholderTrans$: Observable<string> = of('');   // Translated text for the placeholder

  bfListboxId = generateId(4);
  bfInputId = generateId(4);

  @ViewChild('autocomplete', { static: true }) autocomplete: ElementRef<HTMLElement>;
  @ViewChild('autocompleteInputGroup', { static: false }) autocompleteInputGroup: ElementRef<HTMLElement>;
  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef<HTMLInputElement>;
  @ViewChild('listContainer', { static: false}) listContainer: ElementRef<HTMLElement>;
  activeDecendent: any;

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
    if (changes.hasOwnProperty('ngModel')) {
      if (this.checkValidity(changes.ngModel.currentValue)) { this.bfErrorOnPristine = true; }
    }
    if (changes.hasOwnProperty('bfList')) { this.initList(); }
    if (changes.hasOwnProperty('bfRequired')) { this.checkValidity(this.ngModel); }
    if (changes.hasOwnProperty('bfValidType')) { this.setPattern(); }
    if (changes.hasOwnProperty('bfDisabledTip'))  {
      this.bfDisabledTipTrans$ = this.translate.getLabel$(this.bfDisabledTip);
    }
    if (changes.hasOwnProperty('bfPlaceholder'))  { this.setPlaceholder(); }

    this.filter();
  }

  ngOnInit() {
    this.setPattern();

    // Give the browser .1s to scroll and avoid the mouseenter selecting a different item while using arrows up/down
    this.subs.scrollSub$ = this.arrowScroll$
      .pipe(
        debounceTime(100),
        takeUntil(this.destroyed$))
      .subscribe(() => this.ignoreHover$.next(false));

    // (ignoreHover$ | async) can't be used inside (mouseenter), (mouseleave)
    this.ignoreHover$.subscribe((ignoreHover) => this.ignoreHover = ignoreHover);

  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();

    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }

  initList() {
    this.bfList = this.bfList.filter((v, i) => this.bfList.indexOf(v) === i); // Remove duplicates
    this.list = [ ...this.bfList ];
  }

  /**
   * @returns whether the list is visible or not
   */
  isExpanded() {
    return this.isFocus && this.list.length > 0 && ((this.ngModel || '').length >= (this.bfMinLength || 0));
  }

  setPattern() {
    if (this.bfValidType) {
      this.bfPattern = Patterns[this.bfValidType];
    }
  }

  toggle() {
    this.isFocus ? this.collapse() : this.expand();
  }

  // On input focus in -> Expand the select list
  expand() {
    this.focus();
  }

  // On input focus out -> Collapse the select list
  collapse() {
    this.isFocus = false;
    this.bfCandidate = null;
    this.setPlaceholder(null);
  }

  navigate(index, list, key) {
    if (!this.isExpanded()) return;

    const nextIndex = {
      ArrowUp: (index > 0) ? index - 1 : list.length - 1,
      ArrowDown: (index >= 0 && index < list.length - 1) ? index + 1 : 0
    }[key];
    this.bfCandidate = list[nextIndex];
    this.arrowScroll$.next();
    this.ignoreHover$.next(true);
    this.setPlaceholder(this.bfCandidate);

    if (this.listContainer.nativeElement.children[0]) {
      this.listContainer.nativeElement.scrollTop = nextIndex * this.listContainer.nativeElement.children[0].clientHeight;
    }
    this.activeDecendent = this.getOptionId(nextIndex);
  }

  confirm() {
    if (this.bfCandidate) {
      this.select(this.bfCandidate);
    } else {
      if (!!this.ngModel) {
        this.bfSelect.emit(this.ngModel);
      }
    }
    this.autocompleteInput.nativeElement.blur();
    this.collapse();
  }

  // React on key events (on the input)
  triggerKey(event) {
    const visibleList = this.list;

    const index = visibleList.indexOf(this.bfCandidate);

    const keyFunctions = {
      Tab: () => { this.collapse(); },
      Escape: () => { this.collapse(); },
      ArrowDown: () => { this.navigate(index, visibleList, event.key); },
      ArrowUp: () => { this.navigate(index, visibleList, event.key); },
      Enter: () => { this.confirm(); }
    };

    if (keyFunctions[event.key]) {
      keyFunctions[event.key]();
    }
  }

  setPlaceholder(value?: string) {
    const newPlaceholder = !!value ? value : this.bfPlaceholder;
    this.bfPlaceholderTrans$ = this.translate.getLabel$(newPlaceholder);
  }

  typing(value) {
    this.updateModel(value);
    this.filter();
    this.expand();
  }

  select(value) {
    this.setValidity(true);
    this.updateModel(value);
    this.filter();
    this.bfSelect.emit(value);
  }

  reset() {
    this.updateModel('');
    this.filter();
    this.expand();
    this.focus();
  }

  focus() {
    this.isFocus = true;
    this.autocompleteInput.nativeElement.focus();
  }

  isMatch(value : string) : boolean {
    return value.toLowerCase().includes(this.ngModel ? this.ngModel.trim().toLowerCase() : '');
  }

  filter() {
    this.list = this.bfList.filter(item => this.isMatch(item));
  }

  // Update isInvalid and propagate the state up
  setValidity(isValid: boolean) {
    this.isInvalid = !isValid;
    if (!!this.ngControl) { this.ngControl.updateValueAndValidity(); }
    return this.isInvalid;
  }

  checkValidity(value) {
    const fromList = this.bfList.find(item => item === value);
    if (fromList) {
      return this.setValidity(true);
    }
    if (!!this.bfRequired) {
      if (!value) { return this.setValidity(false); }
    }
    if (!!this.bfPattern && !!value) {
      if (!new RegExp(this.bfPattern).test(value)) { return this.setValidity(false); }
    }
    return this.setValidity(true);
  }

  // Select an item from extList to bfModel, and propagate ngModel up
  updateModel(value) {
    this.ngModel = value;
    this.setPlaceholder(null);
    this.propagateModelUp(value);
  }

  // ------- ControlValueAccessor -----

  // ControlValueAccessor --> writes a new value from the form model into the view
  writeValue(value: any) {
    const wasPristine = (!!this.ngControl && this.ngControl.pristine);

    // External changes shan't turn pristine state (only internals). Set it back if so
    if (wasPristine) { this.ngControl.markAsPristine(); }
  }

  propagateModelUp = (_: any) => {}; // This is just to avoid type error (it's overwritten on register)
  registerOnChange(fn) { this.propagateModelUp = fn; }
  registerOnTouched(fn) { }


  // NG_VALIDATORS provider triggers this validation
  // Validation to determine the outer formControl state. It propagates upward the internal state
  validate(extFormCtrl: FormControl) {
    this.ngControl = extFormCtrl; // Save the reference to the external form Control

    if (this.isInvalid) {
      if (!!this.ngModel) {
        if (!!this.bfPattern) {
          if (!new RegExp(this.bfPattern).test(this.ngModel)) {
            return { value: 'Expected value type: ' + (this.bfValidType ? this.bfValidType : this.bfPattern) }; // Mistype value
          }
        }
      } else {
        return { required: true };  // No value on required
      }
    }
    return null; // valid
  }

  // ------------------------------------

  public getActiveDecendant(): string {
    return this.activeDecendent || this.getOptionId(0);
  }

  public getOptionId(index): string {
    return `${this.bfListboxId}-item-${index}`;
  }

}
