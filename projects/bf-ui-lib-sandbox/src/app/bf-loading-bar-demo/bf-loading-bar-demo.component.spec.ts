import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfLoadingBarDemoComponent } from './bf-loading-bar-demo.component';

describe('BfLoadingBarDemoComponent', () => {
  let component: BfLoadingBarDemoComponent;
  let fixture: ComponentFixture<BfLoadingBarDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLoadingBarDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLoadingBarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
