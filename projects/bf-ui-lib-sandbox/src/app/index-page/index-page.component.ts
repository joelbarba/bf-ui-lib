import { Component, OnInit } from '@angular/core';
import { LibRegisterService } from '../lib-register.service';
import { icomoonList } from '../icomoon-list';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  public libImport = `npm i bf-ui-lib@0.4.9
npm i bf-icomoon@1.0.3
npm i bootstrap@4.4.1
npm i @ng-bootstrap/ng-bootstrap@5.1.5

-- For Angular >= 9, you also need:
ng add @angular/localize`;

  public libImport2 = `import {FormsModule} from "@angular/forms";
import {BfUiLibModule} from "bf-ui-lib";

@Injectable({ providedIn: 'root' })
export class BfTranslateService {
  public onLangChange$ = new BehaviorSubject({lang: '', translations: []});
  public doTranslate = (label ?: string, params?): string => label;
  public getLabel$ = (label ?: string, params?) => of(label);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BfUiLibModule.forRoot({ trans: {
        useExisting: BfTranslateService
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`;




  public stylesExample = `@import "scss/variables.scss";

@import '~/bf-ui-lib/scss/index';

@import "~bf-icomoon/css/icomoon.css";
@import "~bootstrap/scss/bootstrap.scss";`;

  iconList = icomoonList;

  constructor(private reg: LibRegisterService) { }
  ngOnInit() { }

}
