import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfPagePlaceholderComponent } from './bf-page-placeholder.component';

describe('BfPagePlaceholderComponent', () => {
  let component: BfPagePlaceholderComponent;
  let fixture: ComponentFixture<BfPagePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfPagePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfPagePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
