import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';
import { Cita } from '../model/cita';
import { format, parseISO } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import {DocumentReference} from '@angular/fire/firestore';
import { expand } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pet:Mascota;
  public cita:Cita;
  public mascotas: any[]=[];
  public citas: any[]=[];
  public hoy: string;
  public resultado: string;
  public col: string;

  constructor(
    private service:MascotasService, 
    private route: ActivatedRoute, 
    public alertCtrl: AlertController, 
    private navCtrl: NavController,
    private firestore:AngularFirestore) {
    this.hoy = format(new Date(Date.now()), 'dd-MM-yyyy');
    const filter = ref =>
      ref.where("fecha", "==", this.hoy);
    this.service.getDateByFilter(filter).subscribe(snap => {
      snap.forEach(a => {
        this.citas.push({
          id: a.payload.doc.id, ...a.payload.doc.data() as Cita
        })
      })
    });
  }

  postId(mascota){
    this.navCtrl.navigateForward(['/perfil/'+mascota.id, mascota]);
  }

  // getDateId(){
  //   const filter = ref =>
  //     ref.where("fecha", "==", this.hoy);
  //   this.firestore.collection('mascotas').snapshotChanges().subscribe(data => {
  //     data.forEach(e => {
  //       this.mascotas.push({
  //         id: e.payload.doc.id,
  //         data: e.payload.doc.data() as Mascota,
  //         date: this.firestore.collection('mascotas/'+e.payload.doc.id+'/citas', filter).snapshotChanges().subscribe(snap => {
  //           // this.citas = snap.map(a => {
  //           //   return {
  //           //     id: a.payload.doc.id, ...a.payload.doc.data() as Cita
  //           //   }
  //           // });
  //           snap.forEach(a => {
  //             this.citas.push({
  //               id: a.payload.doc.id, ...a.payload.doc.data() as Cita
  //             })
  //           })

  //         })
  //       })
  //     })
  //   });
  // }

}
