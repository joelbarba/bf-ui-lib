import { Injectable, NgZone } from '@angular/core';
import { AriaLivePoliteness, LiveAnnouncer } from '@angular/cdk/a11y';
import { BfUILibTransService } from '../abstract-translate.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BfGrowlService {
  public msgList = [];

  constructor(
    private ngZone: NgZone,
    private translate: BfUILibTransService,
    private liveAnnouncer: LiveAnnouncer
  ) { }

  public success(text: string, labelParams = {}, timeOut = 2000, politeness: AriaLivePoliteness = 'assertive') {
    this.pushMsg({ text, timeOut, labelParams, msgType: 'success', msgIcon: 'icon-checkmark' });
    this.announceForScreenreaders(text, labelParams);
  }

  public error(text: string, labelParams = {}, timeOut = 2000, politeness: AriaLivePoliteness = 'assertive') {
    this.pushMsg({ text, timeOut, labelParams, msgType: 'error', msgIcon: 'icon-warning2' });
    this.announceForScreenreaders(text, labelParams);
  }

  // Push a message into the queue
  public pushMsg(msg) {
    const newMsg = { labelParams: {}, ...msg };
    newMsg.iniTime = new Date();
    newMsg.status = 'active';

    if (!!this.translate.getLabel$) {
      newMsg.text$ = this.translate.getLabel$(newMsg.text, newMsg.labelParams);
    } else {
      newMsg.text$ = new BehaviorSubject(newMsg.text);
    }

    this.msgList.unshift(newMsg);

    newMsg.remove = () => {
      newMsg.status = 'fading'; // Start the animation of fading out

      // Remove the message after the vanishing animation
      this.setTimeoutNoZone(() => {
        const ind = this.msgList.indexOf(newMsg);
        this.msgList.splice(ind, 1);
      }, 600);
    };

    // Set the timeout to remove the message automatically after a while
    if (newMsg.timeOut > 0) {
      const timer = this.setTimeoutNoZone(newMsg.remove, newMsg.timeOut);
      newMsg.cancelTimeout = () => {
        newMsg.status = 'stuck';
        newMsg.cancelTimeout = null;
        clearTimeout(timer);
      };
    }

  }


  // This is like "setTimeout()" but running outside ngZone
  setTimeoutNoZone = (callback, time) => {
    return this.ngZone.runOutsideAngular(() => {
      return setTimeout(() => {
        this.ngZone.run(callback);
      }, time);
    });
  }

  private announceForScreenreaders(text: string, params: any, politeness: AriaLivePoliteness = 'assertive'): void {
    const translatedString = this.translate.doTranslate(text, params);
    this.liveAnnouncer.announce(translatedString, politeness);
  }
}
