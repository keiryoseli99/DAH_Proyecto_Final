import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../modelUser/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();
  public myForm:FormGroup;
  public validationMessages: object;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email:["",[Validators.required]],
      password:["",[Validators.required, Validators.minLength(6)]],
    });

    this.validationMessages = {
      'email': [
        {type: 'required', message: "Debe capturar el correo"},
      ],
      'password': [
        {type: 'required', message: "Debe capturar una contraseña"},
        {type: 'minLength', message: "6 Caracteres mínimo"},
      ]
    }
  }

  async onRegister(){
    this.user = {
      email: this.myForm.controls.email.value,
      password: this.myForm.controls.password.value
    }
    const user = await this.authservice.onRegister(this.user);
    if(user){
      console.log('successfully created user');
      this.router.navigateByUrl('/tabs/home')
    }
  }
}
