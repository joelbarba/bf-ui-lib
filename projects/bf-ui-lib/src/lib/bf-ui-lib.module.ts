import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

// Modules
import { BfGrowlModule } from './bf-growl.module';

// Components
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';
import { BfLabelComponent } from './bf-label/bf-label.component';
import { BfListPlaceholderComponent } from './bf-list-placeholder/bf-list-placeholder.component';
import { BfCheckboxComponent } from './bf-checkbox/bf-checkbox.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { BfInputComponent } from './bf-input/bf-input.component';
import { BfDropdownComponent } from './bf-dropdown/bf-dropdown.component';
import { BfSwitchComponent } from './bf-switch/bf-switch.component';
import { BfQuantityComponent } from './bf-quantity/bf-quantity.component';

@NgModule({
  declarations: [
    BfBtnComponent,
    BfListHeaderColComponent,
    BfLabelComponent,
    BfListPlaceholderComponent,
    BfCheckboxComponent,
    BfInputComponent,
    BfDropdownComponent,
    BfSwitchComponent,
    BfQuantityComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbPopoverModule, BfGrowlModule],
  exports: [
    BfQuantityComponent,  // <--- New component
    BfSwitchComponent,  // <--- New component
    BfDropdownComponent,  // <--- New component
    BfInputComponent,  // <--- New component
    BfCheckboxComponent,
    BfListPlaceholderComponent,
    BfLabelComponent,
    BfBtnComponent,
    BfListHeaderColComponent,
    BfGrowlModule,
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
