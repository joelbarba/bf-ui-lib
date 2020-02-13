import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfStatusBadgeComponent } from './bf-status-badge.component';
import { TestingModule } from '../../testing/testing-module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

describe('BfStatusBadgeComponent', () => {
  let component: BfStatusBadgeComponent;
  let fixture: ComponentFixture<BfStatusBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfStatusBadgeComponent ],
      imports: [ TestingModule, NgbTooltipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
