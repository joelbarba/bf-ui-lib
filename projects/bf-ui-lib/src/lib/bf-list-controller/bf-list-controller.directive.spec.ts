import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BfListControllerDirective } from './bf-list-controller.directive';

const triggerKeyEvent = (fixture: ComponentFixture<DemoComponent>, element: HTMLElement, key: string) => {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true }));
  fixture.detectChanges();
};

describe('BfListController', () => {
  let fixture: ComponentFixture<DemoComponent>;
  let list: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        BfListControllerDirective,
        DemoComponent
      ]
    }).createComponent(DemoComponent);

    list = fixture.debugElement.query(By.directive(BfListControllerDirective));
    fixture.detectChanges();
  });

  it('should apply tabindex of -1 to all valid elements expect the first', () => {
    const elements = list.nativeElement.children;
    expect(elements[0].getAttribute('tabindex')).toBe('0');
    expect(elements[1].getAttribute('tabindex')).toBe('-1');
    expect(elements[2].getAttribute('tabindex')).toBe('-1');
  });

  it('should not move focus to the previous item if it does not exist', () => {
    list.nativeElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const elements = list.nativeElement.children;
    expect(elements[0].getAttribute('tabindex')).toBe('0');
    expect(elements[1].getAttribute('tabindex')).toBe('-1');
    expect(elements[2].getAttribute('tabindex')).toBe('-1');

    triggerKeyEvent(fixture, elements[0], 'ArrowRight');
    expect(elements[0].getAttribute('tabindex')).toBe('-1');
    expect(elements[1].getAttribute('tabindex')).toBe('0');
    expect(elements[2].getAttribute('tabindex')).toBe('-1');

    triggerKeyEvent(fixture, elements[1], 'ArrowLeft');
    expect(elements[0].getAttribute('tabindex')).toBe('0');
    expect(elements[1].getAttribute('tabindex')).toBe('-1');
    expect(elements[2].getAttribute('tabindex')).toBe('-1');

    triggerKeyEvent(fixture, elements[0], 'ArrowUp');
    expect(elements[0].getAttribute('tabindex')).toBe('0');
    expect(elements[1].getAttribute('tabindex')).toBe('-1');
    expect(elements[2].getAttribute('tabindex')).toBe('-1');
  });

  it('should not move focus to the next item if it doesn not exist', () => {
    list.nativeElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const elements = list.nativeElement.children;
    expect(elements[0].getAttribute('tabindex')).toBe('0');
    expect(elements[1].getAttribute('tabindex')).toBe('-1');
    expect(elements[2].getAttribute('tabindex')).toBe('-1');

    triggerKeyEvent(fixture, elements[0], 'ArrowRight');
    expect(elements[0].getAttribute('tabindex')).toBe('-1');
    expect(elements[1].getAttribute('tabindex')).toBe('0');
    expect(elements[2].getAttribute('tabindex')).toBe('-1');

    triggerKeyEvent(fixture, elements[1], 'ArrowDown');
    expect(elements[0].getAttribute('tabindex')).toBe('-1');
    expect(elements[1].getAttribute('tabindex')).toBe('-1');
    expect(elements[2].getAttribute('tabindex')).toBe('0');

    triggerKeyEvent(fixture, elements[2], 'ArrowRight');
    expect(elements[0].getAttribute('tabindex')).toBe('-1');
    expect(elements[1].getAttribute('tabindex')).toBe('-1');
    expect(elements[2].getAttribute('tabindex')).toBe('0');
  });
});

@Component({
  selector: 'bf-demo',
  template: `
    <ul bfListController listItemClass='list-item'>
      <li class='list-item'> One </li>
      <li class='list-item'> Two </li>
      <li class='list-item'> Three </li>
    </ul>
  `
})
export class DemoComponent {}
