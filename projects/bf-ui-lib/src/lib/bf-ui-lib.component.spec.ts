import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfUiLibComponent } from './bf-ui-lib.component';

describe('BfUiLibComponent', () => {
  let component: BfUiLibComponent;
  let fixture: ComponentFixture<BfUiLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfUiLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfUiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
