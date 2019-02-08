import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BfUiLibComponent } from './bf-ui-lib.component';
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';

@NgModule({
  declarations: [BfUiLibComponent, BfBtnComponent, BfListHeaderColComponent],
  imports: [BrowserModule],
  exports: [BfUiLibComponent, BfBtnComponent, BfListHeaderColComponent]
})
export class BfUiLibModule { }
