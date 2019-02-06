import { NgModule } from '@angular/core';
import { BfUiLibComponent } from './bf-ui-lib.component';
import { BfBtnComponent } from './bf-btn/bf-btn.component';

@NgModule({
  declarations: [BfUiLibComponent, BfBtnComponent],
  imports: [
  ],
  exports: [BfUiLibComponent, BfBtnComponent]
})
export class BfUiLibModule { }
