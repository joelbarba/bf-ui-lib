import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BfLoadingBarComponent } from './bf-loading-bar.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [BfLoadingBarComponent],
  exports: [BfLoadingBarComponent],
})
export class BfLoadingBarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BfLoadingBarModule,
    };
  }
}
