import { async, ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfDatePickerComponent } from './bf-date-picker.component';
import { TestingModule } from '../../testing/testing-module';
import { BfLabelComponent } from '../bf-label/bf-label.component';
import { BfTranslatePipe } from '../abstract-translate.service';
import { BfBtnComponent } from '../bf-btn/bf-btn.component';

describe('BfDatePickerComponent', () => {
  let component: BfDatePickerComponent;
  let fixture: ComponentFixture<BfDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDatePickerComponent, BfTranslatePipe, BfLabelComponent, BfBtnComponent ],
      imports: [ TestingModule, FormsModule, NgbDatepickerModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the locale on init', fakeAsync(() => {
    flushMicrotasks();
    expect(component.locale).toBe('en-IE');
  }));
});
