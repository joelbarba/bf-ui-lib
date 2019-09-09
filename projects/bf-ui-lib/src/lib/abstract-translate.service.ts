import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

/* This service is meant to be extended into the project where the library is imported.
   The extended service should be provided when importing the library as:
   @NgModule({
     imports: [
       BfUiLibModule.forRoot({ TranslateService }),
*/

type doTranslateFn = (label ?: string) => string;
type getFn = (label ?: string) => Observable<string>;
type changeLanguageFn = (newLang: string) => any;

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractTranslateService {
  constructor() { }

  abstract doTranslate: doTranslateFn;  // Synchronous translation
  abstract getLabel$: getFn;            // Async translation (returns an observable that emits the translated value of the label)
  // public onLangChange$: Observable<{lang: string, translations: any}>;  // To react on selected language changes (https://github.com/ngx-translate/core)

  public onLangChange$; // : BehaviorSubject<{ lang: '', translations: null }>;
  abstract changeLanguage; // : changeLanguageFn;
}
