import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[bfListController]'
})
export class BfListControllerDirective implements AfterViewInit {
  /** A string to define the list item class */
  @Input() listItemClass: string;

  private listItems: Array<HTMLElement>;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyPress(event: any) {
    const { key } = event;

    if (this.isPreviousKeyPressed(key)) {
      this.focusPreviousElement(event.target);
    }

    if (this.isNextKeyPressed(key)) {
      this.focusNextElement(event.target);
    }
  }

  @HostListener('focus', ['$event.target'])
  onFocus() {
    this.setTabIndex(this.el.nativeElement, -1);
    this.getCurrentItem(this.listItems).focus();
  }

  ngAfterViewInit(): void {
    this.listItems = this.getListItems(this.listItemClass);

    this.listItems.forEach((item, index) => {
      index === 0
        ? this.setInitialElement(item)
        : this.setTabIndex(item, -1);
    });
  }

  private focusNextElement(currentElement: HTMLElement): void {
    const nextElement: HTMLElement = currentElement.nextElementSibling as HTMLElement;

    if (nextElement) {
      this.setTabIndex(currentElement, -1);
      this.setTabIndex(nextElement, 0);
      nextElement.focus();
    }
  }

  private focusPreviousElement(currentElement: HTMLElement): void {
    const previousElement: HTMLElement = currentElement.previousElementSibling as HTMLElement;

    if (previousElement) {
      this.setTabIndex(currentElement, -1);
      this.setTabIndex(previousElement, 0);
      previousElement.focus();
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
}
