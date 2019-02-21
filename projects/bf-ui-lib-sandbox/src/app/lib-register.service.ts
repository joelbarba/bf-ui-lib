import { BfCheckboxDoc } from './bf-checkbox-demo/bf-checkbox-demo.component';
import { BfListPlaceholderDoc } from './bf-list-placeholder-demo/bf-list-placeholder-demo.component';
import { BfLabelDoc } from './bf-label-demo/bf-label-demo.component';
import { BfBtnDoc }           from './bf-btn-demo/bf-btn-demo.component';
import { BfListHeaderColDoc } from './bf-list-header-col-demo/bf-list-header-col-demo.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const compList = [
  BfCheckboxDoc,
  BfListPlaceholderDoc,
  BfLabelDoc,
  BfBtnDoc, 
  BfListHeaderColDoc,
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
