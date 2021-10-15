import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerDemoComponent } from './bf-time-picker-demo.component';

describe('TimePickerDemoComponent', () => {
  let component: TimePickerDemoComponent;
  let fixture: ComponentFixture<TimePickerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePickerDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
