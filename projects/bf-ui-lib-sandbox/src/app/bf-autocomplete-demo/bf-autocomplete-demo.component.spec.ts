import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfAutocompleteDemoComponent } from './bf-autocomplete-demo.component';

describe('BfAutocompleteDemoComponent', () => {
  let component: BfAutocompleteDemoComponent;
  let fixture: ComponentFixture<BfAutocompleteDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfAutocompleteDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfAutocompleteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
