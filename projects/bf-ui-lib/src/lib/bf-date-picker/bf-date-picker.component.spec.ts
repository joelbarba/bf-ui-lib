import { SimpleChange } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TestingModule } from '../../testing/testing-module';
import { BfTranslatePipe } from '../abstract-translate.service';
import { BfBtnComponent } from '../bf-btn/bf-btn.component';
import { BfLabelComponent } from '../bf-label/bf-label.component';

import { BfDatePickerComponent } from './bf-date-picker.component';

describe('BfDatePickerComponent', () => {
  let component: BfDatePickerComponent;
  let fixture: ComponentFixture<BfDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BfDatePickerComponent, BfTranslatePipe, BfLabelComponent, BfBtnComponent],
      imports: [TestingModule, FormsModule, NgbDatepickerModule, NgbTooltipModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should update the status if the bfErrorOnPristine is true', () => {
      spyOn(component, 'updateStatus').and.stub();

      component.bfErrorOnPristine = false;

      component.ngOnChanges({
        bfErrorOnPristine: new SimpleChange(null, false, false)
      });

      expect(component.updateStatus).not.toHaveBeenCalled();

      component.bfErrorOnPristine = true;

      component.ngOnChanges({
        bfErrorOnPristine: new SimpleChange(false, true, false)
      });

      expect(component.updateStatus).toHaveBeenCalled();
    });
  });

  it('should set the locale on init', fakeAsync(() => {
    flushMicrotasks();
    expect(component.locale).toBe('en-IE');
  }));

  describe('updateStatus', () => {
    it('should set showError', () => {
      component.bfErrorOnPristine = false;
      component.isPristine = true;

      component.updateStatus();
      expect(component.showError).toBeFalse();

      component.bfRequired = true;
      component.updateStatus();
      expect(component.showError).toBeFalse();

      component.bfRequired = true;
      component.bfErrorOnPristine = false;
      component.isPristine = false;

      component.updateStatus();
      expect(component.showError).toBeTrue();

      component.bfErrorOnPristine = true;
      component.isPristine = false;

      component.updateStatus();
      expect(component.showError).toBeTrue();

      component.bfErrorOnPristine = true;
      component.isPristine = true;

      component.updateStatus();
      expect(component.showError).toBeTrue();
    });
  });
});
