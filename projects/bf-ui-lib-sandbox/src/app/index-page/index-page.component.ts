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
  constructor(private reg: LibRegisterService) { }
  ngOnInit() { }

}
