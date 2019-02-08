import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BfBtnDoc }           from './bf-btn-demo/bf-btn-demo.component';
import { BfListHeaderColDoc } from './bf-list-header-col-demo/bf-list-header-col-demo.component';

export const compList = [
  BfBtnDoc, BfListHeaderColDoc, 
  // { name: 'bf-list-header-col', api: 'bffsdfds', instance: '<bf-list-header-col></bf-list-header-col>', demoComp: BfBtnDemoComponent },
];  

@Injectable({
  providedIn: 'root'
})
export class LibRegisterService {
  public compList = compList;

  constructor() {  }
}
