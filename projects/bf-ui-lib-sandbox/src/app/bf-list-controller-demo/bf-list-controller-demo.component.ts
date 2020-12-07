import { Component } from '@angular/core';

@Component({
  selector: 'app-list-controller-demo',
  templateUrl: './bf-list-controller-demo.component.html'
})
export class ListControllerDemoComponent {
  public name = ListControllerDoc.name;
  public desc = ListControllerDoc.desc;
  public api = ListControllerDoc.api;
  public instance = ListControllerDoc.instance;
}

export const ListControllerDoc = {
  name    : `bf-list-controller`,
  uiType  : 'directive',
  desc    : `A directive to add keyboard functionality to list elements`,
  api     : `[listItemClass]: the class to identify child elements`,
  instance: `<ul [bfListController] listItemClass="list-item">
        <li class="list-item">One</li>
        <li class="list-item">Two</li>
        <li class="list-item" >Three</li>
        <li class="list-item">Four</li>
  </ul>`,
  demoComp: ListControllerDemo
};
