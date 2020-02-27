import {NgModule, ModuleWithProviders, Optional, SkipSelf, InjectionToken} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule, NgbActiveModal, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Modules
import { BfGrowlModule } from './bf-growl/bf-growl.module';
import { BfLoadingBarModule } from './bf-loading-bar/bf-loading-bar.module';

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
import {CommonModule} from '@angular/common';
import {BfTranslatePipe, BfUILibTransService} from './abstract-translate.service';
import { BfTimePickerComponent } from './bf-time-picker/bf-time-picker.component';
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


@NgModule({
  declarations: [
    BfTranslatePipe,  // Internal

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
    BfDatePickerComponent,
    BfListPaginatorComponent,
    BfTimePickerComponent,
    BfAutocompleteComponent,
    BfMultiSelectorComponent,
    BfProgressBarComponent,
    BfStatusBadgeComponent,
    BfColorPickerComponent,
    BfSliderComponent,
    BfPagePlaceholderComponent,
    BfLoadingSpinnerComponent,
    BfLoadingSpinnerDirective,
    ShowDirective,
    BfNoDataComponent,
  ],
  entryComponents: [BfConfirmComponent],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbModalModule,
    BfGrowlModule,
    BfLoadingBarModule,
    NgbDatepickerModule,
    NgbModule,
  ],
  exports: [
    BfNoDataComponent,  // <--- New component
    ShowDirective,
    BfLoadingSpinnerDirective,  // <--- New component
    BfLoadingSpinnerComponent,  // <--- New component
    BfPagePlaceholderComponent,  // <--- New component
    BfSliderComponent,  // <--- New component
    BfColorPickerComponent,  // <--- New component
    BfStatusBadgeComponent,  // <--- New component
    BfProgressBarComponent,  // <--- New component
    BfMultiSelectorComponent,  // <--- New component
    BfAutocompleteComponent,  // <--- New component
    BfTimePickerComponent,  // <--- New component
    FormsModule,
    BfListPaginatorComponent,
    BfDatePickerComponent,
    BfRadioComponent,
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
    BfGrowlModule,
    BfLoadingBarModule,
  ]
})
export class BfUiLibModule {
  constructor(@Optional() @SkipSelf() parentModule: BfUiLibModule) {
    if (parentModule) {
      // It's not a bad developer, could be a lazy loaded module
      // throw new Error('HEY YOU BAD DEVELOPER!!! BfUiLibModule is already loaded');
    }
  }

  static forRoot(config): ModuleWithProviders {
    // console.log('BfUiLibModule.forRoot()', new Date(), config.trans);


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
