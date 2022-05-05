import {
  Component,
  ElementRef, EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Subject} from 'rxjs';
import {generateId} from "../generate-id";

@Component({
  selector: 'bf-radio',
  templateUrl: 'bf-radio.component.html',
})
export class BfRadioComponent implements OnChanges {
  @Input() bfLabel = '';
  @Input() bfIcon = '';
  @Input() bfValue: any;  // Value of the current radio (will be set to the model when selected)
  @Input() bfTooltip = '';
  @Input() bfTooltipPos = 'top';
  @Input() bfTooltipBody = 'body';
  @Input() bfDisabled = false;
  @Output() bfOnSelected = new EventEmitter<any>();

  @ViewChild('radioInput', { static: false }) radioInput: ElementRef;

  bfModel: string | number;  // Value selected among the radio group
  bfName = 'group-1'; // Group name provided by the parent component <bf-radio-group>
  ariaLabel: string;  // Id of the label for the input (bfLabel)
  isFocused = false;  // Whether the current focus is on the component
  groupDisabled = false;  // Whether the parent <bf-radio-group> is disabled (and all radios should be as well)

  selectedValue$: Subject<any> = new Subject(); // Emits to the parent when the value gets selected (internally)
  value$: Subject<any> = new Subject();         // Emits when the bfValue input changes, so the parent can validate

  constructor() {
    this.ariaLabel = `radio-label-${generateId(10)}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.bfValue) {
      this.dataValue = this.bfValue + '';
      this.value$.next(this.bfValue);
    }
  }

  isDisabled() { // If the <bf-radio> is disabled, or the <bf-radio-group> is disabled
    return this.bfDisabled || this.groupDisabled;
  }

  internalChange(value: any) {
    if (this.isDisabled()) { return; }
    this.bfModel = value;
    this.radioInput.nativeElement.checked = this.bfValue === value;
    this.selectedValue$.next(value);
    if (this.bfValue === value) { this.bfOnSelected.emit(value); }
  }

  externalChange(value: any) {
    this.bfModel = value;
    this.radioInput.nativeElement.checked = this.bfValue === value;
    if (this.bfValue === value) { this.bfOnSelected.emit(value); }
  }

  // *************
  // Accessibility
  // *************
  @HostBinding('attr.role') attrRole = 'radio';
  @HostBinding('attr.tabindex') tabIndex = -1;

  @HostBinding('attr.checked')
  @HostBinding('attr.aria-checked') get isChecked() { return this.bfValue === this.bfModel; }

  @HostBinding('attr.data-value') dataValue: string;
  @HostBinding('attr.aria-labelledby') get ariaLabelId() { return this.ariaLabel; }
  @HostBinding('attr.aria-disabled') get ariaDisabled() { return this.isDisabled(); }

  @HostListener('keydown.space', ['$event']) spaceDown(event: KeyboardEvent): void { event.preventDefault(); }

  // Select the value of this radio among the group
  @HostListener('click')
  @HostListener('keyup.space')
  onSelect(): void {
    this.internalChange(this.bfValue);
  }

  // Also select the value when moving through the roving tabindex
  @HostListener('focus') onFocus(): void { if (this.isFocused) { this.internalChange(this.bfValue); } }
  @HostListener('blur') onBlur(): void { this.isFocused = false; }

}
