import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bf-btn',
  templateUrl: './bf-btn.component.html',
  styleUrls: ['./bf-btn.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BfBtnComponent implements OnInit {
  @Output() onClick = new EventEmitter<any>();
  @Input() bfText: string = '';
  @Input() bfType: string = ''; // save, update, add, delete, cancel
  @Input() bfIcon: string = 'icon-arrow-right3';
  @Input() bfDisabled: boolean = false;
  public btnClass: string = 'primary';

  constructor() { }

  ngOnInit() {
    // Common predefined type
    if (!!this.bfType) { this.btnClass = this.bfType; }
    if (this.bfType === 'edit')     { this.btnClass = 'primary';   this.bfIcon = 'icon-pencil'; }
    if (this.bfType === 'save')     { this.btnClass = 'primary';   this.bfIcon = 'icon-arrow-right3'; }
    if (this.bfType === 'update')   { this.btnClass = 'primary';   this.bfIcon = 'icon-arrow-right3'; }
    if (this.bfType === 'add')      { this.btnClass = 'primary';   this.bfIcon = 'icon-plus'; }
    if (this.bfType === 'delete')   { this.btnClass = 'tertiary';  this.bfIcon = 'icon-cross'; }
    if (this.bfType === 'cancel')   { this.btnClass = 'secondary'; this.bfIcon = 'icon-blocked'; }
    if (this.bfType === 'expand')   { this.btnClass = 'secondary'; this.bfIcon = 'icon-arrow-down3'; }
    if (this.bfType === 'collapse') { this.btnClass = 'secondary'; this.bfIcon = 'icon-arrow-up3'; }
  }
  
  ngOnChanges() {
    // console.log('ngOnChanges');
  }

}
