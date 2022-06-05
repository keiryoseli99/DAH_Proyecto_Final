import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';
import { Cita } from '../model/cita';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  public servicio: String;
  public fecha: string;
  public hora: string;

  public cita:Cita;
  public citas: any[]=[];

  constructor(
    private service:MascotasService, 
    private route: ActivatedRoute, 
    public alertCtrl: AlertController, 
    private navCtrl: NavController,
    private toast: ToastController,
    private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.nombre = this.route.snapshot.paramMap.get('nombre'),
    this.tipo = this.route.snapshot.paramMap.get('tipo'),
    this.contacto = this.route.snapshot.paramMap.get('contacto'),
    this.telefono = this.route.snapshot.paramMap.get('telefono'),
    this.img = this.route.snapshot.paramMap.get('img')

    const filter = ref =>
      ref.where("mascota.id", "==", this.id);

    this.service.getDateByFilter(filter).subscribe((snap) => {
      snap.forEach((e) => {
        this.citas.push({
          id: e.payload.doc.id,...e.payload.doc.data() as Cita
        });
      });
    });

    this.mascota = {
      id: this.id,
      nombre: this.nombre,
      tipo: this.tipo,
      contacto: this.contacto,
      telefono: this.telefono,
      img: this.img
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

  delete(id: string){
    this.service.deleteDate(id);
    this.presentToast();
    this.router.navigate(['/tabs/pacientes']);
  }

  async presentToast(){
    const t = await this.toast.create({
      message: 'Cita eliminada.',
      duration: 2000
    });
    t.present()
  }
}
