import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfAutocompleteComponent } from './bf-autocomplete.component';

describe('BfAutocompleteComponent', () => {
  let component: BfAutocompleteComponent;
  let fixture: ComponentFixture<BfAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
