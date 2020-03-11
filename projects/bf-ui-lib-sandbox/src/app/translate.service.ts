import { Injectable } from '@angular/core';
import {AbstractTranslateService, BfUILibTransService} from '../../../bf-ui-lib/src/lib/abstract-translate.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import {map} from 'rxjs/operators';

// Locale configs
import {registerLocaleData} from '@angular/common';
import localeZhCN from '@angular/common/locales/zh-Hans';
import localeZhTW from '@angular/common/locales/zh-Hans-HK';
import localeDa from '@angular/common/locales/da';
import localeNl from '@angular/common/locales/nl';
import localeEnCA from '@angular/common/locales/en-CA';
import localeEnGB from '@angular/common/locales/en-GB';
import localeEnIE from '@angular/common/locales/en-IE';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import localeFi from '@angular/common/locales/fi';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeEl from '@angular/common/locales/el';
import localeIt from '@angular/common/locales/it';
import localeJa from '@angular/common/locales/ja';
import localeNo from '@angular/common/locales/nb';
import localePl from '@angular/common/locales/pl';
import localeSv from '@angular/common/locales/sv';
import localeEsES from '@angular/common/locales/es';
import localeEsMx from '@angular/common/locales/es-MX';
import localePtPT from '@angular/common/locales/pt-PT';
import localePtBR from '@angular/common/locales/pt';
import localeIn from '@angular/common/locales/hi';
import localeAr from '@angular/common/locales/ar';
import localeRu from '@angular/common/locales/ru';
import localeMsSG from '@angular/common/locales/ms-SG';
import localeMsMY from '@angular/common/locales/ms';
import localeMsID from '@angular/common/locales/id';
import localeTr from '@angular/common/locales/tr';
import localeKr from '@angular/common/locales/ko';

registerLocaleData(localeZhCN, 'zh-CN');
registerLocaleData(localeZhTW, 'zh-TW');
registerLocaleData(localeDa,   'da');
registerLocaleData(localeNl,   'nl');
registerLocaleData(localeEnCA, 'en-CA');
registerLocaleData(localeEnGB, 'en-GB');
registerLocaleData(localeEnIE, 'en-IE');
registerLocaleData(localeEnUS, 'en-US');
registerLocaleData(localeFi,   'fi');
registerLocaleData(localeFr,   'fr');
registerLocaleData(localeDe,   'de');
registerLocaleData(localeEl,   'el');
registerLocaleData(localeIt,   'it');
registerLocaleData(localeJa,   'ja');
registerLocaleData(localeNo,   'no');
registerLocaleData(localePl,   'pl');
registerLocaleData(localeSv,   'sv');
registerLocaleData(localeEsES, 'es-ES');
registerLocaleData(localeEsMx, 'es-MX');
registerLocaleData(localePtPT, 'pt-PT');
registerLocaleData(localePtBR, 'pt-BR');
registerLocaleData(localeIn,   'in');
registerLocaleData(localeAr,   'ar');
registerLocaleData(localeRu,   'ru');
registerLocaleData(localeMsSG, 'ms-SG');
registerLocaleData(localeMsMY, 'ms-MY');
registerLocaleData(localeMsID, 'ms-ID');
registerLocaleData(localeTr,   'tr');
registerLocaleData(localeKr,   'kr');



