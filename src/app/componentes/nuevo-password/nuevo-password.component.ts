import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Servicios/login.service';

@Component({
  selector: 'app-nuevo-password',
  templateUrl: './nuevo-password.component.html',
  styleUrls: ['./nuevo-password.component.css']
})
export class NuevoPasswordComponent {

  
  email: string = '';

  constructor( private loginService: LoginService) {
    
  }

  resetPassword() {
    this.loginService.sendPasswordResetEmail(this.email)
      .then(() => alert('Correo de restablecimiento enviado.'))
      .catch((error) => alert(error.message));
  }
}
