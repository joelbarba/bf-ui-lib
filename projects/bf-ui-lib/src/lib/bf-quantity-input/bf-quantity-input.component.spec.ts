import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControlDirective, FormsModule } from '@angular/forms';

import { BfQuantityInputComponent } from './bf-quantity-input.component';
import { TestingModule } from '../../testing/testing-module';
import {SimpleChange} from '@angular/core';
import { BfUILibTransService } from '../abstract-translate.service';

describe('BfQuantityInputComponent', () => {
  let component: BfQuantityInputComponent;
  let fixture: ComponentFixture<BfQuantityInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfQuantityInputComponent, FormControlDirective ],
      imports: [ TestingModule, FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfQuantityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a label', () => {
    component.bfLabel = 'Test';
    component.ngOnChanges({ bfLabel: new SimpleChange(null, 'Test', true) });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label span').textContent).toEqual('Test');
  });

  it('should return a validation error if current value is below the minimum', () => {
    const result = component.getValidationError(100, 120, 150);
    expect(result).toEqual({ label: 'components.bf_quantity_input.min_value.error', params: { min: 120 } });
  });

  it('should return a validation error if current value is above the maximum', () => {
    const result = component.getValidationError(160, 120, 150);
    expect(result).toEqual({ label: 'components.bf_quantity_input.max_value.error', params: { max: 150 } });
  });

  it('should return not error if the current value is within the limits of max and min', () => {
    const result = component.getValidationError(100, 80, 160);
    expect(result).toBeNull();
  });

  it('should set the value of the bfErrorTrans$ to the error returned from the validation function', fakeAsync(() => {
    spyOn(component, 'getValidationError').and.returnValue({ label: 'components.bf_quantity_input.max_value.error', params: { max: 150 } });
    spyOn(TestBed.inject(BfUILibTransService), 'doTranslate').and.callFake(() => 'Value cannot be greater than 150');

    component.validateValue(160);
    flush();

    component.bfErrorTrans$.asObservable().subscribe((value) => {
      expect(value).toBe('Value cannot be greater than 150');
    });
  }));

  it('should set the value of bfErrorTrans$ to the error returned from the validation function', fakeAsync(() => {
    spyOn(component, 'getValidationError').and.returnValue(null);
    component.validateValue(160);
    flush();

    component.bfErrorTrans$.asObservable().subscribe((value) => {
      expect(value).toBe('');
    });
  }));

  it('should only increment the value if the increment buttons are enabled', fakeAsync(() => {
    component.incBtnEnabled = true;
    fixture.detectChanges();

    component.incrementValue(12);
    fixture.detectChanges();
    flush();

    expect(component.bfModel).toEqual(13);
  }));

  it('should not increment the value if the increment buttons are disabled', fakeAsync(() => {
    component.incBtnEnabled = false;
    fixture.detectChanges();

    component.incrementValue(12);
    fixture.detectChanges();
    flush();

    expect(component.bfModel).toEqual(0);
  }));

  it('should only decrement the value if the decrement buttons are enabled', fakeAsync(() => {
    component.decBtnEnabled = true;
    fixture.detectChanges();

    component.decrementValue(12);
    fixture.detectChanges();
    flush();

    expect(component.bfModel).toEqual(11);
  }));

  it('should not decrement the value if the decrement buttons are disabled', fakeAsync(() => {
    component.decBtnEnabled = false;
    fixture.detectChanges();

    component.decrementValue(12);
    fixture.detectChanges();
    flush();

    expect(component.bfModel).toEqual(0);
  }));
});
