import {NgModule, ModuleWithProviders, Optional, SkipSelf} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule, NgbActiveModal, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BfDotBadgeComponent } from './bf-dot-badge/bf-dot-badge.component';

// Modules
import { BfGrowlModule } from './bf-growl/bf-growl.module';
import { BfLoadingBarModule } from './bf-loading-bar/bf-loading-bar.module';
import { BfDnDModule } from './bf-dnd/bf-dnd.module';

// Services
import { BfConfirmService } from './bf-confirm/bf-confirm.service';

// Components
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';
import { BfLabelComponent } from './bf-label/bf-label.component';
import { BfListPlaceholderComponent } from './bf-list-placeholder/bf-list-placeholder.component';
import { BfCheckboxComponent } from './bf-checkbox/bf-checkbox.component';
import { BfDualCheckboxComponent } from './bf-dual-checkbox/bf-dual-checkbox.component';
import { BfInputComponent } from './bf-input/bf-input.component';
import { BfDropdownComponent } from './bf-dropdown/bf-dropdown.component';
import { BfSwitchComponent } from './bf-switch/bf-switch.component';
import { BfQuantityInputComponent } from './bf-quantity-input/bf-quantity-input.component';
import { BfConfirmComponent } from './bf-confirm/bf-confirm.component';
import { BfTextareaComponent } from './bf-textarea/bf-textarea.component';
import { BfRadioComponent } from './bf-radio/bf-radio.component';
import { BfDatePickerComponent } from './bf-date-picker/bf-date-picker.component';
import { BfListPaginatorComponent } from './bf-list-paginator/bf-list-paginator.component';
import { CommonModule } from '@angular/common';
import {BfTranslatePipe, BfUILibTransService} from './abstract-translate.service';
import { BfDateTimePickerComponent } from './bf-date-time-picker/bf-date-time-picker.component';
import { BfAutocompleteComponent } from './bf-autocomplete/bf-autocomplete.component';
import { BfMultiSelectorComponent } from './bf-multi-selector/bf-multi-selector.component';
import { BfProgressBarComponent } from './bf-progress-bar/bf-progress-bar.component';
import { BfStatusBadgeComponent } from './bf-status-badge/bf-status-badge.component';
import { BfColorPickerComponent } from './bf-color-picker/bf-color-picker.component';
import { BfSliderComponent } from './bf-slider/bf-slider.component';
import { BfPagePlaceholderComponent } from './bf-page-placeholder/bf-page-placeholder.component';
import {BfLoadingSpinnerComponent, BfLoadingSpinnerDirective} from './bf-loading-spinner/bf-loading-spinner.component';
import { ShowDirective } from './show/show.component';
import { BfNoDataComponent } from './bf-no-data/bf-no-data.component';
import { BfSectionHeaderComponent } from './bf-section-header/bf-section-header.component';
import { BfRangeSliderComponent } from './bf-range-slider/bf-range-slider.component';
import { BfModalHeaderComponent } from './bf-modal-header/bf-modal-header.component';
import { BfListCheckboxComponent } from './bf-list-checkbox/bf-list-checkbox.component';
import { BfLazyDropdownComponent } from './bf-lazy-dropdown/bf-lazy-dropdown.component';
import { BfCollapseComponent } from './bf-collapse/bf-collapse.component';
import { BfExpandableListComponent } from './bf-expandable-list/bf-expandable-list.component';
import { BfListControllerDirective } from './bf-list-controller/bf-list-controller.directive';
import { BfDropdownA11yPipe } from './bf-dropdown/bf-dropdown-a11y.pipe';
import { BfIntersectionObserverDirective } from './bf-intersection-observer/bf-intersection-observer.directive';
import { BfTimePickerComponent } from './bf-time-picker/bf-time-picker.component';
import { BfKeypadComponent } from './bf-keypad/bf-keypad.component';
import { BfKeypadButtonComponent } from './bf-keypad/bf-keypad-button/bf-keypad-button.component';
import { BfLongPressDirective } from './bf-keypad/bf-keypad-button/bf-long-press.directive';
import { BfShortPressDirective } from './bf-keypad/bf-keypad-button/bf-short-press.directive';
import { BfRadioGroupComponent } from "./bf-radio-group/bf-radio-group.component";
import { BfTabsComponent } from './bf-tabs/bf-tabs.component';

