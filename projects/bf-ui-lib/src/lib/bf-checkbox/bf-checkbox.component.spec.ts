import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfCheckboxComponent } from './bf-checkbox.component';

describe('BfCheckboxComponent', () => {
  let component: BfCheckboxComponent;
  let fixture: ComponentFixture<BfCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
