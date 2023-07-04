import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/Modelos/Usuario';
import { UsuarioService } from 'src/app/Servicios/usuario.service';


@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})


export class GestionUsersComponent {
  formReg: FormGroup;
  ListUsers:Usuario[] = []; 
  usuariosFiltrados: Usuario[] = [];
  tieneUsuarios!: boolean;
  modoEdicion: boolean = false;
  usuarioSeleccionado: any;
  filtroEmail: string = '';
  
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
        telefono:  ['', Validators.required]
      });
  }

  filtrarUsuariosAutomaticamente(){
    this.usuariosFiltrados = this.ListUsers.filter(usuario =>
      usuario.email.includes(this.filtroEmail)
    );
  }



  ngOnInit(): void {
    
    this.userService.getUsers().subscribe(usuarios => {
      this.ListUsers = usuarios;
      console.log(this.ListUsers);
    });

    this.userService.ExistenUsuarios().subscribe(tieneUsuarios => {
      this.tieneUsuarios = tieneUsuarios;
    });
  }
  
  editarUsuario(usuario: Usuario) {
    this.modoEdicion = true;
    this.usuarioSeleccionado = usuario;
  }

  aceptarEdicion() {
    const email = this.formReg.get('email')?.value;
    const password = this.formReg.get('password')?.value;
    const nombre = this.formReg.get('nombre')?.value;
    const apellido = this.formReg.get('apellido')?.value;
    const direccion = this.formReg.get('direccion')?.value;
    const telefono = this.formReg.get('telefono')?.value;

    const usuario: Usuario = {
      uid: this.usuarioSeleccionado.uid,
      email: email,
      password: password,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      telefono: telefono
    };
    this.userService.actualizarUsuario(usuario, this.usuarioSeleccionado.email,this.usuarioSeleccionado.password);

    this.modoEdicion = false;
    this.usuarioSeleccionado = null;
  }

  eliminarUsuario(user:Usuario) {
    
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");

  if (confirmacion) {
    this.userService.EliminarUsuario(user.email,user.password,user.uid);
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
 
  registerUser() {
    if (this.formReg.valid) {
      
      const email = this.formReg.get('email')?.value;
      const password = this.formReg.get('password')?.value;
      const nombre = this.formReg.get('nombre')?.value;
      const apellido = this.formReg.get('apellido')?.value;
      const direccion =this.formReg.get('direccion')?.value;
      const telefono =this.formReg.get('telefono')?.value;
      
      this.userService.registerUser(email, password, nombre, apellido,direccion, telefono)
        .then(() => {
          location.reload();
          alert('Usuario registrado correctamente');
          
        })
        .catch((error) => {
          console.log('Componente= Error al registrar usuario:', error);
        });
    }
  } 



}
