import { ComponentFixture, TestBed } from '@angular/core/testing';
import { dialPadConfig } from '../bf-keypad';

import { BfKeypadButtonComponent } from './bf-keypad-button.component';

describe('BfKeypadButtonComponent', () => {
  let component: BfKeypadButtonComponent;
  let fixture: ComponentFixture<BfKeypadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfKeypadButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfKeypadButtonComponent);
    component = fixture.componentInstance;
    component.element = dialPadConfig[0];
    fixture.detectChanges();
  });

  describe('onSelectPrimaryElement()', () => {
    it('should emit when a symbol is selected', () => {
      const selectElementSpy = spyOn(component.selectElement, 'emit');

      component.onSelectPrimaryElement(dialPadConfig[1]);

      expect(selectElementSpy).toHaveBeenCalledWith(dialPadConfig[1].primaryElement);
    });
  });

  describe('onSelectSecondaryElement()', () => {
    it('should emit when a secondary symbol is selected', () => {
      const selectElementSpy = spyOn(component.selectElement, 'emit');

      component.onSelectSecondaryElement(dialPadConfig[10]);

      expect(selectElementSpy).toHaveBeenCalledWith(dialPadConfig[10].secondaryElement);
    });

    it('should emit not emit when the secondary symbol is disabled', () => {
      const selectElementSpy = spyOn(component.selectElement, 'emit');

      component.onSelectSecondaryElement(dialPadConfig[4]);

      expect(selectElementSpy).not.toHaveBeenCalledWith(dialPadConfig[1].secondaryElement);
    });
  });

});
