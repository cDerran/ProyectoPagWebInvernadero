import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";


@Injectable()
export class DataService{
    //URL = 'https://proyectoinvernaderoarica-ab35c-default-rtdb.firebaseio.com/datos.json';

    ListReg:any[]=[];
  constructor(
    private HttpClient: HttpClient,
    private loginService: LoginService,
  ){}

   
   
  /* ListarRegistrosSensores(){
   // const token= this.loginService.Verificatoken();
    return this.HttpClient.get('https://proyectoinvernadero-4bdcb-default-rtdb.firebaseio.com/DetalleSensor.json?auth=' + token);

  }

  listarUsuarios() {
    
    const token= this.loginService.getIdToken();
    return this.HttpClient.get('https://proyectoinvernadero-4bdcb-default-rtdb.firebaseio.com/Usuarios.json?auth=' + token);

  } */


  

}