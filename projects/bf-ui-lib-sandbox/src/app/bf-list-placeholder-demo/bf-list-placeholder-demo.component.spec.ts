import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfListPlaceholderDemoComponent } from './bf-list-placeholder-demo.component';

describe('BfListPlaceholderDemoComponent', () => {
  let component: BfListPlaceholderDemoComponent;
  let fixture: ComponentFixture<BfListPlaceholderDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfListPlaceholderDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfListPlaceholderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
