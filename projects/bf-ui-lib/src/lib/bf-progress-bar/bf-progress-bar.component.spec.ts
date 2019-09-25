import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfProgressBarComponent } from './bf-progress-bar.component';

describe('BfProgressBarComponent', () => {
  let component: BfProgressBarComponent;
  let fixture: ComponentFixture<BfProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
