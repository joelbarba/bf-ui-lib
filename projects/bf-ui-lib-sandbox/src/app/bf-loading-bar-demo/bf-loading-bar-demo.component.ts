import { Component, OnInit } from '@angular/core';
import { BfLoadingBarService, ILoadingOptions } from '../../../../bf-ui-lib/src/lib/bf-loading-bar/bf-loading-bar.service';
import {BfDefer} from '../../../../bf-ui-lib/src/lib/bf-defer/bf-defer';
import {BfGrowlService} from '../../../../bf-ui-lib/src/lib/bf-growl/bf-growl.service';

@Component({
  selector: 'app-bf-loading-bar-demo',
  templateUrl: './bf-loading-bar-demo.component.html',
  styleUrls: ['./bf-loading-bar-demo.component.scss']
})
export class BfLoadingBarDemoComponent implements OnInit {


  constructor(
    public loadingBar: BfLoadingBarService,
    private growl: BfGrowlService,
  ) {


  }
  public name = BfLoadingBarDoc.name;
  public desc = BfLoadingBarDoc.desc;
  public api = BfLoadingBarDoc.api;
  public instance = BfLoadingBarDoc.instance;

  public cssReset = `$locker-bg: rgba($white, 0.8) !default;   // Background color when blocking

$bar-bg: darken($white, 83%) !default;    // Header loading bar
$bar-color: $quaternary_color !default;

$spinner-color: rgba($primary_color, 0.7) !default; // Round spinner
$spinner-size: 60 !default;
$menu-size: 35 !default;

$ani-time: 8 !default; // Animation time for BF loading spinner`;

  public example1 = `constructor(public loadingBar: BfLoadingBarService) { ... }

this.loadingBar.config({
  blockScreen : true,
  delayTime   : 1000,
  showBar     : false,
  showSpinner : true,
  spinnerType : 'blueface',
  ariaCompleteMessage : 'Complete'
});`;

  public example2 = `this.loadingBar.run();
setTimeout(() => this.loadingBar.stop(), 5000);`;

  public example3 = `const myPromise = new Promise((resolve) => setTimeout(resolve, 5000));
this.loadingBar.run(myPromise, { blockScreen: false }).then(() => {
  console.log('Ready');
});`;

  public compInstance = `<bf-loading-bar></bf-loading-bar>`;


  public myOpts: ILoadingOptions = {
    blockScreen : true,
    delayTime   : 1000,
    showBar     : false,
    showSpinner : true,
    spinnerType : 'blueface',
    showLogs    : true,
    ariaCompleteMessage: 'Complete'
  };
  public testLog = '';
  public elapsedTime = 0;
  public cancelInt;
  public delayTimeSec = 1;
  public autoStopTime = 5;
  public cancelRes;


  public resTimePromise = 5;
  public testLog2 = '';

  public promStack = [];
  public promId = 1;

  ngOnInit() {
    // this.simpleRun();

    // Check for updates
    setInterval(() => {
      this.promStack.forEach(prom => {
        const nowTime = new Date();
        // @ts-ignore
        const elapsedTime = Math.floor((nowTime - prom.iniTime) / 1000);
        prom.logMsg = `Promise ${prom.id} will be resolved in: ${prom.resolveTime - elapsedTime} sec`;
      });
      let statusName = '';
      if (this.loadingBar.status === 0) { statusName = 'Off'; }
      if (this.loadingBar.status === 1) { statusName = 'Running'; }
      if (this.loadingBar.status === 2) { statusName = 'Displayed'; }
      this.testLog2 = `Loading Bar Status = ${this.loadingBar.status} (${statusName})`;
    }, 300);
  }


  public simpleRun = () => {
    this.myOpts.delayTime = this.delayTimeSec * 1000;
    this.loadingBar.config(this.myOpts);
    this.loadingBar.run();

    this.elapsedTime = 0;
    this.cancelInt = setInterval(() => { this.elapsedTime++; this.renderLog(); }, 1000);
    this.cancelRes = setTimeout(() => {
      this.loadingBar.stop();
      this.clearAll();
    }, this.autoStopTime * 1000);
    this.renderLog();
  }

  public simpleStop = () => {
    this.loadingBar.stop();
    this.clearAll();
  }

  public renderLog = () => {
    let statusName = '-';
    if (this.loadingBar.status === 0) { statusName = 'Off'; }
    if (this.loadingBar.status === 1) { statusName = 'Running'; }
    if (this.loadingBar.status === 2) { statusName = 'Displayed'; }
    this.testLog = `${this.elapsedTime} seg --> Status = ${this.loadingBar.status} (${statusName})`;
  }

  public clearAll = () => {
    clearInterval(this.cancelInt);
    clearTimeout(this.cancelRes);
    this.renderLog();
  }
  public pushPromise = (resTime) => {
    const def = new BfDefer();
    const id = this.promId++;
    const cancelFn = setTimeout(() => {
      console.log('resolving the promise', new Date());
      def.resolve();
      this.growl.success('Promise resolved');
      this.promStack.removeById(id);
    }, resTime * 1000);

    this.promStack.push({
      def, id, cancelFn,
      iniTime: new Date(),
      resolveTime: resTime,
      logMsg: 'New Promise added',
    });

    this.myOpts.delayTime = this.delayTimeSec * 1000;
    this.loadingBar.run(def.promise, this.myOpts);
  }

}


export const BfLoadingBarDoc = {
  name    : `BfLoadingBar`,
  uiType  : 'module',
  desc    : `Global loading animation to block the page while something is going on`,
  api     : `
status : ILoadingStatus                   --> ILoadingStatus { Off = 0, Running = 1, Displayed = 2 }
status$: BehaviorSubject<ILoadingStatus>  --> Observable that emits every time the status changes.
options: Partial<ILoadingOptions>         --> Configurable options to display the loading bar:
                   - blockScreen : boolean --> Whether the screen is blocked while the loading is running
                   - delayTime   : number  --> Milliseconds to delay the loading bar display after it's triggered. This is useful to avoid triggering the animation for short loading times
                   - showBar     : boolean --> Whether to show the loading bar under the navbar when the loading is running
                   - showSpinner : boolean --> Whether to show the spinner animation at the center of the screen
                   - spinnerType : string  --> The type (animation) of the spinner ('circular' | 'blueface')


.config(options)                --> Function to set the loading bar configuration (default params)
.run(waitingPromise?, options)  --> Function to set the loading bar configuration (default params)
.stop()                         --> Finishes the running loading. If any promise waiting in the queue, clears them up
  `,
  instance: `<bf-loading-bar></bf-loading-bar>`,
  demoComp: BfLoadingBarDemoComponent
};
