import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { User } from '../modelUser/user';
import { NavController, AlertController } from '@ionic/angular';
import { MascotasService } from './../services/mascotas.service';
import { Mascota } from './../models/mascota';
import { Cita } from '../model/cita';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private service:MascotasService,
    private navCtrl: NavController
  ) {  }

  ngOnInit() {
  }

  async onLogin() {
    const user = await this.authService.onLogin(this.user);
    if(user) {
      console.log('successfully logged user');
      this.router.navigateByUrl('/tabs/home');
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Datos incorrectos',
        message: 'Los datos son incorrectos',
        buttons: [
          {text: 'salir'}
        ]
      });
      await alert.present();
    } 
  }

  onLoginGoogle(): void {
    this.authService.onloginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['/tabs/home']);
  }

}
