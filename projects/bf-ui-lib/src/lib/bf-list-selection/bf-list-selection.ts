import {BfListHandler} from '../bf-list-handler/bf-list-handler';
import {isObservable, Observable, Subscription} from 'rxjs';


export class BfListSelection {
  public subs: {[ key: string]: Subscription } = {};  // Subscriptions holder
  public ids = {};  // Object list of selected keys (ids)
  public isPageChecked = false; // Whether the current page has all items selected
  public resetOnFilter = true;  // If true, onFiltersChange$ empties the selection
  public list;                  // List of items rendered on the current page

  // The param can be:
  // 1 - A BfListHandler object
  // 2 - An observable emitting the array of items (renderList$)
  // 3 - An array with the list of items (renderedList)
  constructor(param: BfListHandler | Observable<Array<{}>> | Array<{}>) {
    let list$;
    if (param instanceof BfListHandler) {
      list$ = param.renderList$;
      this.subs.filter = param.onFiltersChange$.subscribe(_ => this.resetOnFilter &&  this.resetSel());

    } else if (isObservable(param)) { list$ = param;
    } else if (Array.isArray(param)) { this.list = param;
    } else {
      throw new Error('Wrong param type: ' + param);
    }

    // If a reactive list is provided, update it when changes
    if (list$) { this.subs.list = list$.subscribe(v => { this.list = v; this.refresh(); }); }
  }

  public destroy = () => {
    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }

  public getSelection = () => Object.keys(this.ids);
  public isChecked = (id) => !!this.ids[id];
  public resetSel = () => { this.ids = {}; this.refresh(); };
  public refresh = () => {
    this.isPageChecked = this.list && this.list.length && this.list.every(item => this.ids[item.id]);
  }

  public toggleCheck = (id: string, value = !this.ids[id]) => {
    if (value) {
      this.ids[id] = true;
    } else {
      delete this.ids[id];
    }
    this.refresh();
  };

  public togglePage = () => {
    const nextValue = !this.isPageChecked;
    this.list.forEach(rate => this.toggleCheck(rate.id, nextValue));
  };
}
