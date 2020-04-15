import {$, $$, browser} from 'protractor';
// import {code} from 'html-dnd';

export class BfDndPo {
  base = 'app-bf-dnd-demo-1';
  pageUrl = '/BfDnD/example1';

  constructor(testNum = 1) {
    this.base = 'app-bf-dnd-demo-' + testNum;
    this.pageUrl = '/BfDnD/example' + testNum;
  }

  navigateTo() {
    return browser.get(browser.baseUrl + this.pageUrl) as Promise<any>;
  }

  getDraggable(ind = 0) {
    const bfDraggables = $$(`.bf-draggable`);
    return bfDraggables.get(ind);
  }

  getContainer(ind = 0) {
    const bfDraggables = $$('.bf-drop-container');
    return bfDraggables.get(ind);
  }

  getActiveContainer = () => $('.demo-active-container-id').getText();
  getActivePlaceholder = () => $('.demo-active-placeholder-id').getText();


  // async dragAndDrop(bfDraggable, bfDropContainer, config = { dragDelay: 10, dropDelay: 10, dropOut: false }) {
  //   await browser.executeScript(code, bfDraggable, bfDropContainer, config);
  //   await browser.sleep(config.dragDelay + config.dropDelay + 10);
  // }


  // Example1:
  getLastOp = async () => $('.last-op').getText();

  // Example2:
  getListItem = async (container) => {
    return container.$$(`.list-item-row`).map((rowEl, ind) => {
      return {
        name : rowEl.$('.list-item').getText(),
        remove: () => rowEl.$('.bf-btn').click()
      };
    });
  };

  // Example 3
  page3Cont1 = () => $('.bf-drop-container.c1');
  page3Cont2 = () => $('.bf-drop-container.c2');
  page3Cont3 = () => $('.bf-drop-container.c3');
  nestedSwitch = () => $('.nested-mode-switch .bf-switch');

  // Example 4
  accurateSwitch = () => $('.accurate-mode-switch .bf-switch');

}
