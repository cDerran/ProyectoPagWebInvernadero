import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sensor } from 'src/app/Modelos/Sensor.model';
import { SensorDataService } from 'src/app/Servicios/sensor-data.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnInit , OnDestroy{

  sensores: any[] = [];
  selectedMonth!: string;
  selectedYear!: string;
  private sensorsSubscription!: Subscription;
  sensorSeleccionado: Sensor | null = null;
  sensorActual: Sensor | null = null;

  constructor(private sensorDataService: SensorDataService,private userService: UsuarioService) { }


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.sensorDataService.getSensorsForUser(user.uid).subscribe(sensors => {
          this.sensores = sensors; 
          console.log(this.sensores);
        });
      }
    });
  }
  

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte para limpiar los observables y evitar fugas de memoria.
    if (this.sensorsSubscription) {
      this.sensorsSubscription.unsubscribe();
    }
  }
  

  onDateChange(): void {
    // Llama a getSensors nuevamente para actualizar los datos basados en la nueva selección de fecha
    //this.getSensors();
  } 
  onSensorSeleccionado(sensor: Sensor) {
    this.sensorActual = sensor;
  }
}
