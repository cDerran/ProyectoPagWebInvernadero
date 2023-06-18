import { Injectable } from "@angular/core";
import { Usuario} from  "../Modelos/Usuario";
import { DataService } from "./data.service";

@Injectable()
export class UsuarioService{

    usuarios: Usuario[]=[];

constructor( private dataServices:DataService){}


    obtenerUsuarios(){
        return this.dataServices.listarUsuarios();
    }

    

    encontrarIndice(listUser: Usuario[],correo: string,contra: string){
        
        let indice = listUser.findIndex(objeto => objeto.Correo === correo && objeto.Clave === contra);
    
        return indice;
      }
}