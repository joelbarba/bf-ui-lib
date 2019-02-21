import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';
import { BfLabelComponent } from './bf-label/bf-label.component';
import { BfListPlaceholderComponent } from './bf-list-placeholder/bf-list-placeholder.component';
import { BfCheckboxComponent } from './bf-checkbox/bf-checkbox.component';

@NgModule({
  declarations: [BfBtnComponent, BfListHeaderColComponent, BfLabelComponent, BfListPlaceholderComponent, BfCheckboxComponent],
  imports: [BrowserModule, FormsModule],
  exports: [
    BfCheckboxComponent,
    BfListPlaceholderComponent,
    BfLabelComponent,
    BfBtnComponent, 
    BfListHeaderColComponent,
  ]
})
export class BfUiLibModule { }
