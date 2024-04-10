import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LecturaSensor, Sensor } from 'src/app/Modelos/Sensor.model';
import { SensorDataService } from 'src/app/Servicios/sensor-data.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnChanges{
  
  @Input() sensor!: Sensor;
  @Output() sensorSeleccionado = new EventEmitter<Sensor>();
  lecturas!: LecturaSensor[];


  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sensor']) {
      const currentSensor = changes['sensor'].currentValue;
    }
  }
  
  seleccionarSensor() {
    this.sensorSeleccionado.emit(this.sensor);
  }
  
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }


}
