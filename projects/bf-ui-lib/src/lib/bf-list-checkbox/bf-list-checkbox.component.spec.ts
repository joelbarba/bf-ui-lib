import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BfListCheckboxComponent } from './bf-list-checkbox.component';
import {TestingModule} from '../../testing/testing-module';
import {BfCheckboxComponent} from '../bf-checkbox/bf-checkbox.component';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {BfListHandler} from '../bf-list-handler/bf-list-handler';
import {BfListSelection} from '../bf-list-selection/bf-list-selection';
import {SimpleChange} from '@angular/core';


describe('BfListCheckboxComponent', () => {
  let component: BfListCheckboxComponent;
  let fixture: ComponentFixture<BfListCheckboxComponent>;
  let element: HTMLElement;

  let mySel: BfListSelection;
  let myList: BfListHandler;
  const myData = [
    { id: '1', name: 'First of his name' },
    { id: '2', name: 'Second minute' },
    { id: '3', name: 'Third position' },
    { id: '4', name: 'Fourth musketeer' },
    { id: '5', name: 'Fifth element' },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        FormsModule,
        NgbTooltipModule,
      ],
      declarations: [
        BfListCheckboxComponent,
        BfCheckboxComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListCheckboxComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    myList = new BfListHandler({ listName: 'test-list' });
    myList.load(myData);
    mySel = new BfListSelection(myList);
    fixture.detectChanges();
  });
  afterEach(() => {
    mySel.destroy();
    myList.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should link a selection header and change accordingly', () => {
    component.selection = mySel;
    component.ngOnChanges({ selection: new SimpleChange(null, component.selection, true) });
    fixture.detectChanges();

    const checkBox = fixture.nativeElement.querySelector('bf-checkbox input[type="checkbox"]');
    expect(checkBox.checked).toBeFalsy();
    checkBox.click();
    fixture.detectChanges();
    expect(mySel.isPageChecked).toBeTruthy();

    mySel.togglePage(true);
    fixture.detectChanges();
    expect(checkBox.checked).toBeTruthy();
  });


  it('should link a row selection and change accordingly', () => {
    component.selection = mySel;
    component.id = '3';
    component.ngOnChanges({ selection: new SimpleChange(null, component.selection, true) });
    component.ngOnChanges({ id: new SimpleChange(null, component.id, true) });
    fixture.detectChanges();

    const checkBox = fixture.nativeElement.querySelector('bf-checkbox input[type="checkbox"]');
    expect(checkBox.checked).toBeFalsy();

    checkBox.click();
    fixture.detectChanges();
    expect(mySel.getSelection()).toEqual(['3']);

    mySel.toggleCheck('3');
    fixture.detectChanges();
    expect(mySel.getSelection()).toEqual([]);
  });


});
