import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfRadioDemoComponent } from './bf-radio-demo.component';

describe('BfRadioDemoComponent', () => {
  let component: BfRadioDemoComponent;
  let fixture: ComponentFixture<BfRadioDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfRadioDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfRadioDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
