import { BfIntersectionObserverDirective } from './bf-intersection-observer.directive';
import { Subject } from 'rxjs';
import { ElementRef } from '@angular/core';
import createSpy = jasmine.createSpy;

function waitFor(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

describe('BfIntersectionObserverDirective', () => {
  let event$: Subject<IntersectionObserverEntry>;
  let directive: BfIntersectionObserverDirective;

  beforeEach(() => {
    event$ = new Subject();
    BfIntersectionObserverDirective['fromIntersection'] = createSpy('fromIntersection').and.callFake(() => event$);

    directive = new BfIntersectionObserverDirective(new ElementRef<HTMLElement>(document.createElement('div')));
  });

  afterEach(() => directive.ngOnDestroy());

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should notify of intersection events', async () => {
    const entries = new Array<Partial<IntersectionObserverEntry>>();
    directive.ngOnInit();
    directive.visibilityChange.subscribe((e) => entries.push(e));
    event$.next({ intersectionRatio: 1, isIntersecting: true } as IntersectionObserverEntry);
    await waitFor(10);
    expect(entries).toEqual([{ intersectionRatio: 1, isIntersecting: true }]);
  });

});
