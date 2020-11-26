import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A11yTabsComponent } from './a11y-tabs.component';

describe('A11yTabsComponent', () => {
  let component: A11yTabsComponent;
  let fixture: ComponentFixture<A11yTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A11yTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A11yTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
