import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bf-intersection-observer-demo',
  templateUrl: './bf-intersection-observer-demo.component.html',
  styleUrls: ['./bf-intersection-observer-demo.component.scss'],
})
export class BfIntersectionObserverDemoComponent {
  public name = BfIntersectionObserverDoc.name;
  public desc = BfIntersectionObserverDoc.desc;
  public api = BfIntersectionObserverDoc.api;
  public instance = BfIntersectionObserverDoc.instance;

  lastEntries = new Array<IntersectionObserverEntry>(10);

  constructor() { }

  onVisibilityChange(index: number, entry: IntersectionObserverEntry) {
    this.lastEntries[index] = entry;
  }

  trackByIndex(index: number) {
    return index;
  }

}

export const BfIntersectionObserverDoc = {
  name    : `bf-intersection-observer`,
  uiType  : 'directive',
  desc    : `Triggers events on intersection (useful for lazy-loading)`,
  api     : '',
  instance: `
<div bfIntersectionObserver
   [root]="container"
   [threshold]="[ 0, 1 ]"
   [debounce]="50"
   rootMargin="15px"
   (visibilityChange)="onVisibilityChange(i, $event)">
  <span>{{ i }}</span>
</div>
  `,
  demoComp: BfIntersectionObserverDemoComponent,
};
