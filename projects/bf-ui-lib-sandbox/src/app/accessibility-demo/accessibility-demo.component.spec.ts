import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityDemoDemoComponent } from './accessibility-demo-demo.component';

describe('AccessibilityDemoDemoComponent', () => {
  let component: AccessibilityDemoDemoComponent;
  let fixture: ComponentFixture<AccessibilityDemoDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessibilityDemoDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibilityDemoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
