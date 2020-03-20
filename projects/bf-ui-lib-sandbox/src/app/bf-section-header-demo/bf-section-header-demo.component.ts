import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-section-header-demo',
  templateUrl: './bf-section-header-demo.component.html',
  styleUrls: ['./bf-section-header-demo.component.sass']
})
export class BfSectionHeaderDemoComponent implements OnInit {
  public name = BfSectionHeaderDoc.name;
  public desc = BfSectionHeaderDoc.desc;
  public api = BfSectionHeaderDoc.api;

  public compConf = {
    title: 'view.common.title',
    description: 'view.common.description',
    hasDescription: false
  };

  public brStr = `\n`;
  public customCompCode = ``;

  public cssReset = `.section-header .section-header--description {
    color: $primary-color;
}`;

  constructor() { }

  ngOnInit() {
    this.upComp();
  }

  public upComp = () => {
    this.customCompCode = `<bf-section-header ` + this.brStr;

    if (this.compConf.title) { this.customCompCode += ` [bfTitle]="${this.compConf.title}"` + this.brStr; }
    if (this.compConf.hasDescription) { this.customCompCode += ` [bfDescription]="${this.compConf.description}"`; }

    this.customCompCode += (`>` + this.brStr + `</bf-section-header>`);
  }

}

export const BfSectionHeaderDoc = {
  name    : `bf-section-header`,
  desc    : `Generates a header to title a section.`,
  uiType  : 'component',
  api     : `[bfTitle]        : Text to display as title
[bfDescription]  : Text to display as description (optional).`,
  instance: `<bf-section-header></bf-section-header>`,
  demoComp: BfSectionHeaderDemoComponent
};
