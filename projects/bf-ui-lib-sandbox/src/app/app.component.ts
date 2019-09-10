import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {BfTranslateService, ServiceB} from "./translate.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public lang = 'en';
  constructor(
    // @Inject('BfUILibTransService') public translate: BfTranslateService
    public translate: BfTranslateService,
    public pB: ServiceB,
  ) {
    console.log('app component - ', this.pB);
  }

  ngOnInit() { }

}
