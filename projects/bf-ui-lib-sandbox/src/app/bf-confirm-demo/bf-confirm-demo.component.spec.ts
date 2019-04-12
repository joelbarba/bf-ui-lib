import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfConfirmDemoComponent } from './bf-confirm-demo.component';

describe('BfConfirmDemoComponent', () => {
  let component: BfConfirmDemoComponent;
  let fixture: ComponentFixture<BfConfirmDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfConfirmDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfConfirmDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
