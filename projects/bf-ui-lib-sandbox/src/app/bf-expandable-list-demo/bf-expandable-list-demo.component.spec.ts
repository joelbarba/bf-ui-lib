import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfExpandableListDemoComponent } from './bf-expandable-list-demo.component';

describe('BfExpandableListDemoComponent', () => {
  let component: BfExpandableListDemoComponent;
  let fixture: ComponentFixture<BfExpandableListDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfExpandableListDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfExpandableListDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
