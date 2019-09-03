import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BfLoadingBarComponent } from './bf-loading-bar.component';

@NgModule({
  imports: [CommonModule],
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
