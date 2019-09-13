import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfPagePlaceholderDemoComponent } from './bf-page-placeholder-demo.component';

describe('BfPagePlaceholderDemoComponent', () => {
  let component: BfPagePlaceholderDemoComponent;
  let fixture: ComponentFixture<BfPagePlaceholderDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfPagePlaceholderDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfPagePlaceholderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
