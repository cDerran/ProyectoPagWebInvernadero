import { Component, Input, OnInit } from '@angular/core';
import { Sensor } from 'src/app/Modelos/Sensor.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() sensor?: Sensor;
  @Input() chartOptions: any;

  constructor() { }


  ngOnInit(): void {
    this.initializeChart();
  }

  initializeChart() {
    // Aquí iría la lógica para inicializar el gráfico basado en chartData y chartOptions
  }
}
