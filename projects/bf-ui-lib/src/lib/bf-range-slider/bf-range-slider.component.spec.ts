import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfRangeSliderComponent } from './bf-range-slider.component';

describe('BfRangeSliderComponent', () => {
  let component: BfRangeSliderComponent;
  let fixture: ComponentFixture<BfRangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfRangeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
