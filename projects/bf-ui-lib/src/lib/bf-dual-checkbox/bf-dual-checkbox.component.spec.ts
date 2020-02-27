import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfDualCheckboxComponent } from './bf-dual-checkbox.component';
import { TestingModule } from '../../testing/testing-module';
import {BfCheckboxComponent} from '../bf-checkbox/bf-checkbox.component';

fdescribe('BfDualCheckboxComponent', () => {
  let component: BfDualCheckboxComponent;
  let fixture: ComponentFixture<BfDualCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDualCheckboxComponent, BfCheckboxComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDualCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onChange', () => {

    it('Should build the fakeProfile with default bfSelector', () => {
      component.onChange('yes');
    });

  });
});
