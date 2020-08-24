import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfLazyDropdownComponent } from './bf-lazy-dropdown.component';
import {TestingModule} from '../../testing/testing-module';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

describe('BfLazyDropdownComponent', () => {
  let component: BfLazyDropdownComponent;
  let fixture: ComponentFixture<BfLazyDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLazyDropdownComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLazyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search()', () => {

    it('should not call expandList', () => {
      spyOn(component, 'minLengthValid').and.returnValue(false);
      spyOn(component, 'expandList');

      expect(component.expandList).not.toHaveBeenCalled();
    });

    it('should call expandList', () => {
      const event = 'test';
      spyOn(component, 'minLengthValid').and.returnValue(true);
      spyOn(component, 'expandList');
      spyOn(component, 'apiSearch').and.returnValue(['test']);
      spyOn(component, 'localSearch').and.returnValue(['test']);
      component.search(event);
      expect(component.expandList).toHaveBeenCalled();
    });

  });

  describe('minLengthValid()', () => {

    it('should return valid', () => {
      component.list = ['test1', 'test2'];
      component.inputText = 'test';
      component.bfMinSearchLength = 1;

      expect(component.minLengthValid()).toEqual(true);
      expect(component.list).toEqual(['test1', 'test2']);
    });

    it('should return invalid', () => {
      component.list = ['test1', 'test2'];
      component.inputText = '';
      component.bfMinSearchLength = 1;

      expect(component.minLengthValid()).toEqual(false);
      expect(component.list).toEqual([]);
    });
  });

  describe('showNoResultLabel()', () => {

    it('should return true', () => {
      component.list.length = 0;
      component.isLoading = false;
      component.inputText = 'test';
      component.bfMinSearchLength = 1;

      expect(component.showNoResultLabel()).toEqual(true);
    });

    it('should return false', () => {
      component.list.length = 1;
      component.isLoading = false;
      component.inputText = 'test';
      component.bfMinSearchLength = 1;

      expect(component.showNoResultLabel()).toEqual(false);
    });
  });
});
