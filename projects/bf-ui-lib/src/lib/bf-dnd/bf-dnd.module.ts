import {CommonModule} from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {BfDropPlaceholderDirective} from './bf-drop-placeholder/bf-drop-placeholder.directive';
import {BfDropContainerDirective} from './bf-drop-container/bf-drop-container.directive';
import {BfDraggableDirective} from './bf-draggable/bf-draggable.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BfDraggableDirective,
    BfDropContainerDirective,
    BfDropPlaceholderDirective,
  ],
  exports: [
    BfDraggableDirective,
    BfDropContainerDirective,
    BfDropPlaceholderDirective,
  ],
})
export class BfDnDModule {
  static forRoot(): ModuleWithProviders<BfDnDModule> {
    return {
      ngModule: BfDnDModule,
    };
  }
}
