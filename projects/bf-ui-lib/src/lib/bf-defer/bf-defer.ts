import {IBfDeferStatus} from '../bf-promise/bf-promise';


export class BfDefer {
  public promise: Promise<any>;   // Native Promise
  public resolve: Function;       // Promise resolver function
  public reject: Function;        // Promise rejector function
  public status: IBfDeferStatus;

  constructor() {
    this.status = 0;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    // Set status once resolve/rejected
    this.promise.then(
      () => { if (this.status === 0) { this.status = 1; }},
      () => { if (this.status === 0) { this.status = 2; }}
    );
  }
}
