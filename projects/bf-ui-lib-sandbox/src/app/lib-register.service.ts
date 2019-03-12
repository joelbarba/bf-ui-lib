import { BfQuantityDoc } from './bf-quantity-demo/bf-quantity-demo.component';
import { BfSwitchDoc } from './bf-switch-demo/bf-switch-demo.component';
import { BfDropdownDoc } from './bf-dropdown-demo/bf-dropdown-demo.component';
import { BfInputDoc } from './bf-input-demo/bf-input-demo.component';
import { BfCheckboxDoc } from './bf-checkbox-demo/bf-checkbox-demo.component';
import { BfListPlaceholderDoc } from './bf-list-placeholder-demo/bf-list-placeholder-demo.component';
import { BfLabelDoc } from './bf-label-demo/bf-label-demo.component';
import { BfBtnDoc }           from './bf-btn-demo/bf-btn-demo.component';
import { BfListHeaderColDoc } from './bf-list-header-col-demo/bf-list-header-col-demo.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const compList = [
  BfBtnDoc,
  BfLabelDoc,
  BfInputDoc,
  BfDropdownDoc,
  BfCheckboxDoc,
  BfSwitchDoc,
  BfQuantityDoc,
  BfListHeaderColDoc,
  BfListPlaceholderDoc,
];
/* {
  name     : 'bf-list-header-col',
  api      : '...',
  instance : '<bf-list-header-col></bf-list-header-col>',
  demoComp : BfBtnDemoComponent
} */

@Injectable({
  providedIn: 'root'
})
export class LibRegisterService {
  public compList = compList;

  constructor() {  }
}
