import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, Output, ViewChild} from '@angular/core';
import {BfListSelection} from '../bf-list-selection/bf-list-selection';

@Component({
  selector: 'bf-list-checkbox',
  templateUrl: './bf-list-checkbox.component.html',
})
export class BfListCheckboxComponent implements OnChanges, OnDestroy {
  @Input() selection: BfListSelection;
  @Input() id: string;
  @Input() bfDisabled = false;
  @Input() actions: [{ id?, label: string, disabled?: boolean, fn?: (sel?: BfListSelection) => void }];
  @Output() actionClick = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<any>();

  @ViewChild('actionList', { read: ElementRef, static: false }) actionList: ElementRef;

  private sub;
  public hasId = false;
  public actionsExp = false;

  constructor(public elementRef: ElementRef) { }

  @HostListener('focus')
  onFocus() {
    if (this.isExpanded()) {
      this.focusFirstItem();
    }
  }

  ngOnChanges(changes) {
    this.hasId = this.id !== undefined;

    // If the actions panel is expanded, collapse it automatically when the selection changes
    if (this.selection) {
      if (!!this.sub) { this.sub.unsubscribe(); }
      this.sub = this.selection.onChange$.subscribe(_ => this.actionsExp = false);
    }
  }

  ngOnDestroy() {
    if (!!this.sub) { this.sub.unsubscribe(); }
  }

  public clickAction = (action) => {
    if (!action.disabled) {
      this.actionClick.emit(action);
      if (action.fn && typeof action.fn === 'function') {
        action.fn(this.selection);
      }
      this.actionsExp = false; // Collapse panel
    }
  }

  public onKeyDown(event: KeyboardEvent, action): void {
    if (event.key === 'Enter') {
      this.clickAction(action);
    }

    if (event.key === 'Space') {
      event.preventDefault();
      this.clickAction(action);
    }
  }

  public collapseActionsList(): void {
    this.actionsExp = false;
    this.focusOnCheckbox();
    this.clearActionItemsTabindex();
    this.actionList.nativeElement.setAttribute('tabindex', '-1');
  }

  public focusFirstItem(): void {
    if (this.hasActions()) {
      const element = this.actionList.nativeElement.firstElementChild;
      element.setAttribute('tabindex', '0');
      element.focus();
    }
  }

  public focusOnCheckbox(): void {
    this.elementRef.nativeElement.focus();
  }

  public isExpanded(): boolean {
    return this.actionsExp;
  }

  public getActionListTabIndex(): number {
    return this.isExpanded() ? 0 : -1;
  }

  public actionListKeyEvents(event: KeyboardEvent): void {
    const { key } = event;
    const elements: Array<HTMLElement> = Array.from(this.actionList.nativeElement.children);
    const currentElement = this.getSelectedAction(elements);

    if (key === 'Escape') {
      if (this.isExpanded()) {
        this.collapseActionsList();
      }
    }

    if (key === 'ArrowUp') {
      currentElement.setAttribute('tabindex', '-1');

      if (currentElement?.previousElementSibling) {
        const previousElement = currentElement.previousElementSibling as HTMLElement;
        previousElement.setAttribute('tabindex', '0');
        previousElement.focus();
      } else {
        const lastElement = elements[elements.length - 1];
        lastElement.setAttribute('tabindex', '0');
        lastElement.focus();
      }
    }

    if (key === 'ArrowDown') {
      currentElement.setAttribute('tabindex', '-1');

      if (currentElement?.nextElementSibling) {
        const nextElement = currentElement.nextElementSibling as HTMLElement;
        nextElement.setAttribute('tabindex', '0');
        nextElement.focus();
      } else {
        const firstElement = elements[0];
        firstElement.setAttribute('tabindex', '0');
        firstElement.focus();
      }
    }
  }

  private hasActions(): boolean {
    return this.actions.length > 0;
  }

  private clearActionItemsTabindex(): void {
    Array
    .from(this.actionList.nativeElement.children)
    .forEach((item: HTMLElement) => {
      item.setAttribute('tabindex', '-1');
    });
  }

  private getSelectedAction(elements: Array<HTMLElement>): HTMLElement {
    const selected = elements.find((item) => item.getAttribute('tabindex') === '0');
    return selected || elements[0];
  }
}
