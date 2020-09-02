import { of, BehaviorSubject } from 'rxjs';

export class BfUILibTransStubService {
  public getLabel$ = (label ?: string, params?) => of(label);
  public doTranslate = (label ?: string, params?) => label;
  public locale$ = new BehaviorSubject('en-IE');
}
