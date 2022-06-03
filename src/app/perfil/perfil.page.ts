import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';
import { Cita } from '../model/cita';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  
  public mascota:Mascota;

  public id?: string;
  public nombre: string;
  public tipo: string;
  public contacto: string;
  public telefono;
  public img;

  public cita:Cita;
  public citas: any[]=[];

  constructor(private service:MascotasService, private route: ActivatedRoute, public alertCtrl: AlertController, private navCtrl: NavController) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.nombre = this.route.snapshot.paramMap.get('nombre');
    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.contacto = this.route.snapshot.paramMap.get('contacto');
    this.telefono = this.route.snapshot.paramMap.get('telefono');
    this.img = this.route.snapshot.paramMap.get('img');

    const filter = ref =>
      ref.where("mascotas", "==", "mascotas/"+this.id);

    this.service.getDateById(filter).subscribe((snap) => {
      snap.forEach((e) => {
        this.citas.push({
          id: e.payload.doc.id,...e.payload.doc.data() as Cita
        });
      });
    });

    this.mascota = {
      id: this.route.snapshot.paramMap.get('id'),
      nombre: this.route.snapshot.paramMap.get('nombre'),
      tipo: this.route.snapshot.paramMap.get('tipo'),
      contacto: this.route.snapshot.paramMap.get('contacto'),
      telefono: this.route.snapshot.paramMap.get('telefono'),
      img: this.route.snapshot.paramMap.get('img')
    }
    // this.service.getPetById(this.id).subscribe((e) => {
    //     this.mascota = e.payload.data() as Mascota
    // });
    // console.log(this.mascota)
  }

  ngOnInit() {
  }

  postId(mascota){
    this.navCtrl.navigateForward(['/edit-perfi/'+mascota.id, mascota]);
  }
}
