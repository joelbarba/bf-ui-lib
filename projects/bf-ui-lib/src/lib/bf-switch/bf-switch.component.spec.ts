import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {BfSwitchComponent} from './bf-switch.component';
import {TestingModule} from '../../testing/testing-module';
import {BfLabelComponent} from '../bf-label/bf-label.component';
import {BfTranslatePipe} from '../abstract-translate.service';

describe('BfSwitchComponent', () => {
  let component: BfSwitchComponent;
  let fixture: ComponentFixture<BfSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BfSwitchComponent, BfLabelComponent, BfTranslatePipe],
      imports: [TestingModule, FormsModule, NgbTooltipModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onKeyUp()', () => {
    it('should show and announce the tooltip on tab in', () => {
      const openTooltipSpy = spyOn(component.tooltip, 'open');
      const announceForScreenReadersSpy = spyOn(component, 'announceForScreenReaders');

      component.bfTooltip = 'This is a tooltip';
      const event = new KeyboardEvent('keypress', {
        code: 'Tab'
      });
      component.onKeyUp(event);
      expect(openTooltipSpy).toHaveBeenCalled();
      expect(announceForScreenReadersSpy).toHaveBeenCalled();
    });
  });

  it('should toggle the value on space', () => {
    component.bfModel = false;
    const event = new KeyboardEvent('keypress', {
      code: 'Space'
    });
    component.onKeyUp(event);
    expect(component.bfModel).toBeTrue();
  });

  describe('onKeyDown()', () => {
    it('should close the tooltip on tab out', () => {
      const closeTooltipSpy = spyOn(component.tooltip, 'close');
      const event = new KeyboardEvent('keypress', {
        code: 'Tab'
      });
      component.bfTooltip = 'This is a tooltip';
      component.onKeyDown(event);
      expect(closeTooltipSpy).toHaveBeenCalled();
    });
  });
});
