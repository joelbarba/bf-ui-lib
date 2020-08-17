import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

declare var spectrum: any;
declare var $: any;

@Component({
  selector: 'bf-color-picker',
  template: '<div class="color--picker"></div>',
  styleUrls: []
})
export class BfColorPickerComponent implements OnInit, OnChanges {
  @Input() bfColor: string; // the value of the color
  @Output() bfColorChange: EventEmitter<string> = new EventEmitter(); // an event emitted when the color has changed

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const { bfColor } = changes;

    if (!bfColor.firstChange) {
      this.updateSpectrumColorValue(bfColor.currentValue);
    }
  }

  ngOnInit() {
    this.initialiseColorPicker();
  }

  private initialiseColorPicker(): void {
    $('.color--picker').spectrum({
      color: this.getValidHexString(this.bfColor),
      flat: true,
      showButtons: false,
      showInitial: true,
      move: this.onChangeColor.bind(this)
    });
  }

  private getValidHexString(colorValue: string): string {
    if (!colorValue) {
      return '';
    }

    return colorValue.indexOf('#') === -1 ? `#${colorValue}` : colorValue;
  }

  private updateSpectrumColorValue(color: string): void {
    const colorValue = this.getValidHexString(color);
    $('.color--picker').spectrum('set', `#${colorValue}`);
  }

  private onChangeColor(color: any): void {
    const updatedColor = color.toHexString();
    this.bfColorChange.emit(updatedColor);
  }
}
