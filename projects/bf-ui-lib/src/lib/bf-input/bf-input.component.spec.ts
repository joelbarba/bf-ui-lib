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

  describe('parseModelChange', () => {
    it('should not attempt to convert value to a number if value is an empty string', () => {
      // SPL-4078: when '-' or 'e' characters are input they are being represented as an empty string until accompanied by a number
      component.bfType = 'number';
      fixture.detectChanges();

      component.parseModelChange('');
      fixture.detectChanges();

      expect(component.bfModel).toBe('');
    });
  });
});
