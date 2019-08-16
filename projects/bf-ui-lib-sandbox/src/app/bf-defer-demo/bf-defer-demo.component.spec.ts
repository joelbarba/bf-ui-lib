import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfDeferDemoComponent } from './bf-defer-demo.component';

describe('BfDeferDemoComponent', () => {
  let component: BfDeferDemoComponent;
  let fixture: ComponentFixture<BfDeferDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDeferDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDeferDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
