import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListPaginatorDemoComponent } from './bf-list-paginator-demo.component';

describe('BfListPaginatorDemoComponent', () => {
  let component: BfListPaginatorDemoComponent;
  let fixture: ComponentFixture<BfListPaginatorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListPaginatorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListPaginatorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
