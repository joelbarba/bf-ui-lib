import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfDropdownComponent } from './bf-dropdown.component';

describe('BfDropdownComponent', () => {
  let component: BfDropdownComponent;
  let fixture: ComponentFixture<BfDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
