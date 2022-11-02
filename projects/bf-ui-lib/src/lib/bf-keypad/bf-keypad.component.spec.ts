import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BfKeypadComponent } from './bf-keypad.component';

describe('BfKeypadComponent', () => {
  let component: BfKeypadComponent;
  let fixture: ComponentFixture<BfKeypadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ BfKeypadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfKeypadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('listenNumberFieldChanges()', () => {
    it('should emit when the number field has a new value', () => {
      const valueChangeSpy = spyOn(component.valueChanges, 'emit');

      component.numberField.setValue('123');

      expect(valueChangeSpy).toHaveBeenCalledWith('123');
    });
  });

  describe('onSelectSymbol()', () => {
    it('should add the new element', () => {
      component.numberField.setValue('123');
      component.onSelectElement('4');

      expect(component.numberField.value).toBe('1234');
    });
  });

  describe('deselectElement()', () => {
    it('should remove the last item', () => {
      component.numberField.setValue('123');
      component.deselectElement();

      expect(component.numberField.value).toBe('12');
    });
  });

  describe('keyPress()', () => {
    it('should prevent to add non numeric elements', () => {
      const input = fixture.debugElement.query(By.css('bf-input'));
      const event = new KeyboardEvent('keypress',{
        key: 'a'
      });
      const preventDefaultSpy = spyOn(event, 'preventDefault');

      input.triggerEventHandler('bfOnKeypress', event);

      fixture.detectChanges();

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should allow to add numeric elements', () => {
      const input = fixture.debugElement.query(By.css('bf-input'));
      const event = new KeyboardEvent('keypress',{
        key: '2'
      });
      const preventDefaultSpy = spyOn(event, 'preventDefault');

      input.triggerEventHandler('bfOnKeypress', event);

      fixture.detectChanges();

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });
});
