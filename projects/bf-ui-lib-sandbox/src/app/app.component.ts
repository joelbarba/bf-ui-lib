import {Component, Inject, OnInit} from '@angular/core';
import {BfTranslateService} from "./translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public lang = 'en';
  constructor(
    // @Inject('BfTranslateService') public translate: BfTranslateService
    public translate: BfTranslateService
  ) {}

  ngOnInit() { }

}
