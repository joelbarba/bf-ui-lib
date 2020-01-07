import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-list-placeholder-demo]',
  templateUrl: './bf-list-placeholder-demo.component.html',
  styleUrls: ['./bf-list-placeholder-demo.component.scss']
})
export class BfListPlaceholderDemoComponent implements OnInit {
  public name = BfListPlaceholderDoc.name;
  public desc = BfListPlaceholderDoc.desc;
  public api = BfListPlaceholderDoc.api;
  public instance = BfListPlaceholderDoc.instance;

  public instance2 = 
`<ul class="list-unstyled table-list">
  <li class="list-header">
    <div class="row">
      <bf-list-header-col class="col-5" ...>
      <bf-list-header-col class="col-3" ...>
      <bf-list-header-col class="col-2" ...>
    </div>
  </li>
  <bf-list-placeholder [bfColumns]="[5, 3, 2]" bfRows="4"></bf-list-placeholder>
</ul>
`;

  constructor() { }

  ngOnInit() { }

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
