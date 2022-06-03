import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
          loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'agregar',
        children: [
          {
            path: '',
          loadChildren: () => import('../agregar/agregar.module').then( m => m.AgregarPageModule)
          }
        ]
      },
      {
        path: 'pacientes',
        children: [
          {
            path: '',
            loadChildren: () => import('../pacientes/pacientes.module').then( m => m.PacientesPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
