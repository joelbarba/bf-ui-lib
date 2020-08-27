import { async, ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';

import { NgbDropdownModule, NgbDatepickerModule, NgbTooltipModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { BfTimePickerComponent } from './bf-time-picker.component';
import { BfDatePickerComponent } from '../bf-date-picker/bf-date-picker.component';
import { TestingModule } from '../../testing/testing-module';
import { BfDropdownComponent } from '../bf-dropdown/bf-dropdown.component';
import { BfBtnComponent } from '../bf-btn/bf-btn.component';
import { BfLabelComponent } from '../bf-label/bf-label.component';
import { BfTranslatePipe } from '../abstract-translate.service';
import { BfDate } from '../bf-prototypes/bf-prototypes';

// enable prototypes for test. Error is thrown when the global run is used this will be a temporary measure
for (const proFn in BfDate) {
  if (BfDate.hasOwnProperty(proFn)) {
    Date.prototype[proFn] = BfDate[proFn];
  }
}

const assertDate = (value: Date, valueToTest: Date): boolean => {
  return value.toUTCString() === valueToTest.toUTCString();
};

const updateFixture = (fixture: ComponentFixture<BfTimePickerComponent>): void => {
  fixture.detectChanges();
  tick();
  flushMicrotasks();
};

describe('BfTimePickerComponent', () => {
  let component: BfTimePickerComponent;
  let fixture: ComponentFixture<BfTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        NgbDropdownModule,
        FormsModule,
        NgbDatepickerModule,
        NgbTooltipModule
      ],
      declarations: [
        BfTimePickerComponent,
        BfDatePickerComponent,
        BfBtnComponent,
        BfDropdownComponent,
        BfLabelComponent,
        BfLabelComponent,
        BfTranslatePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfTimePickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should always have a value for suggestedTime$', fakeAsync(() => {
    fixture.detectChanges();
    updateFixture(fixture);

    expect(component.getSuggestedTime()).not.toEqual(null);
  }));

  it('should change the selected timezone', fakeAsync(() => {
    const timezoneSpy = spyOn(component.bfSelectedTimezoneChange, 'emit').and.callThrough();
    component.bfSelectedTime = new Date('2020-08-25');
    updateFixture(fixture);

    component.onTimezoneChanged('Europe/Dublin');
    updateFixture(fixture);

    expect(component.bfSelectedTimezone).toBe('Europe/Dublin');
    expect(timezoneSpy).toHaveBeenCalledWith('Europe/Dublin');
  }));

  it('should return the date string in yyyy-MM-dd format', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020');
    updateFixture(fixture);

    component.getFormattedTimeString$().subscribe(val => {
      expect(val).toBe('2020-08-24');
    });
  }));

  it('should display full datetime and timezone in the input', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020 13:00');
    component.bfSelectedTimezone = 'Europe/Dublin';
    updateFixture(fixture);

    component.getDisplayTime$().subscribe(val => {
      expect(val).toBe('24/08/2020 13:00 PM - Europe/Dublin');
    });
  }));

  it('should update the selcted time', fakeAsync(() => {
    const selectedTime = new Date('2020-08-25');
    component.bfSelectedTime = new Date('2020-08-24');
    component.bfMinTime = new Date('2020-08-23');
    component.bfMaxTime = new Date('2020-08-26');
    fixture.detectChanges();

    const changes = {
      bfSelectedTime: new SimpleChange(component.bfSelectedTime, selectedTime, false),
    };

    component.ngOnChanges(changes);
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), selectedTime);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should set the selected time to bfMaxTime if selected time is greater when selectedTime has changed', fakeAsync(() => {
    const selectedTime = new Date('2020-08-26');
    component.bfSelectedTime = new Date('2020-08-24');
    component.bfMinTime = new Date('2020-08-23');
    component.bfMaxTime = new Date('2020-08-25');
    fixture.detectChanges();

    const changes = {
      bfSelectedTime: new SimpleChange(component.bfSelectedTime, selectedTime, false)
    };

    component.ngOnChanges(changes);
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), component.bfMaxTime);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should set the selected time to bfMinTime if the selected time is less than the minimum when selectedTime has changed', fakeAsync(() => {
    const selectedTime = new Date('2020-08-20');
    component.bfSelectedTime = new Date('2020-08-24');
    component.bfMinTime = new Date('2020-08-23');
    component.bfMaxTime = new Date('2020-08-25');
    fixture.detectChanges();

    const changes = {
      bfSelectedTime: new SimpleChange(component.bfSelectedTime, selectedTime, false)
    };

    component.ngOnChanges(changes);
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), component.bfMinTime);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should set the selected time to the minimum time if current time is less when bfMinTime has changed', fakeAsync(() => {
    const minTime = new Date('2020-08-25');
    component.bfSelectedTime = new Date('2020-08-24');
    component.bfMinTime = new Date('2020-08-23');
    component.bfMaxTime = new Date('2020-08-26');
    fixture.detectChanges();

    const changes = {
      bfMinTime: new SimpleChange(component.bfMinTime, minTime, false)
    };

    component.ngOnChanges(changes);
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), minTime);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should set the selected time to the maximum time if current time is greater when the bfMaxTime has change', fakeAsync(() => {
    const maxTime = new Date('2020-08-24');
    component.bfSelectedTime = new Date('2020-08-25');
    component.bfMinTime = new Date('2020-08-23');
    component.bfMaxTime = new Date('2020-08-26');
    fixture.detectChanges();

    const changes = {
      bfMaxTime: new SimpleChange(component.bfMaxTime, maxTime, false)
    };

    component.ngOnChanges(changes);
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), maxTime);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should update the suggestedTime$ when the date picker has been updated', fakeAsync(() => {
    const updatedDate = new Date('2020-08-25');
    component.bfSelectedTime = new Date('2020-08-24');
    fixture.detectChanges();

    component.onDateChanged(updatedDate);
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), updatedDate);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should fetch the current hour', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020 13:30');
    updateFixture(fixture);

    component.getCurrentHour$().subscribe(hour => {
      expect(hour).toBe('13');
    });
  }));

  it('should fetch the current minute', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020 13:30');
    updateFixture(fixture);

    component.getCurrentMinutes$().subscribe(minute => {
      expect(minute).toBe('30');
    });
  }));

  it('should fetch the before/after hours/minutes from the current time', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020 13:30');
    updateFixture(fixture);

    component.getFollowingValues$().subscribe(followingValues => {
      const { before, after } = followingValues;

      expect(before.hours).toEqual(12);
      expect(before.minutes).toEqual(29);

      expect(after.hours).toEqual(14);
      expect(after.minutes).toEqual(31);
    });
  }));

  it('should return null for following values after the current time if the follwing time is greater than the max time limit', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020 13:30');
    component.bfMaxTime = new Date('August 24 2020 14:30');
    updateFixture(fixture);

    component.getFollowingValues$().subscribe(followingValues => {
      const { before, after } = followingValues;

      expect(before.hours).toEqual(12);
      expect(before.minutes).toEqual(29);

      expect(after.hours).toEqual(null);
      expect(after.minutes).toEqual(null);
    });
  }));

  it('should return null for following values before the current time if the follwing time is less than the min time limit', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020 13:30');
    component.bfMinTime = new Date('August 24 2020 12:30');
    updateFixture(fixture);

    component.getFollowingValues$().subscribe(followingValues => {
      const { before, after } = followingValues;

      expect(before.hours).toEqual(null);
      expect(before.minutes).toEqual(null);

      expect(after.hours).toEqual(14);
      expect(after.minutes).toEqual(31);
    });
  }));

  it('should ensure the correct hour/minute values are returned if they go above the threshold', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020 23:59');
    updateFixture(fixture);

    component.getFollowingValues$().subscribe(({ after }) => {
      const { hours, minutes } = after;

      expect(hours).toBe(0);
      expect(minutes).toBe(0);
    });
  }));

  it('should ensure the correct hour/minute values are returned if they go below the threshold', fakeAsync(() => {
    component.bfSelectedTime = new Date('August 24 2020 00:00');
    updateFixture(fixture);

    component.getFollowingValues$().subscribe(({ before }) => {
      const { hours, minutes } = before;

      expect(hours).toBe(23);
      expect(minutes).toBe(59);
    });
  }));

  it('should display following values correctly', () => {
    expect(component.displayFollowingTimeValues(1)).toBe('01');
    expect(component.displayFollowingTimeValues(null)).toBe('-');
  });

  it('should increment the number of hours by one', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 13:30');
    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.incrementHours();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), new Date('Auguest 24 2020 14:30'));
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should not increment the hours if it goes above max limit', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 13:30');
    component.bfSelectedTime = initialDate;
    component.bfMaxTime = initialDate;
    fixture.detectChanges();

    component.incrementHours();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), initialDate);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should increment the number of minutes by one', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 13:30');
    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.incrementMinutes();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), new Date('August 24 2020 13:31'));
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should not increment the minutes if it goes above max limit', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 13:30');
    component.bfSelectedTime = initialDate;
    component.bfMaxTime = initialDate;
    fixture.detectChanges();

    component.incrementMinutes();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), initialDate);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should update the minutes to meet minium threshold if below when hour decreses', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 13:28');
    const minDate = new Date('August 24 2020 11:30');
    const expectedDate = new Date('August 24 2020 12:30');

    component.bfSelectedTime = initialDate;
    component.bfMinTime = minDate;
    fixture.detectChanges();

    component.decrementHours();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), expectedDate);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should update the minutes to meet the maximum threshold if below when hour decreases', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 13:38');
    const maxDate = new Date('August 24 2020 15:30');
    const expectedDate = new Date('August 24 2020 14:30');

    component.bfSelectedTime = initialDate;
    component.bfMaxTime = maxDate;
    fixture.detectChanges();

    component.incrementHours();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), expectedDate);
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should increment the hours if the minute goes above 59', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 13:59');
    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.incrementMinutes();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), new Date('August 24 2020 14:00'));
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should decrement the hours if the minutes goes below 0', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 13:00');
    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.decrementMinutes();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), new Date('August 24 2020 12:59'));
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should increase the day if the hour goes above 23:00', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 23:00');
    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.incrementHours();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), new Date('August 25 2020 00:00'));
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should decrease the day if the hours goes below 0', fakeAsync(() => {
    const initialDate = new Date('August 24 2020 00:00');
    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.decrementHours();
    updateFixture(fixture);

    const isDateTheSame = assertDate(component.getSuggestedTime(), new Date('August 23 2020 23:00'));
    expect(isDateTheSame).toBeTruthy();
  }));

  it('should trigger increment hours/minutes when the mouse wheel scolls up', fakeAsync(() => {
    fixture.detectChanges();
    const incrementHoursSpy = spyOn(component, 'incrementHours').and.callFake(() => {});
    const incrementMinutesSpy = spyOn(component, 'incrementMinutes').and.callFake(() => {});

    const upEvent = new WheelEvent('wheel', { deltaY: -20 });

    component.onMouseWheelMinutes(upEvent);
    component.onMouseWheelHours(upEvent);
    updateFixture(fixture);

    expect(incrementHoursSpy).toHaveBeenCalled();
    expect(incrementMinutesSpy).toHaveBeenCalled();
  }));

  it('should trigger decrement hours/minutes when the mouse wheel is scrolls down', fakeAsync(() => {
    fixture.detectChanges();
    const decrementHoursSpy = spyOn(component, 'decrementHours').and.callFake(() => {});
    const decrementMinutesSpy = spyOn(component, 'decrementMinutes').and.callFake(() => {});

    const downEvent = new WheelEvent('wheel', { deltaY: 20 });

    component.onMouseWheelHours(downEvent);
    component.onMouseWheelMinutes(downEvent);
    updateFixture(fixture);

    expect(decrementMinutesSpy).toHaveBeenCalled();
    expect(decrementHoursSpy).toHaveBeenCalled();
  }));

  it('should revert any changes made to the datetime if the cancel button is pressed', fakeAsync(() => {
    const updatedDate = new Date('2020-08-25');
    const initialDate = new Date('2020-08-24');
    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.updateSuggestedTime(updatedDate);
    updateFixture(fixture);

    const isDateUpdated = assertDate(component.getSuggestedTime(), updatedDate);
    const isBfSelectedUnChanged = assertDate(component.bfSelectedTime, initialDate);

    expect(isDateUpdated).toBeTruthy();
    expect(isBfSelectedUnChanged).toBeTruthy();

    component.onCancel({ close: () => {} } as NgbDropdown);
    updateFixture(fixture);

    const doesSubjectContainOriginalValue = assertDate(component.getSuggestedTime(), initialDate);
    const isBfSelectedUnChangedAfterCancel = assertDate(component.bfSelectedTime, initialDate);

    expect(isBfSelectedUnChangedAfterCancel).toBeTruthy();
    expect(doesSubjectContainOriginalValue).toBeTruthy();
  }));

  it('should emit an event when onSave is called', fakeAsync(() => {
    const selectedTimeChangeSpy = spyOn(component.bfSelectedTimeChange, 'emit').and.callFake(() => {});
    const initialDate = new Date('2020-08-24');
    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.onSave({ close: () => {} } as NgbDropdown);
    updateFixture(fixture);

    expect(selectedTimeChangeSpy).toHaveBeenCalledWith(initialDate);
  }));
});
