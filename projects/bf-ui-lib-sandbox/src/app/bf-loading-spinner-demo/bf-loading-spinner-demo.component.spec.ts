import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfLoadingSpinnerDemoComponent } from './bf-loading-spinner-demo.component';

describe('BfLoadingSpinnerDemoComponent', () => {
  let component: BfLoadingSpinnerDemoComponent;
  let fixture: ComponentFixture<BfLoadingSpinnerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLoadingSpinnerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLoadingSpinnerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
