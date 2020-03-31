import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfDropPlaceholderComponent } from './bf-drop-placeholder.component';

describe('BfDropPlaceholderComponent', () => {
  let component: BfDropPlaceholderComponent;
  let fixture: ComponentFixture<BfDropPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDropPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDropPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
