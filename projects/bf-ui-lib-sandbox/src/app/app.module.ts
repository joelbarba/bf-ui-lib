import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LibRegisterService } from './lib-register.service';
import { IndexPageComponent } from './index-page/index-page.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { BfUiLibModule } from '../../../bf-ui-lib/src/lib/bf-ui-lib.module';

import { BfBtnDemoComponent } from './bf-btn-demo/bf-btn-demo.component';
import { BfListHeaderColDemoComponent } from './bf-list-header-col-demo/bf-list-header-col-demo.component';
import { MenuComponent } from './menu/menu.component';
import { BfLabelDemoComponent } from './bf-label-demo/bf-label-demo.component';
import { BfListPlaceholderDemoComponent } from './bf-list-placeholder-demo/bf-list-placeholder-demo.component';
import { BfCheckboxDemoComponent } from './bf-checkbox-demo/bf-checkbox-demo.component';

import { TranslateService } from './translate.service';
import { TranslateDirective } from './translate.directive';
import { BfInputDemoComponent } from './bf-input-demo/bf-input-demo.component';
import { BfDropdownDemoComponent } from './bf-dropdown-demo/bf-dropdown-demo.component';
import { BfSwitchDemoComponent } from './bf-switch-demo/bf-switch-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    BfBtnDemoComponent,
    IndexPageComponent,
    BfListHeaderColDemoComponent,
    MenuComponent,
    TranslateDirective,
    BfLabelDemoComponent,
    BfListPlaceholderDemoComponent,
    BfCheckboxDemoComponent,
    BfInputDemoComponent,
    BfDropdownDemoComponent,
    BfSwitchDemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPopoverModule,
    FormsModule,
    ReactiveFormsModule,
    BfUiLibModule.forRoot({ TranslateService }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
