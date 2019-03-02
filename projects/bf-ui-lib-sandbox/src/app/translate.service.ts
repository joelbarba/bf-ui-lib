import { Injectable } from '@angular/core';
import { AbstractTranslateService } from '../../../bf-ui-lib/src/lib/abstract-translate.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService extends AbstractTranslateService {
  constructor() {
    // console.log('Translate service init');
    super();
  }

  doTranslate(label ?: string): string {
    // console.log('Extended translation -> ', label);
    let response;
    switch (label) {
      case 'view.common.name'     : response = 'Name'; break;
      case 'view.common.email'    : response = 'Email'; break;
      case 'view.common.username' : response = 'User Name'; break;
      case 'view.tooltip.message' : response = 'This is a very useful tooltip message in a popover'; break;
      default: response = label;
    }
    return response;
  }
}
