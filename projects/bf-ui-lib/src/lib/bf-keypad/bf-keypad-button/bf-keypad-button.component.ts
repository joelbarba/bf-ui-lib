import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyPad } from '../bf-keypad';

@Component({
  selector: 'bf-keypad-button',
  templateUrl: './bf-keypad-button.component.html',
  styleUrls: ['./bf-keypad-button.component.scss']
})
export class BfKeypadButtonComponent {
  @Input() element: KeyPad;
  @Output() selectElement = new EventEmitter();

  constructor() { }

  onSelectPrimaryElement(element: KeyPad) {
    this.selectElement.emit(element.primaryElement);
  }

  onSelectSecondaryElement(element: KeyPad) {
    if(element.isSecondaryEnabled) {
      this.selectElement.emit(element.secondaryElement);
    }
  }
}
