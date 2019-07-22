import { Injectable } from '@angular/core';
import { Observable} from "rxjs";

/* This service is meant to be extended into the project where the library is imported.
   The extended service should be provided when importing the library as:
   @NgModule({
     imports: [
       BfUiLibModule.forRoot({ TranslateService }),
*/

type doTranslateFn = (label ?: string) => string;
type getFn = (label ?: string) => Observable<string>;

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractTranslateService {
  constructor() { }

  abstract doTranslate: doTranslateFn;  // Synchronous translation
  abstract get: getFn;                  // Async translation
}
