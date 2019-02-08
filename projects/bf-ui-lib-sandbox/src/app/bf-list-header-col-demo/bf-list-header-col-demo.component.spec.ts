import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListHeaderColDemoComponent } from './bf-list-header-col-demo.component';

describe('BfListHeaderColDemoComponent', () => {
  let component: BfListHeaderColDemoComponent;
  let fixture: ComponentFixture<BfListHeaderColDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListHeaderColDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListHeaderColDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
