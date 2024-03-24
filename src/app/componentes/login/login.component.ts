import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { LoginService } from 'src/app/Servicios/login.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class  LoginComponent implements OnInit  {


  mostrarContra: boolean = false;
  formularioDeUsuario!: FormGroup;
  errorMessage: string | null = null;

  
  constructor(
    private loginService: LoginService,
    private formulario:FormBuilder,
  ) {}

  
  
  ngOnInit():void {
    this.formularioDeUsuario = this.formulario.group({
      correo: ['', [Validators.required, Validators.email]],
      contra: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const {correo, contra} = this.formularioDeUsuario.value;
    this.loginService.login(correo, contra)
      .then(() => {
        
      })
      .catch((error: FirebaseError) => {
        // Aquí manejas el error y estableces el mensaje para mostrarlo en la UI
        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'No hay registro de usuario correspondiente a este identificador.';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'La contraseña es inválida ';
            break;
          // Maneja otros códigos de error según sea necesario
          default:
            this.errorMessage = 'Ocurrió un error inesperado al intentar iniciar sesión.';
            break;
        }
      });
  }
 


  getErrorMessage(field: string): string {
    if (this.formularioDeUsuario.get(field)?.errors) {
      if (this.formularioDeUsuario.get(field)?.hasError('required')) {
        return 'Este campo es obligatorio.';
      }
      if (field === 'correo' && this.formularioDeUsuario.get(field)?.hasError('email')) {
        return 'Introduce un correo electrónico válido.';
      }
      if (field === 'contra' && this.formularioDeUsuario.get(field)?.hasError('minlength')) {
        return 'La contraseña debe tener al menos 6 caracteres.';
      }
    }
    return '';
  }

  toggleMostrarContra(): void {
    this.mostrarContra = !this.mostrarContra;
  }

}
