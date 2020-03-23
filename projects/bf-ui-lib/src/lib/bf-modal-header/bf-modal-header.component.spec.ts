import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfModalHeaderComponent } from './bf-modal-header.component';
import { By } from '@angular/platform-browser';
import { BfUILibTransService } from '../../public_api';
import { BfUILibTransStubService } from '../../testing/bf-ui-lib-trans-service-stub.service';
import { of } from 'rxjs/internal/observable/of';

describe('BfModalHeaderComponent', () => {
  let component: BfModalHeaderComponent;
  let fixture: ComponentFixture<BfModalHeaderComponent>;
  let translateService: BfUILibTransStubService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfModalHeaderComponent ],
      providers: [{ provide: BfUILibTransService, useClass: BfUILibTransStubService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfModalHeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.get(BfUILibTransService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title', () => {
    const title = 'Title';
    component.bfTitle = 'view.common.modal.title';
    const getLabelsSpy = spyOn(translateService, 'getLabel$').and.returnValue(of(title));

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.modal-title')).nativeElement;

    expect(titleElement.innerText).toBe(title);
    expect(getLabelsSpy).toHaveBeenCalledWith(component.bfTitle);
  });

  it('should show the description', () => {
    const description = 'Description';
    component.bfDescription = 'view.common.modal.description';
    const getLabelsSpy = spyOn(translateService, 'getLabel$').and.returnValue(of(description));

    fixture.detectChanges();

    const descriptionElement = fixture.debugElement.query(By.css('.modal-description')).nativeElement;

    expect(descriptionElement.innerText).toBe(description);
    expect(getLabelsSpy).toHaveBeenCalledWith(component.bfDescription);
  });

  it('should not show the description', () => {
    component.bfDescription = null;
    const getLabelsSpy = spyOn(translateService, 'getLabel$');

    const descriptionElement = fixture.debugElement.query(By.css('.modal-description'));

    expect(getLabelsSpy).not.toHaveBeenCalled();
    expect(descriptionElement).toBeFalsy();
  });

  it('should emit close event', () => {
    const closeSpy = spyOn(component.closeModal, 'emit');

    const closeElement = fixture.debugElement.query(By.css('#modal-close-button')).nativeElement;
    closeElement.click();

    expect(closeSpy).toHaveBeenCalled();
  });
});
