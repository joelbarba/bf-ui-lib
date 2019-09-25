import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListHandlerDemoComponent } from './bf-list-handler-demo.component';

describe('BfDeferDemoComponent', () => {
  let component: BfListHandlerDemoComponent;
  let fixture: ComponentFixture<BfListHandlerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListHandlerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListHandlerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
