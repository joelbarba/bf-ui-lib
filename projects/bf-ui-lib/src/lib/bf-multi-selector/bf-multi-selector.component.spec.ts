import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { TestingModule } from '../../testing/testing-module';
import BfArray from '../bf-prototypes/array.prototypes';

import { BfMultiSelectorComponent } from './bf-multi-selector.component';
import { BfTranslatePipe } from '../abstract-translate.service';
import { BfDropdownA11yPipe } from '../bf-dropdown/bf-dropdown-a11y.pipe';


// Setup prototypes needed in this test
for (const proFn in BfArray) {
  if (BfArray.hasOwnProperty(proFn)) {
    Array.prototype[proFn] = BfArray[proFn];
  }
}

describe('BfMultiSelectorComponent', () => {
  let comp: BfMultiSelectorComponent;
  let fixture: ComponentFixture<BfMultiSelectorComponent>;
  let debug: DebugElement;
  const detectChanges = () => fixture.detectChanges();
  const newChange = (value: any) => new SimpleChange(undefined, value, true);
  const getListContainerDe = () => debug.query(By.css('.list-container'));
  const getListContainer = () => getListContainerDe().nativeElement as HTMLDivElement;
  const getOptionRowsDe = () => debug.queryAll(By.css('.option-row'));
  const getOptionRows = () => getOptionRowsDe().map(({ nativeElement }) => nativeElement);
  const getOptionRenders = () => debug.queryAll(By.css('.option-row > span')).map(el => (el.nativeElement as HTMLSpanElement).textContent);
  const getSelectedItemsDe = () => debug.queryAll(By.css('.multi-tag-container'));
  const getSelectedItemsTextDe = () => debug.queryAll(By.css('.multi-tag-container > .multi-tag-text'));
  const getSelectedItemsText = () => getSelectedItemsTextDe().map(({ nativeElement }) => nativeElement as HTMLSpanElement).map(({ textContent }) => textContent.trim());

  // Setup test suite
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BfMultiSelectorComponent, BfTranslatePipe, BfDropdownA11yPipe],
      imports: [TestingModule, FormsModule, NgbTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BfMultiSelectorComponent);
    comp = fixture.componentInstance;
    debug = fixture.debugElement;
    detectChanges();
  }));

  // Fake ngControl
  beforeEach(() => {
    comp.ngControl = new FormControl('');
  });

  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });

  describe('toggling the dropdown list', () => {
    let input: HTMLInputElement;

    // Focus on the input element
    beforeEach(() => {
      spyOn(comp.bfOnListExpanded, 'emit');
      input = debug.query(By.css('input')).nativeElement;
      input.focus();
      detectChanges();
    });

    it('should open dropdown on input focus', () => {
      expect(getListContainer()).toBeTruthy();
      expect(comp.bfOnListExpanded.emit).toHaveBeenCalled();
    });

    it('should close dropdown on input blur', fakeAsync(() => {
      spyOn(comp.bfOnListCollapsed, 'emit');
      input.blur();
      tick(100);
      detectChanges();

      expect(getListContainer().classList).not.toContain('expanded');
      expect(input.value).toBe('');
      expect(comp.bfOnListCollapsed.emit).toHaveBeenCalled();
    }));
  });

  it('should open the dropdown list on the search button click', () => {
    // Dropdown is closed
    expect(getListContainer().classList).not.toContain('expanded');

    // Click on search btn
    debug.query(By.css('.input-group-append')).triggerEventHandler('click', {});
    detectChanges();

    // Dropdown is open
    expect(getListContainer().classList).toContain('expanded');
  });

  describe('dropdown list is populated and open', () => {
    let inputDe: DebugElement;

    // Push new Inputs to the component and trigger ngOnChanges
    beforeEach(fakeAsync(() => {
      comp.bfList = [
        {
          id: 0,
          username: 'joel.barba',
          email: 'joel@barba.com',
          first_name: 'Joel',
          last_name: 'Barba'
        },
        {
          id: 1,
          username: 'deb.mallya',
          email: 'deb@mallya.com',
          first_name: 'Deb',
          last_name: 'Mallya'
        }
      ];
      comp.bfRender = 'email';
      comp.bfSelect = 'username';
      comp.ngOnChanges({
        bfList: newChange(comp.bfList),
        bfRender: newChange(comp.bfRender),
        bfSelect: newChange(comp.bfSelect),
      });
      tick();
      detectChanges();
    }));

    // Focus on the input element such that the dropdown list is open and visible
    beforeEach(fakeAsync(() => {
      inputDe = debug.query(By.css('input'));
      (inputDe.nativeElement as HTMLInputElement).focus();
      inputDe.triggerEventHandler('focusin', {});
      tick();
      detectChanges();
    }));

    it('should show the option list', () => {
      const expectedOptionRenders = comp.bfList.map(({ email }) => email);

      expect(getListContainer()).toBeTruthy();
      expect(getOptionRenders()).toEqual(expectedOptionRenders);
      expect(comp.isExpanded).toBe(true);
    });

    it('should have the the first option highlighted', () => {
      expect(getOptionRows()[0].classList).toContain('candidate');
    });

    it('should filter options on typing', () => {
      const typedValue = 'deb';
      spyOn(comp.bfOnTyping, 'emit');
      inputDe.triggerEventHandler('input', { target: { value: typedValue } });
      detectChanges();

      expect(getOptionRenders()).toEqual([comp.bfList[1].email]);
      expect(comp.bfOnTyping.emit).toHaveBeenCalledWith(typedValue);
    });

    describe('keyboard events', () => {
      let formGroupDe: DebugElement;

      // Get a reference to the form-group which has the keydown event binding
      beforeEach(() => {
        formGroupDe = debug.query(By.css('input'));
      });

      it('should highlight the next option on Arrow keys', fakeAsync(() => {
        // ArrowDown (cycle through all 2 options)

        for (let i = 0; i < 3; i++) {
          formGroupDe.triggerEventHandler('keydown', { code: 'ArrowDown', preventDefault: () => {} });
          tick(100);
          detectChanges();
        }
        expect(getOptionRows()[0].classList).not.toContain('candidate');
        expect(getOptionRows()[1].classList).toContain('candidate');

        // ArrowUp (cycle through all 2 options)
        for (let i = 0; i < 3; i++) {
          formGroupDe.triggerEventHandler('keydown', { code: 'ArrowUp', preventDefault: () => {} });
          tick(100);
          detectChanges();
        }
        expect(getOptionRows()[0].classList).toContain('candidate');
        expect(getOptionRows()[1].classList).not.toContain('candidate');
      }));

      it('should lose focus on Escape key', fakeAsync(() => {
        expect(debug.query(By.css('input:focus'))).toBeTruthy();

        formGroupDe.triggerEventHandler('keydown', { code: 'Escape', preventDefault: () => {} });
        tick(100);
        detectChanges();

        expect(debug.query(By.css('input:focus'))).toBeFalsy();
        expect(getListContainer().classList).not.toContain('expanded'); // Dropdown list closed
      }));

      it('should select highlighted value and close dropdown on Enter key', fakeAsync(() => {
        expect(getOptionRows()[0].classList).toContain('candidate');

        formGroupDe.triggerEventHandler('keydown', { code: 'Enter', preventDefault: () => {} });
        tick(100);
        detectChanges();

        expect(getSelectedItemsText()).toEqual([comp.bfList[0].email]);
        expect(getOptionRows().length).toBe(1); // Dropdown list closed
      }));
    });

    it('should select and deselect items', () => {
      // No items selected
      expect(getSelectedItemsText().length).toEqual(0);
      expect(getOptionRows().length).toBe(2);

      // Click the first dropdown item
      getOptionRowsDe()[0].parent.triggerEventHandler('mousedown', { code: 'Enter', preventDefault: () => {} });
      detectChanges();

      // Selected item should show up as selected
      expect(getSelectedItemsText()).toEqual([comp.bfList[0].email]);
      // Selected item should be removed from the dropdown
      expect(getOptionRows().length).toBe(1);

      // Click the already selected item
      getSelectedItemsDe()[0].triggerEventHandler('click', {});
      detectChanges();

      // No selected items now
      expect(getSelectedItemsText().length).toEqual(0);
      // Deselected item goes back into dropdown
      expect(getOptionRows().length).toBe(2);
    });

    it('should select the corresponding option when a valid value is provided', () => {
      // No previously selected value
      expect(getSelectedItemsText().length).toEqual(0);

      // Provide a valid value
      comp.writeValue(comp.bfList[0].username);
      detectChanges();

      // Selected item should show up as selected
      expect(getSelectedItemsText()).toEqual([comp.bfList[0].email]);
    });

    describe('validation when an external value is provided', () => {
      let fakeFormControl: FormControl;

      beforeEach(() => {
        fakeFormControl = new FormControl();
      });

      it('should throw emptyRequired error when the formControl is empty and bfRequired is true', fakeAsync(() => {
        comp.bfRequired = true;
        comp.ngOnChanges({
          bfRequired: newChange(comp.bfRequired),
        });
        tick();
        const result = comp.validate(fakeFormControl);

        expect(result).toEqual({ error: 'required' });
      }));

      it('should throw noMatch error when an invalid value is passed', () => {
        let result = null;

        // error case
        comp.writeValue('abc');
        result = comp.validate(fakeFormControl);
        expect(result).toEqual({ error: 'no match' });

        // success case
        comp.writeValue('joel.barba');
        result = comp.validate(fakeFormControl);
        expect(result).toEqual(null);
      });

      it('should manage the manual error when provided', fakeAsync(() => {
        let error: any;

        // Provide manual error
        const fakeManualError = 'fake manual error';
        comp.extCtrl$ = of({ action: 'addError', value: fakeManualError });
        comp.ngOnChanges({
          extCtrl$: newChange(comp.extCtrl$),
        });
        tick();
        error = comp.validate(fakeFormControl);
        detectChanges();

        expect(error).toEqual({ error: fakeManualError });

        // Remove manual error
        comp.extCtrl$ = of({ action: 'removeError' });
        comp.ngOnChanges({
          extCtrl$: newChange(comp.extCtrl$),
        });
        tick();
        error = comp.validate(fakeFormControl);
        detectChanges();

        expect(error).toBeNull();
      }));
    });

    it('should persist items across multiple lists', fakeAsync(() => {

      comp.bfKeepSelection = true;
      comp.bfUniqueByProperty = 'id';
      // No items selected
      expect(getSelectedItemsText().length).toEqual(0);
      expect(getOptionRows().length).toBe(2);

      // Click the first dropdown item
      getOptionRowsDe()[0].parent.triggerEventHandler('mousedown', { code: 'Enter', preventDefault: () => {} });
      detectChanges();

      comp.bfList = [
        {
          id: 3,
          username: 'andrew.byrne',
          email: 'andrew@byrne.com',
          first_name: 'Andrew',
          last_name: 'Byrne'
        },
        {
          id: 1,
          username: 'deb.mallya',
          email: 'deb@mallya.com',
          first_name: 'Deb',
          last_name: 'Mallya'
        }
      ];
      comp.ngOnChanges({
        bfList: newChange(comp.bfList)
      });
      tick();
      detectChanges();

      // Click the first dropdown item
      getOptionRowsDe()[0].parent.triggerEventHandler('mousedown', { code: 'Enter', preventDefault: () => {} });
      detectChanges();

      // Selected item should show up as selected
      expect(getSelectedItemsText()).toEqual(['joel@barba.com', 'andrew@byrne.com']);
      // Selected item should be removed from the dropdown
      expect(getOptionRows().length).toBe(1);

    }));

  });

  describe('placeholder only visible when no value is selected', () => {
    let inputDe: DebugElement;

    // Push new Inputs to the component and trigger ngOnChanges
    beforeEach(fakeAsync(() => {
      comp.bfPlaceholder = 'test';
      comp.bfList = [
        {
          id: 0,
          username: 'brennan.buitendag',
          email: 'brennan@buitendag.com',
          first_name: 'Brennan',
          last_name: 'Buitendag'
        }
      ];

      comp.ngOnChanges({
        bfPlaceholder: newChange(comp.bfPlaceholder),
        bfList: newChange(comp.bfList),
      });

      inputDe = debug.query(By.css('input'));
      tick();
      detectChanges();
    }));

    it('should have the placeholder set ', () => {
      expect(inputDe.nativeElement.placeholder).toEqual('test');
      expect(comp.renderedPlaceholder).toEqual('test');
    });

    it('should clear the placeholder after a value is selected', fakeAsync(() => {
      comp.selectItem(comp.bfList[0]);
      detectChanges();

      expect(inputDe.nativeElement.placeholder).toEqual('');
      expect(comp.renderedPlaceholder).toEqual('');
    }));

    it('should re-add the placeholder after a value is cleared', fakeAsync(() => {
      comp.selectItem(comp.bfList[0]);
      detectChanges();

      expect(inputDe.nativeElement.placeholder).toEqual('');
      expect(comp.renderedPlaceholder).toEqual('');

      comp.deselectItem(comp.bfList[0]);
      detectChanges();

      expect(inputDe.nativeElement.placeholder).toEqual('test');
      expect(comp.renderedPlaceholder).toEqual('test');
    }));
  });
});
