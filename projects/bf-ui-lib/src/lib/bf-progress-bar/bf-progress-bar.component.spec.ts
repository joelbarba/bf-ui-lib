import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';

import {BfProgressBarComponent} from './bf-progress-bar.component';
import {TestingModule} from '../../testing/testing-module';
import {BfTranslatePipe} from '../abstract-translate.service';

describe('BfProgressBarComponent', () => {
  let component: BfProgressBarComponent;
  let fixture: ComponentFixture<BfProgressBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BfProgressBarComponent, BfTranslatePipe],
      imports: [TestingModule, NgbProgressbarModule],
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

  describe('bfCompact', () => {
    it('should add compact class by default', () => {
      expect(component.bfCompact).toBeTrue();

      const compactElement = fixture.nativeElement.querySelector('.compact');

      expect(compactElement).toBeTruthy();
    });

    it('should not add compact class when bfCompact is false', () => {
      component.bfCompact = false;
      fixture.detectChanges();

      const compactElement = fixture.nativeElement.querySelector('.compact');

      expect(compactElement).toBeFalsy();
    });
  });

});
