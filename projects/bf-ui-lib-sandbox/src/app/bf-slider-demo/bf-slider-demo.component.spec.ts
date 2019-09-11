import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfSliderDemoComponent } from './bf-slider-demo.component';

describe('BfSliderDemoComponent', () => {
  let component: BfSliderDemoComponent;
  let fixture: ComponentFixture<BfSliderDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfSliderDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfSliderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
