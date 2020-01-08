import {CommonModule} from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BfGrowlPopUpComponent } from './bf-growl-pop-up.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BfGrowlPopUpComponent],
  exports: [BfGrowlPopUpComponent],
})
export class BfGrowlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BfGrowlModule,
    };
  }
}
