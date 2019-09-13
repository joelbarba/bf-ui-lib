import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfProgressBarDemoComponent } from './bf-progress-bar-demo.component';

describe('BfProgressBarDemoComponent', () => {
  let component: BfProgressBarDemoComponent;
  let fixture: ComponentFixture<BfProgressBarDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfProgressBarDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfProgressBarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
