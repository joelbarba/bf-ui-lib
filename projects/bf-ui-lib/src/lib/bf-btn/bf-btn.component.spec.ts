import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestingModule } from '../../testing/testing-module';

import { BfBtnComponent } from './bf-btn.component';

describe('BfBtnComponent', () => {
  let component: BfBtnComponent;
  let fixture: ComponentFixture<BfBtnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BfBtnComponent],
      imports: [TestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const checkType = (bfType, css, icon, text) => {
    component.bfType = bfType;
    const changes = {
      bfType: {
        previousValue: undefined,
        currentValue: bfType,
        firstChange: true,
      },
    };
    component.ngOnChanges(changes);
    expect(component.btnClass).toEqual(css);
    expect(component.typeIcon).toEqual(icon);
    expect(component.textLabel).toEqual(text);
  };


  it('should set custom bfType', () => {
    checkType('search', 'primary', 'icon-search', 'view.common.search');
    checkType('edit', 'primary', 'icon-pencil', 'view.common.edit');
    checkType('save', 'primary', 'icon-checkmark3', 'view.common.save');
    checkType('update', 'primary', 'icon-arrow-right3', 'views.common.update');
    checkType('add', 'primary', 'icon-plus', 'view.common.add');
    checkType('delete', 'tertiary', 'icon-bin', 'view.common.delete');
    checkType('cancel', 'secondary', 'icon-blocked', 'view.common.cancel');
    checkType('view', 'primary', 'icon-eye', 'view.common.view');
    checkType('prev', 'quaternary', 'icon-arrow-left6', 'view.common.previous');
    checkType('next', 'primary', 'icon-arrow-right3', 'view.common.next');
    checkType('download', 'primary', 'icon-download52', 'view.common.download');
    checkType('upload', 'primary', 'icon-upload5', 'view.common.upload');
    checkType('reset', 'secondary', 'icon-blocked', 'view.common.resetFilters');
    checkType('refresh', 'primary', 'icon-loop2', 'view.common.refresh');
  });


  it('should toggle the button', () => {
    component.bfToggle = false;
    component.isToggle = true;
    component.btnClick({});
    expect(component.bfToggle).toBe(true);
    expect(component.btnIcon).toBe('icon-arrow-up3');
    component.btnClick({});
    expect(component.bfToggle).toBe(false);
    expect(component.btnIcon).toBe('icon-arrow-down3');
  });

  describe('focus()', () => {
    it('should set focus on the button', () => {
      const btnSpy = spyOn(component._btn.nativeElement, 'focus');
      component.focus();
      expect(btnSpy).toHaveBeenCalled();
    });
  });
});

