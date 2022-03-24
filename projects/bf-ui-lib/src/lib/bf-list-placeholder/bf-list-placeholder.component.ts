import { Component, Input, OnInit } from '@angular/core';
import { ColumnConfigInterface } from './interfaces/column-config.interface';

@Component({
  selector: 'bf-list-placeholder',
  templateUrl: './bf-list-placeholder.component.html',
  styleUrls: []
})
export class BfListPlaceholderComponent implements OnInit {
  @Input() bfType = 'list';
  @Input() bfColumns: (number | ColumnConfigInterface)[] = [];
  @Input() bfRows = 8;

  public fakeRows = [];

  constructor() { }

  setupColumns() {
    // Get an array with the sizes of the cols form the input bfColumns
    // Calculate the grid left to set the last button column (lastSize)
    let colSizes: ColumnConfigInterface[] = [];
    let lastSize = 12;

    if (!!this.bfColumns.length) {
      this.bfColumns.forEach((colSize) => {
        const colConfig: ColumnConfigInterface = {
          size: 0
        };

        if (typeof colSize === 'number') {
          colConfig.size = colSize;
        } else {
          colConfig.size = colSize.size;
          colConfig.alignment = colSize.alignment;
        }

        colSizes.push(colConfig);
        lastSize = lastSize - colConfig.size;
      });
    } else {
      colSizes = [{ size: 4 }, { size: 3 }, { size: 3 }];
      lastSize = 2;
    }

    this.fakeRows = [];

    for (let id = 0; id < this.bfRows; id++) {
      const newRow = { id, fakeCols: [] };

      for (let ind = 0; ind < colSizes.length; ind++) {
        const randWidth = Math.floor((Math.random() * 5) + 5);

        newRow.fakeCols.push({
          ind,
          colClass: `col-${colSizes[ind].size} line-${randWidth} ${colSizes[ind].alignment ?? 'left'}-align`
        });
      }

      // Right button
      if (lastSize > 0) { newRow.fakeCols.push({ colClass: 'col-' + lastSize + ' fake-button-template' }); }

      this.fakeRows.push(newRow);
    }
  }

  ngOnInit() {
    this.setupColumns();
  }
}
