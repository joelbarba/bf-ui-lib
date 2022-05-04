import { BreakpointObserver } from '@angular/cdk/layout';
import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { TestingModule } from '../../testing/testing-module';
import { BfUILibTransService } from '../abstract-translate.service';

import { BfDotBadgeComponent } from './bf-dot-badge.component';

describe('BfDotBadgeComponent', () => {
  let component: BfDotBadgeComponent;
  let fixture: ComponentFixture<BfDotBadgeComponent>;

  let translate: BfUILibTransService;
  let breakpointObserver: BreakpointObserver;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BfDotBadgeComponent],
      imports: [TestingModule, NgbTooltipModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDotBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    translate = TestBed.inject(BfUILibTransService);
    breakpointObserver = TestBed.inject(BreakpointObserver);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('_translateText()', () => {
    it('should set the translated label', () => {
      component.bfText = 'label';

      spyOn(translate, 'getLabel$').and.returnValue(new Observable<string>());

      component._translateText();

      expect(translate.getLabel$).toHaveBeenCalledOnceWith('label');
    });
  });

  describe('_setLabelDisplay()', () => {
    it('should set the calculatedDisplayType to "label"', () => {
      component.bfLabelDisplayType = 'label';

      component._setLabelDisplay();

      expect(component.calculatedDisplayType).toEqual('label');
    });

    it('should set the calculatedDisplayType to "tooltip"', () => {
      component.bfLabelDisplayType = 'tooltip';

      component._setLabelDisplay();

      expect(component.calculatedDisplayType).toEqual('tooltip');
    });

    it('should set the call _subscribeToBreakpoints', () => {
      const spy = spyOn(component, '_subscribeToBreakpoints').and.stub();

      component.bfLabelDisplayType = undefined;
      component._setLabelDisplay();

      expect(spy).toHaveBeenCalledOnceWith();

      spy.calls.reset();

      component.bfLabelDisplayType = 'auto';
      component._setLabelDisplay();

      expect(spy).toHaveBeenCalledOnceWith();
    });
  });

  describe('_subscribeToBreakpoints()', () => {
    const mockObserver: Subject<BreakpointState> = new Subject<BreakpointState>();

    beforeEach(() => {
      spyOn(breakpointObserver, 'observe').and.returnValue(mockObserver);
      component.bfBreakpoint = 768;
    });

    it('should subscribe to the observer', () => {
      component._subscribeToBreakpoints();

      expect(breakpointObserver.observe).toHaveBeenCalledOnceWith('(min-width: 768px)');
    });

    it('should set calculatedDisplayType to the calculatedDisplayType to "label" on larger screens', () => {
      component._subscribeToBreakpoints();

      mockObserver.next({
        matches: true,
        breakpoints: {}
      });

      expect(component.calculatedDisplayType).toEqual('label');
    });

    it('should set calculatedDisplayType to the calculatedDisplayType to "tooltip" on smaller screens', () => {
      component._subscribeToBreakpoints();

      mockObserver.next({
        matches: false,
        breakpoints: {}
      });

      expect(component.calculatedDisplayType).toEqual('tooltip');
    });
  });

  describe('_setDefaultStatus()', () => {
    it('should set bfType and bfText depending on bfStatus', () => {
      component.bfStatus = false;
      component._setDefaultStatus();

      expect(component.bfType).toBe('warning');
      expect(component.bfText).toBe('view.common.inactive');
    });
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, '_setLabelDisplay');
      spyOn(component, '_setDefaultStatus');
    });

    it('should set the label display type', () => {
      component.ngOnInit();

      expect(component._setLabelDisplay).toHaveBeenCalledOnceWith();
    });

    it('should get default status if bfStatus is defined', () => {
      component.bfStatus = 1;
      component.ngOnInit();

      expect(component._setDefaultStatus).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges()', () => {
    beforeEach(() => {
      spyOn(component, '_setLabelDisplay').and.stub();
      spyOn(component, '_translateText').and.stub();
      spyOn(component, '_setDefaultStatus').and.stub();
    });

    it('should not call functions if nothing changed', () => {
      component.ngOnChanges({});

      expect(component._setLabelDisplay).not.toHaveBeenCalled();
      expect(component._translateText).not.toHaveBeenCalled();
      expect(component._setDefaultStatus).not.toHaveBeenCalled();
    });

    it('should update the label display type if the property changes', () => {
      component.ngOnChanges({
        bfLabelDisplayType: new SimpleChange(null, 'label', true)
      });

      expect(component._setLabelDisplay).toHaveBeenCalledOnceWith();
      expect(component._translateText).not.toHaveBeenCalled();
      expect(component._setDefaultStatus).not.toHaveBeenCalled();
    });

    it('should set the translated label if the property changes', () => {
      component.ngOnChanges({
        bfText: new SimpleChange(null, 'text', true)
      });

      expect(component._setLabelDisplay).not.toHaveBeenCalled();
      expect(component._setDefaultStatus).not.toHaveBeenCalled();
      expect(component._translateText).toHaveBeenCalledOnceWith();
    });

    it('should set the status label if the property changes', () => {
      component.ngOnChanges({
        bfStatus: new SimpleChange(null, 1, true)
      });

      expect(component._setLabelDisplay).not.toHaveBeenCalled();
      expect(component._translateText).not.toHaveBeenCalled();
      expect(component._setDefaultStatus).toHaveBeenCalled();
    });
  });
});
