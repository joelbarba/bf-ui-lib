import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfLabelDemoComponent } from './bf-label-demo.component';

describe('BfLabelDemoComponent', () => {
  let component: BfLabelDemoComponent;
  let fixture: ComponentFixture<BfLabelDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLabelDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLabelDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
