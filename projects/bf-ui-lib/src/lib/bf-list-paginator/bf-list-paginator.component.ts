import {Component, EventEmitter, Input, OnInit, OnChanges, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'bf-list-paginator',
  templateUrl: './bf-list-paginator.component.html',
  styleUrls: ['./bf-list-paginator.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BfListPaginatorComponent implements OnInit {
  @Input() bfShowSelector = false; // Whether to show the dropdown with the number of items per page
  @Input() bfMaxButtons = 4; // Number of maximum extra page buttons to display (0=1, 1=3, 2=5, 3=7, 4=9 ... x=2x+1)
  @Input() bfCtrl = {
    goToPage: (pageNum) => { },
    currentPage : 1,
    totalPages  : 1,
    rowsPerPage : 1,
  };
  @Output() bfPageChange = new EventEmitter<any>();

  public listBtns = [];    // Buttons to display on the left (1, 2, 3 ...)
  public prevCtrl;  // Copy of the previous bfCtrl, to detect changes

  constructor() { }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('bfCtrl') || changes.hasOwnProperty('bfMaxButtons')) {
      this.renderComponent();
    }
  }

  // The object change "bfCtrl" is not detected by ngChanges. Do it here:
  ngDoCheck() {
    if (!this.prevCtrl
        || this.prevCtrl.currentPage !== this.bfCtrl.currentPage
        || this.prevCtrl.totalPages  !== this.bfCtrl.totalPages
        || this.prevCtrl.rowsPerPage !== this.bfCtrl.rowsPerPage
        || this.prevCtrl.goToPage    !== this.bfCtrl.goToPage) {
      this.renderComponent();
    }
  }

  ngOnInit() {
    this.renderComponent();
  }

  // Change the current page
  public goToPage(pageNum) {
    this.bfCtrl.currentPage = pageNum;
    this.renderComponent();
    this.bfPageChange.emit(pageNum);
    if (!!this.bfCtrl.goToPage && typeof this.bfCtrl.goToPage === 'function') {
      this.bfCtrl.goToPage(pageNum);
    }
  };

  public goToPrev() {
    if (this.bfCtrl.currentPage > 1) {
      this.goToPage(this.bfCtrl.currentPage - 1);
    }
  }

  public goToNext() {
    if (this.bfCtrl.currentPage < this.bfCtrl.totalPages) {
      this.goToPage(this.bfCtrl.currentPage + 1);
    }
  }

  // Check and convert the value to a number
  public checkNumber = (value) => {
    if (typeof value !== 'number' && !Number.isNaN(value)) {
      return parseInt(value) || 1;
    } else {
      return value;
    }
  };


  // Calculates the array of buttons to display, based on the total pages, current page, max buttons
  public renderComponent = () => {
    this.bfCtrl.currentPage = this.checkNumber(this.bfCtrl.currentPage);
    this.bfCtrl.rowsPerPage = this.checkNumber(this.bfCtrl.rowsPerPage);
    this.bfCtrl.totalPages = this.checkNumber(this.bfCtrl.totalPages);

    // console.log('Rendering list paginator', this.bfCtrl);
    this.listBtns = [];
    const totalMax = (this.bfMaxButtons * 2) + 1; // Total number of buttons to display



    if (totalMax === 1) { // [x]
      this.listBtns.push({ pageNum: this.bfCtrl.currentPage });
    }
    if (totalMax === 3) { // [1 x 99]
      this.listBtns.push({ pageNum: 1 });
      if (this.bfCtrl.currentPage === 1 || this.bfCtrl.currentPage === this.bfCtrl.totalPages) {
        this.listBtns.push({ pageNum: null });
      } else {
        this.listBtns.push({ pageNum: this.bfCtrl.currentPage });
      }
      this.listBtns.push({ pageNum: this.bfCtrl.totalPages });
    }

    if (totalMax > 3) {
      if (this.bfCtrl.totalPages <= totalMax) {  // All pages in the list
        for (let ind = 1; ind <= this.bfCtrl.totalPages; ind++) { this.listBtns.push({ pageNum: ind }); }

      } else { // Split the list
        if (this.bfCtrl.currentPage <= 1 + this.bfMaxButtons) { // [1 2 3 x 5 6 7 ... 99]
          for (let ind = 1; ind <= totalMax - 2; ind++) { this.listBtns.push({ pageNum: ind }); }
          this.listBtns.push({ pageNum: null });
          this.listBtns.push({ pageNum: this.bfCtrl.totalPages });

        } else {
          if (this.bfCtrl.currentPage >= this.bfCtrl.totalPages - this.bfMaxButtons) {
            // [1 ... 93 94 95 96 97 98 99]
            this.listBtns.push({ pageNum: 1 });
            this.listBtns.push({ pageNum: null });
            for (let ind = this.bfCtrl.totalPages - totalMax + 3; ind <= this.bfCtrl.totalPages; ind++) { this.listBtns.push({ pageNum: ind }); }

          } else {
            // [1 ... 4 5 6 7 8 ... 99]
            this.listBtns.push({ pageNum: 1 });
            this.listBtns.push({ pageNum: null });
            for (let ind = this.bfCtrl.currentPage - this.bfMaxButtons + 2; ind <= this.bfCtrl.currentPage + this.bfMaxButtons - 2; ind++) {
              this.listBtns.push({ pageNum: ind });
            }
            this.listBtns.push({ pageNum: null });
            this.listBtns.push({ pageNum: this.bfCtrl.totalPages });
          }
        }
      }
    }
    this.prevCtrl = this.bfCtrl.copy();
  };


}
