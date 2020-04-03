import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page/index-page.component';
import * as docs from './doc-demos-list';
import {BfListHandlerTestComponent} from './bf-list-handler-demo/tests/bf-list-handler-test.component';
import {BfDndDemo1Component} from './bf-dnd-demo/example1/bf-dnd-demo-1.component';
import {BfDndDemo2Component} from './bf-dnd-demo/example2/bf-dnd-demo-2.component';
import {BfDndDemo3Component} from './bf-dnd-demo/example3/bf-dnd-demo-3.component';
import {BfDndDemo4Component} from './bf-dnd-demo/example4/bf-dnd-demo-4.component';
import {BfDndDemo5Component} from './bf-dnd-demo/example5/bf-dnd-demo-5.component';
import {BfDndDemo6Component} from './bf-dnd-demo/example6/bf-dnd-demo-6.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: IndexPageComponent },
  { path: docs.BfBtnDoc.name,               component: docs.BfBtnDoc.demoComp              },
  { path: docs.BfLabelDoc.name,             component: docs.BfLabelDoc.demoComp            },
  { path: docs.BfInputDoc.name,             component: docs.BfInputDoc.demoComp            },
  { path: docs.BfTextareaDoc.name,          component: docs.BfTextareaDoc.demoComp         },
  { path: docs.BfDropdownDoc.name,          component: docs.BfDropdownDoc.demoComp         },
  { path: docs.BfAutocompleteDoc.name,      component: docs.BfAutocompleteDoc.demoComp     },
  { path: docs.BfMultiSelectorDoc.name,     component: docs.BfMultiSelectorDoc.demoComp    },
  { path: docs.BfSwitchDoc.name,            component: docs.BfSwitchDoc.demoComp           },
  { path: docs.BfCheckboxDoc.name,          component: docs.BfCheckboxDoc.demoComp         },
  { path: docs.BfDualCheckboxDoc.name,      component: docs.BfDualCheckboxDoc.demoComp     },
  { path: docs.BfRadioDoc.name,             component: docs.BfRadioDoc.demoComp            },
  { path: docs.BfQuantityInputDoc.name,     component: docs.BfQuantityInputDoc.demoComp    },
  { path: docs.BfDatePickerDoc.name,        component: docs.BfDatePickerDoc.demoComp       },
  { path: docs.BfTimePickerDoc.name,        component: docs.BfTimePickerDoc.demoComp       },
  { path: docs.BfSliderDoc.name,            component: docs.BfSliderDoc.demoComp           },
  { path: docs.BfRangeSliderDoc.name,       component: docs.BfRangeSliderDoc.demoComp      },
  { path: docs.BfColorPickerDoc.name,       component: docs.BfColorPickerDoc.demoComp      },
  { path: docs.BfStatusBadgeDoc.name,       component: docs.BfStatusBadgeDoc.demoComp      },
  { path: docs.BfProgressBarDoc.name,       component: docs.BfProgressBarDoc.demoComp      },
  { path: docs.BfListHeaderColDoc.name,     component: docs.BfListHeaderColDoc.demoComp    },
  { path: docs.BfListPlaceholderDoc.name,   component: docs.BfListPlaceholderDoc.demoComp  },
  { path: docs.BfPagePlaceholderDoc.name,   component: docs.BfPagePlaceholderDoc.demoComp  },
  { path: docs.BfListPaginatorDoc.name,     component: docs.BfListPaginatorDoc.demoComp    },
  { path: docs.BfNoDataDoc.name,            component: docs.BfNoDataDoc.demoComp           },
  { path: docs.BfLoadingSpinnerDoc.name,    component: docs.BfLoadingSpinnerDoc.demoComp   },
  { path: docs.BfSectionHeaderDoc.name,     component: docs.BfSectionHeaderDoc.demoComp    },
  { path: docs.ShowDoc.name,                component: docs.ShowDoc.demoComp               },
  { path: docs.BfGrowlDoc.name,             component: docs.BfGrowlDoc.demoComp            },
  { path: docs.BfLoadingBarDoc.name,        component: docs.BfLoadingBarDoc.demoComp       },
  { path: docs.BfConfirmDoc.name,           component: docs.BfConfirmDoc.demoComp          },
  { path: docs.BfPrototypesDoc.name,        component: docs.BfPrototypesDoc.demoComp       },
  { path: docs.BfPromiseDoc.name,           component: docs.BfPromiseDoc.demoComp          },
  { path: docs.BfDeferDoc.name,             component: docs.BfDeferDoc.demoComp            },

  { path: docs.BfDndDemoDoc.name,           component: docs.BfDndDemoDoc.demoComp          },
  { path: 'BfDnD/example1',                 component: BfDndDemo1Component                 },
  { path: 'BfDnD/example2',                 component: BfDndDemo2Component                 },
  { path: 'BfDnD/example3',                 component: BfDndDemo3Component                 },
  { path: 'BfDnD/example4',                 component: BfDndDemo4Component                 },
  { path: 'BfDnD/example5',                 component: BfDndDemo5Component                 },
  { path: 'BfDnD/example6',                 component: BfDndDemo6Component                 },

  { path: docs.BfListHandlerDoc.name,       component: docs.BfListHandlerDoc.demoComp      },
  { path: 'list-test',                      component: BfListHandlerTestComponent          },

  { path: 'lazy-loading-test',
    loadChildren: () => import('projects/bf-ui-lib-sandbox/src/app/bf-lazy-loaded-module/bf-lazy-loaded.module')
      .then(mod => {
        return mod.BfLazyLoadedModule;
      }),
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
