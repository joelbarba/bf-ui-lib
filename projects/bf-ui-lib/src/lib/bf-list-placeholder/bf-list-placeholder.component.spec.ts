import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BfListPlaceholderComponent } from './bf-list-placeholder.component';

describe('BfListPlaceholderComponent', () => {
  let component: BfListPlaceholderComponent;
  let fixture: ComponentFixture<BfListPlaceholderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setupColumns()', () => {


    it('should add the correct columns - all numbers', () => {
      component.bfColumns = [3, 2, 4];
      component.bfRows = 1;

      component.setupColumns();

      expect(component.fakeRows[0].fakeCols.length).toEqual(4);

      const fakeRowCols = component.fakeRows[0].fakeCols;

      expect(fakeRowCols[0].ind).toEqual(0);
      expect(fakeRowCols[1].ind).toEqual(1);
      expect(fakeRowCols[2].ind).toEqual(2);
      expect(fakeRowCols[0].colClass).toContain(`col-${3}`);
      expect(fakeRowCols[0].colClass).toContain(`left-align`);
      expect(fakeRowCols[1].colClass).toContain(`col-${2}`);
      expect(fakeRowCols[1].colClass).toContain(`left-align`);
      expect(fakeRowCols[2].colClass).toContain(`col-${4}`);
      expect(fakeRowCols[2].colClass).toContain(`left-align`);
      expect(fakeRowCols[3].colClass).toBe(`col-${3} fake-button-template`);
    });

    it('should add the correct columns - with alignment options', () => {
      component.bfColumns = [
        { size: 1, alignment: 'center' },
        { size: 2, alignment: 'right' },
        { size: 3, alignment: 'left' },
        { size: 4 },
      ];
      component.bfRows = 1;

      component.setupColumns();

      expect(component.fakeRows[0].fakeCols.length).toEqual(5);

      const fakeRowCols = component.fakeRows[0].fakeCols;

      expect(fakeRowCols[0].ind).toEqual(0);
      expect(fakeRowCols[1].ind).toEqual(1);
      expect(fakeRowCols[2].ind).toEqual(2);
      expect(fakeRowCols[3].ind).toEqual(3);
      expect(fakeRowCols[0].colClass).toContain(`col-${1}`);
      expect(fakeRowCols[0].colClass).toContain(`center-align`);
      expect(fakeRowCols[1].colClass).toContain(`col-${2}`);
      expect(fakeRowCols[1].colClass).toContain(`right-align`);
      expect(fakeRowCols[2].colClass).toContain(`col-${3}`);
      expect(fakeRowCols[2].colClass).toContain(`left-align`);
      expect(fakeRowCols[3].colClass).toContain(`col-${4}`);
      expect(fakeRowCols[3].colClass).toContain(`left-align`);
      expect(fakeRowCols[4].colClass).toBe(`col-${2} fake-button-template`);
    });

    it('should add the correct columns - no buttons column', () => {
      component.bfColumns = [4, 4, 4];
      component.bfRows = 1;

      component.setupColumns();

      expect(component.fakeRows[0].fakeCols.length).toEqual(3);
      expect(component.fakeRows[0].fakeCols[2].colClass).not.toContain(`fake-button-template`);
    });

  });
});
