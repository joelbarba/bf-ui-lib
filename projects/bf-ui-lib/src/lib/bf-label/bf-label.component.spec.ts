import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfLabelComponent } from './bf-label.component';
import { TestingModule } from '../../testing/testing-module';

describe('BfLabelComponent', () => {
  let component: BfLabelComponent;
  let fixture: ComponentFixture<BfLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLabelComponent ],
      imports: [ TestingModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
