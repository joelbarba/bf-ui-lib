import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfTextareaComponent } from './bf-textarea.component';

describe('BfTextareaComponent', () => {
  let component: BfTextareaComponent;
  let fixture: ComponentFixture<BfTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
