import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfSwitchComponent } from './bf-switch.component';

describe('BfSwitchComponent', () => {
  let component: BfSwitchComponent;
  let fixture: ComponentFixture<BfSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
