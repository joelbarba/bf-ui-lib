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

    directive.onKeyDown(new MouseEvent('click'));

    tick(600);

    directive.onKeyUp(new MouseEvent('click'));

    expect(longPressSpy).toHaveBeenCalled();
  }));

  it('should not emit a long press', fakeAsync(() => {
    const directive = new BfLongPressDirective();
    const longPressSpy = spyOn(directive.longPress, 'emit');

    directive.onKeyDown(new MouseEvent('click'));

    tick(300);

    directive.onKeyUp(new MouseEvent('click'));

    expect(longPressSpy).not.toHaveBeenCalled();
  }));
});
