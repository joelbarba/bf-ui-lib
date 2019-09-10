import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LibRegisterService } from './lib-register.service';
import { IndexPageComponent } from './index-page/index-page.component';
import {NgbPopoverModule, NgbModalModule, NgbDatepicker, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
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
import { BfQuantityDemoComponent } from './bf-quantity-demo/bf-quantity-demo.component';
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
    BfInputDemoComponent,
    BfDropdownDemoComponent,
    BfSwitchDemoComponent,
    BfQuantityDemoComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    // NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    // BfUiLibModule.forRoot({ TranslateService: BfTranslateService }),
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
