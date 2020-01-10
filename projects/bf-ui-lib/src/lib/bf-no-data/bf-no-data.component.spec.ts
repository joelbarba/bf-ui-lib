import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfNoDataComponent } from './bf-no-data.component';

describe('BfNoDataComponent', () => {
  let component: BfNoDataComponent;
  let fixture: ComponentFixture<BfNoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfNoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
