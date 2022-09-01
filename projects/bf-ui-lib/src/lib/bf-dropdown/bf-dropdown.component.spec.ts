import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfDropdownComponent } from './bf-dropdown.component';
import { TestingModule } from '../../testing/testing-module';
import { BfTranslatePipe } from '../abstract-translate.service';
import { BfDropdownA11yPipe } from './bf-dropdown-a11y.pipe';

describe('BfDropdownComponent', () => {
  let component: BfDropdownComponent;
  let fixture: ComponentFixture<BfDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDropdownComponent, BfTranslatePipe, BfDropdownA11yPipe ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if the selected item matches the model', () => {
    component.bfModel = 'Foobar';
    expect(component.isSelected('Foobar')).toBe(true);
  });

  it('should return an id string with the provided index', () => {
    component.bfListboxId = 'testListBox';
    expect(component.getOptionId(0)).toBe('testListBox-item-0');
  });

  it('should return a value for active decendant', () => {
    component.setActiveDecendant('testListBox-item-0');
    expect(component.getActiveDecendant()).toBe('testListBox-item-0');
  });

  it('should return true if the provided id matches the current active decendant', () => {
    component.setActiveDecendant('testListBox-item-0');
    expect(component.isActiveDecendant('testListBox-item-0')).toBe(true);
  });

  it('should set the active decendant', () => {
    component.setActiveDecendant('testListBox-item-0');
    expect(component.getActiveDecendant()).toBe('testListBox-item-0');
  });

  it('should set the current error text', () => {
    component.setCurrentErrorText(`There's a snake in my boots`);
    fixture.detectChanges();
    expect(component.currentErrorMessage).toBe(`There's a snake in my boots`);
  });
});
