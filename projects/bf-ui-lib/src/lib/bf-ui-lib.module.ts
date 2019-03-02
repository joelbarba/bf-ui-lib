import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';
import { BfLabelComponent } from './bf-label/bf-label.component';
import { BfListPlaceholderComponent } from './bf-list-placeholder/bf-list-placeholder.component';
import { BfCheckboxComponent } from './bf-checkbox/bf-checkbox.component';
import { AbstractTranslateService } from './abstract-translate.service';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    BfBtnComponent,
    BfListHeaderColComponent,
    BfLabelComponent,
    BfListPlaceholderComponent,
    BfCheckboxComponent,
  ],
  imports: [BrowserModule, FormsModule, NgbPopoverModule],
  exports: [
    BfCheckboxComponent,
    BfListPlaceholderComponent,
    BfLabelComponent,
    BfBtnComponent,
    BfListHeaderColComponent,
    // AbstractTranslateService,
  ]
})
export class BfUiLibModule {
  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: BfUiLibModule,
      providers: [
        { provide: 'TranslateService', useClass: config.TranslateService || class {} }
      ]
    };
  }
}
