import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfAutocompleteComponent } from './bf-autocomplete.component';
import { BfLabelComponent } from '../bf-label/bf-label.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TestingModule } from '../../testing/testing-module';
import { FormControl, FormsModule } from '@angular/forms';

describe('BfAutocompleteComponent', () => {
  let component: BfAutocompleteComponent;
  let fixture: ComponentFixture<BfAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BfAutocompleteComponent, BfLabelComponent],
      imports: [TestingModule, FormsModule, NgbTooltipModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('outsideClick', () => {

  });

  describe('ngOnChanges', () => {

  });

  describe('setPattern', () => {
    it('should set the pattern integer', () => {
      component.bfValidType = 'integer';
      component.setPattern();
      expect(component.bfPattern).toBe('^[0-9]{1,5}$');
    });

    it('should set the pattern number', () => {
      component.bfValidType = 'number';
      component.setPattern();
      expect(component.bfPattern).toBe('^-?[0-9]{1,8}$');
    });

    it('should set the pattern decimal', () => {
      component.bfValidType = 'decimal';
      component.setPattern();
      expect(component.bfPattern).toBe('^-?[0-9]+(\\.[0-9]+)?$');
    });

    it('should set the pattern email', () => {
      component.bfValidType = 'email';
      component.setPattern();
      expect(component.bfPattern)
        .toBe('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');
    });
  });

  describe('validate', () => {
    it('should return null if valid', () => {
      component.isInvalid = false;
      const result = component.validate(new FormControl());
      expect(result).toBe(null);
    });

    it('should return required obj on invalid', () => {
      component.isInvalid = true;
      component.ngModel = null;
      const result = component.validate(new FormControl());
      expect(result).toEqual({required: true});
    });

    it('should return pattern obj on invalid', () => {
      component.isInvalid = true;
      component.bfPattern = '^[0-9]{1,5}$';
      component.ngModel = 'A string value';
      const result = component.validate(new FormControl());
      expect(result).toEqual({value: 'Expected value type: ' + component.bfPattern});
    });
  });

  describe('toggle', () => {
    let collapseSpy;
    let expandSpy;

    beforeEach(() => {
      collapseSpy = spyOn(component, 'collapse');
      expandSpy = spyOn(component, 'expand');
    });

    it('should collapse', () => {
      component.isExpanded = true;
      component.toggle();
      expect(collapseSpy).toHaveBeenCalled();
    });

    it('should expand', () => {
      component.isExpanded = false;
      component.toggle();
      expect(expandSpy).toHaveBeenCalled();
    });
  });

  describe('expand', () => {
    let focusSpy;

    beforeEach(() => {
      focusSpy = spyOn(component, 'focus');
    });

    it('should expand', () => {
      component.expand();
      expect(component.isExpanded).toBe(true);
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('collapse', () => {
    it('should collapse', () => {
      component.collapse();
      expect(component.isFocus).toBe(false);
      expect(component.isExpanded).toBe(false);
    });
  });

  describe('triggerKey', () => {
    beforeEach(() => {
      component.list = ['a', 'b', 'c', 'd'];
      component.ngModel = 'c';
      // @ts-ignore
      component.listContainer = {nativeElement: {children: [{clientHeight: 30}]}};
    });

    it('should scroll the list down', () => {
      component.triggerKey({key: 'ArrowDown'});
      expect(component.ngModel).toBe('d');
    });

    it('should scroll the list down', () => {
      component.triggerKey({key: 'ArrowUp'});
      expect(component.ngModel).toBe('b');
    });
  });

  describe('typing, select, reset', () => {
    let updateModelSpy;
    let filterSpy;
    let expandSpy;
    let focusSpy;
    let collapseSpy;

    beforeEach(() => {
      updateModelSpy = spyOn(component, 'updateModel');
      filterSpy = spyOn(component, 'filter');
      expandSpy = spyOn(component, 'expand');
      focusSpy = spyOn(component, 'focus');
      collapseSpy = spyOn(component, 'collapse');
    });

    it('should update, filter and expand on typing', () => {
      const value = 'A string';
      component.typing(value);
      expect(updateModelSpy).toHaveBeenCalledWith(value);
      expect(filterSpy).toHaveBeenCalled();
      expect(expandSpy).toHaveBeenCalled();
    });

    it('should update, filter and collapse on select', () => {
      const value = 'A string';
      component.select(value);
      expect(updateModelSpy).toHaveBeenCalledWith(value);
      expect(filterSpy).toHaveBeenCalled();
      expect(collapseSpy).toHaveBeenCalled();
    });

    it('should update, filter, expand and focus on reset', () => {
      component.reset();
      expect(updateModelSpy).toHaveBeenCalledWith('');
      expect(filterSpy).toHaveBeenCalled();
      expect(expandSpy).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('isMatch', () => {
    it('should return false if not matched', () => {
      component.ngModel = 'hello';
      expect(component.isMatch('ciao')).toBe(false);
    });

    it('should return true if matched', () => {
      component.ngModel = 'hello';
      expect(component.isMatch('hello')).toBe(true);
    });

    it('should return true if model null', () => {
      component.ngModel = '';
      expect(component.isMatch('hola')).toBe(true);
    });
  });

  describe('setValidity', () => {
    it('should return isInvalid set to true', () => {
      component.setValidity(true);
      expect(component.isInvalid).toBe(false);
    });

    it('should return isInvalid set to false', () => {
      component.setValidity(false);
      expect(component.isInvalid).toBe(true);
    });
  });

  describe('checkValidity', () => {
    let setValiditySpy;

    beforeEach(() => {
      setValiditySpy = spyOn(component, 'setValidity');
    });

    it('should be valid when value is selected from the list', () => {
      component.bfList = ['a', 'b', 'c', 'd'];
      component.checkValidity('b');
      expect(setValiditySpy).toHaveBeenCalledWith(true);
    });

    it('should be invalid when value is null', () => {
      component.bfList = ['a', 'b', 'c', 'd'];
      component.bfRequired = true;
      component.checkValidity(null);
      expect(setValiditySpy).toHaveBeenCalledWith(false);
    });

    it('should be invalid when value do not respect the pattern', () => {
      component.bfList = ['a', 'b', 'c', 'd'];
      component.bfPattern = '^[0-9]{1,5}$';
      component.checkValidity('e');
      expect(setValiditySpy).toHaveBeenCalledWith(false);
    });

    it('should be valid when value is valid', () => {
      component.bfList = ['a', 'b', 'c', 'd'];
      component.checkValidity('e');
      expect(setValiditySpy).toHaveBeenCalledWith(true);
    });
  });
});
