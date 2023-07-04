import { Injectable } from "@angular/core";
import { RegSensor } from "../Modelos/RegSensor";
import { Observable } from "rxjs";
import { DataService } from "./data.service";
import { LoginService } from "./login.service";



@Injectable()
export class InfoSensorService{

    listReg: RegSensor[]=[];
    Uid="";
    constructor(private dataService: DataService,private loginService:LoginService){}
    


   /*  Llenarlista(){ 
        
      return  this.dataService.ListarRegistrosSensores();
        
    } */

    /* ObtenerUid(){
        return this.loginService.getUid();
    } 

    encontrarIndice(listUser: RegSensor[],Uid: string){
        
        let indice = listUser.findIndex(objeto => objeto.Uid === Uid);
    
        return indice;
    }*/

    


}