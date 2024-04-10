import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sensor } from 'src/app/Modelos/Sensor.model';
import { SensorDataService } from 'src/app/Servicios/sensor-data.service';

@Component({
  selector: 'app-historial-sensor',
  templateUrl: './historial-sensor.component.html',
  styleUrl: './historial-sensor.component.css'
})
export class HistorialSensorComponent implements OnInit{
  @Input() sensorId?: string;
  @Output() cerrarHistorial = new EventEmitter<void>();
  @Input() sensor?: Sensor;


  historialLecturas: any[] = [];
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
  constructor(private sensorDataService: SensorDataService) {

    this.initializeYears();
   }

   filterLecturas() {
    if (!this.selectedYear || !this.selectedMonth) return;
    if(this.sensorId){
      this.sensorDataService.getSensorDataByDate(this.sensorId, this.selectedYear, this.selectedMonth)
      .subscribe(lecturas => {
        this.historialLecturas = [];
        this.historialLecturas = lecturas;
      });
    }
    
  }

   

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    
    if (this.sensorId) {
      this.sensorDataService.getSensorData(this.sensorId).subscribe(data => {
      this.historialLecturas = data;
    });
    }
  }

  cerrarHistorialSensor(): void {
    this.cerrarHistorial.emit();
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
