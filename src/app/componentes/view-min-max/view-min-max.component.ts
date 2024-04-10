import { Component, Input } from '@angular/core';
import { Sensor } from 'src/app/Modelos/Sensor.model';

@Component({
  selector: 'app-view-min-max',
  templateUrl: './view-min-max.component.html',
  styleUrl: './view-min-max.component.css'
})
export class ViewMinMaxComponent  {

  @Input() control!: {
    Temperatura: { Min: number; Max: number; };
    Humedad: { Min: number; Max: number; };
    sensorId: string;
    sensorNombre: string;
  };
  constructor(){}

  

  

}

