import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BfUiLibService {
  public isBtnLoading: boolean = false;   // Global flag to disable all buttons while async
  public loadingPromise: Promise<any>;    // Current loading promise

  constructor() { }
}
