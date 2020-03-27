import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bf-section-header',
  templateUrl: './bf-section-header.component.html'
})
export class BfSectionHeaderComponent implements OnInit {
  @Input() bfTitle: string;
  @Input() bfDescription: string = null;

  constructor() { }

  ngOnInit() {
  }

}
