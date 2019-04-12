import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule, NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// Modules
import { BfGrowlModule } from './bf-growl.module';

// Services
import { BfConfirmService } from './bf-confirm/bf-confirm.service';

// Components
import { BfBtnComponent } from './bf-btn/bf-btn.component';
import { BfListHeaderColComponent } from './bf-list-header-col/bf-list-header-col.component';
import { BfLabelComponent } from './bf-label/bf-label.component';
import { BfListPlaceholderComponent } from './bf-list-placeholder/bf-list-placeholder.component';
import { BfCheckboxComponent } from './bf-checkbox/bf-checkbox.component';
import { BfInputComponent } from './bf-input/bf-input.component';
import { BfDropdownComponent } from './bf-dropdown/bf-dropdown.component';
import { BfSwitchComponent } from './bf-switch/bf-switch.component';
import { BfQuantityComponent } from './bf-quantity/bf-quantity.component';
import { BfConfirmComponent } from './bf-confirm/bf-confirm.component';

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
    BfConfirmComponent,
  ],
  entryComponents: [BfConfirmComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbPopoverModule, NgbModalModule, BfGrowlModule],
  exports: [
    BfConfirmComponent,  // <--- New component
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
        { provide: 'TranslateService', useClass: config.TranslateService || class {} },
        BfConfirmService,
        NgbActiveModal, NgbModule,
      ]
    };
  }
}
