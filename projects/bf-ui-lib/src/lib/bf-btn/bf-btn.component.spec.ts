import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { TestingModule } from '../../testing/testing-module';

import { BfBtnComponent } from './bf-btn.component';

describe('BfBtnComponent', () => {
  let component: BfBtnComponent;
  let fixture: ComponentFixture<BfBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfBtnComponent, NgbTooltip ],
      imports: [ TestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
