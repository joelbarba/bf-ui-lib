import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfSectionHeaderComponent } from './bf-section-header.component';
import { BfUILibTransService } from '../abstract-translate.service';
import { BfUILibTransStubService } from '../../testing/bf-ui-lib-trans-service-stub.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('BfSectionHeaderComponent', () => {
  let component: BfSectionHeaderComponent;
  let fixture: ComponentFixture<BfSectionHeaderComponent>;
  let translateService: BfUILibTransStubService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfSectionHeaderComponent ],
      providers: [{ provide: BfUILibTransService, useClass: BfUILibTransStubService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfSectionHeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.get(BfUILibTransService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title', () => {
    const title = 'Title';
    component.bfTitle = 'view.common.title';
    const getLabelsSpy = spyOn(translateService, 'getLabel$').and.returnValue(of(title));

    component.ngOnChanges();
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.section-header--title')).nativeElement;

    expect(titleElement.innerText).toBe(title);
    expect(getLabelsSpy).toHaveBeenCalledWith(component.bfTitle);
  });

  it('should show the description', () => {
    const description = 'Description';
    component.bfDescription = 'view.common.description';
    const getLabelsSpy = spyOn(translateService, 'getLabel$').and.returnValue(of(description));

    component.ngOnChanges();
    fixture.detectChanges();

    const descriptionElement = fixture.debugElement.query(By.css('.section-header--description')).nativeElement;

    expect(descriptionElement.innerText).toBe(description);
    expect(getLabelsSpy).toHaveBeenCalledWith(component.bfDescription);
  });

  it('should not show the description', () => {
    component.bfDescription = null;
    const getLabelsSpy = spyOn(translateService, 'getLabel$');

    const descriptionElement = fixture.debugElement.query(By.css('.section-header--description'));

    expect(getLabelsSpy).not.toHaveBeenCalled();
    expect(descriptionElement).toBeFalsy();
  });

});
