import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfPrototypesDemoComponent } from './bf-prototypes-demo.component';

describe('BfPrototypesDemoComponent', () => {
  let component: BfPrototypesDemoComponent;
  let fixture: ComponentFixture<BfPrototypesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfPrototypesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfPrototypesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
