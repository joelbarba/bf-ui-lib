import {Component, Directive, ElementRef, HostBinding, Input, OnChanges, OnInit} from '@angular/core';
import { isObservable } from 'rxjs';

@Component({
  selector: 'bf-loading-spinner',
  template: '<span class="bf-spin"></span>'
})
export class BfLoadingSpinnerComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}


@Directive({ selector: '[bf-loading-spinner]' })
export class BfLoadingSpinnerDirective implements OnChanges {
  @Input('bf-loading-spinner') trigger;
  @HostBinding('class.bf-spin-over') private isLoading = false;
  public lastSubscription; // To unsubscribe in case a new obs needs be linked
  constructor() {}
  ngOnChanges(changes) {
    if (changes.hasOwnProperty('trigger') && this.trigger !== null && this.trigger !== undefined) {

      // If 'bf-loading-spinner' comes as a promise
      if (!!this.trigger['then']) {
        this.isLoading = true;
        this.trigger.then(() => this.isLoading = false, () => this.isLoading = false);
      }

      // If 'bf-loading-spinner' comes as a boolean
      if (typeof this.trigger === 'boolean') {
        this.isLoading = !!this.trigger;
      }

      // If 'bf-loading-spinner' comes as an observable
      if (isObservable(this.trigger)) {
        this.isLoading = true;
        if (!!this.lastSubscription) { this.lastSubscription.unsubscribe(); }
        this.lastSubscription = this.trigger.subscribe({
          next     : (val) => this.isLoading = !!val,
          error    : () => this.isLoading = false,
          complete : () => this.isLoading = false
        });
      }

    }
  }
}



