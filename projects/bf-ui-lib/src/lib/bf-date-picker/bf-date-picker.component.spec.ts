import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfDatePickerComponent } from './bf-date-picker.component';

describe('BfDatePickerComponent', () => {
  let component: BfDatePickerComponent;
  let fixture: ComponentFixture<BfDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDatePickerComponent ]
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
});
