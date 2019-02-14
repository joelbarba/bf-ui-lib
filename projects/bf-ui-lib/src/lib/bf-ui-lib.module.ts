import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';
import { BfLabelComponent } from './bf-label/bf-label.component';

@NgModule({
  declarations: [BfBtnComponent, BfListHeaderColComponent, BfLabelComponent],
  imports: [BrowserModule],
  exports: [
    BfLabelComponent,
    BfBtnComponent, 
    BfListHeaderColComponent,
  ]
})
export class BfUiLibModule { }
