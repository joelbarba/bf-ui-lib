import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfConfirmComponent } from './bf-confirm.component';

describe('BfConfirmComponent', () => {
  let component: BfConfirmComponent;
  let fixture: ComponentFixture<BfConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfConfirmComponent ]
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
