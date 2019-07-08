import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListPaginatorComponent } from './bf-list-paginator.component';

describe('BfListPaginatorComponent', () => {
  let component: BfListPaginatorComponent;
  let fixture: ComponentFixture<BfListPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
