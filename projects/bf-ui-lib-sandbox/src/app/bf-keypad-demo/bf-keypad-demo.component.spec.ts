import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfKeypadDemoComponent } from './bf-keypad-demo.component';

describe('BfKeypadDemoComponent', () => {
  let component: BfKeypadDemoComponent;
  let fixture: ComponentFixture<BfKeypadDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfKeypadDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfKeypadDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
