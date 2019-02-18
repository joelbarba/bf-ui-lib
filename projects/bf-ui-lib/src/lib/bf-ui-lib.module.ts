import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';
import { BfLabelComponent } from './bf-label/bf-label.component';
import { BfListPlaceholderComponent } from './bf-list-placeholder/bf-list-placeholder.component';

@NgModule({
  declarations: [BfBtnComponent, BfListHeaderColComponent, BfLabelComponent, BfListPlaceholderComponent],
  imports: [BrowserModule],
  exports: [
    BfListPlaceholderComponent,  // <--- New component
    BfLabelComponent,
    BfBtnComponent, 
    BfListHeaderColComponent,
  ]
})
export class BfUiLibModule { }
