import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfQuantityInputDemoComponent } from './bf-quantity-input-demo.component';

describe('BfQuantityInputDemoComponent', () => {
  let component: BfQuantityInputDemoComponent;
  let fixture: ComponentFixture<BfQuantityInputDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfQuantityInputDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfQuantityInputDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
