import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexPageComponent } from './index-page/index-page.component';
import {NgbPopoverModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { BfUiLibModule } from '../../../bf-ui-lib/src/lib/bf-ui-lib.module';
import { BfBtnDemoComponent } from './bf-btn-demo/bf-btn-demo.component';
import { BfListHeaderColDemoComponent } from './bf-list-header-col-demo/bf-list-header-col-demo.component';
import { MenuComponent } from './menu/menu.component';
import { BfLabelDemoComponent } from './bf-label-demo/bf-label-demo.component';
import { BfListPlaceholderDemoComponent } from './bf-list-placeholder-demo/bf-list-placeholder-demo.component';
import { BfCheckboxDemoComponent } from './bf-checkbox-demo/bf-checkbox-demo.component';
import {BfTranslateLoader, BfTranslateService } from './translate.service';
import { BfInputDemoComponent } from './bf-input-demo/bf-input-demo.component';
import { BfDropdownDemoComponent } from './bf-dropdown-demo/bf-dropdown-demo.component';
import { BfSwitchDemoComponent } from './bf-switch-demo/bf-switch-demo.component';
import { BfQuantityInputDemoComponent } from './bf-quantity-input-demo/bf-quantity-input-demo.component';
import { BfGrowlDemoComponent } from './bf-growl-demo/bf-growl-demo.component';
import { BfConfirmDemoComponent } from './bf-confirm-demo/bf-confirm-demo.component';
import { BfTextareaDemoComponent } from './bf-textarea-demo/bf-textarea-demo.component';
import { BfRadioDemoComponent } from './bf-radio-demo/bf-radio-demo.component';
import { BfDatePickerDemoComponent } from './bf-date-picker-demo/bf-date-picker-demo.component';
import { BfListPaginatorDemoComponent } from './bf-list-paginator-demo/bf-list-paginator-demo.component';
import { BfPrototypesDemoComponent } from './bf-prototypes-demo/bf-prototypes-demo.component';
import { BfLoadingBarDemoComponent } from './bf-loading-bar-demo/bf-loading-bar-demo.component';
import { BfPromiseDemoComponent } from './bf-promise-demo/bf-promise-demo.component';
import { BfDeferDemoComponent } from './bf-defer-demo/bf-defer-demo.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { BfTimePickerDemoComponent } from './bf-time-picker-demo/bf-time-picker-demo.component';
import { BfAutocompleteDemoComponent } from './bf-autocomplete-demo/bf-autocomplete-demo.component';
import { BfMultiSelectorDemoComponent } from './bf-multi-selector-demo/bf-multi-selector-demo.component';
import { BfProgressBarDemoComponent } from './bf-progress-bar-demo/bf-progress-bar-demo.component';
import { BfStatusBadgeDemoComponent } from './bf-status-badge-demo/bf-status-badge-demo.component';
import { BfColorPickerDemoComponent } from './bf-color-picker-demo/bf-color-picker-demo.component';
import { BfSliderDemoComponent } from './bf-slider-demo/bf-slider-demo.component';
import { BfPagePlaceholderDemoComponent } from './bf-page-placeholder-demo/bf-page-placeholder-demo.component';
import {BfListHandlerDemoComponent} from './bf-list-handler-demo/bf-list-handler-demo.component';
import { BfLoadingSpinnerDemoComponent } from './bf-loading-spinner-demo/bf-loading-spinner-demo.component';
import { ShowDemoComponent } from './show-demo/show-demo.component';
import { BfNoDataDemoComponent } from './bf-no-data-demo/bf-no-data-demo.component';
import { BfDualCheckboxDemoComponent } from './bf-dual-checkbox-demo/bf-dual-checkbox-demo.component';
import { BfSectionHeaderDemoComponent } from './bf-section-header-demo/bf-section-header-demo.component';
import { BfRangeSliderDemoComponent } from './bf-range-slider-demo/bf-range-slider-demo.component';
import {BfListHandlerTestComponent} from './bf-list-handler-demo/tests/bf-list-handler-test.component';
import { BfDndDemoComponent } from './bf-dnd-demo/bf-dnd-demo.component';
import {BfNoDataComponent} from '../../../bf-ui-lib/src/lib/bf-no-data/bf-no-data.component';
import {BfDndDemo1Component} from './bf-dnd-demo/example1/bf-dnd-demo-1.component';
import {BfDndDemo2Component} from './bf-dnd-demo/example2/bf-dnd-demo-2.component';
import {BfDndDemo3Component} from './bf-dnd-demo/example3/bf-dnd-demo-3.component';
import {BfDndDemo4Component} from './bf-dnd-demo/example4/bf-dnd-demo-4.component';
import {BfDndDemo5Component} from './bf-dnd-demo/example5/bf-dnd-demo-5.component';
import {BfDndDemo6Component} from './bf-dnd-demo/example6/bf-dnd-demo-6.component';


@NgModule({
  declarations: [
    AppComponent,
    BfBtnDemoComponent,
    IndexPageComponent,
    BfListHeaderColDemoComponent,
    MenuComponent,
    // TranslateDirective,
    BfLabelDemoComponent,
    BfListPlaceholderDemoComponent,
    BfCheckboxDemoComponent,
    BfDualCheckboxDemoComponent,
    BfInputDemoComponent,
    BfDropdownDemoComponent,
    BfSwitchDemoComponent,
    BfQuantityInputDemoComponent,
    BfGrowlDemoComponent,
    BfConfirmDemoComponent,
    BfTextareaDemoComponent,
    BfRadioDemoComponent,
    BfDatePickerDemoComponent,
    BfListPaginatorDemoComponent,
    BfPrototypesDemoComponent,
    BfLoadingBarDemoComponent,
    BfPromiseDemoComponent,
    BfDeferDemoComponent,
    BfListHandlerDemoComponent,
    BfTimePickerDemoComponent,
    BfAutocompleteDemoComponent,
    BfMultiSelectorDemoComponent,
    BfProgressBarDemoComponent,
    BfStatusBadgeDemoComponent,
    BfColorPickerDemoComponent,
    BfSliderDemoComponent,
    BfPagePlaceholderDemoComponent,
    BfLoadingSpinnerDemoComponent,
    ShowDemoComponent,
    BfNoDataDemoComponent,
    BfSectionHeaderDemoComponent,
    BfListHandlerTestComponent,
    BfRangeSliderDemoComponent,
    BfDndDemoComponent,
    BfDndDemo1Component,
    BfDndDemo2Component,
    BfDndDemo3Component,
    BfDndDemo4Component,
    BfDndDemo5Component,
    BfDndDemo6Component,
  ],
  entryComponents: [BfNoDataComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    BfUiLibModule.forRoot({ trans: {
        useExisting: BfTranslateService
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: BfTranslateLoader
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
