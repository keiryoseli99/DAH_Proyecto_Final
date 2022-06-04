import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Mascota } from './../models/mascota';
import { Cita } from './../model/cita';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
// import { resolve } from 'dns';
import { doc, docData, Firestore} from '@angular/fire/firestore';
//import { Storage } from '@angular/fire/storage';
// import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(
    private firestore:AngularFirestore,
    private camera: Camera,
    //private storage: Storage
    ) { }

///////////////////MASCOTAS///////////////////
  create(mascota: Mascota){
    return this.firestore.collection('mascotas').add(mascota);
  }

  getPet(){
    return this.firestore.collection('mascotas').snapshotChanges();
  }

  getPetById(id: string){
    return this.firestore.collection('mascotas').doc(id).snapshotChanges();
    //return this.firestore.collection('citas', filter).snapshotChanges();
    //return this.firestore.doc('mascotas/'+id).snapshotChanges();
    //return this.firestore.collection('estudiante').valueChanges({idField: id});
  }

  updatePet(mascota: Mascota, id: string){
    this.firestore.doc('mascotas/'+id).update(mascota);
  }

  deletePet(id: string){
    this.firestore.doc('mascotas/'+id).delete();
  }

  ////////////////////CITAS////////////////////

  createCita(cita: Cita){
    return this.firestore.collection('citas').add(cita);
  }

  getDate(){
    return this.firestore.collection('citas').snapshotChanges();
  }
  getDateById(filter){
    return this.firestore.collection('citas', filter).snapshotChanges();
    //return this.firestore.collection('citas').valueChanges({mascotas: 'mascotas/'+id});
  }

  deleteDate(id: string){
    this.firestore.doc('citas/'+id).delete();
  }
}
