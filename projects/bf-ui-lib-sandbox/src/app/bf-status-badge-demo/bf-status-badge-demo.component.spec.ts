import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfStatusBadgeDemoComponent } from './bf-status-badge-demo.component';

describe('BfStatusBadgeDemoComponent', () => {
  let component: BfStatusBadgeDemoComponent;
  let fixture: ComponentFixture<BfStatusBadgeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfStatusBadgeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfStatusBadgeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
