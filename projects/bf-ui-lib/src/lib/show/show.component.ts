import {Directive, HostBinding, Input, OnChanges} from '@angular/core';

// --- TODO: Add this to documentation ----

@Directive({ selector: '[show]' })
export class ShowDirective implements OnChanges {
  @Input('show') show = true;
  @HostBinding('class.d-none') private isHidden = false;
  constructor() { }
  ngOnChanges(changes) {
    this.isHidden = !this.show;
  }
}
