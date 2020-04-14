import {$, $$, browser} from 'protractor';
import {code} from 'html-dnd';

export class BfDndPo {
  base = 'app-bf-dnd-demo-1';
  pageUrl = '/BfDnD/example1';

  constructor(testNum = 1) {
    this.base = 'app-bf-dnd-demo-' + testNum;
    const pageUrl = '/BfDnD/example' + testNum;
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

  async dragAndDrop(bfDraggable, bfDropContainer, config = { dragDelay: 10, dropDelay: 10, dropOut: false }) {
    await browser.executeScript(code, bfDraggable, bfDropContainer, config);
    await browser.sleep(config.dragDelay + config.dropDelay + 10);
    return $('.last-op').getText(); // Use an html to store the result of the drag and drop
  }

}
