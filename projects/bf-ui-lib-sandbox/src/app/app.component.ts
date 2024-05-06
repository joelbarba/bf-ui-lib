import {Component, OnInit} from '@angular/core';
import {BfTranslateService} from './translate.service';

import pkg from '../../../bf-ui-lib/package.json';

console.log(`Running version ${pkg.version} ---> bf-ui-lib@${pkg.version}`);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public lang = 'en';
  public selectedFont = 'Blueface';
  public fontsList = [
    { css: 'font-01', name: `Blueface` },
    { css: 'font-02', name: `Comcast (Lato)` },
    { css: 'font-03', name: `Old Blueface (Helvetica)` },
    { css: '', name: `---------------------------------` },
    { css: 'font-11', name: `-apple-system` },
    { css: 'font-12', name: `BlinkMacSystemFont` },
    { css: 'font-13', name: `'Segoe UI'` },
    { css: 'font-14', name: `'Roboto' (webfont)` },
    { css: 'font-15', name: `'Oxygen' (webfont)` },
    { css: 'font-16', name: `'Ubuntu' (webfont) ` },
    { css: 'font-17', name: `'Fira Sans (webfont)'` },
    { css: 'font-18', name: `'Droid Sans'` },
    { css: 'font-19', name: `'Helvetica Neue'` },
    { css: 'font-20', name: `sans-serif (default)` },
    { css: '', name: `---------------------------------` },
    { css: 'font-21', name: `Lato (webfont)` },
    { css: 'font-22', name: `Montserrat (webfont)` },
    { css: '', name: `---------------------------------` },
    { css: 'font-31', name: `Helvetica Neue <- Old BF` },
    { css: 'font-32', name: `Helvetica` },
    { css: 'font-33', name: `Arial` },
  ];

  constructor(
    // @Inject('BfUILibTransService') public translate: BfTranslateService
    public translate: BfTranslateService,
  ) { }

  ngOnInit() {
  }

}
