import {BfLazyDropdownComponent} from './bf-lazy-dropdown.component';
import {BfUILibTransService} from '../abstract-translate.service';
import {Subject} from 'rxjs';
import {ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';



const EMPTY             = 0;
const PARTIALLY_LOADED  = 1;
const FULLY_LOADED      = 2;
const COMPLETELY_LOADED = 3;

class FakeElementRef {
  nativeElement = { scrollTo: () => {}, getBoundingClientRect: () => ({ bottom: 10 }), };
}
class FakeLiveAnnouncer { announce(msg) { return Promise.resolve(); } clear() {} }

describe('BfLazyDropdownComponent', () => {
  let component: BfLazyDropdownComponent;
  const translate = new BfUILibTransService();
  const elementRef = new FakeElementRef();
  const liveAnnouncer = new FakeLiveAnnouncer();

  // This is to mock the html rows inside the list
  const docFragment = document.createDocumentFragment();
  const mockEl = (ref) => { const el = document.createElement('div'); el.id = ref; return el as HTMLElement; };
  docFragment.appendChild(mockEl('ref-0'));
  docFragment.appendChild(mockEl('ref-1'));
  docFragment.appendChild(mockEl('ref-2'));
  docFragment.appendChild(mockEl('ref-3'));
  const children = docFragment.children;
  const getChild = (ind) => children.item(ind) as HTMLElement;


  beforeEach(() => {
    // @ts-ignore: Unreachable code error
    component = new BfLazyDropdownComponent(translate, elementRef, liveAnnouncer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      spyOn(component, 'setEmptyOption');
      spyOn(component, 'renderExtList');
      spyOn(component, 'renderLabels');
      spyOn(component, 'selectItem');
      spyOn(component, 'runValidation');
      spyOn(component, 'configFilter');
      spyOn(component, 'clearList');
    });
    it('should detect extCtrl$ and subscribe to it', () => {
      component.extCtrl$ = new Subject();
      component.ngOnChanges({ extCtrl$: {} });
      component.extCtrl$.next({ action: 'clearList' });
      expect(component.clearList).toHaveBeenCalled();
      component.subs.ctrlSubs.unsubscribe();
    });
    it('should detect bfRender, call setEmptyOption() + renderExtList() + renderLabels()', () => {
      component.ngOnChanges({ bfRender: {} });
      expect(component.setEmptyOption).toHaveBeenCalled();
      expect(component.renderExtList).toHaveBeenCalled();
      expect(component.renderLabels).toHaveBeenCalled();
    });
    it('should detect bfRenderFn, call setEmptyOption() + renderExtList() + renderLabels()', () => {
      component.ngOnChanges({ bfRenderFn: {} });
      expect(component.setEmptyOption).toHaveBeenCalled();
      expect(component.renderExtList).toHaveBeenCalled();
      expect(component.renderLabels).toHaveBeenCalled();
    });
    it('should detect bfTranslate, call setEmptyOption() + renderExtList() + renderLabels()', () => {
      component.ngOnChanges({ bfTranslate: {} });
      expect(component.setEmptyOption).toHaveBeenCalled();
      expect(component.renderExtList).toHaveBeenCalled();
      expect(component.renderLabels).toHaveBeenCalled();
    });
    it('should detect bfSelect, call selectItem if not empty and not first change', () => {
      component.isModelEmpty = false;
      component.ngOnChanges({ bfSelect: { firstChange: false} });
      expect(component.selectItem).toHaveBeenCalled();
    });
    it('should detect bfDisabled, and set isBfDisabledPresent', () => {
      component.bfDisabled = 'true';
      component.ngOnChanges({ bfDisabled: {} });
      expect(component.isBfDisabledPresent).toEqual(true);
    });
    it('should detect bfRequired, and call setEmptyOption()', () => {
      component.ngOnChanges({ bfRequired: {} });
      expect(component.setEmptyOption).toHaveBeenCalled();
    });
    it('should detect bfPlaceholder, and call renderLabels()', () => {
      component.ngOnChanges({ bfPlaceholder: {} });
      expect(component.renderLabels).toHaveBeenCalled();
    });
    it('should detect bfEmptyLabel, set $$label and call renderLabels()', () => {
      component.bfEmptyLabel = 'Empty';
      component.ngOnChanges({ bfEmptyLabel: {} });
      expect(component.renderLabels).toHaveBeenCalled();
      expect(component.emptyItem.$$label).toEqual('Empty');
    });
    it('should detect bfLoadingLabel and default its value if none', () => {
      component.bfLoadingLabel = '';
      component.ngOnChanges({ bfLoadingLabel: {} });
      expect(component.bfLoadingLabel).toEqual('views.dropdown.loading_more_items');
    });
    it('should detect bfErrorPos, and set errorPosition', () => {
      component.ngOnChanges({ bfErrorPos: {} });
      expect(component.errorPosition).toEqual('default');
    });
    it('should detect bfErrorText, and run validations if invalid', () => {
      component.isInvalid = true;
      component.ngOnChanges({ bfErrorText: {} });
      expect(component.runValidation).toHaveBeenCalled();
    });
    it('should detect bfErrorOnPristine, and run validations', () => {
      component.ngOnChanges({ bfErrorOnPristine: {} });
      expect(component.runValidation).toHaveBeenCalled();
    });
    it('should detect bfDebounce, and run configFilter()', () => {
      component.ngOnChanges({ bfDebounce: {} });
      expect(component.configFilter).toHaveBeenCalled();
    });
    it('should detect bfMinSearchLength, and run configFilter()', () => {
      component.ngOnChanges({ bfMinSearchLength: {} });
      expect(component.configFilter).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'fetchItems');
      spyOn(component, 'configFilter');
      spyOn(component, 'renderLabels');
    });
    it('should trigger fetchItems if bfFetchOn is ini', () => {
      component.bfFetchOn = 'ini';
      component.ngOnInit();
      expect(component.fetchItems).toHaveBeenCalled();
      expect(component.configFilter).toHaveBeenCalled();
      expect(component.renderLabels).toHaveBeenCalled();
    });
    it('should not trigger fetchItems if bfFetchOn is not ini', () => {
      component.bfFetchOn = 'focus';
      component.ngOnInit();
      expect(component.fetchItems).not.toHaveBeenCalled();
    });
  });

  describe('configFilter', () => {
    beforeEach(() => {
      spyOn(component, 'filterList');
    });
    it('should take bfDebounce and trigger filterList after that', (done) => {
      component.bfDebounce = '200';
      component.configFilter();
      component.onInputType$.next('abc');
      expect(component.filterList).not.toHaveBeenCalled();
      setTimeout(() => {
        expect(component.filterList).toHaveBeenCalled();
        component.ngOnDestroy();
        done();
      }, 250);
    });
    it('should take bfMinSearchLength and avoid triggering if shorter', (done) => {
      component.bfMinSearchLength = '3';
      component.configFilter();
      component.onInputType$.next('12');
      setTimeout(() => {
        expect(component.filterList).not.toHaveBeenCalled();
        component.onInputType$.next('123');
        setTimeout(() => {
          expect(component.filterList).toHaveBeenCalled();
          component.ngOnDestroy();
          done();
        }, 350);
      }, 350);
    });
  });

  describe('renderLabels', () => {
    beforeEach(() => {
      spyOn(component, 'setModelText');
      spyOn(translate, 'doTranslate').and.callFake(val => 'trans-' + val);
      spyOn(component, 'renderItem').and.callFake(() => ({ $$label: 'label', $$renderedText: 'myText' }));
      component.emptyItem.$$label = 'empty';
      component.bfPlaceholder = 'placeholder';
    });
    it('should translate empty item and placeholder', () => {
      component.renderLabels();
      expect(component.emptyItem.$$renderedText).toEqual('trans-empty');
      expect(component.renderedPlaceholder).toEqual('trans-placeholder');
    });
    it('should set the model text for the empty item', () => {
      component.renderLabels();
      expect(component.setModelText).toHaveBeenCalledWith('trans-empty');
    });
    it('should set the model text for the selected item', () => {
      component.bfModel = { id: '123' };
      component.renderLabels();
      expect(component.setModelText).toHaveBeenCalledWith('myText');
    });
  });

  describe('fetchItems', () => {
    beforeEach(() => {
      spyOn(component, 'scrollToLoading');
      spyOn(component, 'scrollToCandidate');
      spyOn(component, 'renderExtList');
      spyOn(component, 'clearList');
      spyOn(component, 'setModelText');
      spyOn(component, 'generateUniqueId').and.callFake(tag => tag);
      component.extList = [{ id: '1', $$idRef: 'zzz' }];
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.listContainer = new ElementRef(nativeEl);
    });
    it('should skip the fetch if loading', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [], count: 0 }));
      component.isLoading = true;
      component.fetchingPromise = Promise.resolve();
      const res = component.fetchItems();
      expect(component.fetchingPromise).toEqual(res);
      expect(component.bfLazyLoadFn).not.toHaveBeenCalled();
      done();
    });
    it('should skip the fetch if fully loaded', () => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [], count: 0 }));
      component.status = FULLY_LOADED;
      component.fetchItems();
      expect(component.bfLazyLoadFn).not.toHaveBeenCalled();
    });
    it('should defer a scroll to the bottom if the list is expanded', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [], count: 0 }));
      component.isExpanded = true;
      component.fetchItems();
      setTimeout(() => {
        expect(component.scrollToLoading).toHaveBeenCalled();
        done();
      }, 10);
      expect(component.scrollToLoading).not.toHaveBeenCalled();
    });
    it('should call bfLazyLoadFn with all its parameters', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [], count: 0 }));
      component.searchTxt = 'abc';
      component.fetchItems();
      expect(component.bfLazyLoadFn).toHaveBeenCalledWith({
        filter     : 'abc',
        offset     : 1,
        items      : [{ id: '1' }],
        isPristine : true,
        status     : EMPTY,
        ngModel    : undefined,
      });
      setTimeout(() => { expect(component.renderExtList).toHaveBeenCalled(); done(); });
    });
    it('should set the bfLoading on and off', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [], count: 0 }));
      component.fetchItems();
      expect(component.isLoading).toEqual(true);
      setTimeout(() => {
        expect(component.isLoading).toEqual(false);
        done();
      });
    });
    it('should set a partially load status', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [{ id: '2' }], count: 10 }));
      component.fetchItems();
      setTimeout(() => { expect(component.status).toEqual(PARTIALLY_LOADED); done(); });
    });
    it('should set a fully load status when filtered list is all loaded', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [{ id: '2' }], count: 2 }));
      component.searchTxt = 'abc';
      component.fetchItems();
      setTimeout(() => { expect(component.status).toEqual(FULLY_LOADED); done(); });
    });
    it('should set a completely load status when a non filtered list is all loaded', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [{ id: '2' }], count: 2 }));
      component.fetchItems();
      setTimeout(() => { expect(component.status).toEqual(COMPLETELY_LOADED); done(); });
    });
    it('should clear the list when override param is sent back', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [], count: 2, override: true }));
      component.fetchItems();
      setTimeout(() => { expect(component.clearList).toHaveBeenCalled(); done(); });
    });
    it('should clear the candidate if it is not into the new list', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [{ id: '2' }], count: 2 }));
      component.bfCandidate = { id: '3' };
      component.fetchItems();
      setTimeout(() => { expect(component.bfCandidate).toEqual(null); done(); });
    });
    it('should match the model if that is found in the new list', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [{ id: '2' }], count: 2 }));
      component.bfModel = { id: '2', $$idRef: 'any' };
      component.fetchItems();
      setTimeout(() => {
        expect(component.setModelText).toHaveBeenCalled();
        expect(component.bfCandidate).toEqual({ id: '2' });
        done();
      });
    });
    it('should keep the model with no pointers if no match', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.resolve({ items: [{ id: '2' }], count: 2 }));
      component.bfModel = { id: '3', $$idRef: 'any', $$index: 10 };
      component.fetchItems();
      setTimeout(() => {
        expect(component.bfModel).toEqual({ id: '3', $$idRef: null, $$index: null });
        done();
      });
    });
    it('should set the loading off when bfLazyLoadFn is rejected', (done) => {
      spyOn(component, 'bfLazyLoadFn').and.callFake(() => Promise.reject());
      component.fetchItems();
      setTimeout(() => {
        expect(component.isLoading).toEqual(false);
        done();
      });
    });
  });

  describe('clearList', () => {
    beforeEach(() => {
      spyOn(component, 'setEmptyOption');
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.listContainer = new ElementRef(nativeEl);
      spyOn(component.listContainer.nativeElement, 'scrollTo');
    });
    it('should remove extList', () => {
      component.extList = [{ id: '1' }];
      component.clearList();
      expect(component.extList).toEqual([]);
    });
    it('should set empty option and status EMPTY', () => {
      component.status = FULLY_LOADED;
      component.clearList();
      expect(component.status).toEqual(EMPTY);
      expect(component.setEmptyOption).toHaveBeenCalled();
    });
    it('should scroll the list to the top', () => {
      component.clearList();
      expect(component.listContainer.nativeElement.scrollTo).toHaveBeenCalled();
    });
  });

  describe('filterList', () => {
    beforeEach(() => {
      spyOn(component, 'frontEndFilter');
      spyOn(component, 'clearList');
      spyOn(component, 'expandList');
      spyOn(component, 'fetchItems').and.callFake(() => Promise.resolve());
    });
    it('should perform a front end filter when completely loaded', () => {
      component.status = COMPLETELY_LOADED;
      component.filterList('abc');
      expect(component.frontEndFilter).toHaveBeenCalledWith('abc');
      expect(component.expandList).toHaveBeenCalled();
    });
    it('should not filter if the filter has not changed', () => {
      component.searchTxt = 'abc';
      component.filterList('abc');
      expect(component.fetchItems).not.toHaveBeenCalled();
    });
    it('should clear the list and fetch items when partially loaded', (done) => {
      component.filterList('abc');
      expect(component.isLoading).toEqual(false);
      expect(component.clearList).toHaveBeenCalled();
      expect(component.fetchItems).toHaveBeenCalled();
      done();
    });
    it('should expand the list after the filter is completed', (done) => {
      component.filterList('abc');
      setTimeout(() => {
        expect(component.expandList).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('frontEndFilter', () => {
     const fakeList = [
      { id: '1', $$index: 1, $$isLast: false, $$renderedText: 'one' },
      { id: '2', $$index: 2, $$isLast: false, $$renderedText: 'two' },
      { id: '3', $$index: 3, $$isLast: true,  $$renderedText: 'three' }
    ];
    beforeEach(() => {
      spyOn(component, 'expandList');
      component.status = COMPLETELY_LOADED;
      component.extList = fakeList;
    });
    it('should not do anything if the status is not completely loaded', () => {
      component.status = EMPTY;
      component.frontEndFilter('one');
      expect(component.extList).toEqual(fakeList);
    });
    it('should set the $$isMatch value on every item', () => {
      component.frontEndFilter('oNe');
      expect(component.extList.map(i => i.$$isMatch)).toEqual([true, false, false]);
    });
    it('should resequence the $$index and $$isLast', () => {
      component.frontEndFilter('t');
      expect(component.extList).toEqual([
        { id: '1', $$isMatch: false, $$index: null, $$isLast: false, $$renderedText: 'one' },
        { id: '2', $$isMatch: true,  $$index: 1,    $$isLast: false, $$renderedText: 'two' },
        { id: '3', $$isMatch: true,  $$index: 2,    $$isLast: true,  $$renderedText: 'three' }
      ]);
    });
    it('should reassign the bfCandidate to the first match', () => {
      component.bfCandidate = component.extList[1];
      component.frontEndFilter('e');
      expect(component.bfCandidate).toEqual(component.extList[0]);
    });
  });

  describe('renderExtList', () => {
    beforeEach(() => {
      spyOn(component, 'frontEndFilter');
      spyOn(component, 'renderItem').and.callFake(() => ({ $$label: 'label', $$renderedText: 'abc' }));
      component.extList = [{ id: 1 }, { id: 2 }, { id: 3 }];
      component.componentId = 'comp';
    });
    it('should not do anything if there is no extList', () => {
      spyOn(component, 'getLoadedItems');
      component.extList = null;
      component.renderExtList();
      expect(component.getLoadedItems).not.toHaveBeenCalled();
    });
    it('should set all the $$ properties', () => {
      component.renderExtList();
      expect(component.extList[0]).toEqual({ id: 1,
        $$index        : 1,
        $$idRef        : 'comp-item-1',
        $$img          : null,
        $$icon         : null,
        $$isMatch      : true,
        $$isLast       : false,
        $$label        : 'label',
        $$renderedText : 'abc',
      });
    });
    it('should trigger a front end filter if completely loaded', () => {
      component.status = COMPLETELY_LOADED;
      component.renderExtList();
      expect(component.frontEndFilter).toHaveBeenCalled();
    });
  });

  describe('renderItem', () => {
    beforeEach(() => {
      spyOn(translate, 'doTranslate').and.callFake(val => 'trans-' + val);
    });
    it('should render a label and non translated text', () => {
      component.bfRender = 'label';
      const item = { label: 'view.test' };
      const result = component.renderItem(item);
      expect(result).toEqual({ $$label: 'view.test', $$renderedText: 'view.test' });
    });
    it('should render a label and a translated text', () => {
      component.bfTranslate = true;
      component.bfRender = 'label';
      const item = { label: 'view.test' };
      const result = component.renderItem(item);
      expect(result).toEqual({ $$label: 'view.test', $$renderedText: 'trans-view.test' });
    });
    it('should render using bfRenderFn to set the translated text', () => {
      component.bfRenderFn = () => 'rendered value';
      const result = component.renderItem({ label: 'view.test' });
      expect(result.$$renderedText).toEqual('rendered value');
    });
  });

  describe('setEmptyOption', () => {
    beforeEach(() => {
      spyOn(component, 'runValidation');
      spyOn(translate, 'doTranslate').and.callFake(val => 'trans-' + val);
      component.extList = [{ id: '1' }, { id: '2' }];
    });
    it('should add the empty option to the list if not required', () => {
      component.bfRequired = false;
      component.setEmptyOption();
      expect(component.extList[0]).toEqual(component.emptyItem);
      expect(component.emptyItem.$$renderedText).toEqual('trans-view.common.empty');
    });
    it('should remove the empty option to the list if not required', () => {
      component.bfRequired = true;
      component.extList.unshift(component.emptyItem);
      component.setEmptyOption();
      expect(component.extList[0]).not.toEqual(component.emptyItem);
    });
    it('should run the validations', () => {
      component.setEmptyOption();
      expect(component.runValidation).toHaveBeenCalled();
    });
  });

  describe('expandList', () => {
    beforeEach(() => {
      spyOn(component, 'announceError');
      spyOn(component, 'scrollToCandidate');
      spyOn(elementRef.nativeElement, 'scrollTo');
      spyOn(elementRef.nativeElement, 'getBoundingClientRect');
      component.bfCustomPlacementList = 'bottom';
    });
    it('should do nothing if already expanded', () => {
      component.isExpanded = true;
      component.expandList();
      expect(component.announceError).not.toHaveBeenCalled();
    });
    it('should expand upward if it is force as such', () => {
      component.bfCustomPlacementList = 'top';
      component.expandList();
      expect(component.expandUpward).toEqual(true);
    });
    it('should set the expand flag and the search text', () => {
      component.searchTxt = 'abcd';
      component.expandList();
      expect(component.isExpanded).toEqual(true);
      expect(component.inputText).toEqual('abcd');
    });
    it('should set the bfCandidate to the current model', () => {
      component.bfModel = { id: '1', $$idRef: 'ref-1' };
      component.expandList();
      expect(component.bfCandidate).toEqual(component.bfModel);
    });
    it('should scroll to the current candidate', (done) => {
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.listContainer = new ElementRef(nativeEl);
      const rect = { height: 100, width: 20, x: 5, y: 6, bottom: 0, left: 0, right: 0, top: 0, toJSON: () => {} };
      spyOn(component.listContainer.nativeElement, 'getBoundingClientRect').and.returnValue(rect);
      component.expandList();
      setTimeout(() => {
        expect(component.listHeight).toEqual(100);
        expect(component.scrollToCandidate).toHaveBeenCalled();
        done();
      }, 10);
    });
  });

  describe('collapseList', () => {
    beforeEach(() => {
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.listContainer = new ElementRef(nativeEl);
      spyOn(component.listContainer.nativeElement, 'scrollTo');
      component.inputText = '';
      component.selModelText = 'test';
      component.isExpanded = true;
    });
    it('should ignore it if already collapsed', () => {
      component.isExpanded = false;
      component.collapseList();
      expect(component.inputText).toEqual('');
    });
    it('should set back the selected item text on the input', () => {
      component.collapseList();
      expect(component.inputText).toEqual('test');
    });
    it('should scroll to the top', () => {
      component.collapseList();
      expect(component.listContainer.nativeElement.scrollTo).toHaveBeenCalled();
    });
  });

  describe('deferExpand', () => {
    beforeEach(() => {
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.elInput = new ElementRef(nativeEl);
      spyOn(component.elInput.nativeElement, 'focus');
    });
    it('should focus the input in the next cycle', (done) => {
      component.deferExpand();
      setTimeout(() => {
        expect(component.elInput.nativeElement.focus).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('deferCollapse', () => {
    beforeEach(() => {
      spyOn(component, 'collapseList');
    });
    it('should collapse the list after 100 ms', (done) => {
      component.deferCollapse();
      setTimeout(() => { expect(component.collapseList).toHaveBeenCalled(); done(); }, 110);
    });
    it('should no collapse if bfAutoCollapse is false', (done) => {
      component.bfAutoCollapse = false;
      component.deferCollapse();
      setTimeout(() => { expect(component.collapseList).not.toHaveBeenCalled(); done(); }, 110);
    });
  });

  describe('onInputType', () => {
    it('should trigger onInputType$ and bfOnTyping', () => {
      spyOn(component.onInputType$, 'next');
      spyOn(component.bfOnTyping, 'emit');
      component.onInputType('123');
      expect(component.onInputType$.next).toHaveBeenCalledWith('123');
      expect(component.bfOnTyping.emit).toHaveBeenCalledWith('123');
    });
  });

  describe('onInputFocusIn', () => {
    beforeEach(() => {
      spyOn(component, 'expandList');
      spyOn(component, 'fetchItems');
    });
    it('should set the focus on', () => {
      component.onInputFocusIn();
      expect(component.isFocus).toEqual(true);
    });
    it('should fetch items if empty and bfFetchOn is focus', () => {
      component.status = EMPTY;
      component.bfFetchOn = 'focus';
      component.onInputFocusIn();
      expect(component.fetchItems).toHaveBeenCalled();
    });
    it('should expand the list', () => {
      component.onInputFocusIn();
      expect(component.expandList).toHaveBeenCalled();
    });
  });

  describe('onInputFocusOut', () => {
    it('should set focus off and defer the collapse', () => {
      spyOn(component, 'deferCollapse');
      component.onInputFocusOut();
      expect(component.isFocus).toEqual(false);
      expect(component.deferCollapse).toHaveBeenCalled();
    });
  });

  describe('onInputBtnClick', () => {
    beforeEach(() => {
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.elInput = new ElementRef(nativeEl);
      spyOn(component.elInput.nativeElement, 'focus');
      spyOn(component, 'expandList');
      spyOn(component, 'collapseList');
    });
    it('should expand the list if it is collapsed', () => {
      component.onInputBtnClick();
      expect(component.elInput.nativeElement.focus).toHaveBeenCalled();
      expect(component.expandList).toHaveBeenCalled();
    });
    it('should collapse the list if it is expanded', () => {
      component.isExpanded = true;
      component.onInputBtnClick();
      expect(component.collapseList).toHaveBeenCalled();
    });
  });

  describe('onResetFilter', () => {
    beforeEach(() => {
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.elInput = new ElementRef(nativeEl);
      spyOn(component.elInput.nativeElement, 'focus');
      spyOn(component, 'filterList');
    });
    it('should reset the filter and clear the input text', () => {
      component.onResetFilter();
      expect(component.filterList).toHaveBeenCalled();
      expect(component.inputText).toEqual('');
    });
    it('should focus the input', () => {
      component.onResetFilter();
      expect(component.elInput.nativeElement.focus).toHaveBeenCalled();
    });
    it('should disable the bfAutoCollapse for 120 ms', (done) => {
      component.bfAutoCollapse = true;
      component.onResetFilter();
      expect(component.bfAutoCollapse).toEqual(false);
      setTimeout(() => {
        expect(component.bfAutoCollapse).toEqual(true); done();
      }, 130);
    });
  });

  describe('onScroll', () => {
    beforeEach(() => {
      spyOn(component, 'fetchItems');
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.listContainer = new ElementRef(nativeEl);
      spyOnProperty(component.listContainer.nativeElement, 'clientHeight').and.returnValue(10);
      spyOnProperty(component.listContainer.nativeElement, 'scrollTop').and.returnValue(15);
      component.isExpanded = true;
    });
    it('should do nothing if the list is not expanded', () => {
      spyOnProperty(component.listContainer.nativeElement, 'scrollHeight').and.returnValue(100);
      component.isExpanded = false;
      component.onScroll();
      expect(component.fetchItems).not.toHaveBeenCalled();
    });
    it('should do nothing if not scrolling to the bottom', () => {
      spyOnProperty(component.listContainer.nativeElement, 'scrollHeight').and.returnValue(100);
      component.onScroll();
      expect(component.fetchItems).not.toHaveBeenCalled();
    });
    it('should fetch items if scrolling to the bottom', () => {
      spyOnProperty(component.listContainer.nativeElement, 'scrollHeight').and.returnValue(20);
      component.bfCandidate = { id: '1' };
      component.onScroll();
      expect(component.fetchItems).toHaveBeenCalled();
    });
    it('should set the candidate to the last item if not fully loaded', () => {
      spyOnProperty(component.listContainer.nativeElement, 'scrollHeight').and.returnValue(20);
      component.extList = [{ id: '1' }, { id: '2' }, { id: '3', $$isLast: true }];
      component.onScroll();
      expect(component.bfCandidate).toEqual({ id: '3', $$isLast: true });
    });
  });

  describe('onMouseEnter', () => {
    const event = new MouseEvent('click');
    beforeEach(() => {
      component.extList = [{ id: '1', $$idRef: 'ref-1' }, { id: '2', $$idRef: 'ref-2' }];
      spyOnProperty(event, 'target').and.returnValue({ getAttribute: () => 'ref-1' });
    });
    it('should do nothing if ignore mouse is on', () => {
      component.ignoreMouse = true;
      component.onMouseEnter(event);
      expect(component.bfCandidate).toBeFalsy();
    });
    it('should set the bfCandidate to the event target', () => {
      component.onMouseEnter(event);
      expect(component.bfCandidate).toEqual(component.extList[0]);
    });
  });

  describe('onMouseLeave', () => {
    beforeEach(() => {
      component.bfCandidate = { id: '1' };
    });
    it('should do nothing if ignore mouse is on', () => {
      component.ignoreMouse = true;
      component.onMouseLeave();
      expect(component.bfCandidate).toEqual({ id: '1' });
    });
    it('should reset the bfCandidate', () => {
      component.ignoreMouse = false;
      component.onMouseLeave();
      expect(component.bfCandidate).toEqual(null);
    });
  });

  describe('onKeyDown', () => {
    const event = new KeyboardEvent('keydown');
    beforeEach(() => {
      spyOn(component, 'onEscKey');
      spyOn(component, 'onTabKey');
      spyOn(component, 'onEnterKey');
      spyOn(component, 'activateNextItem');
      spyOn(component, 'activatePrevItem');
      spyOn(component, 'activateLastItem');
      spyOn(component, 'activateFirstItem');
    });
    const testKey = (key, fn, param?) => {
      spyOnProperty(event, 'key').and.returnValue(key);
      component.onKeyDown(event);
      if (param) { expect(fn).toHaveBeenCalledWith(param); }
      else       { expect(fn).toHaveBeenCalled(); }
    };
    it('should handle Escape key',    () => testKey('Escape',    component.onEscKey));
    it('should handle Tab key',       () => testKey('Tab',       component.onTabKey));
    it('should handle Enter key',     () => testKey('Enter',     component.onEnterKey));
    it('should handle ArrowDown key', () => testKey('ArrowDown', component.activateNextItem));
    it('should handle ArrowUp key',   () => testKey('ArrowUp',   component.activatePrevItem));
    it('should handle PageDown key',  () => testKey('PageDown',  component.activateNextItem, 8));
    it('should handle PageUp key',    () => testKey('PageUp',    component.activatePrevItem, 8));
    it('should handle End key',       () => testKey('End',       component.activateLastItem));
    it('should handle Home key',      () => testKey('Home',      component.activateFirstItem));
    it('should ignore End key when input text is not empty', () => {
      spyOnProperty(event, 'key').and.returnValue('End');
      component.inputText = 'abc';
      component.onKeyDown(event);
      expect(component.activateLastItem).not.toHaveBeenCalled();
    });
    it('should ignore Home key when input text is not empty', () => {
      spyOnProperty(event, 'key').and.returnValue('Home');
      component.inputText = 'abc';
      component.onKeyDown(event);
      expect(component.activateFirstItem).not.toHaveBeenCalled();
    });
  });

  describe('onEscKey', () => {
    beforeEach(() => {
      spyOn(component, 'collapseList');
      component.selModelText = 'abc';
    });
    it('should ignore and not collapse if already collapsed', () => {
      component.isExpanded = false;
      component.onEscKey();
      expect(component.collapseList).not.toHaveBeenCalled();
    });
    it('should collapse the list and set the selected model text back', () => {
      component.isExpanded = true;
      component.onEscKey();
      expect(component.collapseList).toHaveBeenCalled();
      expect(component.inputText).toEqual('abc');
    });
  });

  describe('onEnterKey', () => {
    beforeEach(() => {
      spyOn(component, 'expandList');
      spyOn(component, 'collapseList');
      spyOn(component, 'selectItem');
    });
    it('should expand the list if it is collapsed', () => {
      component.isExpanded = false;
      component.onEnterKey();
      expect(component.expandList).toHaveBeenCalled();
    });
    it('should collapse the list if it is expanded', () => {
      component.isExpanded = true;
      component.onEnterKey();
      expect(component.collapseList).toHaveBeenCalled();
    });
    it('should select the candidate when expanding the list', () => {
      component.isExpanded = true;
      component.bfCandidate = { id: '1' };
      component.onEnterKey();
      expect(component.selectItem).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('onTabKey', () => {
    const event = { preventDefault: () => {}};
    beforeEach(() => {
      spyOn(component, 'collapseList');
      spyOn(component, 'selectItem');
    });
    it('should do nothing if not expanded', () => {
      component.isExpanded = false;
      component.onTabKey(event);
      expect(component.collapseList).not.toHaveBeenCalled();
    });
  });

  describe('activateNextItem', () => {
    const fakeList = [
      { id: 0, $$index: 0, $$isMatch: true, },
      { id: 1, $$index: 1, $$isMatch: true, },
      { id: 2, $$index: 2, $$isMatch: true, },
      { id: 3, $$index: 3, $$isMatch: true, },
      { id: 4, $$index: 4, $$isMatch: true, $$isLast: true },
    ];
    beforeEach(() => {
      spyOn(component, 'fetchItems');
      spyOn(component, 'selectItem');
      spyOn(component, 'scrollToCandidate');
      component.extList = fakeList;
    });
    it('should set the first candidate if none yet', () => {
      component.activateNextItem();
      expect(component.bfCandidate).toEqual(component.extList[0]);
    });
    it('should set no candidate if there are no matches', () => {
      component.extList = fakeList.map(i => ({ ...i, $$isMatch: false, $$index: null }));
      component.activateNextItem();
      expect(component.bfCandidate).toEqual(null);
    });
    it('should set the next candidate of the sequence', () => {
      component.bfCandidate = component.extList[0];
      component.activateNextItem(); expect(component.bfCandidate).toEqual(component.extList[1]);
      component.activateNextItem(); expect(component.bfCandidate).toEqual(component.extList[2]);
      component.activateNextItem(); expect(component.bfCandidate).toEqual(component.extList[3]);
      component.activateNextItem(); expect(component.bfCandidate).toEqual(component.extList[4]);
    });
    it('should keep the same candidate if that was the last one', () => {
      component.bfCandidate = component.extList[4];
      component.activateNextItem();
      expect(component.bfCandidate).toEqual(component.extList[4]);
    });
    it('should set the next candidate that is a match of the sequence', () => {
      component.bfCandidate = component.extList[0];
      component.extList = [
        { id: 0, $$index: 0,    $$isMatch: true,  },
        { id: 1, $$index: null, $$isMatch: false, },
        { id: 2, $$index: null, $$isMatch: false, },
        { id: 3, $$index: 1,    $$isMatch: true, $$isLast: true },
        { id: 4, $$index: null, $$isMatch: false  },
      ];
      component.activateNextItem(); expect(component.bfCandidate).toEqual(component.extList[3]);
      component.activateNextItem(); expect(component.bfCandidate).toEqual(component.extList[3]);
    });
    it('should increase by more than one on the matching sequence', () => {
      component.bfCandidate = component.extList[0];
      component.extList = [
        { id: 0, $$index: 0,    $$isMatch: true, },
        { id: 1, $$index: null, $$isMatch: false },
        { id: 2, $$index: null, $$isMatch: false },
        { id: 3, $$index: 1,    $$isMatch: true  },
        { id: 4, $$index: null, $$isMatch: false },
        { id: 5, $$index: 2,    $$isMatch: true  },
        { id: 6, $$index: 3,    $$isMatch: true  },
        { id: 7, $$index: 4,    $$isMatch: true  },
        { id: 8, $$index: null, $$isMatch: false },
        { id: 9, $$index: 5,    $$isMatch: true, $$isLast: true },
      ];
      component.activateNextItem(3); expect(component.bfCandidate).toEqual(component.extList[6]);
      component.activateNextItem(5); expect(component.bfCandidate).toEqual(component.extList[9]);
    });
    it('should fetch items if setting the last candidate', () => {
      component.bfCandidate = component.extList[3];
      component.activateNextItem();
      expect(component.fetchItems).toHaveBeenCalled();
    });
    it('should select the candidate item if the list is not expanded', () => {
      component.isExpanded = false;
      component.bfCandidate = component.extList[3];
      component.activateNextItem();
      expect(component.selectItem).toHaveBeenCalled();
    });
    it('should scroll to the candidate', () => {
      component.activateNextItem();
      expect(component.scrollToCandidate).toHaveBeenCalled();
    });
  });

  describe('activatePrevItem', () => {
    const fakeList = [
      { id: 0, $$index: 0, $$isMatch: true, },
      { id: 1, $$index: 1, $$isMatch: true, },
      { id: 2, $$index: 2, $$isMatch: true, },
      { id: 3, $$index: 3, $$isMatch: true, },
      { id: 4, $$index: 4, $$isMatch: true, $$isLast: true },
    ];
    beforeEach(() => {
      spyOn(component, 'fetchItems');
      spyOn(component, 'selectItem');
      spyOn(component, 'scrollToCandidate');
      component.extList = fakeList;
    });
    it('should set the first candidate if none yet', () => {
      component.activatePrevItem();
      expect(component.bfCandidate).toEqual(component.extList[0]);
    });
    it('should set no candidate if there are no matches', () => {
      component.extList = fakeList.map(i => ({ ...i, $$isMatch: false, $$index: null }));
      component.activatePrevItem();
      expect(component.bfCandidate).toEqual(null);
    });
    it('should set the previous candidate of the sequence', () => {
      component.bfCandidate = component.extList[4];
      component.activatePrevItem(); expect(component.bfCandidate).toEqual(component.extList[3]);
      component.activatePrevItem(); expect(component.bfCandidate).toEqual(component.extList[2]);
      component.activatePrevItem(); expect(component.bfCandidate).toEqual(component.extList[1]);
      component.activatePrevItem(); expect(component.bfCandidate).toEqual(component.extList[0]);
    });
    it('should keep the same candidate if that was the first one', () => {
      component.bfCandidate = component.extList[0];
      component.activatePrevItem();
      expect(component.bfCandidate).toEqual(component.extList[0]);
    });
    it('should set the previous candidate that is a match of the sequence', () => {
      component.extList = [
        { id: 0, $$index: 0,    $$isMatch: true,  },
        { id: 1, $$index: null, $$isMatch: false, },
        { id: 2, $$index: null, $$isMatch: false, },
        { id: 3, $$index: 1,    $$isMatch: true, $$isLast: true },
        { id: 4, $$index: null, $$isMatch: false  },
      ];
      component.bfCandidate = component.extList[3];
      component.activatePrevItem(); expect(component.bfCandidate).toEqual(component.extList[0]);
      component.activatePrevItem(); expect(component.bfCandidate).toEqual(component.extList[0]);
    });
    it('should decrease by more than one on the matching sequence', () => {
      component.extList = [
        { id: 0, $$index: 0,    $$isMatch: true, },
        { id: 1, $$index: null, $$isMatch: false },
        { id: 2, $$index: null, $$isMatch: false },
        { id: 3, $$index: 1,    $$isMatch: true  },
        { id: 4, $$index: null, $$isMatch: false },
        { id: 5, $$index: 2,    $$isMatch: true  },
        { id: 6, $$index: 3,    $$isMatch: true  },
        { id: 7, $$index: null, $$isMatch: false },
        { id: 8, $$index: 4,    $$isMatch: true  },
        { id: 9, $$index: 5,    $$isMatch: true, $$isLast: true },
      ];
      component.bfCandidate = component.extList[9];
      component.activatePrevItem(3); expect(component.bfCandidate).toEqual(component.extList[5]);
      // component.activatePrevItem(5); expect(component.bfCandidate).toEqual(component.extList[0]);
    });
    it('should select the candidate item if the list is not expanded', () => {
      component.isExpanded = false;
      component.activatePrevItem();
      expect(component.selectItem).toHaveBeenCalled();
    });
    it('should scroll to the candidate', () => {
      component.activatePrevItem();
      expect(component.scrollToCandidate).toHaveBeenCalled();
    });
  });

  describe('activateLastItem', () => {
    beforeEach(() => {
      spyOn(component, 'fetchItems');
      spyOn(component, 'scrollToCandidate');
      component.extList = [
        { id: 0, $$index: 0, $$isMatch: true, },
        { id: 1, $$index: 1, $$isMatch: true, },
        { id: 2, $$index: 2, $$isMatch: true, $$isLast: true },
      ];
    });
    it('should set the last candidate', () => {
      component.activateLastItem();
      expect(component.bfCandidate).toEqual(component.extList[2]);
    });
    it('should set the candidate to null if no matches', () => {
      component.extList.forEach(i => { i.$$isLast = false; });
      component.activateLastItem();
      expect(component.bfCandidate).toEqual(null);
    });
    it('should fetch items and scroll to candidate', () => {
      component.activateLastItem();
      expect(component.fetchItems).toHaveBeenCalled();
      expect(component.scrollToCandidate).toHaveBeenCalled();
    });
  });

  describe('activateFirstItem', () => {
    beforeEach(() => {
      spyOn(component, 'scrollToCandidate');
      component.extList = [
        { id: 0, $$index: 0, $$isMatch: true, },
        { id: 1, $$index: 1, $$isMatch: true, },
        { id: 2, $$index: 2, $$isMatch: true, $$isLast: true },
      ];
    });
    it('should set the first candidate', () => {
      component.bfCandidate = component.extList[2];
      component.activateFirstItem();
      expect(component.bfCandidate).toEqual(component.extList[0]);
    });
    it('should set the candidate to null if no matches', () => {
      component.extList.forEach(i => { i.$$isMatch = false; i.$$index = null; });
      component.activateFirstItem();
      expect(component.bfCandidate).toEqual(null);
    });
    it('should scroll to candidate', () => {
      component.activateFirstItem();
      expect(component.scrollToCandidate).toHaveBeenCalled();
    });
  });

  describe('getFirstMatch', () => {
    it('should find the first match', () => {
      component.extList = [
        { id: 0, $$index: 0, $$isMatch: false, },
        { id: 1, $$index: 1, $$isMatch: true,  },
        { id: 2, $$index: 2, $$isMatch: true,  },
      ];
      expect(component.getFirstMatch()).toEqual(component.extList[1]);
    });
    it('should return null if no match', () => {
      component.extList = [
        { id: 0, $$index: 0, $$isMatch: false, },
        { id: 1, $$index: 1, $$isMatch: false, },
      ];
      expect(component.getFirstMatch()).toEqual(null);
    });
  });

  describe('scrollToCandidate', () => {
    beforeEach(() => {
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.listContainer = new ElementRef(nativeEl);
      spyOnProperty(component.listContainer.nativeElement, 'children').and.returnValue(children);
      spyOn(component, 'scrollItemIntoView');
      component.extList = [
        { id: 0, $$idRef: 'ref-0' },
        { id: 1, $$idRef: 'ref-1' },
        { id: 2, $$idRef: 'ref-2', $$isLast: true },
      ];
    });
    it('should not scroll if not expanded', () => {
      component.bfCandidate = component.extList[2];
      component.scrollToCandidate();
      expect(component.scrollItemIntoView).not.toHaveBeenCalled();
    });
    it('should not scroll if no candidate', () => {
      component.isExpanded = true;
      component.scrollToCandidate();
      expect(component.scrollItemIntoView).not.toHaveBeenCalled();
    });
    it('should scroll to the target element', () => {
      component.bfCandidate = component.extList[2];
      component.isExpanded = true;
      component.scrollToCandidate();
      expect(component.scrollItemIntoView).toHaveBeenCalledWith(getChild(2));
    });
    it('should scroll to the loading child if candidate is last and loading', () => {
      component.bfCandidate = component.extList[2];
      component.isExpanded = true;
      component.isLoading = true;
      component.scrollToCandidate();
      expect(component.scrollItemIntoView).toHaveBeenCalledWith(getChild(3));
    });
  });

  describe('scrollToLoading', () => {
    beforeEach(() => {
      spyOn(component, 'scrollItemIntoView');
      const nativeEl = document.createElement('div') as HTMLInputElement;
      component.listContainer = new ElementRef(nativeEl);
      component.isExpanded = true;
      component.isLoading = true;
    });
    it('should scroll to the last children if that exists', () => {
      spyOnProperty(component.listContainer.nativeElement, 'children').and.returnValue(children);
      component.scrollToLoading();
      expect(component.scrollItemIntoView).toHaveBeenCalledWith(getChild(3));
    });
    it('should not scroll if there are no children', () => {
      const emptyFrag = document.createDocumentFragment();
      spyOnProperty(component.listContainer.nativeElement, 'children').and.returnValue(emptyFrag.children);
      component.scrollToLoading();
      expect(component.scrollItemIntoView).not.toHaveBeenCalled();
    });
  });

  describe('scrollItemIntoView', () => {
    const selectedElement = document.createElement('div') as HTMLElement;
    const nativeEl = document.createElement('div') as HTMLInputElement;
    beforeEach(() => {
      component.listHeight = 30;
      component.listContainer = new ElementRef(nativeEl);
      spyOnProperty(selectedElement, 'offsetTop').and.returnValue(100);
      spyOnProperty(selectedElement, 'clientHeight').and.returnValue(200);
    });
    it('should scroll up to the selected element', () => {
      spyOnProperty(component.listContainer.nativeElement, 'scrollTop').and.returnValue(150);
      spyOn(component.listContainer.nativeElement, 'scrollTo');
      component.scrollItemIntoView(selectedElement);  // posY = offsetTop - scrollTop;   100 - 150 = -50
      // @ts-ignore                                      scrollTop + posY - 5 = 150 - 50 - 5 = 95
      expect(component.listContainer.nativeElement.scrollTo).toHaveBeenCalledWith({ top: 95, behavior: 'auto' });
    });
    it('should scroll down to the selected element', () => {
      spyOnProperty(component.listContainer.nativeElement, 'scrollTop').and.returnValue(45);
      spyOn(component.listContainer.nativeElement, 'scrollTo');
      component.scrollItemIntoView(selectedElement);  // posY = offsetTop - scrollTop;   100 - 45 = 55
      // @ts-ignore
      expect(component.listContainer.nativeElement.scrollTo).toHaveBeenCalledWith({ top: 275, behavior: 'auto' });
    });
    it('should set the ignore mouse for 100 ms', (done) => {
      component.scrollItemIntoView(selectedElement);
      expect(component.ignoreMouse).not.toEqual(null);
      setTimeout(() => {
        expect(component.ignoreMouse).toEqual(null);
        done();
      }, 110);
    });
  });

  describe('writeValue', () => {
    beforeEach(() => {
      spyOn(component, 'matchSelection');
      component.ngControl = { pristine: false, markAsPristine: () => {}};
    });
    it('should match selection with the given value', () => {
      component.writeValue('test');
      expect(component.matchSelection).toHaveBeenCalledWith('test');
    });
    it('should mark as pristine after matching it it originally was', () => {
      component.ngControl.pristine = true;
      spyOn(component.ngControl, 'markAsPristine');
      component.writeValue('test');
      expect(component.ngControl.markAsPristine).toHaveBeenCalled();
    });
  });

  describe('runValidation', () => {
    it('should trigger the update and validity if ngControl is initialized', () => {
      component.ngControl = { updateValueAndValidity: () => {} };
      spyOn(component.ngControl, 'updateValueAndValidity');
      component.runValidation();
      expect(component.ngControl.updateValueAndValidity).toHaveBeenCalled();
    });
  });

  describe('validate', () => {
    const extFormCtrl = new FormControl();
    beforeEach(() => {
      spyOn(component, 'announceError');
    });
    it('should set required error when model empty', () => {
      component.bfRequired = true;
      component.isModelEmpty = true;
      const result = component.validate(extFormCtrl);
      expect(result).toEqual({ error: 'required' });
      expect(component.errors.emptyRequired).toEqual(true);
      expect(component.isInvalid).toEqual(true);
    });
    it('should call the announce error with the error label', () => {
      component.bfRequired = true;
      component.isModelEmpty = true;
      component.validate(extFormCtrl);
      expect(component.announceError).toHaveBeenCalledWith('view.common.required_field');
    });
    it('should override the required error with the manual error', () => {
      component.bfRequired = true;
      component.isModelEmpty = true;
      component.errors.manualErr = 'm-error';
      const result = component.validate(extFormCtrl);
      expect(result).toEqual({ error: 'm-error' });
      expect(component.announceError).toHaveBeenCalledWith('m-error');
      expect(component.isInvalid).toEqual(true);
    });
    it('should not show the error if pristine', () => {
      component.bfRequired = true;
      component.isModelEmpty = true;
      component.validate(extFormCtrl);
      expect(component.showError).toEqual(false);
    });
    it('should show the error if pristine but bfErrorOnPristine', () => {
      component.bfRequired = true;
      component.isModelEmpty = true;
      component.bfErrorOnPristine = true;
      component.validate(extFormCtrl);
      expect(component.showError).toEqual(true);
    });
    it('should clear the announcer if no error', () => {
      spyOn(liveAnnouncer, 'clear');
      component.bfRequired = true;
      component.isModelEmpty = false;
      const result = component.validate(extFormCtrl);
      expect(result).toEqual(null);
      expect(component.isInvalid).toEqual(false);
      expect(liveAnnouncer.clear).toHaveBeenCalled();
    });
  });

  describe('matchSelection', () => {
    beforeEach(() => {
      spyOn(component, 'renderItem').and.returnValue({ $$renderedText: 'abc', $$label: 'lab' });
      spyOn(component, 'setModelText');
      spyOn(component, 'selectItem');
      component.extList = [{ id: 1, name: 'first' }, { id: 2, name: 'two' }, { id: 3, name: 'three' }];
    });
    it('should match a string literal', () => {
      component.bfSelect = 'name';
      component.matchSelection('two');
      expect(component.selectItem).toHaveBeenCalledWith(component.extList[1], { value: 'two' });
    });
    it('should match a full object', () => {
      const value = component.extList[2];
      component.matchSelection(value);
      expect(component.selectItem).toHaveBeenCalledWith(value, { value });
    });
    it('should keep the value when no match', () => {
      component.bfSelect = 'name';
      component.matchSelection('four');
      expect(component.bfModel).toEqual('four');
      expect(component.isModelEmpty).toEqual(false);
      expect(component.setModelText).toHaveBeenCalledWith('four');
    });
    it('should keep the objects value when no match', () => {
      component.bfSelect = 'name';
      const value = { name: 'four' };
      component.matchSelection(value);
      expect(component.bfModel).toEqual(value);
      expect(component.renderItem).toHaveBeenCalledWith(value);
      expect(component.setModelText).toHaveBeenCalledWith('abc');
    });
    it('should use the bfNoMatchText when that is set', () => {
      component.bfNoMatchText = 'nothing';
      const value = { name: 'four' };
      component.matchSelection(value);
      expect(component.bfModel).toEqual(value);
      expect(component.setModelText).toHaveBeenCalledWith('nothing');
    });
  });

  describe('selectItem', () => {
    beforeEach(() => {
      spyOn(component, 'setModelText');
      spyOn(component, 'propagateModelUp');
      component.extList = [
        { id: 1, $$idRef: 'ref-1', name: 'first' },
        { id: 2, $$idRef: 'ref-2', name: 'two' },
        { id: 3, $$idRef: 'ref-3', name: 'three' },
      ];
    });
    it('should select the given item', () => {
      const item = { id: 1, $$renderedText: 'hey' };
      component.selectItem(item, { value: item });
      expect(component.bfModel).toEqual(item);
      expect(component.isModelEmpty).toEqual(false);
      expect(component.setModelText).toHaveBeenCalledWith('hey');
    });
    it('should select an empty value option', () => {
      const item = component.emptyItem;
      component.selectItem(item, { value: null });
      expect(component.bfModel).toEqual(item);
      expect(component.isModelEmpty).toEqual(true);
      expect(component.setModelText).toHaveBeenCalledWith('Empty');
    });
    it('should select and propagate an empty value', () => {
      component.selectItem(component.emptyItem);
      expect(component.propagateModelUp).toHaveBeenCalledWith(null);
    });
    it('should select and propagate an selected value', () => {
      component.bfSelect = 'name';
      component.selectItem({ id: 2, $$idRef: 'ref-2', name: 'two' });
      expect(component.propagateModelUp).toHaveBeenCalledWith('two');
    });
    it('should select and propagate an selected object', () => {
      component.selectItem({ id: 2, $$idRef: 'ref-2', name: 'two' });
      expect(component.propagateModelUp).toHaveBeenCalledWith({ id: 2, name: 'two' });
    });
  });

  describe('setModelText', () => {
    it('should clear selModelText, inputText, inputPlaceholder if empty model', () => {
      component.isModelEmpty = true;
      component.renderedPlaceholder = '--';
      component.setModelText(null);
      expect(component.selModelText).toEqual('');
      expect(component.inputText).toEqual('');
      expect(component.inputPlaceholder).toEqual('--');
    });
    it('should set the selModelText, inputText, inputPlaceholder', () => {
      component.setModelText('test');
      expect(component.selModelText).toEqual('test');
      expect(component.inputText).toEqual('test');
      expect(component.inputPlaceholder).toEqual('test');
    });
    it('should strip the html chars when bfHtmlRender', () => {
      component.bfHtmlRender = true;
      component.setModelText('test <b>with</b> html');
      expect(component.selModelText).toEqual('test with html');
    });
  });

  describe('isCandidate', () => {
    beforeEach(() => { component.bfCandidate = { $$idRef: 'ref-1' }; });
    it('should match the bfCandidate $$idRef', () => {
      expect(component.isCandidate({ $$idRef: 'ref-1' })).toEqual(true);
    });
    it('should not match the bfCandidate $$idRef', () => {
      expect(component.isCandidate({ $$idRef: 'ref-2' })).toEqual(false);
    });
  });

  describe('isSelected', () => {
    beforeEach(() => { component.bfModel = { $$idRef: 'ref-1' }; });
    it('should match the bfModel $$idRef', () => {
      expect(component.isSelected({ $$idRef: 'ref-1' })).toEqual(true);
    });
    it('should not match the bfModel $$idRef', () => {
      expect(component.isSelected({ $$idRef: 'ref-2' })).toEqual(false);
    });
  });

  describe('getLoadedItems', () => {
    const list = [
      { id: 1, name: 'one',   $$idRef: 'ref-1' },
      { id: 2, name: 'two',   $$idRef: 'ref-2' },
      { id: 3, name: 'three', $$idRef: 'ref-3' },
    ];
    beforeEach(() => {
      component.extList = [ component.emptyItem, ...list];
    });
    it('should return an empty array of no extList', () => {
      component.extList = null;
      expect(component.getLoadedItems()).toEqual([]);
    });
    it('should return the array without the empty option', () => {
      const res = component.getLoadedItems();
      expect(res).toEqual(list);
    });
  });

  describe('remove$$', () => {
    it('should return the same object without $$ properties', () => {
      const item = { id: 1, $$index: 10, $$idRef: 'ref', name: 'me' };
      expect(component.remove$$(item)).toEqual({ id: 1, name: 'me' });
    });
  });

  describe('announceError', () => {
    it('should call the live announcer if error', () => {
      component.isInvalid = true;
      component.showError = true;
      spyOn(liveAnnouncer, 'announce');
      component.announceError('error');
      expect(liveAnnouncer.announce).toHaveBeenCalledWith('error');
    });
  });

});
