import { fakeAsync, tick } from '@angular/core/testing';
import { BfShortPressDirective } from './bf-short-press.directive';

describe('BfShortPressDirective', () => {
  it('should create an instance', () => {
    const directive = new BfShortPressDirective();
    expect(directive).toBeTruthy();
  });

  it('should not emit a short press event', fakeAsync(() => {
    const directive = new BfShortPressDirective();
    const shortPressSpy = spyOn(directive.shortPress, 'emit');

    directive.onKeyDown();

    tick(600);

    directive.onKeyUp();

    expect(shortPressSpy).not.toHaveBeenCalled();
  }));

  it('should emit a short press event', fakeAsync(() => {
    const directive = new BfShortPressDirective();
    const shortPressSpy = spyOn(directive.shortPress, 'emit');

    directive.onKeyDown();

    tick(300);

    directive.onKeyUp();

    expect(shortPressSpy).toHaveBeenCalled();
  }));
});
