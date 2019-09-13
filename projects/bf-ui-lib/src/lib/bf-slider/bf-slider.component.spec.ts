import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfSliderComponent } from './bf-slider.component';

describe('BfSliderComponent', () => {
  let component: BfSliderComponent;
  let fixture: ComponentFixture<BfSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
