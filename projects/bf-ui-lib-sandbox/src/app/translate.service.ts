import { Injectable } from '@angular/core';
import { AbstractTranslateService } from '../../../bf-ui-lib/src/lib/abstract-translate.service';
import { BehaviorSubject, Observable, of } from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TranslateService extends AbstractTranslateService {
  public transDict = {};
  public transDictEN = {
    'view.common.name'         : 'Name',
    'view.common.email'        : 'Email',
    'view.common.username'     : 'User Name',
    'view.common.field_name'   : 'Dragon of the year',
    'view.common.placeholder'  : 'Placeholder',
    'view.tooltip.message'     : 'This is a very useful tooltip message',
    'view.tooltip.message2'    : 'This is a very useful tooltip message in a popover with two lines',
    'view.common.yes'          : 'Yes',
    'view.common.no'           : 'No',
    'view.common.all'          : 'All',
    'view.common.cancel'       : 'Cancel',
    'view.modal.confirm.title' : 'Confirm',
    'view.modal.confirm.text'  : 'Are you sure?',
    'view.common.invalid_value'     : 'Invalid value',
    'view.common.required_field'    : 'Required field',
    'view.common.invalid_min_length': 'Too short',
    'view.common.invalid_max_length': 'Too long',
    'view.common.custom_error': 'This value is not correct',
    'view.common.empty': 'Empty'
  };
  public transDictCAT = {
    'view.common.name'      : 'Nom',
    'view.common.username'  : `Nom d'usuari`,
    'view.common.yes'       : 'Sí',
    'view.common.no'        : 'No',
    'view.common.all'       : 'Tot',
    'view.common.empty'     : 'Buit',
    'view.tooltip.message'  : 'Aquest és un missatge flotant molt útil',
    'view.common.field_name': `Drac de l'any`,
  };

  public transDict$ = new BehaviorSubject(this.transDict);
  public onLangChange$ = new BehaviorSubject({ lang: '', translations: null });
  public currLang: string;

  constructor() {
    super();
    // console.warn('TranslateService constructor');
    this.changeLanguage('en');
  }

  doTranslate = (label ?: string): string => {
    return this.transDict[label] || label;
  };

  getLabel$ = (label ?: string): Observable<string> => {
    return this.transDict$.pipe(
      map(translations => {
        // console.log('Translate', label, translations[label]);
        return translations[label] || label || '';
      })
    );
  };



  public changeLanguage = (newLang: string) => {
    if (this.currLang !== newLang) {
      console.log('Changing selected language (TranslateService) --> ', newLang);
      if (newLang === 'cat') {
        this.transDict = this.transDictCAT;
      } else {
        this.transDict = this.transDictEN;
      }
      this.currLang = newLang;
      this.onLangChange$.next({ lang: newLang, translations: this.transDict });
      this.transDict$.next(this.transDict);
    }
  };
}
