import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfPromiseDemoComponent } from './bf-promise-demo.component';

describe('BfPromiseDemoComponent', () => {
  let component: BfPromiseDemoComponent;
  let fixture: ComponentFixture<BfPromiseDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfPromiseDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfPromiseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
