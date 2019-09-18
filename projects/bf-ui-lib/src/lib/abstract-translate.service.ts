import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

type doTranslateFn = (label ?: string) => string;
type getFn = (label ?: string) => Observable<string>;
export abstract class AbstractTranslateService {
  public onLangChange$; // : BehaviorSubject<{ lang: '', translations: null }>;
  abstract doTranslate: doTranslateFn;  // Synchronous translation
  abstract getLabel$: getFn;            // Async translation
  // abstract changeLanguage;
}

export class BfUILibTransService extends AbstractTranslateService {

  // To react on selected language changes (https://github.com/ngx-translate/core)
  public onLangChange$ = new BehaviorSubject({lang: '', translations: []});

  // Synchronous translation
  public doTranslate = (label ?: string, params ?: {}): string => label;

  // Async translation (returns an observable that emits the translated value of the label)
  public getLabel$ = (label ?: string) => of(label);

}



