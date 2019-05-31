import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfTextareaDemoComponent } from './bf-textarea-demo.component';

describe('BfTextareaDemoComponent', () => {
  let component: BfTextareaDemoComponent;
  let fixture: ComponentFixture<BfTextareaDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfTextareaDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfTextareaDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
