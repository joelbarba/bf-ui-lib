import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfSwitchComponent } from './bf-switch.component';
import { TestingModule } from '../../testing/testing-module';
import { BfLabelComponent } from '../bf-label/bf-label.component';

describe('BfSwitchComponent', () => {
  let component: BfSwitchComponent;
  let fixture: ComponentFixture<BfSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfSwitchComponent, BfLabelComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
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
});
