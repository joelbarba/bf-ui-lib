import {Component, OnDestroy, OnInit} from '@angular/core';
import { BfLoadingBarService } from './bf-loading-bar.service';

@Component({
  selector: 'bf-loading-bar',
  templateUrl: './bf-loading-bar.component.html',
  styleUrls: ['./bf-loading-bar.component.scss']
})
export class BfLoadingBarComponent implements OnInit, OnDestroy {
  public showBlockScreen = false;
  public aniBack = false; // To trigger the background show up animation
  public showBar = false;
  public showCircularSpinner = false;
  public showBfSpinner = false;
  public prevStatus = 0;
  public statusSubs;  // Subscription to the status observable

  constructor(public loadingBar: BfLoadingBarService) {

    this.statusSubs = this.loadingBar.status$.subscribe(status => {
      const opts = this.loadingBar.options;
      this.showBar = (status === 2 && opts.showBar);
      this.showCircularSpinner = (status === 2 && opts.showSpinner && opts.spinnerType === 'circular');
      this.showBfSpinner = (status === 2 && opts.showSpinner && opts.spinnerType === 'blueface');

      // this.showBlockScreen = (status === 2 && opts.blockScreen);

      // Set flags to animate transitions
      // Instead of turning on/off the background blocker, delay it so we can play an animation
      if (opts.blockScreen) {
        if (this.prevStatus !== 2 && status === 2) { // Turn it on
          this.showBlockScreen = true; setTimeout(() => this.aniBack = true);
        }
        if (this.prevStatus === 2 && status !== 2) { // Turn it off
          this.aniBack = false; setTimeout(() => this.showBlockScreen = false, 150);
        }
      }

      this.prevStatus = status;
    });

  }

  ngOnInit() { }

  ngOnDestroy () {
    this.statusSubs.unsubscribe();
  }

}
