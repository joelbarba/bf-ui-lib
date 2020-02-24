import {$, $$, browser, by, element} from 'protractor';

export class BfListHandlerPo {
  navigateTo() {
    return browser.get(browser.baseUrl + 'list-test') as Promise<any>;
  }

  // <bf-list-paginator>
  getPaginator = () => $$('.bf-list-handler-test1 bf-list-paginator .page-btn:not(.prev-btn):not(.next-btn)').map((el) => el.getText());
  getCurrPageNum = () => $('.bf-list-handler-test1 .bf-list-paginator .page-btn.current').getText();
  getPageNextBtn = () => $('.bf-list-handler-test1 .bf-list-paginator .page-btn.next-btn');
  getPagePrevBtn = () => $('.bf-list-handler-test1 .bf-list-paginator .page-btn.prev-btn');
  getPaginatorBtn = (num) => $('.bf-list-handler-test1 bf-list-paginator .page-btn:nth-child(' + (num + 1) + ')');

  // List headers (to order)
  getListHeader = (num) => $('.bf-list-handler-test1 .list-header bf-list-header-col:nth-child(' + num + ')');

  // Return an object array with the displayed elements on the list
  getListArr = () => {
    return $$('.bf-list-handler-test1 .list-row:not(.list-row-placeholder)').map((rowEl, ind) => {
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
    const dropdownBtn = $('.bf-list-handler-test1 .page-num-selector .bf-dropdown .input-group-append');
    const ops = await $$('.bf-list-handler-test1 .page-num-selector .bf-dropdown .list-container .option-row');
    await dropdownBtn.click();
    await ops[pageNum].click();
  };

  getTextFilter = () => $('.bf-list-handler-test1 .filter-text input.form-control');
  getFilterUser = () => $('.bf-list-handler-test1 .filter-username input.form-control');
  getFilterEmail = () => $('.bf-list-handler-test1 .filter-email   input.form-control');
  getFilterName = () => $('.bf-list-handler-test1 .filter-name    input.form-control');
  loadMoreBtn = () => $('.bf-list-handler-test1 bf-btn.load-more-btn').click();
  loadLessBtn = () => $('.bf-list-handler-test1 bf-btn.load-less-btn').click();
}
