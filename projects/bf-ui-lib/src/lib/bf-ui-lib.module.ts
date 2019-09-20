import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ModuleWithProviders, Optional, SkipSelf} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import {NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule, NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// Modules
import { BfGrowlModule } from './bf-growl/bf-growl.module';
import { BfLoadingBarModule } from "./bf-loading-bar/bf-loading-bar.module";

// Services
import { BfConfirmService } from './bf-confirm/bf-confirm.service';

// Components
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';
import { BfLabelComponent } from './bf-label/bf-label.component';
import { BfListPlaceholderComponent } from './bf-list-placeholder/bf-list-placeholder.component';
import { BfCheckboxComponent } from './bf-checkbox/bf-checkbox.component';
import { BfInputComponent } from './bf-input/bf-input.component';
import { BfDropdownComponent } from './bf-dropdown/bf-dropdown.component';
import { BfSwitchComponent } from './bf-switch/bf-switch.component';
import { BfQuantityComponent } from './bf-quantity/bf-quantity.component';
import { BfConfirmComponent } from './bf-confirm/bf-confirm.component';
import { BfTextareaComponent } from './bf-textarea/bf-textarea.component';
import { BfRadioComponent } from './bf-radio/bf-radio.component';
import { BfDatePickerComponent } from './bf-date-picker/bf-date-picker.component';
import { BfListPaginatorComponent } from './bf-list-paginator/bf-list-paginator.component';
import { BfStatusBadgeComponent } from './bf-status-badge/bf-status-badge.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    BfBtnComponent,
    BfListHeaderColComponent,
    BfLabelComponent,
    BfListPlaceholderComponent,
    BfCheckboxComponent,
    BfInputComponent,
    BfDropdownComponent,
    BfSwitchComponent,
    BfQuantityComponent,
    BfConfirmComponent,
    BfTextareaComponent,
    BfRadioComponent,
    BfDatePickerComponent,
    BfListPaginatorComponent,
    BfStatusBadgeComponent,
  ],
  entryComponents: [BfConfirmComponent],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbModalModule,
    BfGrowlModule,
    BfLoadingBarModule,
  ],
  exports: [
    FormsModule,
    BfListPaginatorComponent,
    BfDatePickerComponent,
    BfRadioComponent,
    BfTextareaComponent,
    BfConfirmComponent,
    BfQuantityComponent,
    BfSwitchComponent,
    BfDropdownComponent,
    BfInputComponent,
    BfCheckboxComponent,
    BfListPlaceholderComponent,
    BfLabelComponent,
    BfBtnComponent,
    BfListHeaderColComponent,
    BfStatusBadgeComponent,  // <--- New component
    BfGrowlModule,
    BfLoadingBarModule,
  ]
})
export class BfUiLibModule {
  // constructor (@Optional() @SkipSelf() parentModule: BfUiLibModule) {
  //   if (parentModule) {
  //     throw new Error(
  //       'HEY YOU BAD DEVELOPER!!! BfUiLibModule is already loaded');
  //   }
  // }

  static forRoot(config): ModuleWithProviders {
    // console.log('BfUiLibModule.forRoot()', new Date());
    return {
      ngModule: BfUiLibModule,
      providers: [
        { provide: 'TranslateService', useClass: config.TranslateService || class {} },
        BfConfirmService,
        NgbActiveModal, NgbModule,
      ]
    };
  }
  // static forChild(config): ModuleWithProviders {
  //   console.log('BfUiLibModule.forRoot()', new Date());
  //   return {
  //     ngModule: BfUiLibModule,
  //     providers: [
  //       { provide: 'TranslateService', useClass: config.TranslateService || class {} },
  //       BfConfirmService,
  //       NgbActiveModal, NgbModule,
  //     ]
  //   };
  // }
}
