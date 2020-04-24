import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { BfConfirmComponent } from './bf-confirm.component';
import { BfBtnComponent } from '../bf-btn/bf-btn.component';
import { TestingModule } from '../../testing/testing-module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BfConfirmComponent', () => {
  let component: BfConfirmComponent;
  let fixture: ComponentFixture<BfConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ BfConfirmComponent, BfBtnComponent ],
      imports: [ TestingModule, NgbModalModule, NgbTooltipModule ],
      providers: [ NgbActiveModal ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
