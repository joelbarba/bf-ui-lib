import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListCheckboxDemoComponent } from './bf-list-checkbox-demo.component';

describe('BfListCheckboxDemoComponent', () => {
  let component: BfListCheckboxDemoComponent;
  let fixture: ComponentFixture<BfListCheckboxDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListCheckboxDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListCheckboxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
