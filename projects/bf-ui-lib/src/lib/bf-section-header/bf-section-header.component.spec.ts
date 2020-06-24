import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BfSectionHeaderComponent } from './bf-section-header.component';
import { BfUILibTransService, BfTranslatePipe } from '../abstract-translate.service';
import { BfUILibTransStubService } from '../../testing/bf-ui-lib-trans-service-stub.service';

describe('BfSectionHeaderComponent', () => {
  let component: BfSectionHeaderComponent;
  let fixture: ComponentFixture<BfSectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfSectionHeaderComponent, BfTranslatePipe ],
      providers: [{ provide: BfUILibTransService, useClass: BfUILibTransStubService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
