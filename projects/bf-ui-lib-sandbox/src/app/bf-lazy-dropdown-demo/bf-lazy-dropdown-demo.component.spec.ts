import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfLazyDropdownDemoComponent } from './bf-lazy-dropdown-demo.component';

describe('BfLazyDropdownDemoComponent', () => {
  let component: BfLazyDropdownDemoComponent;
  let fixture: ComponentFixture<BfLazyDropdownDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLazyDropdownDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLazyDropdownDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
