import {Directive, ElementRef, HostBinding, Input, OnChanges} from '@angular/core';

@Directive({ selector: '[show]' })
export class ShowDirective implements OnChanges {
  @Input('show') show = true;
  // @HostBinding('class.d-none') private isHidden = false;
  constructor(private el: ElementRef) { }
  ngOnChanges(changes) {
    this.el.nativeElement.style.display = this.show ? null : 'none';
    // this.isHidden = !this.show;
  }
}
