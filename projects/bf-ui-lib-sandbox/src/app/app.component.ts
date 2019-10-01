import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {BfTranslateService} from './translate.service';


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
  ) { }

  ngOnInit() { }

}
