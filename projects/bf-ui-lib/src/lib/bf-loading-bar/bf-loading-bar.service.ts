import { Injectable, Inject } from '@angular/core';
import { AbstractTranslateService } from '../abstract-translate.service';
import { BehaviorSubject } from 'rxjs';

/*******************************************************************************************************************
 * Initiate the loading by calling .run() and passing a bfPromise.
 * The loading will be resolved automatically when that promise is finished
 *
 *    Example: this.loadingBar.run(new BfPromise(resolve => { resolve(); }))
 *
 * It is possible to queue multiple promises.
 * Calling .run() multiple times stacks promises, and keeps the bar running until they are all completed
 *
 * As a second (optional) parameter in .run() there is a configuration object to define the loading options:
 *  - showBar      (true) - Displays the loading bar below the navbar
 *  - blockScreen  (true) - Displays an overlay on the screen to block all elements
 *  - showSpinner  (false) - Display a spinner on the middle of the screen
 *  - delayTime    (1sec) - Delay time to trigger. If promises are completed before this time, loading it's not shown
 *
 * Every time .run() is called those options can be updated (override the current values if passed)
 *
 * It is also possible to stop the loading manually calling .stop()
 *
 * Example:
 *
 *    const myPromise = new BfPromise((resolve) => { setTimeout(resolve, 5000); });
 *    this.loadingBar.run(myPromise, { blockScreen: false }).then(() => {
 *      console.log('Ready');
 *    });
 *
 */

export enum ILoadingStatus { Off = 0, Running = 1, Displayed = 2 }
interface ILoadingOptions {
  showBar     : boolean;  // Whether the loading bar should be displayed
  blockScreen : boolean;  // Whether the whole screen should be blocked
  showSpinner : boolean;  // Whether the show the center spinner
  delayTime   : number;   // Time to wait to trigger the animation after the loading is started
}


@Injectable({
  providedIn: 'root'
})
export class BfLoadingBarService {
  public status: ILoadingStatus = ILoadingStatus.Off;
  public options: ILoadingOptions;
  public loadingPromise: Promise<any>; // Wrapping promise
  private resolveLoading; // Resolver for loadingPromise
  public waitingQueue: Array<Promise<any>> = []; // Stack of waiting promises

  public delayPromise;  // This is to wait for the delay to prompt the loader

  constructor() { }

  public run = (waitingPromise?: Promise<any>, options?: Partial<ILoadingOptions>) => {

    if (!this.loadingPromise) {
      this.loadingPromise = new Promise(resolve => this.resolveLoading = resolve);
    }

    this.options = {
      showBar: true, blockScreen: true, showSpinner: false, delayTime: 1000, // defaults
      ...this.options,
      ...options
    };

    if (!!waitingPromise) {

      if (this.status === ILoadingStatus.Off) {
        console.log('Turning loading ON');

        this.status = ILoadingStatus.Running;
        this.delayPromise = new Promise((resolve) => {
          setTimeout(() => { resolve(); }, this.options.delayTime);
        });
        this.delayPromise.then(() => { // Show loading after delay
          if (ILoadingStatus.Running) { this.status = ILoadingStatus.Displayed; }
        });
      }

      // Queue the promise, and wait until it's completed to see if we can turn off the loading
      this.waitingQueue.push(waitingPromise);
      waitingPromise.finally(() => {
        if (this.status !== ILoadingStatus.Off) {

          // Remove the resolved promise from the queue
          const ind = this.waitingQueue.indexOf(waitingPromise);
          if (ind >= 0) { this.waitingQueue.splice(ind, 1); }

          if (!this.waitingQueue.length) {  // If no more promise to wait, finish
            // console.log('Loading bar resolved');
            this.delayPromise.cancel();
            this.status = ILoadingStatus.Off;
            this.resolveLoading();
          }
        }
      });


      // if waitingPromise is not a BfPromise, turn it into
      // let waitingBfPromise: BfPromise;

      // We expect to work with waitingPromise as "BfPromise"
      // if (waitingPromise instanceof BfPromise) {
      //   waitingBfPromise = waitingPromise;
      // } else {
      //   if (Object.prototype.toString.call(waitingPromise) === '[object Promise]') {
      //     waitingBfPromise = BfPromise.from(<Promise<any>>waitingPromise);
      //   } else {
      //     console.error('What the hell is waitingPromise?', waitingPromise);
      //     throw ('Unknown promise');
      //   }
      // }

      // if (this.status === ILoadingStatus.Off) {
      //   // console.log('Turning loading ON');
      //
      //   this.status = ILoadingStatus.Running;
      //   this.delayPromise = new BfPromise((resolve) => {
      //     setTimeout(() => { resolve(); }, this.options.delayTime);
      //   });
      //   this.delayPromise.then(() => { // Show loading after delay
      //     if (ILoadingStatus.Running) { this.status = ILoadingStatus.Displayed; }
      //   });
      // }

      // Queue the promise, and wait until it's completed to see if we can turn off the loading
      // this.waitingQueue.push(waitingBfPromise);
      // waitingBfPromise.complete(() => {
      //   if (this.status !== ILoadingStatus.Off) {
      //
      //     // Remove the resolved promise from the queue
      //     const ind = this.waitingQueue.indexOf(waitingBfPromise);
      //     if (ind >= 0) { this.waitingQueue.splice(ind, 1); }
      //
      //     if (!this.waitingQueue.length) {  // If no more promise to wait, finish
      //       // console.log('Loading bar resolved');
      //       this.delayPromise.cancel();
      //       this.status = ILoadingStatus.Off;
      //       this.loadingPromise.resolve();
      //     }
      //   }
      // });

    }
    return waitingPromise;  // Return the same input promise
  };

  public stop = () => {
    // console.log('Loading bar stopped');
    this.waitingQueue = [];
    // if (!!this.delayPromise) { this.delayPromise.cancel(); }
    // if (!!this.loadingPromise) { this.loadingPromise.cancel(); }
    this.status = ILoadingStatus.Off;
  };
}
