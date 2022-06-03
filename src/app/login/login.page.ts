import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { User } from '../modelUser/user';
import { AlertController } from '@ionic/angular';

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
    private alertCtrl: AlertController
  ) { }

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
    this.router.navigateByUrl('/tabs/home');
  }
}
