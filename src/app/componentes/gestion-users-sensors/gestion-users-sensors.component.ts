import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { AgregarSensorModalComponent } from '../agregar-sensor-modal/agregar-sensor-modal.component';
import { UsuarioData } from 'src/app/Modelos/Usuario.interface';

@Component({
  selector: 'app-gestion-users-sensors',
  templateUrl: './gestion-users-sensors.component.html',
  styleUrl: './gestion-users-sensors.component.css'
})
export class GestionUsersSensorsComponent {


  users: UsuarioData[] = []; // Ajusta según tu modelo de datos

  constructor(private usuarioService: UsuarioService, private dialog: MatDialog) { }

  ngOnInit() {
    this.cargarUsuarios();


  }

  cargarUsuarios(): void {
    this.usuarioService.getUsers().subscribe((usuariosDesdeServicio: UsuarioData[]) => {
     
      this.users = usuariosDesdeServicio
        .filter(user => user.Tipo === 'Cliente')
        .map(user => {
          // Asegura que cada usuario tenga la propiedad selectedSensors inicializada como un objeto vacío.
          user.selectedSensors = user.selectedSensors || {};
          
          return user;
          
        });
    });
  } 
  
  
  agregarSensor(userId: string) {
    const dialogRef = this.dialog.open(AgregarSensorModalComponent, {
      width: '250px',
      data: { userId: userId }
    });
  
    dialogRef.afterClosed().subscribe(sensorId => {
      if (sensorId) {
        this.usuarioService.agregarSensorACliente(sensorId,userId)
      }
    });
  }

  eliminarSensoresSeleccionados(user: UsuarioData) {
    // Encuentra los IDs de los sensores seleccionados para ser eliminados.
    const sensoresAEliminar = Object.entries(user.selectedSensors || {})
      .filter(([sensorId, seleccionado]) => seleccionado)
      .map(([sensorId, _]) => sensorId);
  
    if (sensoresAEliminar.length > 0) {
      // Aquí llamarías al servicio para eliminar los sensores por su ID
      sensoresAEliminar.forEach(sensorId => {
        this.usuarioService.eliminarSensor(user.uid!, sensorId).then(() => {
        }).catch(error => {
          alert('Error eliminando el sensor:');
        });
      });
    } else {
      alert('No hay sensores seleccionados para eliminar');
    }
  }
}
