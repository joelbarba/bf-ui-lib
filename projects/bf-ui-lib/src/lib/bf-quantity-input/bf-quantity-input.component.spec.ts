import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfQuantityInputComponent } from './bf-quantity-input.component';

describe('BfQuantityInputComponent', () => {
  let component: BfQuantityInputComponent;
  let fixture: ComponentFixture<BfQuantityInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfQuantityInputComponent ]
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
});
