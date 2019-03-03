import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfInputDemoComponent } from './bf-input-demo.component';

describe('BfInputDemoComponent', () => {
  let component: BfInputDemoComponent;
  let fixture: ComponentFixture<BfInputDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfInputDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfInputDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
