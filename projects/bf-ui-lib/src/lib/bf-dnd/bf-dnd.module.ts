import {CommonModule} from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {BfDropPlaceholderComponent} from './bf-drop-placeholder/bf-drop-placeholder.component';
import {BfDropContainerDirective} from './bf-drop-container/bf-drop-container.directive';
import {BfDraggableDirective} from './bf-draggable/bf-draggable.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BfDraggableDirective,
    BfDropContainerDirective,
    BfDropPlaceholderComponent,
  ],
  exports: [
    BfDraggableDirective,
    BfDropContainerDirective,
    BfDropPlaceholderComponent,
  ],
})
export class BfDnDModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BfDnDModule,
    };
  }
}
