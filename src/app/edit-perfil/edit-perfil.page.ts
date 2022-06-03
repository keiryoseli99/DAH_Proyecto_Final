import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {

  public id?: string;
  public nombre: string;
  public tipo: string;
  public contacto: string;
  public telefono;

  public myForm:FormGroup;
  public mascota:Mascota;
  public validationMessages: object;
  imgURL: string;

  base64Image: string;
  selectedFile: File = null;
  downloadURL: Observable<string>;

  constructor(
    private mascotasService:MascotasService,
    private fb:FormBuilder,
    private camera: Camera,
    private alertCtrl: AlertController,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.nombre = this.route.snapshot.paramMap.get('nombre');
    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.contacto = this.route.snapshot.paramMap.get('contacto');
    this.telefono = this.route.snapshot.paramMap.get('telefono');
    this.base64Image = this.route.snapshot.paramMap.get('img');

    this.mascotasService.getPetById(this.id).subscribe((e) => {
      this.mascota = e.payload.data() as Mascota
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      nombre:[this.nombre,[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      tipo:[this.tipo,[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      contacto:[this.contacto,[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      telefono:[this.telefono,[Validators.required, Validators.minLength(10), Validators.maxLength(10),]]
    });

    this.validationMessages = {
      'nombre': [
        {type: 'required', message: "Debe capturar el nombre"},
        {type: 'minLength', message: "Debe capturar más de 3 caracteres"},
        {type: 'maxLength', message: "Debe capturar máximo 150 caracteres"}
      ],
      'tipo': [
        {type: 'required', message: "Debe capturar el tipo de mascota"},
        {type: 'minLength', message: "Debe capturar más de 3 caracteres"},
        {type: 'maxLength', message: "Debe capturar máximo 150 caracteres"}
      ],
      'contacto': [
        {type: 'required', message: "Debe capturar el nombre de contacto"},
        {type: 'minLength', message: "Debe capturar más de 3 caracteres"},
        {type: 'maxLength', message: "Debe capturar máximo 150 caracteres"}
      ],
      'telefono': [
        {type: 'required', message: "Debe capturar el número de telefono de contacto"},
        {type: 'minLength', message: "Debe capturar 10 dígitos"},
        {type: 'maxLength', message: "Debe capturar 10 dígitos"}
      ]
    }
  }

  update() {
    this.mascota = {
      nombre: this.myForm.controls.nombre.value,
      tipo: this.myForm.controls.tipo.value,
      contacto: this.myForm.controls.contacto.value,
      telefono: this.myForm.controls.telefono.value,
      img: this.base64Image
    }
    this.mascotasService.updatePet(this.mascota, this.id);
    this.upload();
  }


  // getCamera(){
  //   return this.camera.getPicture({
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     destinationType: this.camera.DestinationType.FILE_URI
  //   }).then((res)=>{
  //     this.imgURL = res
  //   }).catch(e =>{
  //     console.log(e)
  //   })
  // }

  getGallery(){
    return this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((res)=>{
      this.base64Image = 'data:image/jpeg;base64,' + res
    }).catch(e =>{
      console.log(e)
    })
  }

  takePic(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then((imagenData) => {
      //this.imgURL = 'data:image/jpeg;base64,' + imagenData;
      this.base64Image = 'data:image/jpeg;base64,' + imagenData;
    }).catch(e =>{
      console.log(e)
    })
  }

  upload(): void {
    var currentDate = Date.now();
    const file: any = this.base64ToImage(this.base64Image);
    const filePath = `Images/${currentDate}`;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(`Images/${currentDate}`, file);
    task.snapshotChanges()
      .pipe(finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(downloadURL => {
          if (downloadURL) {
            this.showSuccesfulUploadAlert();
          }
          console.log(downloadURL);
        });
      })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  async showSuccesfulUploadAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'basic-alert',
      header: 'Uploaded',
      subHeader: 'Image uploaded successful to Firebase storage',
      message: 'Check Firebase storage.',
      buttons: ['OK']
    });

    await alert.present();
  }

  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

}
