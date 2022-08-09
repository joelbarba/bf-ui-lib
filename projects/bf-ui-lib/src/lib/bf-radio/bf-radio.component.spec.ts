import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { BfRadioComponent } from './bf-radio.component';
import { ElementRef, SimpleChange } from "@angular/core";
import { TestingModule } from '../../testing/testing-module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BfTranslatePipe, BfUILibTransService } from '../abstract-translate.service';
import { BfUILibTransStubService } from '../../testing/bf-ui-lib-trans-service-stub.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

describe('BfRadioComponent', () => {
  let comp: BfRadioComponent;
  let fixture: ComponentFixture<BfRadioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfRadioComponent, BfTranslatePipe ],
      imports: [ TestingModule, NgbTooltipModule ],
      providers: [
        { provide: BfUILibTransService, useClass: BfUILibTransStubService},
        LiveAnnouncer
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfRadioComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
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


  describe('onFocus', () => {
    it('should open the modal if has a tooltip', () => {
      const announcerSpy = spyOn(TestBed.inject(LiveAnnouncer), 'announce').and.callThrough();
      const openSpy = spyOn(comp.tooltip, 'open').and.returnValue();

      comp.bfTooltip = 'tooltip test';
      comp.isFocused = true;

      comp.onFocus();

      fixture.detectChanges();
      
      expect(openSpy).toHaveBeenCalled();
      expect(announcerSpy).toHaveBeenCalled();
    });

    it('should not open the modal if not has tooltip', () => {
      const announcerSpy = spyOn(TestBed.inject(LiveAnnouncer), 'announce').and.callThrough();
      const openSpy = spyOn(comp.tooltip, 'open').and.returnValue();
      
      comp.bfTooltip = null;
      comp.isFocused = true;

      comp.onFocus();

      fixture.detectChanges();

      expect(openSpy).not.toHaveBeenCalled();
      expect(announcerSpy).not.toHaveBeenCalled();
    });
  });

  describe('onFocusOut', () => {
    it('should close the modal if has a tooltip', () => {
      const closeSpy = spyOn(comp.tooltip, 'close').and.returnValue();

      comp.bfTooltip = 'tooltip test';
      comp.isFocused = true;

      comp.onFocus();
      fixture.detectChanges();

      comp.onFocusOut();
      fixture.detectChanges();
      
      expect(closeSpy).toHaveBeenCalled();
    });
  });
});
