import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListCheckboxComponent } from './bf-list-checkbox.component';

describe('BfListCheckboxComponent', () => {
  let component: BfListCheckboxComponent;
  let fixture: ComponentFixture<BfListCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
