import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BfLoadingBarComponent } from './bf-loading-bar.component';

describe('BfLoadingBarComponent', () => {
  let component: BfLoadingBarComponent;
  let fixture: ComponentFixture<BfLoadingBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLoadingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
