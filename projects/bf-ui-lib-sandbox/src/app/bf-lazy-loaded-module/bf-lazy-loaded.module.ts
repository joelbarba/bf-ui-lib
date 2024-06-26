import { NgModule } from '@angular/core';
import { BfLazyLoadedTestComponent } from './bf-lazy-loaded-test.component';
import { RouterModule, Routes } from '@angular/router';
import { BfUiLibModule } from '../../../../bf-ui-lib/src/lib/bf-ui-lib.module';


console.log('BfLazyLoadedModule', new Date());
const routes: Routes = [
  { path: '', component: BfLazyLoadedTestComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    BfUiLibModule,
  ],
  declarations: [BfLazyLoadedTestComponent],
  exports: [],
})
export class BfLazyLoadedModule {}
