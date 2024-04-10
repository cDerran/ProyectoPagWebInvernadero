import { ChangeDetectorRef, Component,  EventEmitter,  Input, OnInit, Output, } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SensorDataService } from 'src/app/Servicios/sensor-data.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './detalle-sensor.component.html',
  styleUrl: './detalle-sensor.component.css'
})
export class DetalleSensorComponent implements OnInit  {
  @Output() verHistorial = new EventEmitter<void>();
  @Output() sensorEliminado = new EventEmitter<void>();
  @Input() sensorId?: string;
  sensorForm: FormGroup;

  
  constructor(private sensorDataService: SensorDataService,private fb: FormBuilder,private changeDetector: ChangeDetectorRef, private userService: UsuarioService) { 

    this.sensorForm = this.fb.group({
      nombre: [''],
      ubicacion: [''],
      controlTemperatura: this.fb.group({
        min: [null, Validators.min(0)],
        max: [null, Validators.min(0)],
      }, { validators: minMaxValidator() }), // Aplica el validador aquí
      controlHumedad: this.fb.group({
        min: [null, Validators.min(0)],
        max: [null, Validators.min(0)],
      }, { validators: minMaxValidator() }) // Y aquí
    });
  }

  ngOnChanges(): void {
    // Cada vez que cambie el sensor seleccionado, actualiza el formulario
    if (this.sensorId) {
      this.loadSensorData(this.sensorId);
    }
  }

  loadSensorData(sensorId: string): void {
    this.sensorDataService.getSensorById(sensorId).subscribe(sensor => {
      this.updateForm(sensor);
      this.changeDetector.detectChanges(); 
    });
  }
  updateForm(sensor: any): void {
    this.sensorForm.patchValue({
      nombre: sensor.Nombre,
      ubicacion: sensor.Ubicacion,
      controlTemperatura: {
        min: sensor.Control.Temperatura.Min,
        max: sensor.Control.Temperatura.Max
      },
      controlHumedad: {
        min: sensor.Control.Humedad.Min,
        max: sensor.Control.Humedad.Max
      }
    });
  }
  ngOnInit(): void {

    if (this.sensorId) {
      this.sensorDataService.getSensorById(this.sensorId).subscribe(sensor => {
        this.sensorForm.patchValue({
          nombre: sensor.Nombre,
          ubicacion: sensor.Ubicacion,
          controlTemperatura: {
            min: sensor.Control.Temperatura.Min,
            max: sensor.Control.Temperatura.Max
          },
          controlHumedad: {
            min: sensor.Control.Humedad.Min,
            max: sensor.Control.Humedad.Max
          }
        });
      });
    }
  }
  
  get objectEntries() {
    return Object.entries;
  }

  onSubmit() {
    if (this.sensorForm.valid) {
      
      const formData = this.sensorForm.value;

      const sensorDataToUpdate = {
        Nombre: formData.nombre,
        Ubicacion: formData.ubicacion,
        Control: {
          Temperatura: {
            Min: formData.controlTemperatura.min,
            Max: formData.controlTemperatura.max
          },
          Humedad: {
            Min: formData.controlHumedad.min,
            Max: formData.controlHumedad.max
          }
        }
      };
      if (this.sensorId) {
         this.sensorDataService.updateSensor(this.sensorId, sensorDataToUpdate).then(() => {
          alert('Sensor actualizado con éxito');
        }).catch(error => {
          alert('Error al actualizar el sensor');
        }); 
      }
    }
  }

  verHistorialSensor(): void {
    this.verHistorial.emit();
  }

  EliminarSensor(): void {
    this.userService.getCurrentUser().subscribe(user => {
       if(user && this.sensorId){
        this.userService.DesconectarSensor(user.uid, this.sensorId).then(() => {
          this.sensorEliminado.emit(); 
          alert('Sensor eliminado con éxito');
        }).catch(error => {
          alert('No se pudo eliminar el sensor');
        });
      } 
    });

  }
}

export function minMaxValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const min = group.get('min')?.value;
    const max = group.get('max')?.value;

    return min !== null && max !== null && parseFloat(min) > parseFloat(max) ? { 'minMaxInvalid': true } : null;
  };
}
