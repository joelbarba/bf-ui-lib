import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from "./translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public lang = 'en';
  constructor(
    @Inject('TranslateService') public translate: TranslateService
  ) {}
  ngOnInit() {
  }

}
