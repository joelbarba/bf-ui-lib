import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { TestingModule } from '../../testing/testing-module';
import { BfTimePickerComponent } from './bf-time-picker.component';

describe('TimePickerComponent', () => {
  let component: BfTimePickerComponent;
  let outputSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ BfTimePickerComponent ],
      imports: [ TestingModule ]
    });
  });

  beforeEach(() => {
    component = TestBed.inject(BfTimePickerComponent);
    outputSpy = spyOn(component.timeChanged, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take the time from the provided date', () => {
    const currentDate = new Date();
    currentDate.setHours(13);
    currentDate.setMinutes(45);
    currentDate.setSeconds(0);

    const expectedTimeStruct = component.getTimeFromDate(currentDate);
    expect(expectedTimeStruct).toEqual({ hour: 13, minute: 45, second: 0 });
  });

  it('should convert internal NgbTimeStruct to a formatted string', fakeAsync(() => {
    component.currentTime = { hour: 11, minute: 45, second: 0 };
    component.ngOnInit();
    component.timePickerControl.updateValueAndValidity();
    flush();

    expect(outputSpy).toHaveBeenCalledWith('11:45');
  }));

  it('should convert internal NgbTimeStruct to a formatted string with padded zero', fakeAsync(() => {
    component.currentTime = { hour: 9, minute: 45, second: 0 };
    component.ngOnInit();
    component.timePickerControl.updateValueAndValidity();
    flush();

    expect(outputSpy).toHaveBeenCalledWith('09:45');
  }));

  it('should return an error if the controlName input is not supplied for a formGroup', () => {
    component.formGroup = new UntypedFormGroup({});

    expect(() => {
      component.ngOnInit();
    }).toThrowError('If using a parent form group you must supply a control name!');
  });

  it('should add the control to the form group', () => {
    component.formGroup = new UntypedFormGroup({});
    component.controlName = 'test-control';
    component.ngOnInit();

    expect(component.formGroup.get('test-control')).toBeDefined();
  });

  it('should hide error messages if hideMessages is set to true', () => {
    component.hideErrorMessage = true;
    component.minimumTime = { hour: 12, minute: 10, second: 0 };
    component.currentTime = { hour: 11, minute: 9, second: 0 };

    component.ngOnInit();
    component.timePickerControl.updateValueAndValidity();

    expect(component.shouldShowErrorMessages(component.timePickerControl)).toBeFalse();
  });

  it('should show error messages if hideMessages is set to false', () => {
    component.hideErrorMessage = false;
    component.minimumTime = { hour: 12, minute: 10, second: 0 };
    component.currentTime = { hour: 11, minute: 9, second: 0 };

    component.ngOnInit();
    component.timePickerControl.updateValueAndValidity();

    expect(component.shouldShowErrorMessages(component.timePickerControl)).toBeTrue();
  });

  it('should not show messages if no errors are present', () => {
    component.hideErrorMessage = false;

    component.ngOnInit();

    expect(component.shouldShowErrorMessages(component.timePickerControl)).toBeFalse();
  });

  describe('Validations', () => {
    it('should return an error if the current time is less than the minimum', () => {
      component.minimumTime = { hour: 12, minute: 10, second: 0 };
      component.currentTime = { hour: 11, minute: 9, second: 0 };

      component.ngOnInit();
      component.timePickerControl.updateValueAndValidity();

      expect(component.timePickerControl.valid).toBe(false);
      expect(component.isTooEarly).toBe(true);
      expect(component.isTooLate).toBe(false);
    });

    it('should return an error if the current time is greater than the maximum', () => {
      component.maximumTime = { hour: 12, minute: 10, second: 0 };
      component.currentTime = { hour: 13, minute: 11, second: 0 };

      component.ngOnInit();
      component.timePickerControl.updateValueAndValidity();

      expect(component.timePickerControl.valid).toBe(false);
      expect(component.isTooEarly).toBe(false);
      expect(component.isTooLate).toBe(true);
    });

    it('should return a required error if there no value provided for the time picker', () => {
      component.ngOnInit();
      component.timePickerControl.setValue('');
      component.timePickerControl.updateValueAndValidity();

      expect(component.timePickerControl.valid).toBe(false);
      expect(component.isRequired).toBe(true);
    });

    it('should return no errors if current time is between min and max times', () => {
      component.minimumTime = { hour: 10, minute: 10, second: 0 };
      component.maximumTime = { hour: 12, minute: 10, second: 0 };
      component.currentTime = { hour: 11, minute: 10, second: 0 };

      component.ngOnInit();
      component.timePickerControl.updateValueAndValidity();

      expect(component.timePickerControl.valid).toBe(true);
      expect(component.isTooEarly).toBe(false);
      expect(component.isTooLate).toBe(false);
    });

    it('should not return a formatted string if there are validation errors', fakeAsync(() => {
      component.minimumTime = { hour: 12, minute: 10, second: 0 };
      component.currentTime = { hour: 11, minute: 9, second: 0 };

      component.ngOnInit();
      component.timePickerControl.updateValueAndValidity();
      flush();

      expect(outputSpy).not.toHaveBeenCalled();
    }));

    it('should return no errors if no min/max time is provided', () => {
      component.currentTime = { hour: 11, minute: 0, second: 0 };

      component.ngOnInit();
      component.timePickerControl.updateValueAndValidity();

      expect(component.timePickerControl.valid).toBe(true);
      expect(component.isTooEarly).toBe(false);
      expect(component.isTooLate).toBe(false);
    });
  });

  describe('onChanges', () => {
    let updateSpy: jasmine.Spy;

    beforeEach(() => {
      component.ngOnInit();
      updateSpy = spyOn(component.timePickerControl, 'updateValueAndValidity').and.callThrough();
    });

    it('should update the value if min value is updated', () => {
      const changes = {
        minimumTime: {
          firstChange: false,
          previousValue: { hour: 1, minute: 1, second: 0 },
          currentValue: { hour: 2, minute: 2, second: 0 },
          isFirstChange: () => false
        }
      };

      component.ngOnChanges(changes);

      expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('should not update the value if min value is first change', () => {
      const changes = {
        minimumTime: {
          firstChange: true,
          previousValue: undefined,
          currentValue: { hour: 2, minute: 2, second: 0 },
          isFirstChange: () => true
        }
      };

      component.ngOnChanges(changes);

      expect(updateSpy).not.toHaveBeenCalledTimes(1);
    });

    it('should update the value if max value is updated', () => {
      const changes = {
        maximumTime: {
          firstChange: false,
          previousValue: { hour: 1, minute: 1, second: 0 },
          currentValue: { hour: 2, minute: 2, second: 0 },
          isFirstChange: () => false
        }
      };

      component.ngOnChanges(changes);

      expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('should not update the value if max value is first change', () => {
      const changes = {
        maximumTime: {
          firstChange: true,
          previousValue: undefined,
          currentValue: { hour: 2, minute: 2, second: 0 },
          isFirstChange: () => true
        }
      };

      component.ngOnChanges(changes);

      expect(updateSpy).not.toHaveBeenCalledTimes(1);
    });

    it('should update the value if max and min value is updated', () => {
      const changes = {
        maximumTime: {
          firstChange: false,
          previousValue: { hour: 1, minute: 1, second: 0 },
          currentValue: { hour: 20, minute: 2, second: 0 },
          isFirstChange: () => false
        },
        minimumTime: {
          firstChange: false,
          previousValue: { hour: 1, minute: 1, second: 0 },
          currentValue: { hour: 2, minute: 2, second: 0 },
          isFirstChange: () => false
        }
      };

      component.ngOnChanges(changes);

      expect(updateSpy).toHaveBeenCalledTimes(2);
    });
  });
});
