import { Component, OnInit } from '@angular/core';
import { LibRegisterService } from '../lib-register.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  public libImport = `@NgModule({
  ...
  BfUiLibModule.forRoot({ trans: {
      useExisting: BfTranslateService
    }
  }),
})`;

  public stylesExample = `@import "scss/variables.scss";
@import 'bf-ui-lib/scss/index';

@import "~bootstrap/scss/bootstrap.scss";
@import "~bf-icomoon/css/icomoon.css";
...  `;

  constructor(private reg: LibRegisterService) { }
  ngOnInit() { }

}
