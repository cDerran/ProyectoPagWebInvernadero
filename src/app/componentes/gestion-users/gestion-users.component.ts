import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/Modelos/Usuario';
import { UsuarioData } from 'src/app/Modelos/Usuario.interface';
import { UsuarioService } from 'src/app/Servicios/usuario.service';


@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})


export class GestionUsersComponent {
  formReg: FormGroup;
  Lista:Usuario[] = [];
  UsuariosMostrados: any[] = [];
  usuariosFiltrados: Usuario[] = [];
  tieneUsuarios!: boolean;
  modoEdicion: boolean = false;
  usuarioSeleccionado: any;
  filtroEmail: string = '';
  mostrarCamposExtras: boolean = true;
  tipousuario: String = '';
  mostrarPassword: boolean = false;
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
      this.UsuariosMostrados = usuarios; // Asegúrate de que todos los usuarios se muestren inicialmente
      console.log(this.Lista);
      });

    this.userService.ExistenUsuarios().subscribe(tieneUsuarios => {
      this.tieneUsuarios = tieneUsuarios;
      
    });

    
  }
  MostrarTodos(){
    this.UsuariosMostrados= this.Lista;
  }

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  mostrarUsuariosNormales() {
    this.UsuariosMostrados = this.Lista.filter(usuario => usuario.Tipo === 'Cliente');
  }
  
  mostrarUsuariosAdministradores() {
    this.UsuariosMostrados = this.Lista.filter(usuario => usuario.Tipo === 'Administrador');
  }

  filtrarUsuariosAutomaticamente(){
    this.usuariosFiltrados = this.Lista.filter(usuario =>
      usuario.email.includes(this.filtroEmail)
    );
  }

  editarUsuario(usuario: Usuario) {
    this.modoEdicion = true;
    this.usuarioSeleccionado = usuario;
    
    this.formReg.patchValue({
      email: usuario.email,
      password: usuario.password, // Cuidado aquí, la contraseña normalmente no se debería manejar así
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      tipoUsuario: usuario.Tipo, // Asegúrate de que el control se llame 'tipoUsuario' y no 'Tipo'
    });
  }

  aceptarEdicion() {
    if (this.formReg.valid && this.usuarioSeleccionado) {
      // Preparar los datos que se van a actualizar.
      let usuarioData: UsuarioData = {
        nombre: this.formReg.value.nombre,
        apellido: this.formReg.value.apellido,
        direccion: this.formReg.value.direccion,
        telefono: this.formReg.value.telefono,
        tipoUsuario: this.formReg.value.tipoUsuario,
      };
  
      // Verifica si el correo electrónico ha cambiado
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
            console.log(result); // Manejar la respuesta exitosa
            this.modoEdicion = false;
            this.usuarioSeleccionado = null;
            // Opcional: Actualizar la lista de usuarios mostrados aquí
          },
          error: (error) => {
            console.error('Error al actualizar los datos del usuario:', error); // Manejar el error
          }
        }); 
    }
  }
  
  

  eliminarUsuario(user:Usuario) {
    
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
     
       this.userService.eliminarUsuario(user.uid, user.Tipo).subscribe({
        next: (result) => {
          console.log(result);
          // Manejar éxito
        },
        error: (error) => {
          console.error("Error al eliminar el usuario:", error);
          // Manejar error
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
    if(this.formReg.valid){

      const usuarioData = {
        email: this.formReg.value.email,
        password: this.formReg.value.password,
        nombre: this.formReg.value.nombre,
        apellido: this.formReg.value.apellido,
        direccion: this.formReg.value.direccion,
        telefono: this.formReg.value.telefono,
        tipoUsuario: this.formReg.value.tipoUsuario,
      };
      this.userService.registrarUsuarioConRol(usuarioData).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.error(error),
    });
    }

    
  }

  
}
