import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfMultiSelectorDemoComponent } from './bf-multi-selector-demo.component';

describe('BfMultiSelectorDemoComponent', () => {
  let component: BfMultiSelectorDemoComponent;
  let fixture: ComponentFixture<BfMultiSelectorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfMultiSelectorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfMultiSelectorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
