import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfRangeSliderComponent } from './bf-range-slider.component';
import {BfLabelComponent} from '../bf-label/bf-label.component';
import {Ng5SliderModule} from 'ng5-slider';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

describe('BfRangeSliderComponent', () => {
  let component: BfRangeSliderComponent;
  let fixture: ComponentFixture<BfRangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfRangeSliderComponent, BfLabelComponent ],
      imports: [ Ng5SliderModule, NgbTooltipModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfRangeSliderComponent);
    component = fixture.componentInstance;
    component.ngModel = { min: 20, max: 180 };
    component.bfOptions = { start: 0, end: 200 };
    fixture.detectChanges();
  });

  it('should create', () => {
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
      tickValueStep: 5,
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
      minLimit: null,
      showOuterSelectionBars: false
    });
  });

  it('Should Disabled the Slider', () => {
    component.bfDisabled = true;
    component.ngOnChanges({
      bfDisabled: { currentValue: true }
    });
    expect(component.sliderOptions.disabled).toBe(true);
  });

  it('Should show outer bar Range', () => {
    component.bfShowOuterSection = true;
    component.ngOnChanges({
      bfShowOuterSection: { currentValue: true }
    });
    expect(component.sliderOptions.showOuterSelectionBars).toBe(true);
  });

  it('Should add Max and Min Range', () => {
    component.bfOptions = {
      start: 100,
      end: 200,
      showTicks: true,
      showTicksValues: true,
      maxLimit: 180,
      maxRange: 50,
      minLimit: 110,
      minRange: 5
    };
    component.rangeOptionsRebuild();
    expect(component.sliderOptions.maxLimit).toBe(180);
    expect(component.sliderOptions.maxRange).toBe(50);
    expect(component.sliderOptions.minLimit).toBe(110);
    expect(component.sliderOptions.minRange).toBe(5);
  });

});
