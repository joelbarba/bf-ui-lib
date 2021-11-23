import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

import {BfSwitchComponent} from './bf-switch.component';
import {TestingModule} from '../../testing/testing-module';
import {BfLabelComponent} from '../bf-label/bf-label.component';

describe('BfSwitchComponent', () => {
  let component: BfSwitchComponent;
  let fixture: ComponentFixture<BfSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BfSwitchComponent, BfLabelComponent],
      imports: [TestingModule, FormsModule, NgbTooltipModule],
    })
      .compileComponents();
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

  describe('Value text position', () => {
    it('should default to value on the right', () => {
      expect(component.bfValueTextPos).toEqual('right');

      const valueContainerDiv: HTMLDivElement = fixture.elementRef.nativeElement.getElementsByClassName('bf-switch')[0];
      expect(valueContainerDiv.classList.contains('bf-switch--value-left')).toBeFalse();

      const valueDiv: HTMLDivElement = fixture.elementRef.nativeElement.getElementsByClassName('switch-value')[0];
      expect(valueDiv.classList.contains('switch-value--left')).toBeFalse();
    });

    it('should default to value on the right', () => {
      component.bfValueTextPos = 'left';

      fixture.detectChanges();

      expect(component.bfValueTextPos).toEqual('left');

      const valueDiv: HTMLDivElement = fixture.elementRef.nativeElement.getElementsByClassName('switch-value--left')[0];
      expect(valueDiv).toBeDefined();

      const valueContainerDiv: HTMLDivElement = fixture.elementRef.nativeElement.getElementsByClassName('bf-switch--value-left')[0];
      expect(valueContainerDiv).toBeDefined();
    });
  });
});
