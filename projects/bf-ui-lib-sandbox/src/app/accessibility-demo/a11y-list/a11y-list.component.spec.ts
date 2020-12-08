import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A11yListComponent } from './a11y-list.component';

describe('A11yListComponent', () => {
  let component: A11yListComponent;
  let fixture: ComponentFixture<A11yListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A11yListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A11yListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
