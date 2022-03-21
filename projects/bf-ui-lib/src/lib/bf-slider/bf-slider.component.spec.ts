import { BfSliderComponent } from './bf-slider.component';
import {ElementRef, SimpleChanges} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';

class FakeElementRef {
  nativeElement = { scrollTo: () => {}, getBoundingClientRect: () => ({ x: 50, width: 300 }), };
}
class FakeNgZone {
  run = () => {};
}

describe('BfSliderComponent', () => {
  let component: BfSliderComponent;
  const elementRef = new FakeElementRef();
  const ngZone = new FakeNgZone();

  beforeEach(() => {
    // @ts-ignore: Unreachable code error
    component = new BfSliderComponent(elementRef, ngZone);
  });

  describe('parseNumParam', () => {
    it('should check the parameter and convert it to numeric', () => {
      // @ts-ignore
      component.bfStep = '3';
      const changes = {
        bfStep: { previousValue: 1, currentValue: '3', firstChange: true, isFirstChange: () => true },
      };
      component.parseNumParam(changes, 'bfStep', 1);
      expect(component.bfStep).toEqual(3);
    });
  });

  describe('ngOnChanges', () => {
    let changes: SimpleChanges;
    beforeEach(() => {
      changes = { bfStep: { previousValue: 1, currentValue: '3', firstChange: true, isFirstChange: () => true }};
      spyOn(component, 'setTicksArray');
      spyOn(component, 'setValue');
    });
    it('should parse bfStep, bfIniValue, bfEndValue, bfMinValue, bfMaxValue setting a default values', () => {
      component.ngOnChanges(changes);
      expect(component.bfStep).toEqual(1);
      expect(component.bfIniValue).toEqual(0);
      expect(component.bfEndValue).toEqual(100);
      expect(component.bfMinValue).toEqual(undefined);
      expect(component.bfMaxValue).toEqual(undefined);
    });
    it('should set minVal, maxVal from bfMinValue, bfMaxValue', () => {
      component.bfMinValue = 15;
      component.bfMaxValue = 92;
      component.ngOnChanges(changes);
      expect(component.minVal).toEqual(15);
      expect(component.maxVal).toEqual(92);
    });
    it('should set minVal, maxVal from bfIniValue, bfEndValue', () => {
      component.bfIniValue = 2;
      component.bfEndValue = 5;
      component.ngOnChanges(changes);
      expect(component.minVal).toEqual(2);
      expect(component.maxVal).toEqual(5);
    });
    it('should not allow bfStep lower than 1', () => {
      component.bfStep = -2;
      component.ngOnChanges(changes);
      expect(component.bfStep).toEqual(1);
      component.bfStep = 0;
      component.ngOnChanges(changes);
      expect(component.bfStep).toEqual(1);
    });
    it('should not allow a bfRender that is not a function', () => {
      // @ts-ignore
      component.bfRenderFn = 'invalid value';
      changes.bfRenderFn = { previousValue: undefined, currentValue: component.bfRenderFn, firstChange: true, isFirstChange: () => true };
      component.ngOnChanges(changes);
      expect(component.bfRenderFn).toEqual(undefined);
    });
    it('should call setTicksArray() if changing bfTicks', fakeAsync(() => {
      changes.bfTicks = { previousValue: 1, currentValue: 2, firstChange: true, isFirstChange: () => true };
      component.ngOnChanges(changes); tick();
      expect(component.setTicksArray).toHaveBeenCalled();
    }));
    it('should call setValue() if changing bfMinValue', fakeAsync(() => {
      changes.bfMinValue = { previousValue: 1, currentValue: 2, firstChange: true, isFirstChange: () => true };
      component.ngOnChanges(changes); tick();
      expect(component.setValue).toHaveBeenCalledWith();
    }));
    it('should call setValue() if changing bfValue', fakeAsync(() => {
      changes.bfValue = { previousValue: 1, currentValue: 30, firstChange: true, isFirstChange: () => true };
      component.bfValue = 30;
      component.ngOnChanges(changes); tick();
      expect(component.setValue).toHaveBeenCalledWith(30);
    }));
  });

  describe('setTicksArray', () => {
    it('should generate the ticks[] array from bfTicks', () => {
      spyOn(component, 'calculateBar');
      component.bfTicks = 5;
      component.setTicksArray();
      expect(component.calculateBar).toHaveBeenCalled();
      expect(component.ticks).toEqual([
        { val: 0,   pos: 0, label: true },
        { val: 20,  pos: 0, label: true },
        { val: 40,  pos: 0, label: true },
        { val: 60,  pos: 0, label: true },
        { val: 80,  pos: 0, label: true },
        { val: 100, pos: 0, label: true },
      ]);
    });
    it('should set only the first and last tick when bfTickLabels = null', () => {
      spyOn(component, 'calculateBar');
      component.bfTicks = 4;
      component.bfTickLabels = null;
      component.setTicksArray();
      expect(component.ticks).toEqual([
        { val: 0,   pos: 0, label: true },
        { val: 25,  pos: 0, label: false },
        { val: 50,  pos: 0, label: false },
        { val: 75,  pos: 0, label: false },
        { val: 100, pos: 0, label: true },
      ]);
    });
    it('should set no labels when bfTickLabels = none', () => {
      spyOn(component, 'calculateBar');
      component.bfTicks = 1;
      component.bfTickLabels = 'none';
      component.setTicksArray();
      expect(component.ticks).toEqual([
        { val: 0,   pos: 0, label: false },
        { val: 100, pos: 0, label: false },
      ]);
    });
  });

  describe('calculateBar', () => {
    it('should set the constant values from the slider rectangle size', () => {
      spyOn(component, 'setValue');
      component.bfSlider = new FakeElementRef() as ElementRef<HTMLElement>;
      component.calculateBar();
      expect(component.barPosLeft).toEqual(66);
      expect(component.barWidth).toEqual(268);
      expect(component.valueSize).toEqual(2.68);
      expect(component.posXSize).toEqual(100/268);
      expect(component.setValue).toHaveBeenCalled();
    });
  });

  describe('updateBar', () => {
    beforeEach(() => {
      component.ngModel = 30;
      component.bfIniValue = 5;
      component.valueSize = 2;
      component.barWidth = 700;
    });
    it('should calculate pointerPos', () => {
      component.updateBar();
      expect(component.pointerPos).toEqual(50);
    });
    it('should highlight (set hBar) the space on the left of the pointer', () => {
      component.updateBar();
      expect(component.hBar).toEqual({ left: 0, right: 666 });
    });
    it('should highlight (set hBar) the space on the right of the pointer', () => {
      component.bfHighlightBar = 'right';
      component.updateBar();
      expect(component.hBar).toEqual({ left: 66, right: 0 });
    });
    it('should calculate the ticks[] positions', () => {
      component.bfHighlightBar = 'right';
      component.bfTicks = 5;
      spyOn(component, 'calculateBar');
      component.setTicksArray();
      component.updateBar();
      expect(component.ticks).toEqual([
        { val: 5,   pos: 11,  label: true, highlight: false },
        { val: 24,  pos: 49,  label: true, highlight: false },
        { val: 43,  pos: 87,  label: true, highlight: true },
        { val: 62,  pos: 125, label: true, highlight: true },
        { val: 81,  pos: 163, label: true, highlight: true },
        { val: 100, pos: 201, label: true, highlight: true },
      ]);
    });
  });

  describe('setValue', () => {
    beforeEach(() => {
      component.ngModel = 30;
      spyOn(component, 'updateBar');
      spyOn(component, 'propagateModelUp');
    });
    it('should set the ngModel value and bfValue', () => {
      component.setValue(40);
      expect(component.ngModel).toEqual(40);
      expect(component.bfValue).toEqual(40);
    });
    it('should not allow a value out of the min/max', () => {
      component.maxVal = 100; component.minVal = 20;
      component.setValue(200); expect(component.ngModel).toEqual(100);
      component.setValue(5); expect(component.ngModel).toEqual(20);
    });
    it('should adjust the new value to a multiple of bfStep', () => {
      component.bfStep = 4;
      component.setValue(7); expect(component.ngModel).toEqual(8);
      component.setValue(9); expect(component.ngModel).toEqual(8);
      component.setValue(11); expect(component.ngModel).toEqual(12);
    });
  });

  describe('incValue', () => {
    it('should increment ngModel 1', () => {
      component.minVal = 0; component.maxVal = 100;
      component.ngModel = 30;
      component.incValue(1);
      expect(component.ngModel).toEqual(31);
    });
  });

});
