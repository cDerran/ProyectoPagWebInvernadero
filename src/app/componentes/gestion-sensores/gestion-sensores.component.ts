import { Component } from '@angular/core';
import { Sensor } from 'src/app/Modelos/Sensor.model';
import { SensorDataService } from 'src/app/Servicios/sensor-data.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-gestion-sensores',
  templateUrl: './gestion-sensores.component.html',
  styleUrl: './gestion-sensores.component.css'
})
export class GestionSensoresComponent {
  sensores : Sensor[]= [];
  sensorActual?: Sensor;
  indiceactual: number = -1;
  titulo: string = "";
  sensorSeleccionado: string | null = null;
  viendoHistorial: boolean = false;
  mostrarListaDesconectados: boolean = false;
  sensoresDesconectados: any[] = [];
  mostrarDetalleSensor: boolean = false;

  constructor(private sensorDataService: SensorDataService,private userService: UsuarioService){
  
  }
  
  ngOnInit(): void {
    this.obtenerSensores();
  }


  seleccionarSensor(sensorId: string): void {
    this.sensorSeleccionado = sensorId;
    this.viendoHistorial = false;
    this.mostrarListaDesconectados = false;
  }

  verHistorial(sensorId: string): void {
    this.sensorSeleccionado = sensorId;
    this.viendoHistorial = true;
  }
  
  ocultarDetallesYHistorial(): void {
    this.sensorSeleccionado = null;
    this.viendoHistorial = false;
  }
  
  actualizar() : void {
    this.sensorActual = undefined;
      this.indiceactual = -1;
      this.obtenerSensores();
  }

  obtenerSensores(): void {
     this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.sensorDataService.getSensorsForUser(user.uid).subscribe(sensors => {
          this.sensores = sensors;
        });
      }
    }); 
  }

  
  cambiarSensorActivo(sensor: Sensor, index: number): void {
    this.sensorActual = sensor;
    this.indiceactual = index;
  }
  
  ocultarDetalleSensor(): void {
    this.sensorSeleccionado = null; 
  }

  agregarSensor(sensorId: string): void {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userService.agregarSensorACliente(sensorId, user.uid).then(() => {
          alert('Sensor agregado con éxito al cliente.');
          this.actualizar();
          this.mostrarDetalleSensor = true;
        }).catch(error => {
          alert('Error al agregar el sensor al cliente:');
        });
        
      }
    }); 
   
  }

  mostrarSensoresDesconectados(): void {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userService.getSensoresDesconectados(user.uid).subscribe(sensores => {
        this.sensoresDesconectados = sensores;
        this.mostrarListaDesconectados =!this.mostrarListaDesconectados;
        })
        
      }
    }); 


  }

  conectarSensor(sensorId: string): void {
    this.userService.getCurrentUser().subscribe(user => {
      if(user){
      this.userService.conectarSensor(user.uid,sensorId).then(() => {
      alert('Sensor conectado con éxito.');
      this.mostrarListaDesconectados = false;
      this.sensoresDesconectados = [];
    }).catch(error => {
      alert('Error al conectar el sensor:');
    });
      }});
   
  }
}