@Injectable({ providedIn: 'root' })
export class BfTranslateService extends BfUILibTransService {
  public transDict = {};
  public transDictEN = {
    'view.common.name'         : 'Name',
    'view.common.email'        : 'Email',
    'view.common.username'     : 'User Name',
    'view.common.field_name'   : 'Dragon of the year',
    'view.common.field_name2'  : 'Feature Enabled',
    'view.common.field_name3'  : 'Start Date',
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
    'view.common.invalid_min_length': 'Too short, min len is {{min}}',
    'view.common.invalid_max_length': 'Too long',
    'view.common.custom_error': 'This value is not correct',
    'view.common.empty': 'Empty',
    'scripts.common.directives.on_label'  : 'ON',
    'scripts.common.directives.off_label' : 'OFF',
    'views.common.5_items_per_page'     : 'Show 5 items per page',
    'views.common.10_items_per_page'    : 'Show 10 items per page',
    'views.common.15_items_per_page'    : 'Show 15 items per page',
    'views.common.20_items_per_page'    : 'Show 20 items per page',
    'views.common.30_items_per_page'    : 'Show 30 items per page',
    'views.common.50_items_per_page'    : 'Show 50 items per page',
    'views.common.100_items_per_page'   : 'Show 100 items per page',
    'view.common.search'  :  'Search',
    'view.common.edit'    :  'Edit',
    'view.common.save'    :  'Save',
    'views.common.update' :  'Update',
    'view.common.add'     :  'Add',
    'view.common.delete'  :  'Delete',
    'view.common.customer_changed_successfully': 'Customer changed to {{customer_name}}',
    'view.common.active'               : 'Active',
    'view.common.inactive'             : 'Inactive',
    'view.common.pending'              : 'Pending',
    'view.common.no_data_to_show' : 'No Data',
    'views.test_label': 'p1 = {{p1}} ### Test & test2 & test3 [b] AAA BBB [/b]',
    'view.voicemails.no_voicemails_title': 'No Voicemails yet',
    'view.voicemails.no_voicemails': 'Please click on the button above to check your Mailbox settings.',
    'view.common.today': 'Today',
    'view.common.clear': 'Clear',
    'view.common.close': 'Close',
    'directives.bfAutocomplete.no_results_found': 'No results found'
  };
  public transDictCAT = {
    'view.common.name'            : 'Nom',
    'view.common.username'        : `Nom d'usuari`,
    'view.common.yes'             : 'Sí',
    'view.common.no'              : 'No',
    'view.common.all'             : 'Tot',
    'view.common.empty'           : 'Buit',
    'view.tooltip.message'        : 'Aquest és un missatge flotant molt útil',
    'view.common.field_name'      : `Drac de l'any`,
    'view.common.field_name2'     : 'Opció disponible',
    'view.common.placeholder'     : 'Omplidor per defecte',
    'view.common.required_field'  : 'Camp obligatori',
    'view.modal.confirm.title'    : 'Confirmació',
    'view.modal.confirm.text'     : `Estàs segur d'això?`,
    'view.common.invalid_min_length' : 'Massa curt',
    'view.common.invalid_max_length' : 'Massa llarg',
    'scripts.common.directives.on_label'  : 'ENCÉS',
    'scripts.common.directives.off_label' : 'APAGAT',
    'views.common.5_items_per_page'     : 'Mostra 5 ítems per pàgina',
    'views.common.10_items_per_page'    : 'Mostra 10 ítems per pàgina',
    'views.common.15_items_per_page'    : 'Mostra 15 ítems per pàgina',
    'views.common.20_items_per_page'    : 'Mostra 20 ítems per pàgina',
    'views.common.30_items_per_page'    : 'Mostra 30 ítems per pàgina',
    'views.common.50_items_per_page'    : 'Mostra 50 ítems per pàgina',
    'views.common.100_items_per_page'   : 'Mostra 100 ítems per pàgina',
    'view.common.search'  :  'Buscar',
    'view.common.edit'    :  'Editar',
    'view.common.save'    :  'Guardar',
    'views.common.update' :  'Modificar',
    'view.common.add'     :  'Afegir',
    'view.common.delete'  :  'Eliminar',
    'view.common.customer_changed_successfully': 'Compte canviat a {{customer_name}}',
    'view.common.no_data_to_show': 'Sense Info',
    'views.test_label': '<script deferred>alert("XSS Attack");</script>',
    'view.common.today': 'Avui',
    'view.common.clear': 'Net',
    'view.common.close': 'Tanca'
  };

  public transDict$ = new BehaviorSubject(this.transDict);
  public onLangChange$ = new BehaviorSubject({ lang: '', translations: null });
  public currLang: string;




  constructor() {
    super();
    this.changeLanguage('en');
  }

  public doTranslate = (label ?: string, params?): string => {
    return this.transDict[label] || label;
  };

  public getLabel$ = (label ?: string, params = {}): Observable<string> => {
    return this.transDict$.pipe(
      map(translations => {
        let text = translations[label] || label || '';
        for (const [key, value] of Object.entries(params)) {
          text = text.replace(new RegExp('{{' + key + '}}', 'gi'), value);
        }
        return text;
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
  }
}






/**********************************************
 * Hook up the ngx-translate loader with getTranslation(), to load the dictionaries dynamically
 **********************************************/
@Injectable({ providedIn: 'root' })
export class BfTranslateLoader implements TranslateLoader {
  public transLoad$;  // Async dictionary loader
  constructor() { }

  getTranslation(lang: string): Observable<any> {
    console.log('Loading translations for', lang);

    const transDict = { AD: 'Andorra' };

    this.transLoad$ = new Subject();
    this.transLoad$.next(transDict);
    this.transLoad$.complete();
    return this.transLoad$;
  }
}
