import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'startpage',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'startpage',
    loadChildren: () => import('./startpage/startpage.module').then( m => m.StartpagePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'nuevo',
    loadChildren: () => import('./nuevo/nuevo.module').then( m => m.NuevoPageModule)
  },
  {
    path: 'cita/:id',
    loadChildren: () => import('./cita/cita.module').then( m => m.CitaPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'edit-perfi/:id',
    loadChildren: () => import('./edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
