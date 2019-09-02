import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BfDeferDoc } from './bf-defer-demo/bf-defer-demo.component';
import { BfPromiseDoc } from './bf-promise-demo/bf-promise-demo.component';
import { BfLoadingBarDoc } from './bf-loading-bar-demo/bf-loading-bar-demo.component';
import { BfPrototypesDoc } from './bf-prototypes-demo/bf-prototypes-demo.component';
import { BfListPaginatorDoc } from './bf-list-paginator-demo/bf-list-paginator-demo.component';
import { BfDatePickerDoc } from './bf-date-picker-demo/bf-date-picker-demo.component';
import { BfRadioDoc } from './bf-radio-demo/bf-radio-demo.component';
import { BfTextareaDoc } from './bf-textarea-demo/bf-textarea-demo.component';
import { BfConfirmDoc } from './bf-confirm-demo/bf-confirm-demo.component';
import { BfQuantityDoc }        from './bf-quantity-demo/bf-quantity-demo.component';
import { BfSwitchDoc }          from './bf-switch-demo/bf-switch-demo.component';
import { BfDropdownDoc }        from './bf-dropdown-demo/bf-dropdown-demo.component';
import { BfInputDoc }           from './bf-input-demo/bf-input-demo.component';
import { BfCheckboxDoc }        from './bf-checkbox-demo/bf-checkbox-demo.component';
import { BfListPlaceholderDoc } from './bf-list-placeholder-demo/bf-list-placeholder-demo.component';
import { BfLabelDoc }           from './bf-label-demo/bf-label-demo.component';
import { BfBtnDoc }             from './bf-btn-demo/bf-btn-demo.component';
import { BfListHeaderColDoc }   from './bf-list-header-col-demo/bf-list-header-col-demo.component';
import { BfGrowlDoc }           from './bf-growl-demo/bf-growl-demo.component';
import { BfQuantityInputDoc } from './bf-quantity-input-demo/bf-quantity-input-demo.component';


export const compList = [
  BfBtnDoc,
  BfLabelDoc,
  BfInputDoc,
  BfTextareaDoc,
  BfDropdownDoc,
  BfSwitchDoc,
  BfCheckboxDoc,
  BfRadioDoc,
  BfDatePickerDoc,
  BfQuantityDoc,
  BfQuantityInputDoc,
  BfListHeaderColDoc,
  BfListPlaceholderDoc,
  BfListPaginatorDoc,
  BfGrowlDoc,
  BfLoadingBarDoc,
  BfConfirmDoc,
  BfPrototypesDoc,
  BfPromiseDoc,
  BfDeferDoc
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
