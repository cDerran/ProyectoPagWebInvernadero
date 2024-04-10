import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LecturaSensor, Sensor } from 'src/app/Modelos/Sensor.model';
import { SensorDataService } from 'src/app/Servicios/sensor-data.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { ChartComponent } from '../chart/chart.component';
import { format } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnInit , OnDestroy{

  @ViewChild(ChartComponent) private chartComponente?: ChartComponent;
  sensores: any[] = [];
  controles: any[] = [];
  private sensorsSubscription!: Subscription;
  sensorSeleccionado: Sensor | null = null;
  sensorActual: Sensor | null = null;
  selectedYear: string=''
  selectedMonth: string='';
  years: number[] = []; 
  months = [
    { name: 'Enero',      value: '01' },
    { name: 'Febrero',    value: '02' },
    { name: 'Marzo',      value: '03' },
    { name: 'Abril',      value: '04' },
    { name: 'Mayo',       value: '05' },
    { name: 'Junio',      value: '06' },
    { name: 'Julio',      value: '07' },
    { name: 'Agosto',     value: '08' },
    { name: 'Septiembre', value: '09' },
    { name: 'Octubre',    value: '10' },
    { name: 'Noviembre',  value: '11' },
    { name: 'Diciembre',  value: '12' }
  ];
  

  constructor(private sensorDataService: SensorDataService,private userService: UsuarioService) { 

    this.initializeYears();
  }


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.sensorDataService.getSensorsForUser(user.uid).subscribe(sensors => {
          this.sensores = sensors.filter(sensor => sensor !== undefined); 
          this.controles = sensors.map(sensor => ({
            ...sensor.Control,
            sensorNombre: sensor.Nombre
          })).filter(control => control !== undefined);           
        });
      }
    });
  }
  

  ngOnDestroy(): void {
    if (this.sensorsSubscription) {
      this.sensorsSubscription.unsubscribe();
    }
  }
  

  onDateChange(): void {
    if (this.sensorActual && this.selectedYear && this.selectedMonth) {
       this.sensorDataService.getSensorDataByDate(this.sensorActual.id, this.selectedYear, this.selectedMonth)
        .subscribe((data: LecturaSensor[] )=> {

          const chartLabels = data.map(d => format(new Date(d.FechaHora), 'dd-MM-yyyy HH:mm'));
          const temperatureData = data.map(d => d.Temperatura);
          const humidityData = data.map(d => d.Humedad);

          if (this.chartComponente) {
            this.chartComponente.updateChartData(chartLabels,temperatureData,humidityData);
          }
        });

    }
  } 
  
  onSensorSeleccionado(sensor: Sensor) {
    this.sensorActual = sensor;
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let year = 2023; year <= currentYear; year++) {
      this.years.push(year);
    }
    this.selectedYear = currentYear.toString();
    this.selectedMonth = ('0' + (new Date().getMonth() + 1)).slice(-2);
  }
}
