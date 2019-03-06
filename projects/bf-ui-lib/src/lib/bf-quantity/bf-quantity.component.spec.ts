import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfQuantityComponent } from './bf-quantity.component';

describe('BfQuantityComponent', () => {
  let component: BfQuantityComponent;
  let fixture: ComponentFixture<BfQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
