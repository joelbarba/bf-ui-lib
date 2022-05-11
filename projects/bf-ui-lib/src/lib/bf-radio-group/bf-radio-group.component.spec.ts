import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TestingModule } from '../../testing/testing-module';
import {BfRadioGroupComponent} from "./bf-radio-group.component";


describe('BfRadioGroupComponent', () => {
  let comp: BfRadioGroupComponent;
  let fixture: ComponentFixture<BfRadioGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BfRadioGroupComponent ],
      imports: [ TestingModule, NgbTooltipModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(BfRadioGroupComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('internalChange', () => {
    beforeEach(() => {
      spyOn(comp, 'updateTabIndexes');
      spyOn(comp, 'propagateModelUp');
    });
    it('should set the model', () => {
      comp.internalChange('123');
      expect(comp.bfModel).toEqual('123');
    });
    it('should set pristine false', () => {
      comp.internalChange('123');
      expect(comp.isPristine).toEqual(false);
    });
    it('should do nothing if setting the same value', () => {
      comp.bfModel = '123';
      comp.internalChange('123');
      expect(comp.isPristine).toEqual(true);
    });
    it('should update tab indexes and propagate', () => {
      comp.internalChange('123');
      expect(comp.updateTabIndexes).toHaveBeenCalled();
      expect(comp.propagateModelUp).toHaveBeenCalledWith('123');
    });
  });

});
