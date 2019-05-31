import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfRadioComponent } from './bf-radio.component';

describe('BfRadioComponent', () => {
  let component: BfRadioComponent;
  let fixture: ComponentFixture<BfRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
