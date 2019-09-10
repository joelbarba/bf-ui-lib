import { Injectable, Inject } from '@angular/core';
import { AbstractTranslateService } from '../abstract-translate.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BfGrowlService {
  public msgList = [];
  public list$ = new BehaviorSubject([]);

  constructor(
    @Inject('TranslateService') private translate: AbstractTranslateService) {
  }

  public success(text: string, timeOut = 2000) {
    this.pushMsg({ text, timeOut, msgType: 'success', msgIcon: 'icon-checkmark' });
  }

  public error(text: string, timeOut = 2000) {
    this.pushMsg({ text, timeOut, msgType: 'error', msgIcon: 'icon-warning2' });
  }

  // Push a message into the queue
  public pushMsg(msg) {
    const newMsg = { ...msg, iniTime: new Date(), status: 'active' };

    if (!!this.translate.getLabel$) {
      newMsg.text$ = this.translate.getLabel$(newMsg.text);
    } else {
      newMsg.text$ = new BehaviorSubject(newMsg.text);
    }

    this.msgList.unshift(newMsg);
    this.list$.next(this.msgList);

    newMsg.remove = () => {
      // Start the animation of fading out
      newMsg.status = 'fading'; this.list$.next(this.msgList);

      // Remove the message after the vanishing animation
      setTimeout(() => {
        const ind = this.msgList.indexOf(newMsg);
        this.msgList.splice(ind, 1);
        this.list$.next(this.msgList);
      }, 600);
    };

    // Set the timeout to remove the message automatically after a while
    if (newMsg.timeOut > 0) {
      const timer = setTimeout(newMsg.remove, newMsg.timeOut);
      newMsg.cancelTimeout = () => {
        newMsg.status = 'stuck';
        newMsg.cancelTimeout = null;
        window.clearTimeout(timer);
      };
    }

  }


}
