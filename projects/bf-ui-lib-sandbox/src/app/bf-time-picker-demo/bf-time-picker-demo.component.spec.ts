import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfTimePickerDemoComponent } from './bf-time-picker-demo.component';

describe('BfTimePickerDemoComponent', () => {
  let component: BfTimePickerDemoComponent;
  let fixture: ComponentFixture<BfTimePickerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfTimePickerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfTimePickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
