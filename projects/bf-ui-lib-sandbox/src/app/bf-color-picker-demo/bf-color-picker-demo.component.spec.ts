import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfColorPickerDemoComponent } from './bf-color-picker-demo.component';

describe('BfColorPickerDemoComponent', () => {
  let component: BfColorPickerDemoComponent;
  let fixture: ComponentFixture<BfColorPickerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfColorPickerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfColorPickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
