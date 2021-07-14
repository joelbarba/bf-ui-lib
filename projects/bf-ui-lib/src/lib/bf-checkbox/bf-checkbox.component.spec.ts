import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfCheckboxComponent } from './bf-checkbox.component';
import { TestingModule } from '../../testing/testing-module';

describe('BfCheckboxComponent', () => {
  let component: BfCheckboxComponent;
  let fixture: ComponentFixture<BfCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfCheckboxComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle on key press', () => {
    component.bfModel = false;
    const event = new KeyboardEvent('keypress',{
      code: 'Space'
    });
    component.keyPressed(event);
    expect(component.bfModel).toBe(true);
    component.keyPressed(event);
    expect(component.bfModel).toBe(false);
  });

  it('shouldn\'t toggle if disabled', () => {
    component.bfModel = false;
    component.bfDisabled = true;
    const event = new KeyboardEvent('keypress',{
      code: 'Space'
    });
    component.keyPressed(event);
    expect(component.bfModel).toBe(false);
  });


});
