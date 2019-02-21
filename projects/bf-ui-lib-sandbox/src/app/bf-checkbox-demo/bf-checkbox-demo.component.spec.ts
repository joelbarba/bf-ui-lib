import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfCheckboxDemoComponent } from './bf-checkbox-demo.component';

describe('BfCheckboxDemoComponent', () => {
  let component: BfCheckboxDemoComponent;
  let fixture: ComponentFixture<BfCheckboxDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfCheckboxDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfCheckboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
