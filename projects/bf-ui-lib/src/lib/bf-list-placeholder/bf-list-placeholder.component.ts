import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bf-list-placeholder',
  templateUrl: './bf-list-placeholder.component.html',
  styleUrls: ['./bf-list-placeholder.component.scss']
})
export class BfListPlaceholderComponent implements OnInit {
  @Input() bfType: string = 'list';
  @Input() bfColumns = [];
  @Input() bfRows : number = 8;

  public fakeRows = [];

  constructor() { }

  ngOnInit() {
    
    // Get an array with the sizes of the cols form the input bfColumns
    // Calculate the grid left to set the last button column (lastSize)
    let colSizes = []; let lastSize = 12;
    if (!!this.bfColumns.length) {
      colSizes = [ ...this.bfColumns ];
      this.bfColumns.forEach((colSize) => { lastSize = lastSize - colSize; });
    } else {
      colSizes = [4, 3, 3]; lastSize = 2;
    }


    this.fakeRows = [];
    for (let id = 0; id < this.bfRows; id++) { 
      let newRow = { id, fakeCols: [] };
      for (let ind = 0; ind < colSizes.length; ind++) {
        let randWidth = Math.floor((Math.random() * 5) + 5);
        newRow.fakeCols.push({ ind, colClass: 'col-' + colSizes[ind] + ' line-' + randWidth }); 
      }
      // Right button
      if (lastSize > 0) { newRow.fakeCols.push({ colClass: 'col-' + lastSize + ' fake-button-template' }); }

      this.fakeRows.push(newRow); 
    }
  }

}
