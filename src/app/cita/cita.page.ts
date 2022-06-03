import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';
import { Cita } from './../model/cita';
import { Time } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.page.html',
  styleUrls: ['./cita.page.scss'],
})
export class CitaPage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;

  date = format(new Date(Date.now()), 'h:mm a, dd-MM-yyyy', {locale: es});
  dateValue = new Date(Date.now()).toISOString(); //checar la hora
  public cita:Cita;
  public citas: Cita[];

  public id?: string;

  public myForm:FormGroup;
  public validationMessages: object;

  fecha = format(new Date(Date.now()), 'dd-MM-yyyy', {locale: es});
  hora = format(new Date(Date.now()), 'h:mm a', {locale: es});
  espacio = "  ";

  constructor(
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    private navCtrl: NavController,
    private mascotasService:MascotasService,
    private fb:FormBuilder,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.fecha)
    // console.log(this.hora)
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      // fecha:["",[Validators.required]],
      servicio:["",[Validators.required]],
    });

    this.validationMessages = {
      // 'fecha': [
      //   {type: 'required', message: "Seleccione hora y fecha de su cita"}
      // ],
      'servicio': [
        {type: 'required', message: "Seleccione el servicio para la mascota"}
      ]
    }
  }

  create() {
    this.cita = {
      // fecha: this.date,
      mascotas: 'mascotas/' + this.id,
      servicio: this.myForm.controls.servicio.value,

      fecha: this.fecha,
      hora: this.hora
    }
    this.mascotasService.createCita(this.cita);
  }

  reset() {
    this.datetime.reset(new Date(Date.now()).toISOString());
    //this.datetime.cancel(true);
  }

  cancel() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }

  // formatDate(value: string) {
  //   // return format(parseISO(value), 'PPPP', {locale: es});
  //   return format(parseISO(value), 'h:mm a, dd-MM-yyyy', {locale: es});
  // }

  formatDate(value: string): void{
    // return format(parseISO(value), 'PPPP', {locale: es});
    this.fecha = format(parseISO(value), 'dd-MM-yyyy', {locale: es});
    this.hora = format(parseISO(value), 'h:mm a', {locale: es});
  }
}
