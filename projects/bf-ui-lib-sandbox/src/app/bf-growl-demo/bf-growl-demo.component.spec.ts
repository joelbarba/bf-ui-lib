import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfBtnDemoComponent } from './bf-btn-demo.component';

describe('BfBtnDemoComponent', () => {
  let component: BfBtnDemoComponent;
  let fixture: ComponentFixture<BfBtnDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfBtnDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfBtnDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
