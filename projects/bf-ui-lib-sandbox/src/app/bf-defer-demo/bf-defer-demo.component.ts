import { Component, OnInit } from '@angular/core';
import {BfDefer} from '../../../../bf-ui-lib/src/lib/bf-defer/bf-defer';
import {BfPromise} from '../../../../bf-ui-lib/src/lib/bf-promise/bf-promise';
import {BfGrowlService} from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';

@Component({
  selector: 'app-bf-defer-demo',
  templateUrl: './bf-defer-demo.component.html',
  styleUrls: ['./bf-defer-demo.component.scss']
})
export class BfDeferDemoComponent implements OnInit {
  public name = BfDeferDoc.name;
  public desc = BfDeferDoc.desc;
  public api = BfDeferDoc.api;
  public instance = BfDeferDoc.instance;

  public example1 = `import { BfDefer } from 'bf-ui-lib';

const def = new BfDefer();
console.log(def.status); // <-- This will be 0 (pending)
setTimeout(() => { def.resolve(true); }, 4000);
setTimeout(() => { def.reject(false); }, 3000);

def.promise.then(
  res => { console.log('Promise resolved', res, def.status); },
  res => { console.log('Promise rejected', res, def.status); }
);
`;

  public myDef: BfDefer;
  public resolveTime = 5;
  public rejectTime = 7;
  public testLog = '';
  public elapsedTime = 0;
  public cancelInt;
  public cancelRes;
  public cancelRej;


  constructor(private growl: BfGrowlService) { }

  ngOnInit() {
    // console.log('Promise Init');
    // const def = new BfDefer();
    // def.promise.then(
    //   () => { console.log('Promise resolved'); },
    //   () => { console.log('Promise rejected'); }
    // );
    // console.log(def.status);
    // setTimeout(() => { def.resolve(true); }, 4000);
    // setTimeout(() => { def.reject(false);  }, 3000);
  }


  initTest = () => {
    this.myDef = new BfDefer();
    this.elapsedTime = 0;
    this.cancelInt = setInterval(() => { this.elapsedTime++; this.renderLog(); }, 1000);

    this.myDef.promise.then(res => {
      this.growl.success('Promise resolved: ' + res);
      this.clearAll();
    }, res => {
      this.growl.error('Promise rejected: ' + res);
      this.clearAll();
    });

    this.cancelRes = setTimeout(() => this.myDef.resolve('Timout'), this.resolveTime * 1000);
    this.cancelRej = setTimeout(() => this.myDef.reject('Timout'), this.rejectTime * 1000);
    this.renderLog();
  }
  renderLog = () => {
    if (!this.myDef) { this.testLog = '-'; return false; }
    let statusName = '-';
    if (this.myDef.status === 0) { statusName = 'Pending'; }
    if (this.myDef.status === 1) { statusName = 'Resolved'; }
    if (this.myDef.status === 2) { statusName = 'Rejected'; }
    this.testLog = `${this.elapsedTime} seg --> Status = ${this.myDef.status} (${statusName})`;
  }
  clearAll = () => {
    clearInterval(this.cancelInt);
    clearTimeout(this.cancelRes);
    clearTimeout(this.cancelRej);
    this.renderLog();
  }


}


export const BfDeferDoc = {
  name    : `BfDefer`,
  uiType  : 'class',
  desc    : `(Class) Native Promise wrapper`,
  api     : `promise: Promise<any>  --> The native promise
status: number         --> Status of the promise: pending = 0, resolved = 1, rejected = 2
resolve(): Function    --> Pointer to the native promise's resolve() function
reject(): Function     --> Pointer to the native promise's reject() function
`,
  instance: `<bf-defer></bf-defer>`,
  demoComp: BfDeferDemoComponent
};
