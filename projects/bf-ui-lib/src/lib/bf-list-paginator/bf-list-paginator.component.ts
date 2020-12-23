import {Component, EventEmitter, Input, OnInit, OnChanges, Output, DoCheck, ElementRef } from '@angular/core';
import { BfTranslateService } from 'projects/bf-ui-lib-sandbox/src/app/translate.service';
import {Observable} from 'rxjs';

interface IBfCtrl {
  goToPage: (pageNum: number) => void;
  paginate?: (rowsPerPage: number) => void;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  maxRowsPerPageList?: Array<{ num: number, label: string }>;
  render$ ?: Observable<{ currentPage, totalPages, rowsPerPage }>;
}

@Component({
  selector: 'bf-list-paginator',
  templateUrl: './bf-list-paginator.component.html',
  styleUrls: [],
  // encapsulation: ViewEncapsulation.None
})
export class BfListPaginatorComponent implements OnInit, OnChanges, DoCheck {
  @Output() bfPageChange = new EventEmitter<any>();
  @Input() bfShowSelector = false; // Whether to show the dropdown with the number of items per page
  @Input() bfMaxButtons = 4; // Number of maximum extra page buttons to display (0=1, 1=3, 2=5, 3=7, 4=9 ... x=2x+1)
  @Input() bfCtrl: IBfCtrl;

  public defaultCtrl: IBfCtrl = { // Default values for bfCtrl
    goToPage: (pageNum) => {},
    currentPage : 1,
    totalPages  : 1,
    rowsPerPage : 10,
    maxRowsPerPageList : [ // Selector for the max items per page
      { num: 5,   label: 'views.common.5_items_per_page' },
      { num: 10,  label: 'views.common.10_items_per_page' },
      { num: 15,  label: 'views.common.15_items_per_page' },
      { num: 20,  label: 'views.common.20_items_per_page' },
      { num: 30,  label: 'views.common.30_items_per_page' },
      { num: 50,  label: 'views.common.50_items_per_page' },
      { num: 100, label: 'views.common.100_items_per_page' },
    ]
  };

  public listBtns = [];   // Buttons to display on the left (1, 2, 3 ...)
  public prevCtrl;        // Copy of the previous bfCtrl, to detect changes
  public listLength = 0;  // Keep the previous list length to recalculate pages (internal default function)
  public renderSubs;      // Subscription to the bfCtrl.render$

  constructor(private translate: BfTranslateService, private element: ElementRef) { }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('bfCtrl') || changes.hasOwnProperty('bfMaxButtons')) {
      this.bfCtrl = { ...this.defaultCtrl, ...this.bfCtrl };

      // if bfCtrl comes with a render$ observable, subscribe
      if (this.bfCtrl.render$) {
        if (!!this.renderSubs) { this.renderSubs.unsubscribe(); }
        this.renderSubs = this.bfCtrl.render$.subscribe(listState => {
          this.bfCtrl.currentPage = listState.currentPage;
          this.bfCtrl.totalPages = listState.totalPages;
          this.bfCtrl.rowsPerPage = listState.rowsPerPage;
          this.renderComponent();
        });
      }

      this.renderComponent();
    }
    this.listLength = this.bfCtrl.totalPages * this.bfCtrl.rowsPerPage;
  }

  // The object change "bfCtrl" is not detected by ngChanges. Do it here:
  ngDoCheck() {
    if (!this.prevCtrl
        || this.prevCtrl.currentPage !== this.bfCtrl.currentPage
        || this.prevCtrl.totalPages  !== this.bfCtrl.totalPages
        || this.prevCtrl.rowsPerPage !== this.bfCtrl.rowsPerPage) {
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
  }

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

  // Recalculate rows per page
  public changeRowsPerPage = (rowsPerPage) => {
    if (!!this.bfCtrl.paginate) {
      this.bfCtrl.paginate(rowsPerPage);

    } else {
      // If bfCtrl does not provide a paginate() function, run this by default to recalculate totalPages
      this.bfCtrl.totalPages = Math.ceil(this.listLength / rowsPerPage);
      if (this.bfCtrl.currentPage < 1) { this.bfCtrl.currentPage = 1; }
      if (this.bfCtrl.currentPage > this.bfCtrl.totalPages) { this.bfCtrl.currentPage = this.bfCtrl.totalPages; }
      this.listLength = this.bfCtrl.totalPages * rowsPerPage;
    }
    this.renderComponent();
  };


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
    this.bfMaxButtons = this.checkNumber(this.bfMaxButtons);

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
            for (let ind = this.bfCtrl.totalPages - totalMax + 3; ind <= this.bfCtrl.totalPages; ind++) {
              this.listBtns.push({ pageNum: ind });
            }

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

    // Remember the values
    this.prevCtrl = {
      currentPage : this.bfCtrl.currentPage,
      totalPages  : this.bfCtrl.totalPages,
      rowsPerPage : this.bfCtrl.rowsPerPage,
    };
  };

  isOnFirstPage(): boolean {
    return this.bfCtrl.currentPage === 1;
  }

  isOnLastPage(): boolean {
    return this.bfCtrl.currentPage === this.bfCtrl.totalPages;
  }

  isCurrentItem(currentPage:number, pageNumber: number): boolean {
    return currentPage === pageNumber;
  }

  getTranslatedAriaLabel(label: string, params: any = {}): string {
    return this.translate.doTranslate(label, params);
  }

  getPageButtonAriaLabel(pageNumber: string): string {
    if (pageNumber !== null) {
      return this.getTranslatedAriaLabel('aria.list_paginator.go_to_page', { page: pageNumber, maxPages: this.bfCtrl.totalPages });
    }

    return '';
  }

  previousPageClicked(event: KeyboardEvent): void {
    if (this.isActionKeyPressed(event.key)) {
      event.preventDefault();
      this.goToPrev();
      this.refocusList();
    }
  }

  nextPageClicked(event: KeyboardEvent): void {
    if (this.isActionKeyPressed(event.key)) {
      event.preventDefault();
      this.goToNext();
      this.refocusList();
    }
  }

  goToPageClicked(event: KeyboardEvent, pageNum: number): void {
    if (this.isActionKeyPressed(event.key)) {
      event.preventDefault();
      this.goToPage(pageNum);
      this.refocusList();
    }
  }

  private isActionKeyPressed(eventKey: string): boolean {
    return eventKey === 'Space' || eventKey === 'Enter';
  }

  private refocusList(): void {
    setTimeout(() => {
      const buttonList = this.element.nativeElement.querySelectorAll('.page-btn');
      const selectedButton: any = Array.from(buttonList).find((element: HTMLElement) => element.getAttribute('tabindex') === '0');

      if (selectedButton) {
        selectedButton.focus();
      }
    });
  }
}
