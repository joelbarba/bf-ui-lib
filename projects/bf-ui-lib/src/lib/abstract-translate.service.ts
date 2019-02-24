import { Injectable } from '@angular/core';

/* This service is meant to be extended into the project where the library is imported.
   The extended service should be provided when importing the library as:
   @NgModule({
     imports: [
       BfUiLibModule.forRoot({ TranslateService }),
*/

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractTranslateService {
  constructor() { }

  // Synchronous translation
  abstract doTranslate(label ?: string): string;
}
