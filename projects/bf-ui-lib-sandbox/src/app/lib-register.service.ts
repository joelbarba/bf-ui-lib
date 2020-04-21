import { Injectable } from '@angular/core';
import * as docs from './doc-demos-list';
export const compList = [
  docs.BfBtnDoc,
  docs.BfLabelDoc,
  docs.BfInputDoc,
  docs.BfTextareaDoc,
  docs.BfDropdownDoc,
  docs.BfAutocompleteDoc,
  docs.BfMultiSelectorDoc,
  docs.BfSwitchDoc,
  docs.BfCheckboxDoc,
  docs.BfDualCheckboxDoc,
  docs.BfRadioDoc,
  docs.BfQuantityInputDoc,
  docs.BfDatePickerDoc,
  docs.BfTimePickerDoc,
  docs.BfSliderDoc,
  docs.BfRangeSliderDoc,
  docs.BfColorPickerDoc,
  docs.BfStatusBadgeDoc,
  docs.BfModalHeaderDoc,
  docs.BfProgressBarDoc,
  docs.BfListHeaderColDoc,
  docs.BfListPlaceholderDoc,
  docs.BfPagePlaceholderDoc,
  docs.BfListPaginatorDoc,
  docs.BfNoDataDoc,
  docs.BfLoadingSpinnerDoc,
  docs.BfSectionHeaderDoc,
  docs.ShowDoc,
  docs.BfGrowlDoc,
  docs.BfLoadingBarDoc,
  docs.BfDndDemoDoc,
  docs.BfConfirmDoc,
  docs.BfPrototypesDoc,
  docs.BfListHandlerDoc,
  docs.BfPromiseDoc,
  docs.BfDeferDoc,
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
