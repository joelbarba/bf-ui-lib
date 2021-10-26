import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../testing/testing-module';
import { BfUILibTransService } from '../abstract-translate.service';
import { BfTimePickerComponent } from './bf-time-picker.component';

describe('TimePickerComponent', () => {
  let component: BfTimePickerComponent;
  let outputSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  describe('Validations', () => {
    it('should return an error if the current time is less than the minimum', () => {
      component.minimumTime = { hour: 12, minute: 10, second: 0 };
      component.currentTime = { hour: 11, minute: 9, second: 0 };

      component.ngOnInit();
      component.timePickerControl.updateValueAndValidity();

      expect(component.timePickerControl.valid).toBe(false);
      expect(component.timePickerControl.hasError('minTimeExceeded')).toBe(true);
      expect(component.timePickerControl.hasError('maxTimeExceeded')).toBe(false);
    });

    it('should return an error if the current time is greater than the maximum', () => {
      component.maximumTime = { hour: 12, minute: 10, second: 0 };
      component.currentTime = { hour: 13, minute: 11, second: 0 };

      component.ngOnInit();
      component.timePickerControl.updateValueAndValidity();

      expect(component.timePickerControl.valid).toBe(false);
      expect(component.timePickerControl.hasError('minTimeExceeded')).toBe(false);
      expect(component.timePickerControl.hasError('maxTimeExceeded')).toBe(true);
    });

    it('should return no errors if current time is between min and max times', () => {
      component.minimumTime = { hour: 10, minute: 10, second: 0 };
      component.maximumTime = { hour: 12, minute: 10, second: 0 };
      component.currentTime = { hour: 11, minute: 10, second: 0 };

      component.ngOnInit();
      component.timePickerControl.updateValueAndValidity();

      expect(component.timePickerControl.valid).toBe(true);
      expect(component.timePickerControl.hasError('minTimeExceeded')).toBe(false);
      expect(component.timePickerControl.hasError('maxTimeExceeded')).toBe(false);
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
      expect(component.timePickerControl.hasError('minTimeExceeded')).toBe(false);
      expect(component.timePickerControl.hasError('maxTimeExceeded')).toBe(false);
    });
  });
});
