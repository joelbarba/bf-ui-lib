import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BfExpandableListComponent } from './bf-expandable-list.component';

describe('BfExpandableListComponent', () => {
  let component: BfExpandableListComponent;
  let fixture: ComponentFixture<BfExpandableListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfExpandableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfExpandableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should split the first item and the rest', () => {
    component.bfList = ['Lagavulin 16', 'Dalwhinnie', 'Laphroaig 10', 'Glenmorange 12', 'Oban'];
    component.ngOnChanges();
    expect(component.firstItem).toEqual('Lagavulin 16');
    expect(component.expList).toEqual(['Dalwhinnie', 'Laphroaig 10', 'Glenmorange 12', 'Oban']);
  });

});
