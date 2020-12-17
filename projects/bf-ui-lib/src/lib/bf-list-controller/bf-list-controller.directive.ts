import { AfterViewChecked, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[bfListController]'
})
export class BfListControllerDirective implements AfterViewChecked {
  /** A string to define the list item class */
  @Input() listItemClass: string;
  /** A string to define the class of selected items so it can set initial focus to the element */
  @Input() listItemSelectedClass: string;

  private listItems: Array<HTMLElement>;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyPress(event: any) {
    const { key } = event;

    if (this.isPreviousKeyPressed(key)) {
      event.preventDefault();
      this.focusPreviousElement(event.target);
    }

    if (this.isNextKeyPressed(key)) {
      event.preventDefault();
      this.focusNextElement(event.target);
    }
  }

  @HostListener('focus', ['$event.target'])
  onFocus() {
    this.setTabIndex(this.el.nativeElement, -1);
    this.getCurrentItem(this.listItems).focus();
  }

  ngAfterViewChecked(): void {
    this.listItems = this.getListItems(this.listItemClass);

    this.listItems.forEach((item, index) => {
      this.listItemSelectedClass
        ? this.setTabIndexesForElements(item.classList.contains(this.listItemSelectedClass), item)
        : this.setTabIndexesForElements(index === 0, item);
    });
  }

  private focusNextElement(currentElement: HTMLElement): void {
    const nextElement: HTMLElement = currentElement.nextElementSibling as HTMLElement;

    if (nextElement) {
      if (this.isElementEnabled(nextElement)) {
        this.updateCurrentFocus(currentElement, nextElement);
      } else {
        this.focusNextElement(nextElement);
      }
    }
  }

  private focusPreviousElement(currentElement: HTMLElement): void {
    const previousElement: HTMLElement = currentElement.previousElementSibling as HTMLElement;

    if (previousElement) {
      if (this.isElementEnabled(previousElement)) {
        this.updateCurrentFocus(currentElement, previousElement);
      } else {
        this.focusPreviousElement(previousElement);
      }
    }
  }

  public setTabIndex(element: Element, index: number): void {
    element.setAttribute('tabindex', `${index}`);
  }

  public getListItems(className: string): Array<HTMLElement> {
    const buttons: Array<HTMLElement> = Array.from(this.el.nativeElement.children);
    return buttons.filter(element => element.classList.contains(className));
  }

  private setInitialElement(element: HTMLElement): void {
    this.setTabIndex(element, 0);
  }

  private getCurrentItem(elements: Array<HTMLElement>): HTMLElement {
    return elements.find(element => element.getAttribute('tabindex') === '0') || elements[0];
  }

  private isPreviousKeyPressed(key: string): boolean {
    return key === 'ArrowLeft' || key === 'ArrowUp';
  }

  private isNextKeyPressed(key: string): boolean {
    return key === 'ArrowRight' || key === 'ArrowDown';
  }

  private updateCurrentFocus(currentElement: HTMLElement, nextElement: HTMLElement): void {
    this.setTabIndex(currentElement, -1);
    this.setTabIndex(nextElement, 0);
    nextElement.focus();
  }

  private isElementEnabled(element: HTMLElement): boolean {
    const disabledValue = element.getAttribute('disabled');
    return disabledValue === 'false' || disabledValue === null;
  }

  private setTabIndexesForElements(isFocused: boolean, element: HTMLElement): void {
    isFocused
      ? this.setInitialElement(element)
      : this.setTabIndex(element, -1);
  }
}
