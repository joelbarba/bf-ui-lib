import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BfTranslatePipe } from '../abstract-translate.service';

import { BfTextareaComponent } from './bf-textarea.component';
import { TestingModule } from '../../testing/testing-module';

describe('BfTextareaComponent', () => {
  let component: BfTextareaComponent;
  let fixture: ComponentFixture<BfTextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfTextareaComponent, BfTranslatePipe ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