@NgModule({
    declarations: [
        BfTranslatePipe,
        BfBtnComponent,
        BfListHeaderColComponent,
        BfLabelComponent,
        BfListPlaceholderComponent,
        BfCheckboxComponent,
        BfDualCheckboxComponent,
        BfInputComponent,
        BfDropdownComponent,
        BfSwitchComponent,
        BfQuantityInputComponent,
        BfConfirmComponent,
        BfTextareaComponent,
        BfRadioComponent,
        BfRadioGroupComponent,
        BfDatePickerComponent,
        BfListPaginatorComponent,
        BfDateTimePickerComponent,
        BfAutocompleteComponent,
        BfMultiSelectorComponent,
        BfProgressBarComponent,
        BfStatusBadgeComponent,
        BfDotBadgeComponent,
        BfColorPickerComponent,
        BfSliderComponent,
        BfPagePlaceholderComponent,
        BfLoadingSpinnerComponent,
        BfLoadingSpinnerDirective,
        ShowDirective,
        BfNoDataComponent,
        BfSectionHeaderComponent,
        BfRangeSliderComponent,
        BfModalHeaderComponent,
        BfListCheckboxComponent,
        BfLazyDropdownComponent,
        BfCollapseComponent,
        BfExpandableListComponent,
        BfListControllerDirective,
        BfDropdownA11yPipe,
        BfIntersectionObserverDirective,
        BfTimePickerComponent,
        BfKeypadComponent,
        BfKeypadButtonComponent,
        BfLongPressDirective,
        BfShortPressDirective,
        BfTabsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPopoverModule,
        NgbTooltipModule,
        NgbProgressbarModule,
        NgbModalModule,
        BfGrowlModule,
        BfDnDModule,
        BfLoadingBarModule,
        NgbDatepickerModule,
        NgbModule,
    ],
    exports: [
        BfTabsComponent,
        BfKeypadComponent,
        BfExpandableListComponent,
        BfCollapseComponent,
        BfListCheckboxComponent,
        BfLazyDropdownComponent,
        BfColorPickerComponent,
        BfModalHeaderComponent,
        BfSectionHeaderComponent,
        BfNoDataComponent,
        ShowDirective,
        BfLoadingSpinnerDirective,
        BfLoadingSpinnerComponent,
        BfPagePlaceholderComponent,
        BfSliderComponent,
        BfStatusBadgeComponent,
        BfDotBadgeComponent,
        BfProgressBarComponent,
        BfMultiSelectorComponent,
        BfAutocompleteComponent,
        BfTimePickerComponent,
        FormsModule,
        BfListPaginatorComponent,
        BfDatePickerComponent,
        BfRadioComponent,
        BfRadioGroupComponent,
        BfTextareaComponent,
        BfConfirmComponent,
        BfQuantityInputComponent,
        BfSwitchComponent,
        BfDropdownComponent,
        BfInputComponent,
        BfCheckboxComponent,
        BfDualCheckboxComponent,
        BfListPlaceholderComponent,
        BfLabelComponent,
        BfBtnComponent,
        BfListHeaderColComponent,
        BfRangeSliderComponent,
        BfGrowlModule,
        BfLoadingBarModule,
        BfDnDModule,
        BfListControllerDirective,
        BfIntersectionObserverDirective,
        BfDateTimePickerComponent,
        BfKeypadButtonComponent
    ]
})
export class BfUiLibModule {
  constructor(@Optional() @SkipSelf() parentModule: BfUiLibModule) {
    if (parentModule) {
      // It's not a bad developer, could be a lazy loaded module
      // throw new Error('HEY YOU BAD DEVELOPER!!! BfUiLibModule is already loaded');
    }
  }

  static forRoot(config): ModuleWithProviders<BfUiLibModule> {
    return {
      ngModule: BfUiLibModule,
      providers: [
        // { provide: 'BfUILibTransService', ...config.trans },
        { provide: BfUILibTransService, useExisting: config.trans.useExisting },
        // { provide: MY_SERVICE_TOKEN, useExisting: config.trans.useExisting },
        BfConfirmService,
        NgbActiveModal,
        NgbModule,
      ]
    };
  }
}
