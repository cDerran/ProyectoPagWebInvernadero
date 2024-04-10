import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-sensor-modal',
  templateUrl: './agregar-sensor-modal.component.html',
  styleUrl: './agregar-sensor-modal.component.css'
})
export class AgregarSensorModalComponent {


  sensorId = '';

  constructor(
    public dialogRef: MatDialogRef<AgregarSensorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {userId: string}) { }

  agregar() {
    this.dialogRef.close(this.sensorId);
  }
}
