import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BfColorPickerComponent } from './bf-color-picker.component';

describe('BfColorPickerComponent', () => {
  let component: BfColorPickerComponent;
  let fixture: ComponentFixture<BfColorPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
