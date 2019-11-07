import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfNoDataDemoComponent } from './bf-no-data-demo.component';

describe('BfNoDataDemoComponent', () => {
  let component: BfNoDataDemoComponent;
  let fixture: ComponentFixture<BfNoDataDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfNoDataDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfNoDataDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
