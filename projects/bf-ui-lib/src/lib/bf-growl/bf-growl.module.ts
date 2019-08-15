import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BfGrowlPopUpComponent } from './bf-growl-pop-up.component';
import { BfGrowlService } from './bf-growl.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [BfGrowlPopUpComponent],
  exports: [BfGrowlPopUpComponent],
})
export class BfGrowlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BfGrowlModule,
      providers: [BfGrowlService]
    };
  }
}
