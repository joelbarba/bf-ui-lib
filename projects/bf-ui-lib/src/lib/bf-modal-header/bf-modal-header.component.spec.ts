import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BfModalHeaderComponent } from './bf-modal-header.component';
import { BfTranslatePipe, BfUILibTransService } from '../abstract-translate.service';
import { BfUILibTransStubService } from '../../testing/bf-ui-lib-trans-service-stub.service';


describe('BfModalHeaderComponent', () => {
  let component: BfModalHeaderComponent;
  let fixture: ComponentFixture<BfModalHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfModalHeaderComponent, BfTranslatePipe ],
      providers: [{ provide: BfUILibTransService, useClass: BfUILibTransStubService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event', () => {
    const closeSpy = spyOn(component.bfClose, 'emit');

    component.close({preventDefault : () => {}});
    expect(closeSpy).toHaveBeenCalled();
  });
});
