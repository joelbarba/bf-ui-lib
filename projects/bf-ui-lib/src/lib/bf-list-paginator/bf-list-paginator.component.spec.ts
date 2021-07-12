import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfListPaginatorComponent } from './bf-list-paginator.component';
import { BfDropdownComponent } from '../bf-dropdown/bf-dropdown.component';
import { TestingModule } from '../../testing/testing-module';

// FIXME null pointer exception
xdescribe('BfListPaginatorComponent', () => {
  let component: BfListPaginatorComponent;
  let fixture: ComponentFixture<BfListPaginatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListPaginatorComponent, BfDropdownComponent ],
      imports: [ TestingModule, FormsModule, NgbTooltipModule ],
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
