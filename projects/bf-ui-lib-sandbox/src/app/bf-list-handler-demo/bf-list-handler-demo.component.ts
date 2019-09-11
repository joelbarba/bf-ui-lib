import { Component, OnInit } from '@angular/core';
import {BfGrowlService} from "../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service";

@Component({
  selector: 'app-bf-list-handler-demo',
  templateUrl: './bf-list-handler-demo.component.html',
  styleUrls: ['./bf-list-handler-demo.component.scss']
})
export class BfListHandlerDemoComponent implements OnInit {
  public name = BfListHandlerDoc.name;
  public desc = BfListHandlerDoc.desc;
  public api = BfListHandlerDoc.api;
  public instance = BfListHandlerDoc.instance;


  constructor(private growl: BfGrowlService) { }

  ngOnInit() {
  }




}


export const BfListHandlerDoc = {
  name    : `bfListHandler`,
  uiType  : 'class',
  desc    : `(Class) Factory to generate list handlers`,
  api     : `
.load(data)            → To load a new content passing a new array of objects
.filter(filterText)    → To filter the list matching the given text
.order(orderField)     → Select what field we order the list by. Choosing the same twice reverts.
.paginate(rowsPerPage) → To change the number of rows per page
.nextPage()            → Jump pagination to the next page
.prevPage()            → Jump pagination to the previous page

loadedList[]    → Original loadede content (no filters applied)
renderedList[]  → Rendering content (order + filter + page applied)

filterText      → Current filtered match (the pattern to match on the content)
filterField     → What field of the list we apply the filter to

orderConf {     → Object to be link to <bf-list-header-col>
  field
  reverse
  onChange()
}

rowsPerPage     → Current number of rows per page on pagination
currentPage     → Current page
totalPages      → Current total of pages
`,
  instance: ``,
  demoComp: BfListHandlerDemoComponent
};
