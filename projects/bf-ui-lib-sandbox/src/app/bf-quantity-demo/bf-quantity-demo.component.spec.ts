import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfQuantityDemoComponent } from './bf-quantity-demo.component';

describe('BfQuantityDemoComponent', () => {
  let component: BfQuantityDemoComponent;
  let fixture: ComponentFixture<BfQuantityDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfQuantityDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfQuantityDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
