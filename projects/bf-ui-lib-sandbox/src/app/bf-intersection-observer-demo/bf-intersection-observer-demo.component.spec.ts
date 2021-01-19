import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfIntersectionObserverDemoComponent } from './bf-intersection-observer-demo.component';

describe('BfIntersectionObserverDemoComponent', () => {
  let component: BfIntersectionObserverDemoComponent;
  let fixture: ComponentFixture<BfIntersectionObserverDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfIntersectionObserverDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfIntersectionObserverDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
