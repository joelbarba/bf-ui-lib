import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfDropContainerDirective } from './bf-drop-placeholder.component';

describe('BfDropPlaceholderComponent', () => {
  let component: BfDropContainerDirective;
  let fixture: ComponentFixture<BfDropContainerDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDropContainerDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDropContainerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
