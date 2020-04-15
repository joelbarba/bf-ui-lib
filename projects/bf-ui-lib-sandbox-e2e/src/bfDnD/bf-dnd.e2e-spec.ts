import {BfDndPo} from './bf-dnd.po';
import {BfDnDMock} from './bf-dnd-mock';
import {$, $$} from "protractor";


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

    const dnd = new BfDnDMock();

    await dnd.drag(elem);
    await dnd.dragOver(container);
    await dnd.drop();
    expect(await page.getLastOp()).toBe('Orange dropped');

    await dnd.drag(page.getDraggable(1));
    await dnd.dragOver(container);
    await dnd.drop();
    expect(await page.getLastOp()).toBe('Banana dropped');

    // await page.dragAndDrop(elem, container);
    // expect(await page.getLastOp()).toBe('Orange dropped');
    //
    // await page.dragAndDrop(page.getDraggable(1), container);
    // expect(await page.getLastOp()).toBe('Banana dropped');

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
    const dnd = new BfDnDMock();

    await dnd.drag(elem);
    await dnd.dragOver(container);
    await dnd.dragOver();
    await dnd.drop();
    expect(await page.getLastOp()).toBe('Ups, that fell out');

    // await page.dragAndDrop(elem, container, { dragDelay: 10, dropDelay: 10, dropOut: true });
    // expect(await page.getLastOp()).toBe('Ups, that fell out');
  });
});


describe('Test BfDnD 2: Drop to a list to add', () => {
  let page: BfDndPo;

  beforeEach(async () => {
    page = new BfDndPo(2);
    await page.navigateTo();
  });

  it('Should drop items into list 1', async () => {
    const container1 = page.getContainer(0);
    const container2 = page.getContainer(1);

    const dnd = new BfDnDMock();

    await dnd.dragAndDrop(page.getDraggable(0), container1); // Add Orange list 1
    await dnd.dragAndDrop(page.getDraggable(0), container1); // Add Orange list 1
    await dnd.dragAndDrop(page.getDraggable(1), container1); // Add Banana list 1
    await dnd.dragAndDrop(page.getDraggable(2), container1); // Add Apple list 1

    let list = await page.getListItem(container1);
    expect(list.map(item => item.name)).toEqual([ '0. Orange', '1. Orange', '2. Banana', '3. Apple' ]);

    await list[1].remove();
    list = await page.getListItem(container1);
    expect(list.map(item => item.name)).toEqual([ '0. Orange', '2. Banana', '3. Apple' ]);
  });

  it('Should drop items into list 2', async () => {
    const container1 = page.getContainer(0);
    const container2 = page.getContainer(1);

    const dnd = new BfDnDMock();

    await dnd.dragAndDrop(page.getDraggable(1), container2); // Add Banana list 2
    await dnd.dragAndDrop(page.getDraggable(1), container2); // Add Banana list 2
    await dnd.dragAndDrop(page.getDraggable(1), container2); // Add Banana list 2

    const list = await page.getListItem(container2);
    expect(list.map(item => item.name)).toEqual(['0. Banana', '1. Banana', '2. Banana']);
  });

});


describe('Test BfDnD 3: Multiple drop containers', () => {
  let page: BfDndPo;

  beforeEach(async () => {
    page = new BfDndPo(3);
    await page.navigateTo();
  });

  it('Should drag over containers with nested mode off', async () => {
    const dnd = new BfDnDMock();
    const element = page.getDraggable(0);

    await dnd.drag(element);
    await dnd.dragOver(page.page3Cont1());
    expect(await page.getActiveContainer()).toBe('bf-drop-container-0');

    await dnd.dragOver(page.page3Cont2());
    expect(await page.getActiveContainer()).toBe('bf-drop-container-0');

    await dnd.dragOver(page.page3Cont3());
    expect(await page.getActiveContainer()).toBe('bf-drop-container-0');
  });

  it('Should drag over containers with nested mode on', async () => {
    const dnd = new BfDnDMock();
    const element = page.getDraggable(0);

    // Turn bfNestedContainers = true
    await page.nestedSwitch().click();

    await dnd.drag(element);
    await dnd.dragOver(page.page3Cont1());
    expect(await page.getActiveContainer()).toBe('bf-drop-container-0');

    await dnd.dragOver(page.page3Cont2());
    expect(await page.getActiveContainer()).toBe('bf-drop-container-1');

    await dnd.dragOver(page.page3Cont3());
    expect(await page.getActiveContainer()).toBe('bf-drop-container-2');
  });


});


describe('Test BfDnD 4: Drop Placeholders', () => {
  let page: BfDndPo;

  beforeEach(async () => {
    page = new BfDndPo(4);
    await page.navigateTo();
  });

  it('Should drag over closest placeholder in a vertical list', async () => {
    const dnd = new BfDnDMock();
    const element = page.getDraggable(0);
    const cont1 = page.getContainer(0);
    dnd.showPointer = true;

    await dnd.drag(element);
    await dnd.dragOver(cont1, { x: 120, y: 80 });
    expect(await page.getActiveContainer()).toBe('cont-1');
    expect(await page.getActivePlaceholder()).toBe('bf-drop-placeholder-0');

    await dnd.dragOver(cont1, { x: 120, y: 160 });
    expect(await page.getActivePlaceholder()).toBe('bf-drop-placeholder-1');
    await dnd.dragOver(cont1, { x: 120, y: 250 });
    expect(await page.getActivePlaceholder()).toBe('bf-drop-placeholder-2');
    await dnd.drop();
  });

  it('Should drag over closest placeholder in a 2d area', async () => {
    const dnd = new BfDnDMock();
    const element = page.getDraggable(1);
    const cont1 = page.getContainer(1);
    dnd.showPointer = true;

    await dnd.drag(element);
    await dnd.dragOver(cont1, { x: 450, y: 125 });
    expect(await page.getActiveContainer()).toBe('cont-2');
    expect(await page.getActivePlaceholder()).toBe('bf-drop-placeholder-4'); // (name = Placeholder 2)

    await dnd.dragOver(cont1, { x: 550, y: 125 });
    expect(await page.getActivePlaceholder()).toBe('bf-drop-placeholder-5'); // (name = Placeholder 3)

    await dnd.drop();
  });

  it('Should drag over closest placeholder in accurate mode', async () => {
    const dnd = new BfDnDMock();
    const element = page.getDraggable(1);
    const cont1 = page.getContainer(1);
    dnd.showPointer = true;

    await dnd.drag(element);
    await dnd.dragOver(cont1, { x: 360, y: 190 });
    expect(await page.getActivePlaceholder()).toBe('bf-drop-placeholder-4'); // (name = Placeholder 2)
    await dnd.dragOver();
    await dnd.drop();

    // Turn isAccurateMode = true
    await page.accurateSwitch().click();

    await dnd.drag(element);
    await dnd.dragOver(cont1, { x: 360, y: 190 });
    expect(await page.getActivePlaceholder()).toBe('bf-drop-placeholder-3'); // (name = Placeholder 1)

    await dnd.dragOver();
    await dnd.drop();
  });
});
