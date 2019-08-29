import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page/index-page.component';
import { LibRegisterService, compList } from './lib-register.service';
import {BfBtnDemoComponent, BfBtnDoc} from "./bf-btn-demo/bf-btn-demo.component";

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: IndexPageComponent },
  { path: 'lazy-loading-test',
    loadChildren: () => import('projects/bf-ui-lib-sandbox/src/app/bf-lazy-loaded-module/bf-lazy-loaded.module')
      .then(mod => {
        return mod.BfLazyLoadedModule;
      }),
  },
 ];
 compList.forEach((item) => {
  routes.push({ path: item.name,  component: item.demoComp });
});
 

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
