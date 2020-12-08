import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A11yFormComponent } from './a11y-form.component';

describe('A11yFormComponent', () => {
  let component: A11yFormComponent;
  let fixture: ComponentFixture<A11yFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A11yFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A11yFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
