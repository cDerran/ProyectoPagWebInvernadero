import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { switchMap } from "rxjs";
import { RegSensor } from "../Modelos/RegSensor";


@Injectable()
export class DataService{
    //URL = 'https://proyectoinvernaderoarica-ab35c-default-rtdb.firebaseio.com/datos.json';

    ListReg:any[]=[];
  constructor(
    private HttpClient: HttpClient,
    private loginService: LoginService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ){}

   
   
  ListarRegistrosSensores(){
    const token= this.loginService.Verificatoken();
    return this.HttpClient.get('https://proyectoinvernadero-4bdcb-default-rtdb.firebaseio.com/DetalleSensor.json?auth=' + token);

  }

  listarUsuarios() {
    
    const token= this.loginService.getIdToken();
    return this.HttpClient.get('https://proyectoinvernadero-4bdcb-default-rtdb.firebaseio.com/Usuarios.json?auth=' + token);

  }


  

}