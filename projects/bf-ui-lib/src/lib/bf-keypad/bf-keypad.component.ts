import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { dialPadConfig } from './bf-keypad';

const keyCodes = {
  BACKSPACE: 'Backspace',
  END: 'End',
  HOME: 'H',
  DOWN_ARROW: 'ArrowDown',
  LEFT_ARROW: 'ArrowLeft',
  RIGHT_ARROW: 'ArrowRight',
  UP_ARROW: 'ArrowUp',
  TAB: 'Tab',
  DELETE: 'Delete'
};
@Component({
  selector: 'bf-keypad',
  templateUrl: './bf-keypad.component.html',
  styleUrls: ['./bf-keypad.component.scss']
})
export class BfKeypadComponent {
  @Input() bfPlaceholder = 'view.keypad.placeholder';
  @Output() valueChanges = new EventEmitter<string>();

  numberField: FormControl = new FormControl('');

  readonly dialPadConfig = dialPadConfig;
  readonly numbersPattern = /^[0-9*#+]+$/;
  readonly excludedKeys = [
    keyCodes.BACKSPACE,
    keyCodes.DOWN_ARROW,
    keyCodes.END,
    keyCodes.HOME,
    keyCodes.LEFT_ARROW,
    keyCodes.RIGHT_ARROW,
    keyCodes.TAB,
    keyCodes.UP_ARROW,
    keyCodes.DELETE
  ];

  constructor() {
    this.listenNumberFieldChanges();
  }

  listenNumberFieldChanges() {
    this.numberField.valueChanges.subscribe(newValue => this.valueChanges.emit(newValue));
  }

  onSelectElement(newElement: string) {
    let currentValue = this.numberField.value.toString();
    this.numberField.setValue(currentValue += newElement);
  }

  deselectElement() {
    const currentValue = this.numberField.value;
    this.numberField.setValue(currentValue.substring(0, currentValue.length - 1));
  }

  keypress(keyEvent: KeyboardEvent) {
    if (!this.numbersPattern.test(keyEvent.key) && !this.excludedKeys.includes(keyEvent.key)) {
      keyEvent.preventDefault();
    }
  }
}
