import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';

import { NgbDropdownModule, NgbDatepickerModule, NgbTooltipModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { BfDateTimePickerComponent } from './bf-date-time-picker.component';
import { BfDatePickerComponent } from '../bf-date-picker/bf-date-picker.component';
import { TestingModule } from '../../testing/testing-module';
import { BfDropdownComponent } from '../bf-dropdown/bf-dropdown.component';
import { BfBtnComponent } from '../bf-btn/bf-btn.component';
import { BfLabelComponent } from '../bf-label/bf-label.component';
import { BfTranslatePipe } from '../abstract-translate.service';
import localeEnIE from '@angular/common/locales/en-IE';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeEnIE, 'en-IE');

const assertDate = (value: Date, valueToTest: Date): boolean => {
  return value.toUTCString() === valueToTest.toUTCString();
};

const updateFixture = (fixture: ComponentFixture<BfDateTimePickerComponent>): void => {
  fixture.detectChanges();
  tick();
  flushMicrotasks();
};

describe('BfTimePickerComponent', () => {
  let component: BfDateTimePickerComponent;
  let fixture: ComponentFixture<BfDateTimePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        NgbDropdownModule,
        FormsModule,
        NgbDatepickerModule,
        NgbTooltipModule
      ],
      declarations: [
        BfDateTimePickerComponent,
        BfDatePickerComponent,
        BfBtnComponent,
        BfDropdownComponent,
        BfLabelComponent,
        BfLabelComponent,
        BfTranslatePipe
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDateTimePickerComponent);
    component = fixture.componentInstance;
    component.bfMinTime = new Date('2020-08-23');
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
      expect(val).toBe('24/08/2020, 13:00 - Europe/Dublin');
    });
  }));

  it('should update the selected time', fakeAsync(() => {
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

  describe('onDateChanged()', () => {
    it('should update the suggestedTime$ when the date picker has been updated', fakeAsync(() => {
      const updatedDate = new Date('2020-08-25');
      component.bfSelectedTime = new Date('2020-08-24');
      fixture.detectChanges();

      component.onDateChanged('2020-08-25');
      updateFixture(fixture);

      const isDateTheSame = assertDate(component.getSuggestedTime(), updatedDate);
      expect(isDateTheSame).toBeTruthy();
    }));

    it('should handle null values', () => {
      component.bfSelectedTime = new Date();
      fixture.detectChanges();

      component.onDateChanged('not-a-date');
      assertDate(component.getSuggestedTime(), new Date());

      component.onDateChanged(undefined);
      assertDate(component.getSuggestedTime(), new Date());
    });
  });

  it('should revert any changes made to the datetime if the cancel button is pressed', fakeAsync(() => {
    const updatedDate = new Date('August 25 2020');
    const initialDate = new Date('August 24 2020');

    component.bfSelectedTime = initialDate;
    fixture.detectChanges();

    component.updateSuggestedTime(updatedDate);
    updateFixture(fixture);

    const isDateUpdated = assertDate(component.getSuggestedTime(), updatedDate);
    const isBfSelectedUnChanged = assertDate(component.bfSelectedTime, initialDate);

    expect(isDateUpdated).toBeTruthy();
    expect(isBfSelectedUnChanged).toBeTruthy();

    component.onCancel({ close: () => {} } as NgbDropdown);
    tick();

    const doesSubjectContainOriginalValue = assertDate(component.getSuggestedTime(), initialDate);
    const isBfSelectedUnChangedAfterCancel = assertDate(component.bfSelectedTime, initialDate);

    expect(isBfSelectedUnChangedAfterCancel).toBeTruthy();
    expect(doesSubjectContainOriginalValue).toBeTruthy();
  }));

  it('should set the locale on init', fakeAsync(() => {
    updateFixture(fixture);
    expect(component.locale).toBe('en-IE');
  }));

  it('should convert a date into a bootstrap time struct', () => {
    const date = new Date();
    date.setHours(16);
    date.setMinutes(45);
    date.setSeconds(0);

    expect(component.convertDateToTimeStruct(date)).toEqual({ hour: 16, minute: 45, second: 0 });
  });

  it('should update the date with the correct time', fakeAsync(() => {
    updateFixture(fixture);
    component.updateTime({ hour: 16, minute: 45, second: 0 });
    updateFixture(fixture);

    component.getSuggestedTime$().subscribe(suggestedTime => {
      const hour = suggestedTime.getHours();
      const minute = suggestedTime.getMinutes();

      expect(hour).toBe(16);
      expect(minute).toBe(45);
    });
  }));

  describe('isDateTimeInvalid()', () => {
    it('should return true if the suggested time is less than the minimum', fakeAsync(() => {
      updateFixture(fixture);
      const suggestedTime = new Date('August 25 2020 15:45');
      component.bfMinTime = new Date('August 25 2020 16:45');
      updateFixture(fixture);

      component.updateSuggestedTime(suggestedTime);

      expect(component.isDateTimeInvalid).toBe(true);
    }));

    it('should return false if the suggested time is the same as the minimum', fakeAsync(() => {
      updateFixture(fixture);
      const suggestedTime = new Date('August 25 2020 16:45');
      component.bfMinTime = new Date('August 25 2020 16:45');
      updateFixture(fixture);

      component.updateSuggestedTime(suggestedTime);

      expect(component.isDateTimeInvalid).toBe(false);
    }));

    it('should return true if the suggested time is greater than the maximum', fakeAsync(() => {
      updateFixture(fixture);
      const suggestedTime = new Date('August 25 2020 17:45');
      component.bfMaxTime = new Date('August 25 2020 16:45');
      updateFixture(fixture);

      component.updateSuggestedTime(suggestedTime);

      expect(component.isDateTimeInvalid).toBe(true);
    }));

    it('should return false if the suggested time is the same as the maximum', fakeAsync(() => {
      updateFixture(fixture);
      const suggestedTime = new Date('August 25 2020 16:45');
      component.bfMaxTime = new Date('August 25 2020 16:45');
      updateFixture(fixture);

      component.updateSuggestedTime(suggestedTime);

      expect(component.isDateTimeInvalid).toBe(false);
    }));
  });

  describe('getMinTime()', () => {
    beforeEach(fakeAsync(() => {
      updateFixture(fixture);
      component.bfMinTime = new Date('August 25 2020 12:21:45');
      component.updateSuggestedTime(new Date('August 25 2020 14:00'));
    }));

    it('should restrict to the selected minimum date', () => {
      expect(component.getMinTime()).toEqual({ hour: 12, minute: 20, second: 0 });
    });

    it('should not restrict time if the selected date is after the minimum date', () => {
      component.updateSuggestedTime(new Date('August 26 2020 14:00'));
      expect(component.getMinTime()).toEqual({ hour: 0, minute: 0, second: 0 });
    });

    it('should default to allow any time', () => {
      delete component.bfMinTime;
      expect(component.getMinTime()).toEqual({ hour: 0, minute: 0, second: 0 });
    });
  });

});
