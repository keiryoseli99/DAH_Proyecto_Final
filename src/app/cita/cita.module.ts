import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitaPageRoutingModule } from './cita-routing.module';

import { CitaPage } from './cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CitaPageRoutingModule
  ],
  declarations: [CitaPage]
})
export class CitaPageModule {}
