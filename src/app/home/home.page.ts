import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';
import { Cita } from '../model/cita';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public mascota:Mascota;
  public cita:Cita;
  public mascotas: any[]=[];
  public citas: any[]=[];
  public hoy: string;
  public resultado: string;
  public id: any[]=[];

  constructor(private service:MascotasService, public alertCtrl: AlertController, private navCtrl: NavController) {
    this.hoy = format(new Date(Date.now()), 'dd-MM-yyyy');
    // console.log(this.hoy)

    const filter = ref =>
      ref.where("fecha", "==", this.hoy);

    this.service.getDateById(filter).subscribe((snap) => {
      snap.forEach((e) => {
        this.citas.push({
          id: e.payload.doc.id,...e.payload.doc.data() as Cita
        });
      });
    });
    

    // this.service.getPet().subscribe(data => {
    //   this.citas= data.map(e => {
    //     return {
    //       id: e.payload.doc.id,...e.payload.doc.data() as Cita
    //     }
    //   })
    // });

    // this.service.getDate().subscribe(data => {
    //   this.citas= data.map(e => {
    //     return {
    //       id: e.payload.doc.id,...e.payload.doc.data() as Cita
    //     }
    //   })
    // });

    this.service.getPet().subscribe((snap) => {
      snap.forEach((e) => {
        this.mascotas.push({
          id: e.payload.doc.id,...e.payload.doc.data() as Mascota
        });      
        this.id.push({
          id: e.payload.doc.id
        });
      });
    });
    // this.service.getDate().subscribe((snap) => {
    //   snap.forEach((e) => {
    //     this.citas.push({
    //       id: e.payload.doc.id,...e.payload.doc.data() as Cita
    //     });      
    //   });
    // });
    //  console.log(this.mascotas)
    //  console.log(this.id)
    //  console.log(this.citas)
  }
  

//    // esta es la cadena donde buscaremos
// let cadena = "Este era un gato con los pies de trapo";
// // esta es la palabra a buscar
// let termino = "gato";
// // para buscar la palabra hacemos
// let posicion = cadena.indexOf(termino);
// if (posicion !== -1)
//     console.log("La palabra está en la posición " + posicion);
// else
//     console.log("No encontré lo que estás buscando");

   postId(mascota){
    this.navCtrl.navigateForward(['/perfil/'+mascota.id, mascota]);
   }

}
