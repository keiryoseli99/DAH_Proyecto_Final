import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

  public mascota:Mascota;
  public mascotas: Mascota[];
  public searchTerm: string;


  constructor(
    private service:MascotasService, 
    public alertCtrl: AlertController, 
    private navCtrl: NavController) {
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
    this.navCtrl.navigateForward(['/perfil/'+mascota.id, mascota]);
  }
}
