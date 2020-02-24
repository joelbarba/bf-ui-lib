import {$, $$, browser, by, element} from 'protractor';

export class BfListHandlerPo {
  base = '.bf-list-handler-test1';
  constructor(baseCss) {
    this.base = baseCss;
  }
  navigateTo() {
    return browser.get(browser.baseUrl + 'list-test') as Promise<any>;
  }

  // <bf-list-paginator>
  getPaginator = () => $$(this.base + ' bf-list-paginator .page-btn:not(.prev-btn):not(.next-btn)').map((el) => el.getText());
  getCurrPageNum = () => $(this.base + ' .bf-list-paginator .page-btn.current').getText();
  getPageNextBtn = () => $(this.base + ' .bf-list-paginator .page-btn.next-btn');
  getPagePrevBtn = () => $(this.base + ' .bf-list-paginator .page-btn.prev-btn');
  getPaginatorBtn = (num) => $(this.base + ' bf-list-paginator .page-btn:nth-child(' + (num + 1) + ')');

  // List headers (to order)
  getListHeader = (num) => $(this.base + ' .list-header bf-list-header-col:nth-child(' + num + ')');

  // Return an object array with the displayed elements on the list
  getListArr = () => {
    return $$(this.base + ' .list-row:not(.list-row-placeholder)').map((rowEl, ind) => {
      return {
        col1: rowEl.$('div[class*="col-"]:nth-child(1)').getText(),
        col2: rowEl.$('div[class*="col-"]:nth-child(2)').getText(),
        col3: rowEl.$('div[class*="col-"]:nth-child(3)').getText(),
        col4: rowEl.$('div[class*="col-"]:nth-child(4)').getText(),
      };
    });
  };

  // Select items per page option
  selectIPP = async (pageNum) => {
    const dropdownBtn = $(this.base + ' .page-num-selector .bf-dropdown .input-group-append');
    const ops = await $$(this.base + ' .page-num-selector .bf-dropdown .list-container .option-row');
    await dropdownBtn.click();
    await ops[pageNum].click();
  };

  getTextFilter = () => $(this.base + ' .filter-text input.form-control');
  getFilterUser = () => $(this.base + ' .filter-username input.form-control');
  getFilterEmail = () => $(this.base + ' .filter-email   input.form-control');
  getFilterName = () => $(this.base + ' .filter-name    input.form-control');
  loadMoreBtn = () => $(this.base + ' bf-btn.load-more-btn').click();
  loadLessBtn = () => $(this.base + ' bf-btn.load-less-btn').click();

  getLimitBeF = async () => {
    const limit  = await $(this.base + ' .filter-limit').getText();
    const offset = await $(this.base + ' .filter-offset').getText();
    const order  = await $(this.base + ' .filter-order-by').getText();
    return [limit, offset, order];
  }
}
