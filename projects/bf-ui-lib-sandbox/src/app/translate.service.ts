import { Injectable } from '@angular/core';
import { AbstractTranslateService } from '../../../bf-ui-lib/src/lib/abstract-translate.service';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslateService extends AbstractTranslateService {
  public testDict = {
    'view.common.name'         : 'Name',
    'view.common.email'        : 'Email',
    'view.common.username'     : 'User Name',
    'view.common.placeholder'  : 'Placeholder',
    'view.tooltip.message'     : 'This is a very useful tooltip message',
    'view.tooltip.message2'    : 'This is a very useful tooltip message in a popover with two lines',
    'view.common.yes'          : 'Yes',
    'view.common.no'           : 'No',
    'view.common.cancel'       : 'Cancel',
    'view.modal.confirm.title' : 'Confirm',
    'view.modal.confirm.text'  : 'Are you sure?',
  };
  constructor() {
    super();
  }

  doTranslate = (label ?: string): string => {
    return this.testDict[label] || label;
  };

  get = (label ?: string): Observable<string> => {
    let res = this.testDict[label] || label;
    return of(res);
  }
}
