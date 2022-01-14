import { fakeAsync, tick } from '@angular/core/testing';
import { BfLongPressDirective } from './bf-long-press.directive';

describe('BfLongPressDirective', () => {
  it('should create an instance', () => {
    const directive = new BfLongPressDirective();
    expect(directive).toBeTruthy();
  });

  it('should emit a long press', fakeAsync(() => {
    const directive = new BfLongPressDirective();
    const longPressSpy = spyOn(directive.longPress, 'emit');

    directive.onKeyDown();

    tick(600);

    directive.onKeyUp();

    expect(longPressSpy).toHaveBeenCalled();
  }));

  it('should not emit a long press', fakeAsync(() => {
    const directive = new BfLongPressDirective();
    const longPressSpy = spyOn(directive.longPress, 'emit');

    directive.onKeyDown();

    tick(300);

    directive.onKeyUp();

    expect(longPressSpy).not.toHaveBeenCalled();
  }));
});
