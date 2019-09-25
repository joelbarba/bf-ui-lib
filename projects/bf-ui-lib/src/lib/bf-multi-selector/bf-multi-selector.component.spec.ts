import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfMultiSelectorComponent } from './bf-multi-selector.component';

describe('BfMultiSelectorComponent', () => {
  let component: BfMultiSelectorComponent;
  let fixture: ComponentFixture<BfMultiSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfMultiSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfMultiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
