import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfInputComponent } from './bf-input.component';
import { TestingModule } from '../../testing/testing-module';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BfTranslatePipe } from '../abstract-translate.service';

describe('BfInputComponent', () => {
  let component: BfInputComponent;
  let fixture: ComponentFixture<BfInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfInputComponent, BfTranslatePipe ],
      providers: [ LiveAnnouncer ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('parseModelChange', () => {
    it('should pass a string as-is', () => {
      component.bfType = 'text';
      component.parseModelChange('1234');
      expect(component.bfModel).toBe('1234');
    });

    it('should parse numbers', () => {
      component.bfType = 'number';
      component.parseModelChange('1234');
      expect(component.bfModel).toBe(1234);
    });

    it('should not attempt to convert value to a number if value is an empty string', () => {
      // SPL-4078: when '-' or 'e' characters are input they are being represented as an empty string until accompanied by a number
      component.bfType = 'number';
      fixture.detectChanges();

      component.parseModelChange('');
      fixture.detectChanges();

      expect(component.bfModel).toBe('');
    });
  });

  describe('onFocus', () => {
    it('should make a call to liveAnnouncer if error message is present', () => {
      const announcerSpy = spyOn(TestBed.inject(LiveAnnouncer), 'announce').and.callThrough();
      component.setCurrentErrorMessage({ label: 'There is an error' });
      fixture.detectChanges();

      component.onFocus();

      expect(announcerSpy).toHaveBeenCalledWith('There is an error');
    });

    it('should not make a call to liveAnnouncer if no error message is present', () => {
      const announcerSpy = spyOn(TestBed.inject(LiveAnnouncer), 'announce').and.callThrough();
      fixture.detectChanges();

      component.onFocus();

      expect(announcerSpy).not.toHaveBeenCalledWith('There is an error');
    });

  });
});
