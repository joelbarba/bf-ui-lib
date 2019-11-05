import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemoComponent } from './show-demo.component';

describe('ShowDemoComponent', () => {
  let component: ShowDemoComponent;
  let fixture: ComponentFixture<ShowDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
