import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfLoadingSpinnerComponent } from './bf-loading-spinner.component';

describe('BfLoadingSpinnerComponent', () => {
  let component: BfLoadingSpinnerComponent;
  let fixture: ComponentFixture<BfLoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLoadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
