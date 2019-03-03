import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfSwitchDemoComponent } from './bf-switch-demo.component';

describe('BfSwitchDemoComponent', () => {
  let component: BfSwitchDemoComponent;
  let fixture: ComponentFixture<BfSwitchDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfSwitchDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfSwitchDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
