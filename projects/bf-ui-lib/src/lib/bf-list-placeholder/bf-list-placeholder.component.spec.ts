import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListPlaceholderComponent } from './bf-list-placeholder.component';

describe('BfListPlaceholderComponent', () => {
  let component: BfListPlaceholderComponent;
  let fixture: ComponentFixture<BfListPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
