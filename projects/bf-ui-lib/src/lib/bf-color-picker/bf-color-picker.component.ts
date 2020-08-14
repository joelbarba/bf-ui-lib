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
  @Output() bfColorChanged: EventEmitter<string> = new EventEmitter(); // an event emitted when the color has changed

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const { color } = changes;

    if (!color.firstChange) {
      this.updateSpectrumColorValue(color.currentValue);
    }
  }

  ngOnInit() {
    this.initialiseColorPicker();
  }

  private initialiseColorPicker(): void {
    $('.color--picker').spectrum({
      color: `#${this.bfColor}`,
      flat: true,
      showButtons: false,
      showInitial: true,
      move: this.onChangeColor.bind(this)
    });
  }

  private updateSpectrumColorValue(color: string): void {
    $('.color--picker').spectrum('set', `#${color}`);
  }

  private onChangeColor(color: any): void {
    const updatedColor = this.getHexSubString(color);
    this.bfColorChanged.emit(updatedColor);
  }

  private getHexSubString(color: any): string {
    return color.toHexString().substr(1);
  }
}
