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

  // getImg() {
  //   const docRef = doc(this.firestore, 'users/${user.uid}')
  // }

  // async uploadImage(caneraFile: Photo) {
  //   const path = 'uploads/$user{user.id}/profile.png';
  //   const storageRef = ref(this.storage, path);
  // }

  // getCamera(imgURL){
  //   return this.camera.getPicture({
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     destinationType: this.camera.DestinationType.FILE_URI
  //   }).then((res)=>{
  //     imgURL = res
  //   }).catch(e =>{
  //     console.log(e)
  //   })
  // }

  // getGallery(imgURL){
  //   return this.camera.getPicture({
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: this.camera.DestinationType.DATA_URL
  //   }).then((res)=>{
  //     imgURL = 'data:image/jpeg;base64,' + res
  //   }).catch(e =>{
  //     console.log(e)
  //   })
  // }

  // takePic(imgURL){
  //   const options: CameraOptions = {
  //     quality:100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.CAMERA
  //   };
  //   this.camera.getPicture(options).then((imagenData) => {
  //     imgURL = 'data:image/jpeg;base64,' + imagenData;
  //   }).catch(e =>{
  //     console.log(e)
  //   })
  // }

  // getImg(file: any, path: string, nombre: string){
  //   const filePath = path + '/' + nombre;
  //   const ref = this.storage.ref(filePath);
  //   const task = ref.put(file);
  //   // return this.storage.ref('');
  // }
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
}
