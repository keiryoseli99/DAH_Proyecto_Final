import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  public mascota:Mascota;
  public mascotas: Mascota[];
  public searchTerm: string;

  constructor(private service:MascotasService, public alertCtrl: AlertController, private navCtrl: NavController) {
    this.service.getPet().subscribe(data => {
      this.mascotas = data.map(e => {
        return {
          id: e.payload.doc.id,...e.payload.doc.data() as Mascota
        }
      })
    });
   }

  ngOnInit() {
  }

  postId(mascota){
    this.navCtrl.navigateForward(['/cita/'+mascota.id, mascota]);
  }
}
