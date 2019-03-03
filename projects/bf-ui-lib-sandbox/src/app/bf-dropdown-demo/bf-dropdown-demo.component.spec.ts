import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfDropdownDemoComponent } from './bf-dropdown-demo.component';

describe('BfDropdownDemoComponent', () => {
  let component: BfDropdownDemoComponent;
  let fixture: ComponentFixture<BfDropdownDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfDropdownDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfDropdownDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
