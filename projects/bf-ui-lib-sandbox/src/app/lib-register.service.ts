import { Injectable } from '@angular/core';
import * as docs from './doc-demos-list';
export const compList = [
  docs.BfTabsDoc,
  docs.BfBtnDoc,
  docs.BfLabelDoc,
  docs.BfInputDoc,
  docs.BfTextareaDoc,
  docs.BfDropdownDoc,
  docs.BfAutocompleteDoc,
  docs.BfMultiSelectorDoc,
  docs.BfLazyDropdownDoc,
  docs.BfSwitchDoc,
  docs.BfCheckboxDoc,
  docs.BfDualCheckboxDoc,
  docs.BfRadioDoc,
  docs.BfQuantityInputDoc,
  docs.BfDatePickerDoc,
  docs.BfTimePickerDoc,
  docs.BfSliderDoc,
  docs.BfRangeSliderDoc,
  docs.BfStatusBadgeDoc,
  docs.BfDotBadgeDoc,
  docs.BfProgressBarDoc,
  docs.BfListHeaderColDoc,
  docs.BfListPaginatorDoc,
  docs.BfListCheckboxDoc,
  docs.BfListPlaceholderDoc,
  docs.BfPagePlaceholderDoc,
  docs.BfNoDataDoc,
  docs.BfLoadingSpinnerDoc,
  docs.BfSectionHeaderDoc,
  docs.BfModalHeaderDoc,
  docs.BfColorPickerDoc,
  docs.BfExpandableListDoc,
  docs.BfCollapseDoc,
  docs.BfKeypadDoc,
  docs.ShowDoc,
  docs.BfGrowlDoc,
  docs.BfLoadingBarDoc,
  docs.BfDndDemoDoc,
  docs.BfConfirmDoc,
  docs.BfPrototypesDoc,
  docs.BfListHandlerDoc,
  docs.BfListSelectionDoc,
  docs.BfPromiseDoc,
  docs.BfDeferDoc,
  docs.ListControllerDoc,
  docs.BfIntersectionObserverDoc,
  docs.BfDateTimePickerDoc
];


/* {
  name     : 'bf-list-header-col',
  api      : '...',
  instance : '<bf-list-header-col></bf-list-header-col>',
  demoComp : BfBtnDemoComponent
} */

@Injectable({ providedIn: 'root' })
export class LibRegisterService {
  public compList = compList;
  constructor() {  }
}
