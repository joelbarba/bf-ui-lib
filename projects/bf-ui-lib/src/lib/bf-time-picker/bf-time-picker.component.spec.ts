import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfTimePickerComponent } from './bf-time-picker.component';

describe('BfTimePickerComponent', () => {
  let component: BfTimePickerComponent;
  let fixture: ComponentFixture<BfTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
