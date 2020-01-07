import { Component, OnInit } from '@angular/core';
import {BfPromise} from '../../../../bf-ui-lib/src/lib/bf-promise/bf-promise';

@Component({
  selector: 'app-bf-promise-demo]',
  templateUrl: './bf-promise-demo.component.html',
  styleUrls: ['./bf-promise-demo.component.scss']
})
export class BfPromiseDemoComponent implements OnInit {
  public name = BfPromiseDoc.name;
  public desc = BfPromiseDoc.desc;
  public api = BfPromiseDoc.api;
  public instance = BfPromiseDoc.instance;

  public example1 = `import { BfPromise } from 'bf-ui-lib';  
  
const bfPromise = new BfPromise((resolve, reject, cancel) => {
  setTimeout(() => { cancel(1);  }, 2000);
  setTimeout(() => { resolve(2); }, 3000);
  setTimeout(() => { reject(3);  }, 4000);
});`;

  public example2 = `const bfPromise = new BfPromise();
setTimeout(() => { bfPromise.cancel();  }, 2000);
setTimeout(() => { bfPromise.resolve(); }, 3000);
setTimeout(() => { bfPromise.reject();  }, 4000);

bfPromise.then(
  () => { console.log('Promise resolved'); },
  () => { console.log('Promise rejected'); },
  () => { console.log('Promise completed'); }
);

bfPromise.then(() => { console.log('Promise resolved'); });
bfPromise.fail(() => { console.log('Promise rejected'); });
bfPromise.complete(() => { console.log('Promise completed'); });`;

  public staticHelpers = `from(promise: Promise<any>): BfPromise ------------> Convert a native promise to a BfPromise
all(stack: Array<BfPromise>): BfPromise -----------> (NOT IMPLEMENTED YET) Returns a promise that resolves when all the given promises are resolved, or one is rejected (same as Promise.all)
allCompleted(stack: Array<BfPromise>): BfPromise --> (NOT IMPLEMENTED YET) Returns a promise that resolves when all the given promises are completed
allResolved(stack: Array<BfPromise>): BfPromise ---> (NOT IMPLEMENTED YET) Returns a promise that resolves when all are resolved, or one is rejected (same as Promise.all)
`;

  public myPromise: BfPromise;
  public resolveTime = 5;
  public rejectTime = 7;
  public testLog = '';
  public elapsedTime = 0;
  public cancelInt;
  public cancelRes;
  public cancelRej;

  constructor() { }

  ngOnInit() {
    this.renderLog();
  }


  initTest = () => {
    this.myPromise = new BfPromise();
    this.elapsedTime = 0;
    this.cancelInt = setInterval(() => { this.elapsedTime++; this.renderLog(); }, 1000);

    this.cancelRes = setTimeout(() => {
      this.myPromise.resolve();
      clearInterval(this.cancelInt);
      clearTimeout(this.cancelRes);
      clearTimeout(this.cancelRej);
      this.renderLog();
    }, this.resolveTime * 1000);

    this.cancelRej = setTimeout(() => {
      this.myPromise.reject();
      clearInterval(this.cancelInt);
      clearTimeout(this.cancelRes);
      clearTimeout(this.cancelRej);
      this.renderLog();
    }, this.rejectTime * 1000);

    this.renderLog();
  }
  renderLog = () => {
    if (!this.myPromise) { this.testLog = 'No Promise'; return false; }
    let statusName = '-';
    if (this.myPromise.status === 0) { statusName = 'Pending'; }
    if (this.myPromise.status === 1) { statusName = 'Resolved'; }
    if (this.myPromise.status === 2) { statusName = 'Rejected'; }
    if (this.myPromise.status === 3) { statusName = 'Cancelled'; }
    this.testLog = `${this.elapsedTime} seg --> Status = ${this.myPromise.status} (${statusName})`;
  }
  testCancel = () => {
    this.myPromise.cancel();
    clearInterval(this.cancelInt);
    clearTimeout(this.cancelRes);
    clearTimeout(this.cancelRej);
    this.renderLog();
  }

}


export const BfPromiseDoc = {
  name    : `bfPromise`,
  uiType  : 'class',
  desc    : `(Class) Custom Promise Generator (promise with asteroids)`,
  api     : `resolve(result?) --> It resolves the current promise (shortcut to the inner resolver)
reject(result?)  --> It rejects the current promise (shortcut to the inner rejector)
cancel()         --> It cancels the promise if it is still not resolved/rejected. Every listener (then/catch/complete) set
                     on this promise will be ignored after cancel.

status: IBfDeferStatus --> Current status of the promise (internally exposed). pending = 0, resolved = 1, rejected = 2, cancelled = 3
result: any            --> If resolved/rejected the result with which it was resolved/rejected

then(thenFn, catchFn?, completeFn?)  --> Subscriber to the promise (same as native promise)
fail(catchFn)                        --> Subscriber to the rejection of the promise (same as native catch)
complete(completeFn)                 --> Subscriber to any resolution of the promise (same as native finally)
                                         The complete is not executed is the promise is canceled.
`,
  instance: `new BfPromise()`,
  demoComp: BfPromiseDemoComponent
};
