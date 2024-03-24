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
    // Opcionalmente, puedes reaccionar a cambios en el @Input() sensor aquí.
    // Por ejemplo, si necesitas procesar las lecturas cada vez que cambian.
    if (changes['sensor']) {
      const currentSensor = changes['sensor'].currentValue;
      // Haz algo con currentSensor, como procesar las lecturas.
    }
  }
  
  seleccionarSensor() {
    this.sensorSeleccionado.emit(this.sensor);
  }
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }


}
