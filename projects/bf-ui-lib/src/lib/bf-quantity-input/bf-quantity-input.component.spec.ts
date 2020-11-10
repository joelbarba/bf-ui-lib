import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlDirective, FormsModule } from '@angular/forms';

import { BfQuantityInputComponent } from './bf-quantity-input.component';
import { TestingModule } from '../../testing/testing-module';
import {SimpleChange} from '@angular/core';

describe('BfQuantityInputComponent', () => {
  let component: BfQuantityInputComponent;
  let fixture: ComponentFixture<BfQuantityInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfQuantityInputComponent, FormControlDirective ],
      imports: [ TestingModule, FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfQuantityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a label', () => {
    component.bfLabel = 'Test';
    component.ngOnChanges({ bfLabel: new SimpleChange(null, 'Test', true) });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label span').textContent).toEqual('Test');
  });
});
