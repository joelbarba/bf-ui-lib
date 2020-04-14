import {BfDndPo} from './bf-dnd.po';

/* This is a test that includes:
    - BfDnDService
    - [bf-draggable]
    - [bf-drop-container]
    - [bf-drop-placeholder]
 */

describe('Test BfDnD 1: Simple dragging', () => {
  let page: BfDndPo;

  beforeEach(async () => {
    page = new BfDndPo(1);
    await page.navigateTo();
  });

  it('Should drag and drop inside the container', async () => {
    const elem = page.getDraggable(0);
    const container = page.getContainer(0);

    let res = await page.dragAndDrop(elem, container);
    expect(res).toBe('Orange dropped');

    res = await page.dragAndDrop(page.getDraggable(1), container);
    expect(res).toBe('Banana dropped');

    // None of these worked :(
    // await browser.actions().mouseMove(elem).perform();
    // await browser.actions().dragAndDrop(elem, target).perform();
    // await browser.actions().mouseUp().perform();

    // await browser.actions().mouseMove(elem).perform();
    // await browser.actions().mouseDown(elem).perform();
    // await browser.actions().mouseMove(target).perform();
    // await browser.actions().mouseUp().perform();
  });

  it('Should drag and drop outside', async () => {
    const elem = page.getDraggable(0);
    const container = page.getContainer(0);

    const res = await page.dragAndDrop(elem, container, { dragDelay: 10, dropDelay: 10, dropOut: true });
    expect(res).toBe('Ups, that fell out');
  });
});
