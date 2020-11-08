import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'food',
        loadChildren: () => import('../food/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/menu/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
