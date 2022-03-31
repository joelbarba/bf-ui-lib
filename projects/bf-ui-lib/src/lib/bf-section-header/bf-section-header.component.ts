import { Component, Input } from '@angular/core';

@Component({
  selector: 'bf-section-header',
  templateUrl: './bf-section-header.component.html'
})
export class BfSectionHeaderComponent {
  @Input() bfTitle: string;
  @Input() bfDescription: string = null;

  constructor() { }

}
