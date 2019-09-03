import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfLazyLoadedTestComponent } from './bf-lazy-loaded-test.component';

describe('BfLazyLoadedTestComponent', () => {
  let component: BfLazyLoadedTestComponent;
  let fixture: ComponentFixture<BfLazyLoadedTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLazyLoadedTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLazyLoadedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
