import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/Modelos/Usuario';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.css'
})
export class TablaUsuariosComponent implements OnChanges, AfterViewInit {

  @Input() usuarios: Usuario[] = [];
  @Output() usuarioAEditar = new EventEmitter<Usuario>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'password', 'direccion', 'telefono', 'gestionar'];
  
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);
  tieneUsuarios: boolean = false;
  filtroEmail: string = '';
  usuariosFiltrados: Usuario[] = []; 
  usuarioSeleccionado: any;

  constructor(private userService: UsuarioService) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
      return data.email.includes(filter) || data.Tipo === filter;
    };
    this.dataSource.paginator.pageSize = 10; 
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página:';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.getRangeLabel = (page, pageSize, length) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["usuarios"]) {
      this.dataSource.data = this.usuarios // Inicialmente, mostrar todos los usuarios
    }
  }


 editarUsuario(usuario: Usuario) {
   this.usuarioAEditar.emit(usuario);
    this.usuarioSeleccionado = usuario;
    this.scrollToForm();
    
  } 

  
  eliminarUsuario(user:Usuario) {
    
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
     
       this.userService.eliminarUsuario(user.uid, user.Tipo).subscribe({
        next: (result) => {
          alert(result);
          // Manejar éxito
        },
        error: (error) => {
          alert("Error al eliminar el usuario:");
          // Manejar error
        }
      }); 
    }
  } 

  MostrarTodos() {
    this.dataSource.filter = '';

  }
  
  mostrarUsuariosNormales() {
    // Aquí asumimos que ajustar el filter directamente invoca el filterPredicate configurado
    this.dataSource.filter = 'Cliente';
  }
  
  mostrarUsuariosAdministradores() {
    this.dataSource.filter = 'Administrador';
  }
 
  filtrarUsuariosAutomaticamente() {
    // Asume que filtroEmail es un string que contiene el texto del filtro
    this.dataSource.filter = this.filtroEmail.trim().toLowerCase();
  }



  
  scrollToForm() {
    setTimeout(() => {
      document.getElementById('formRegistro')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }




}
