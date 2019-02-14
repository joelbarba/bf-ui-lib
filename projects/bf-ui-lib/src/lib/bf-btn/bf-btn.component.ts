import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bf-btn',
  templateUrl: './bf-btn.component.html',
  styleUrls: ['./bf-btn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BfBtnComponent implements OnInit {
  @Input() bfText: string = '';
  @Input() bfIcon: string = 'icon-arrow-right3';

  constructor() { }

  ngOnInit() {
    // console.log('ngOnInit');
  }
  
  ngOnChanges() {
    // console.log('ngOnChanges');
  }

}
