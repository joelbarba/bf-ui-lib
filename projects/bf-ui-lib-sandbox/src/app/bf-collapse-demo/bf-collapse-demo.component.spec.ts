import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfCollapseDemoComponent } from './bf-collapse-demo.component';

describe('BfCollapseDemoComponent', () => {
  let component: BfCollapseDemoComponent;
  let fixture: ComponentFixture<BfCollapseDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfCollapseDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfCollapseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
