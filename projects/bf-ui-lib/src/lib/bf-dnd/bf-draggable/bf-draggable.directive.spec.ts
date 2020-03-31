import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfDraggableDirective } from './bf-drop-placeholder.component';

describe('BfDropPlaceholderComponent', () => {
  let component: BfDraggableDirective;
  let fixture: ComponentFixture<BfDraggableDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDraggableDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDraggableDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
