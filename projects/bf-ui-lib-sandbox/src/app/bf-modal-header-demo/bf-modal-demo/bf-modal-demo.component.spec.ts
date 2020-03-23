import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfModalDemoComponent } from './bf-modal-demo.component';

describe('BfModalDemoComponent', () => {
  let component: BfModalDemoComponent;
  let fixture: ComponentFixture<BfModalDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfModalDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfModalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
