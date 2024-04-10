import {  AfterViewInit,Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { LecturaSensor, Sensor } from 'src/app/Modelos/Sensor.model';
import { format } from 'date-fns';
import { Chart, ChartData, registerables, ChartType } from 'chart.js';
import { SensorDataService } from 'src/app/Servicios/sensor-data.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements  OnChanges, AfterViewInit{

 
  @ViewChild('canvas') canvas?: ElementRef;
  @Input() sensor?: Sensor;
  @Input() chartOptions: any;

  private myChart?: Chart;
  public lineChartData: ChartData<'line'> = {
    datasets: [],
    labels: []
  };
  public lineChartType: ChartType = 'line';
  
  
  public lineChartOptions = {
    responsive: true,
  };

  constructor(private sensorDataService: SensorDataService) { }
  
  
  ngAfterViewInit(): void {
    this.loadData();
  }



  loadData(): void {
    if (this.sensor) {
      this.sensorDataService.getSensorData(this.sensor.id).subscribe(data => {
        const chartLabels: string[] = [];
        const temperatureData: number[] = [];
        const humidityData: number[] = [];
  
        data.forEach(lectura => {
          const fecha = new Date(lectura.FechaHora); 
          chartLabels.push(format(fecha, 'dd-MM-yyyy HH:mm')); 
          temperatureData.push(lectura.Temperatura); 
          humidityData.push(lectura.Humedad); 
        });
  
        this.updateChartData(chartLabels, temperatureData, humidityData);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sensor'] && this.sensor) {
      this.loadData();
    }
  }

 

  updateChartData(chartLabels: string[], temperatureData: number[], humidityData: number[]): void {
   
    if (this.myChart) {
      this.myChart.data.labels = chartLabels;
      this.myChart.data.datasets[0].data = temperatureData;
      this.myChart.data.datasets[1].data = humidityData;
      this.myChart.update();

    }else{
       this.createChart(chartLabels, temperatureData, humidityData);
    }
  }
  
  createChart(chartLabels: string[], temperatureData: number[], humidityData: number[]): void {
    const context = this.canvas?.nativeElement.getContext('2d');

    if (context) {
      this.myChart = new Chart(context, {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'Temperatura',
              data: temperatureData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              fill: true,
              pointBackgroundColor: 'red',
              pointBorderColor: 'white',
              yAxisID: 'y',
            },
            {
              label: 'Humedad',
              data: humidityData,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fill: true,
              pointBackgroundColor: 'blue',
              pointBorderColor: 'white',
              yAxisID: 'y1',
            }
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 0, 
              suggestedMax: 85,
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Temperatura (°C) ',
                color: 'red',
                
              
              },
              ticks: {
                color: 'red',
              }
            },
            y1: {
              beginAtZero: true,
              suggestedMin: 0, 
              suggestedMax: 85,
              type: 'linear',
              
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Humedad (%) ',
                color: 'blue',
              },
              grid: {
                drawOnChartArea: false, 
              },
              ticks: {
                color: 'blue', 
              }
            }
         }
        }
      });
    } else {
      alert('No se pudo obtener el contexto del canvas');
    }
  }

 


}


