import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfDatePickerDemoComponent } from './bf-date-picker-demo.component';

describe('BfDatePickerDemoComponent', () => {
  let component: BfDatePickerDemoComponent;
  let fixture: ComponentFixture<BfDatePickerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDatePickerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDatePickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
