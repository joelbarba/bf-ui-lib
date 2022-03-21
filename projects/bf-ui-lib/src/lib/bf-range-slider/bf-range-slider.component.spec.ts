import {ElementRef, SimpleChanges} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {BfRangeSliderComponent} from './bf-range-slider.component';

class FakeElementRef {
  nativeElement = { scrollTo: () => {}, getBoundingClientRect: () => ({ x: 50, width: 300 }), };
}
class FakeNgZone {
  run = () => {};
}

describe('BfRangeSliderComponent', () => {
  let component: BfRangeSliderComponent;
  const elementRef = new FakeElementRef();
  const ngZone = new FakeNgZone();

  beforeEach(() => {
    // @ts-ignore: Unreachable code error
    component = new BfRangeSliderComponent(elementRef, ngZone);
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
      component.ngModel = { min: 30, max: 85 };
      component.bfIniValue = 5;
      component.bfEndValue = 105;
      component.valueSize = 7;
      component.barWidth = 700;
    });
    it('should calculate pointerPos', () => {
      component.updateBar();
      expect(component.pointerPos1).toEqual(175);
      expect(component.pointerPos2).toEqual(560);
    });
    it('should revert the tab indexes if the range is inverted', () => {
      component.bfTabIndex1 = 1;
      component.bfTabIndex2 = 2;
      component.updateBar();
      expect(component.tabIndex1).toEqual(1);
      expect(component.tabIndex2).toEqual(2);
      component.ngModel = { min: 85, max: 30 };
      component.updateBar();
      expect(component.tabIndex1).toEqual(2);
      expect(component.tabIndex2).toEqual(1);
    });
    it('should highlight (set hBar) the space between the pointers', () => {
      component.updateBar();
      expect(component.hBar1).toEqual({ left: 191, right: 156, css: '' });
      expect(component.hBar2).toEqual({ left: 0, right: 0, css: 'hide' });
    });
    it('should highlight between the pointers when range inverse but bfOuterRange = false', () => {
      component.ngModel = { min: 85, max: 30 };
      component.bfOuterRange = false;
      component.updateBar();
      expect(component.hBar1).toEqual({ left: 191, right: 156, css: '' });
      expect(component.hBar2).toEqual({ left: 0, right: 0, css: 'hide' });
    });
    it('should highlight outside the pointers when range inverse and bfOuterRange = true', () => {
      component.ngModel = { min: 85, max: 30 };
      component.updateBar();
      expect(component.hBar1).toEqual({ left: 0, right: 541, css: '' });
      expect(component.hBar2).toEqual({ left: 576, right: 0, css: '' });
    });
    it('should render a merged label when pointers are close', () => {
      component.ngModel = { min: 30, max: 40 };
      component.updateBar();
      expect(component.mergeLabels).toEqual(true);
      expect(component.mLabel).toEqual({ left: 191, right: 471, align: 'center' });
    });
    it('should render a merged label when pointers are close and the range is inverted', () => {
      component.ngModel = { min: 40, max: 30 };
      component.updateBar();
      expect(component.mLabel).toEqual({ left: 175, right: 455, align: 'center' });
    });
    it('should limit the merged label to the left side of the bar', () => {
      component.ngModel = { min: 5, max: 6 };
      component.updateBar();
      expect(component.mLabel).toEqual({ left: 100, right: 100, align: 'left' });
    });
    it('should limit the merged label to the right side of the bar 2', () => {
      component.ngModel = { min: 104, max: 103 };
      component.updateBar();
      expect(component.mLabel).toEqual({ left: 100, right: 100, align: 'right' });
    });
    it('should calculate the ticks[] positions', () => {
      component.bfTicks = 5;
      spyOn(component, 'calculateBar');
      component.setTicksArray();
      component.updateBar();
      expect(component.ticks).toEqual([
        { val: 5,   pos: 11,  label: true, highlight: false },
        { val: 25,  pos: 151, label: true, highlight: false },
        { val: 45,  pos: 291, label: true, highlight: true },
        { val: 65,  pos: 431, label: true, highlight: true },
        { val: 85,  pos: 571, label: true, highlight: true },
        { val: 105, pos: 711, label: true, highlight: false },
      ]);
    });
  });

  describe('setValue', () => {
    beforeEach(() => {
      component.ngModel = { min: 30, max: 80 };
      spyOn(component, 'updateBar');
      spyOn(component, 'propagateModelUp');
    });
    it('should set the ngModel value and bfValue', () => {
      component.setValue({ min: 20, max: 70 });
      expect(component.ngModel).toEqual({ min: 20, max: 70 });
    });
    it('should not allow values out of the min/max', () => {
      component.minVal = 20;
      component.maxVal = 80;
      component.setValue({ min: 15, max: 95 });
      expect(component.ngModel).toEqual({ min: 20, max: 80 });
    });
    it('should adjust the new values to a multiple of bfStep', () => {
      component.bfStep = 5;
      component.setValue({ min: 11, max: 23 });
      expect(component.ngModel).toEqual({ min: 10, max: 25 });
    });
    it('should limit the values when no inverse range is allowed', () => {
      component.bfAllowInverse = false;
      component.ngModel = { min: 30, max: 30 };
      component.setValue({ min: 30, max: 29 });
      expect(component.ngModel).toEqual({ min: 30, max: 30 });
    });
    it('should not propagate the value if that did not change', () => {
      component.setValue({ min: 30, max: 80 });
      expect(component.propagateModelUp).not.toHaveBeenCalled();
      component.setValue({ min: 30, max: 81 });
      expect(component.propagateModelUp).toHaveBeenCalled();
    });
  });

  describe('setOneValue', () => {
    it('should set the min value and preserve the max value', () => {
      spyOn(component, 'setValue');
      component.ngModel = { min: 30, max: 80 };
      component.setOneValue(35, 1);
      expect(component.setValue).toHaveBeenCalledWith({ min: 35, max: 80 });
    });
    it('should set the max value and preserve the min value', () => {
      spyOn(component, 'setValue');
      component.ngModel = { min: 30, max: 80 };
      component.setOneValue(70, 2);
      expect(component.setValue).toHaveBeenCalledWith({ min: 30, max: 70 });
    });
  });

  describe('incValue', () => {
    it('should increment by 5 the min value', () => {
      spyOn(component, 'setOneValue');
      component.ngModel = { min: 30, max: 80 };
      component.incValue(5, 1);
      expect(component.setOneValue).toHaveBeenCalledWith(35, 1);
    });
    it('should increment by -8 the max value', () => {
      spyOn(component, 'setOneValue');
      component.ngModel = { min: 30, max: 80 };
      component.incValue(-8, 2);
      expect(component.setOneValue).toHaveBeenCalledWith(72, 2);
    });
  });

});
