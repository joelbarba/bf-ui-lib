import {Component, Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

@Directive({ selector: '[bfDropContainer]' })
export class BfDropContainerDirective implements OnChanges {
  @Input() bfDraggable = true;
  // @HostBinding('class.d-none') private isHidden = false;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes) {
    // this.el.nativeElement.style.display = this.show ? null : 'none';
    // this.isHidden = !this.show;
  }
}
