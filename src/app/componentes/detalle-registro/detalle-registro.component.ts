import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-RegSensores',
  templateUrl: './detalle-registro.component.html',
  styleUrls: ['./detalle-registro.component.css']
})
export class DetalleRegistroComponent implements OnInit {
  
  
  constructor(){

  }
  
 /*  mostrarxd(){
    console.log(this.ListaSinMostrar.filter((filtrar)=> filtrar.Uid==this.infoensorService.ObtenerUid()));
    console.log(this.ListaSinMostrar);
  } */
  

  ngOnInit(): void { 
    //this.listarReg();
    
  }

  showButton: boolean = false;

  

 /*  FiltrarLista(lista: RegSensor[]) {
    const ListReg= lista.filter((filtrar)=> filtrar.Uid===this.infoensorService.ObtenerUid());
    
    return ListReg;
  } */

}
