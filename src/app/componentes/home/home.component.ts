import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Modelos/Usuario';
import { DataService } from 'src/app/Servicios/data.service';
import { LoginService } from 'src/app/Servicios/login.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  Listusers: any;
  

  constructor(private usuarioService:UsuarioService,private login:LoginService,private dataService:DataService) {  }

  ngOnInit(): void {
    //this.listarUsuarios();
   
  }

mostrarUsuarios(){

 // console.log(this.listarUsuarios());

}


  /* listarUsuarios() {
     this.login.getUsuario().subscribe(
      datos => {
        this.Listusers = datos;
        
      }
    ); 
      

  }  */
  
  
  
  hayRegistros() {
    if(this.Listusers == null) {
      return false;
    } else {
      return true;
    }
  }
  
}
