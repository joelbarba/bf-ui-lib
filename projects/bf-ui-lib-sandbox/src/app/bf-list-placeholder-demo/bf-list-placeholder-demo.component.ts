import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-list-placeholder-demo',
  templateUrl: './bf-list-placeholder-demo.component.html',
  styleUrls: ['./bf-list-placeholder-demo.component.scss']
})
export class BfListPlaceholderDemoComponent implements OnInit {
  public name = BfListPlaceholderDoc.name;
  public desc = BfListPlaceholderDoc.desc;
  public api = BfListPlaceholderDoc.api;
  public instance = BfListPlaceholderDoc.instance;
  public link = true;

  public instance2 =
`<ul class="list-unstyled table-list">
  <li class="list-header">
    <div class="row">
      <bf-list-header-col class="col-5" ...>
      <bf-list-header-col class="col-3" ...>
      <bf-list-header-col class="col-2" ...>
    </div>
  </li>
  <bf-list-placeholder [bfColumns]="[{size: 5, alignment: 'right'}, {size: 3, alignment: 'center'}, 2]" bfRows="4"></bf-list-placeholder>
</ul>
`;
  public instance3 = `<bf-list-placeholder bfType="tile"></bf-list-placeholder>`;

  public brStr = `
`;
  public bsStr = `
                    `;
  public code = ``;
  public conf = {
    bfRows: 8, cssClass: 'four-columns',
    rowOps: Array.from(Array(23).keys()).map(i => ({id: i+1}))
  };

  public upCode = () => {
    this.code = `<bf-list-placeholder bfType="cards"`;

    if (this.conf.cssClass !== 'four-columns') {
      this.code += ` class="${this.conf.cssClass}"`;
    }
    if (this.conf.bfRows !== 8) {
      this.code += this.bsStr + ` bfRows="${this.conf.bfRows}"`;
    }

    this.code += (`>` + this.brStr + `</bf-list-placeholder>`);
    this.link = false;
    setTimeout(() => this.link = true);
  }

  constructor() { }

  ngOnInit() {
    this.upCode();
  }

}


export const BfListPlaceholderDoc = {
  name    : `bf-list-placeholder`,
  uiType  : 'component',
  desc    : `Generates an animation to display a fake list while loading`,
  api     : `[bfType]  : 'list' - (default) Displays the fake loading rows into a <ul> table
            'table' - Displays a whole table (header + rows)

[bfRows]   : Number of fake rows to display (default = 8)
[bfColumns]: Array with the sizes of the columns (up to 12)`,
  instance: `<bf-list-placeholder bfType="table"></bf-list-placeholder>`,
  demoComp: BfListPlaceholderDemoComponent
};
