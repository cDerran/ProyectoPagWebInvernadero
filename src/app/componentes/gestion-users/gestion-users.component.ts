import { Component,AfterViewInit,ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/Modelos/Usuario';
import { UsuarioData } from 'src/app/Modelos/Usuario.interface';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { TablaUsuariosComponent } from '../tabla-usuarios/tabla-usuarios.component';


@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css'],
})


export class GestionUsersComponent {
  formReg: FormGroup;
  Lista:Usuario[] = [];
  UsuariosMostrados: any[] = [];
  tieneUsuarios!: boolean;
  modoEdicion: boolean = false;
  usuarioSeleccionado: any;
  
  tipousuario: String = '';
  mostrarPassword: boolean = false;
  router: any;
  mostrarSensores: boolean = false;
  mostrarListaUsuarios: boolean = true;
  mostrarGestionSensores: boolean = false;
  mostrarFormulario: boolean = false;
  formularioEnviado = false;


  formularioIntentadoEnviar = false;
  constructor(
    private userService:UsuarioService,
    private fb: FormBuilder
    ){
      
      this.formReg = this.fb.group({
        email:     ['', [Validators.required, Validators.email]],
        password:  ['', [Validators.required, Validators.minLength(6)]],
        nombre:    ['', Validators.required],
        apellido:  ['', Validators.required],
        direccion: ['', Validators.required],
        telefono:  ['', [Validators.required, Validators.minLength(9)]],
        tipoUsuario: ['', Validators.required],
      });
  }
  
  ngOnInit() {
    
    this.userService.getUsers().subscribe(usuarios => {
      this.Lista = usuarios;
      this.UsuariosMostrados = usuarios; 
      });

    this.userService.ExistenUsuarios().subscribe(tieneUsuarios => {
      this.tieneUsuarios = tieneUsuarios;
      
    });

    
  }

  manejarEdicionUsuario(usuario: Usuario): void {
  
    this.mostrarFormulario = true; 
    this.modoEdicion = true;
    this.usuarioSeleccionado = usuario; 
    this.scrollToForm(); 
    
   
    this.formReg.patchValue({
      email: usuario.email,
      password: usuario.password, 
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      tipoUsuario: usuario.Tipo, 
    });
  
  }

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  
  scrollToForm() {
    setTimeout(() => {
      document.getElementById('formRegistro')?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // El setTimeout asegura que el desplazamiento ocurra después de que la vista del formulario se haya actualizado.
  }

  aceptarEdicion() {
    if (this.formReg.valid && this.usuarioSeleccionado) {
      // Preparar los datos que se van a actualizar.
      
      let usuarioData: UsuarioData = {
        nombre: this.formReg.value.nombre,
        apellido: this.formReg.value.apellido,
        direccion: this.formReg.value.direccion,
        telefono: this.formReg.value.telefono,
        Tipo: this.formReg.value.tipoUsuario,
      };
      if (this.formReg.value.email !== this.usuarioSeleccionado.email) {
        usuarioData.email = this.formReg.value.email; // Añadir email solo si ha cambiado
      }
  
      // Verifica si la contraseña ha cambiado
      // Nota: Este es un ejemplo, normalmente no se muestra la contraseña actual en los formularios de edición
      if (this.usuarioSeleccionado.password !== this.formReg.value.password && this.formReg.value.password.trim() !== '') {
        usuarioData.password = this.formReg.value.password; // Añadir contraseña solo si se ha proporcionado
      }
      
      // Realizar la actualización con los datos preparados
       this.userService.actualizarDatosUsuario(this.usuarioSeleccionado.uid, usuarioData)
        .subscribe({
          next: (result) => {
            this.modoEdicion = false;
            this.usuarioSeleccionado = null;
            // Opcional: Actualizar la lista de usuarios mostrados aquí
          },
          error: (error) => {
            alert('Error al actualizar los datos del usuario:'); // Manejar el error
          }
        }); 
    }
  }
  
 
  SoloNumeros(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // Filtra solo números
    if (input.length > 9) {
      input = input.slice(0, 9); // Limita a 9 dígitos
    }
    event.target.value = input;

  }
   
  registrarUsuario() {
    this.formularioEnviado = true;
    if(this.formReg.valid){

      const usuarioData = {
        email: this.formReg.value.email,
        password: this.formReg.value.password,
        nombre: this.formReg.value.nombre,
        apellido: this.formReg.value.apellido,
        direccion: this.formReg.value.direccion,
        telefono: this.formReg.value.telefono,
        Tipo: this.formReg.value.tipoUsuario,
      };
      this.userService.registrarUsuarioConRol(usuarioData).subscribe({
      next: (result) => alert(result),
      error: (error) => alert(error),
    });
    }else{
      Object.keys(this.formReg.controls).forEach(field => {
        const control = this.formReg.get(field);
        control?.markAsTouched({ onlySelf: true });
    });
    }

    
  }


  mostrarListaDeUsuarios(): void {
    this.mostrarListaUsuarios = true;
    this.mostrarGestionSensores = false;
    this.mostrarFormulario = false;
    
  }

  mostrarAdminClienteSensores():void {
    this.mostrarListaUsuarios = false;
    this.mostrarGestionSensores = true;
    this.mostrarFormulario = false;;
  }

  mostrarFormularioRegistro() {
    this.mostrarFormulario = true;
    this.modoEdicion = false;
    this.usuarioSeleccionado = null;
    this.mostrarListaUsuarios = false;
    this.mostrarGestionSensores = false;
    this.formReg.reset();
  }

  convertirEmailAMinusculas() {
    const email = this.formReg.get('email')?.value.toLowerCase();
    this.formReg.get('email')?.setValue(email, { emitEvent: false }); 
  }
  

  getErrorMessage(field: string): string {
    const control = this.formReg.get(field);
    if (control && control.errors && (control.touched || this.formularioIntentadoEnviar)) {
      if (control.hasError('required')) {
        return 'Este campo es requerido.';
      } else if (field === 'password' && control.hasError('minlength')) {
        return 'La contraseña debe tener al menos 6 caracteres.';
      } else if (field === 'telefono' && control.hasError('minlength')) {
        return 'El teléfono debe tener al menos 9 dígitos.';
      } else if (control.hasError('email')) {
        return 'El email debe tener un formato válido.';
      }
    }
    return '';
  }


  clearErrorMessage(): void {  }

  
  
}
