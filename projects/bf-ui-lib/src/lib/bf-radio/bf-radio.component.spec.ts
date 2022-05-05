import { BfRadioComponent } from './bf-radio.component';
import { ElementRef, SimpleChange } from "@angular/core";

describe('BfRadioComponent', () => {
  let comp: BfRadioComponent;

  beforeEach(async () => {
    comp = new BfRadioComponent();
    const nativeEl = document.createElement('input') as HTMLInputElement;
    comp.radioInput = new ElementRef(nativeEl);
  });

  describe('INIT', () => {
    it('should create the component', () => {
      expect(comp).toBeTruthy();
    });
  });

  describe('ngOnChanges', () => {
    it('should set datValue and emit when bfValue changes', () => {
      comp.bfValue = 123;
      let result: number;
      const sub = comp.value$.subscribe(val => result = val);
      comp.ngOnChanges({ bfValue: new SimpleChange(null, comp.bfValue, true) });
      expect(comp.dataValue).toEqual('123');
      expect(result).toEqual(123);
      sub.unsubscribe();
    });
  });

  describe('isDisabled', () => {
    it('should be disabled if bfDisabled', () => {
      comp.bfDisabled = true;
      expect(comp.isDisabled()).toEqual(true);
    });
    it('should be disabled if groupDisabled', () => {
      comp.groupDisabled = true;
      expect(comp.isDisabled()).toEqual(true);
    });
    it('should be enabled when none', () => {
      expect(comp.isDisabled()).toEqual(false);
    });
  });

  describe('internalChange', () => {
    it('should do nothing if disabled', () => {
      comp.bfDisabled = true;
      comp.internalChange('123');
      expect(comp.bfModel).toEqual(undefined);
    });
    it('should set the model', () => {
      comp.internalChange('123');
      expect(comp.bfModel).toEqual('123');
    });
    it('should check the input if value match', () => {
      comp.bfValue = '123';
      comp.internalChange('123');
      expect(comp.radioInput.nativeElement.checked).toEqual(true);
    });
    it('should emit bfOnSelected if value match', () => {
      let result;
      const sub = comp.bfOnSelected.subscribe(val => result = val);
      comp.bfValue = '123';
      comp.internalChange('123');
      expect(result).toEqual('123');
      sub.unsubscribe();
    });
  });

  describe('externalChange', () => {
    it('should set the model', () => {
      comp.externalChange('123');
      expect(comp.bfModel).toEqual('123');
    });
    it('should check the input if value match', () => {
      comp.bfValue = '123';
      comp.externalChange('123');
      expect(comp.radioInput.nativeElement.checked).toEqual(true);
    });
    it('should emit bfOnSelected if value match', () => {
      let result;
      const sub = comp.bfOnSelected.subscribe(val => result = val);
      comp.bfValue = '123';
      comp.externalChange('123');
      expect(result).toEqual('123');
      sub.unsubscribe();
    });
  });

});
