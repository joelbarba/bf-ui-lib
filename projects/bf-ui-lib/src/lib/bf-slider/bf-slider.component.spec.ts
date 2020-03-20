import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfSliderComponent } from './bf-slider.component';
import {BfLabelComponent} from '../bf-label/bf-label.component';
import {Ng5SliderModule, Options} from 'ng5-slider';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

describe('BfSliderComponent', () => {
  let component: BfSliderComponent;
  let fixture: ComponentFixture<BfSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfSliderComponent, BfLabelComponent ],
      imports: [Ng5SliderModule, NgbTooltipModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfSliderComponent);
    component = fixture.componentInstance;
    component.bfOptions = { start: 10, end: 150 };
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should customize bfOptions', () => {
    component.bfOptions = {
      start: 100,
      end: 150,
      step: 2,
      showTicks: true,
      showTicksValues: true,
      tickStep: 10,
      tickValueStep: 5
    };
    component.ngOnInit();
    expect(component.sliderOptions).toEqual({
      animate: false,
      floor: 100,
      ceil: 150,
      disabled: false,
      step: 2,
      showSelectionBar: false,
      showSelectionBarEnd: false,
      showTicks: true,
      showTicksValues: true,
      tickStep: 10,
      tickValueStep: 5,
      ticksArray: null,
      maxLimit: null,
      minLimit: null
    });
  });

  it('Should add ticksArray', () => {
    component.bfOptions = {
      start: 100,
      end: 150,
      showTicks: true,
      showTicksValues: true,
      tickArray: [100, 110, 120, 130, 140, 150]
    };
    component.optionsRebuild();
    expect(component.sliderOptions.floor).toBe(100);
    expect(component.sliderOptions.ceil).toBe(150);
    expect(component.sliderOptions.ticksArray).toEqual([100, 110, 120, 130, 140, 150]);
  });

  it('Should Disabled the Slider', () => {
    component.bfDisabled = true;
    component.ngOnChanges({
      bfDisabled: { currentValue: true }
    });
    expect(component.sliderOptions.disabled).toBe(true);
  });
});
