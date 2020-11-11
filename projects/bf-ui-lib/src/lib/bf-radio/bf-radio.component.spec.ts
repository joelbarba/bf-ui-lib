import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TestingModule } from '../../testing/testing-module';

import { BfRadioComponent } from './bf-radio.component';


@Component({
  template: `
    <form #form="ngForm" class="padT25">
      <bf-radio [class.block]="compConf.isClassBlock"
                [style.background]="compConf.isClassBlock ? 'lightgray' : 'white'"
                [(ngModel)]="myVariable" name="radio"
                [bfValue]="compConf.value"
                [bfLabel]="compConf.labelText"
                [bfRadioGroup]="compConf.hasGroup? compConf.groupValue : ''"
                [bfDisabled]="compConf.isDisabled"
                [bfRequired]="compConf.isRequired"
                [bfTooltip]="(compConf.hasTooltip ? compConf.tooltipText : null)"
                [bfTooltipPos]="(compConf.tooltipPos || 'top')"
                [bfTooltipBody]="compConf.tooltipBody"
      ></bf-radio>
    </form>
  `
})
export class TestComponent {
  myVariable: string;
  compConf = {
    value: '1',
    labelText: 'view.common.name',
    hasGroup: false, groupValue: 'radio-group-1',
    isRequired: true, isDisabled: false,
    hasTooltip: false, tooltipText: 'view.tooltip.message', tooltipPos: null, tooltipBody: 'true',
    isClassBlock: false,
  };
}


describe('BfRadioComponent', () => {
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let form: HTMLFormElement;
  let radioBtn: HTMLFormElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BfRadioComponent, TestComponent],
      imports: [TestingModule, FormsModule, NgbTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    debugElement = fixture.debugElement;
    comp = fixture.componentInstance;
    form = debugElement.query(By.css('form')).nativeElement;
    radioBtn = debugElement.query(By.css('bf-radio')).nativeElement;
    fixture.detectChanges();
  });


  describe('INIT', () => {
    it('should create the component', () => {
      expect(comp).toBeTruthy();
    });
  });
});
