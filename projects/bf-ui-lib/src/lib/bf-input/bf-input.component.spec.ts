import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfInputComponent } from './bf-input.component';
import { TestingModule } from '../../testing/testing-module';

describe('BfInputComponent', () => {
  let component: BfInputComponent;
  let fixture: ComponentFixture<BfInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfInputComponent ],
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
});
