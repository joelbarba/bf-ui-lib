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
    console.log('Extended translation -> ', label);
    return label + ' *trans';
  }
}
