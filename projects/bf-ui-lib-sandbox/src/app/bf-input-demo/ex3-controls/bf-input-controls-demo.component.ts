import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BfGrowlService} from '../../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';
import {IbfInputCtrl} from '../../../../../bf-ui-lib/src/lib/bf-input/bf-input.component';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-bf-input-controls-demo',
  templateUrl: './bf-input-controls-demo.component.html',
  styleUrls: ['./bf-input-controls-demo.component.scss']
})
export class BfInputControlsDemoComponent implements OnInit, AfterViewInit {

  constructor(
    public growl: BfGrowlService,
    public router: Router,
  ) {}

  public val1;

  public ctrl: IbfInputCtrl = {};
  public extCtrlExample1 = `public ctrl: IbfInputCtrl = {};

<bf-input [(ngModel)]="val" (bfOnLoaded)="ctrl = $event"></bf-input>

<bf-btn bfText="setFocus"    (bfClick)="ctrl.setFocus()" ></bf-btn>
<bf-btn bfText="setBlur"     (bfClick)="ctrl.setBlur()" ></bf-btn>
<bf-btn bfText="setDirty"    (bfClick)="ctrl.setDirty()" ></bf-btn>
<bf-btn bfText="setPristine" (bfClick)="ctrl.setPristine()" ></bf-btn>
<bf-btn bfText="addError"    (bfClick)="ctrl.addError({ label: 'Oh no!' })" ></bf-btn>
<bf-btn bfText="removeError" (bfClick)="ctrl.removeError()" ></bf-btn>`;


  public extCtrl$ = new Subject();
  public ctrlActions = [
    `{ action: 'setFocus' } ................. Sets the focus on the input`,
    `{ action: 'setBlur' } .................. Forces focus lose`,
    `{ action: 'setDirty' } ................. Turns the input dirty`,
    `{ action: 'setPristine' } .............. Turns the input pristine`,
    `{ action: 'addError', label: text } .... Adds an manual error`,
    `{ action: 'removeError' } .............. Removes the manual error`,
    `{ action: 'refresh' } .................. Forces internal refresh`,
  ];
  public extCtrlExample2 = `<bf-input [(ngModel)]="val" [extCtrl$]="extCtrl$"></bf-input>

public extCtrl$ = new Subject();

<bf-btn bfText="setFocus"    (bfClick)="extCtrl$.next({ action: 'setFocus' })"></bf-btn>
<bf-btn bfText="setDirty"    (bfClick)="extCtrl$.next({ action: 'setDirty' })"></bf-btn>
<bf-btn bfText="setPristine" (bfClick)="extCtrl$.next({ action: 'setPristine' })"></bf-btn>
<bf-btn bfText="addError"    (bfClick)="extCtrl$.next({ action: 'addError', label: 'Oh oh!' })"></bf-btn>
<bf-btn bfText="removeError" (bfClick)="extCtrl$.next({ action: 'removeError' })"></bf-btn>
<bf-btn bfText="refresh"     (bfClick)="extCtrl$.next({ action: 'refresh' })"></bf-btn>`;


  ngOnInit() {}
  ngAfterViewInit() {}

}



