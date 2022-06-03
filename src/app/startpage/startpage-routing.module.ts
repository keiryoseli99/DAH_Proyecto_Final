import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartpagePage } from './startpage.page';

const routes: Routes = [
  {
    path: '',
    component: StartpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartpagePageRoutingModule {}
