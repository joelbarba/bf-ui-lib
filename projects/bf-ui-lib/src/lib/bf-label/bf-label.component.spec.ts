import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfLabelComponent } from './bf-label.component';

describe('BfLabelComponent', () => {
  let component: BfLabelComponent;
  let fixture: ComponentFixture<BfLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
