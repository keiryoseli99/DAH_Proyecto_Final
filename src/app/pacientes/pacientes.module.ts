import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientesPageRoutingModule } from './pacientes-routing.module';

import { PacientesPage } from './pacientes.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [PacientesPage]
})
export class PacientesPageModule {}
