import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { BfProgressBarComponent } from './bf-progress-bar.component';
import { TestingModule } from '../../testing/testing-module';
import { BfTranslatePipe } from '../abstract-translate.service';

describe('BfProgressBarComponent', () => {
  let component: BfProgressBarComponent;
  let fixture: ComponentFixture<BfProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfProgressBarComponent, BfTranslatePipe ],
      imports: [ TestingModule, NgbProgressbarModule ],
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
