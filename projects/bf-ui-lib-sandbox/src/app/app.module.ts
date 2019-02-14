import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BfUiLibModule } from '../../../bf-ui-lib/src/lib/bf-ui-lib.module';
import { AppRoutingModule } from './app-routing.module';
import { LibRegisterService } from './lib-register.service';
import { IndexPageComponent } from './index-page/index-page.component';

import { BfBtnDemoComponent } from './bf-btn-demo/bf-btn-demo.component';
import { BfListHeaderColDemoComponent } from './bf-list-header-col-demo/bf-list-header-col-demo.component';
import { MenuComponent } from './menu/menu.component';
import { BfLabelDemoComponent } from './bf-label-demo/bf-label-demo.component';

@NgModule({
  declarations: [AppComponent, BfBtnDemoComponent, IndexPageComponent, BfListHeaderColDemoComponent, MenuComponent, BfLabelDemoComponent],
  imports: [
    BrowserModule,
    BfUiLibModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
