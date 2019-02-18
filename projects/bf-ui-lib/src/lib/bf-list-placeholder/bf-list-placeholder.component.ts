import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bf-list-placeholder',
  templateUrl: './bf-list-placeholder.component.html',
  styleUrls: ['./bf-list-placeholder.component.scss']
})
export class BfListPlaceholderComponent implements OnInit {
  @Input() bfType: string = 'table';

  public fakeRows = [];

  constructor() { }

  ngOnInit() {
    const colNum = 3;
    this.fakeRows = [];
    for (let id = 0; id < 7; id++) { 
      let newRow = { id, fakeCols: [] };
      for (let ind = 0; ind < colNum; ind++) {
        let randWidth = Math.floor((Math.random() * 5) + 5);
        newRow.fakeCols.push({ ind, colClass: 'col-md-3 line-' + randWidth }); 
      }
      newRow.fakeCols.push({ colClass: 'col-md-3 fake-button-template' });
      this.fakeRows.push(newRow); 
    }
  }

}
