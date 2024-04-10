import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, catchError, combineLatest, forkJoin, map,  of, switchMap } from 'rxjs';
import { LecturaSensor, Sensor,  } from '../Modelos/Sensor.model';


@Injectable({
  providedIn: 'root'
})


export class SensorDataService {

  
  constructor(private db: AngularFireDatabase) { }


  getSensorsForUser(userId: string): Observable<Sensor[]> {
    return this.db.object<{ [key: string]: boolean }>(`/Usuarios/Clientes/${userId}/Sensores`).valueChanges().pipe(
      switchMap((value: { [key: string]: boolean } | null) => {
        if (!value) {
          return of([]);
        }
        const sensorIds = Object.entries(value)
          .filter(([_, val]) => val === true)
          .map(([key, _]) => key);
        if (sensorIds.length === 0) {
          return of([]);
        }
        const observables = sensorIds.map(sensorId => this.getSensorWithLatestReading(sensorId));
        return combineLatest(observables);
      }),
      catchError(error => {
        // Aquí podrías manejar el error de manera que no interrumpa la fluidez de tu aplicación, quizás enviando la información del error a un servicio de monitoreo
        return of([]);
      })
    );
  }
  

  getSensorWithLatestReading(sensorId: string): Observable<Sensor> {
    return this.db.object<Sensor>(`/Sensores/${sensorId}`).valueChanges().pipe(
      switchMap(sensor => {
        if (!sensor) {
          return of({
            id: '',
            Nombre: '',
            Tipo: '',
            Ubicacion: '',
            Lecturas: {},
            Control: { Temperatura: { Min: 0, Max: 0 }, Humedad: { Min: 0, Max: 0 } },
            ultimaLectura: null
          });
        }
        return this.db.list<LecturaSensor>(`/Sensores/${sensorId}/Lecturas`, ref => ref.limitToLast(1)).valueChanges().pipe(
          map(lecturas => {
            const ultimaLectura = lecturas.length > 0 ? lecturas[0] : null;
            return { ...sensor, id: sensorId, ultimaLectura: ultimaLectura };
          }),
          catchError(error => {
            // Manejo de error, similar al anterior
            return of({ ...sensor, ultimaLectura: null });
          })
        );
      })
    );
  }
  
  
  getSensorById(sensorId: string): Observable<any> {
    return this.db.object(`/Sensores/${sensorId}`).valueChanges();
  }
  
getSensorData(sensorId: string): Observable<LecturaSensor[]> {
  return this.db.object(`/Sensores/${sensorId}/Lecturas`).valueChanges().pipe(
    map(lecturasObj => {
      // Convertir el objeto de lecturas en un array
      const lecturasArray: LecturaSensor[] = [];
      for (const [fechaHora, lectura] of Object.entries(lecturasObj || {})) {
        lecturasArray.push({
          FechaHora: fechaHora,
          ...lectura as any // Aquí asumimos que 'lectura' tiene el formato correcto
        });
      }
      return lecturasArray;
    })
  );
}


getLastSensorData(sensorIds: (string | null)[]): Observable<{ id: string; ultimaLectura: LecturaSensor | null; }[]> {
  const observables = sensorIds.map(sensorId => {
    if (sensorId !== null) { // Verificar si sensorId no es null
      return this.getSensorData(sensorId).pipe(
        map(lecturas => ({
          id: sensorId,
          ultimaLectura: lecturas.length > 0 ? lecturas[lecturas.length - 1] : null
        }))
      );
    } else {
      return of({ id: '', ultimaLectura: null }); // Retornar un observable con un valor por defecto
    }
  });
  return forkJoin(observables);
}


  getSensorDataByDate(sensorId: string, year: string, month: string): Observable<any> {
    // Asegurarse de que el mes tiene dos dígitos para la comparación
    
    const formattedMonth = month.padStart(2, '0');
    const startDate = `${year}-${formattedMonth}-01T00:00:00Z`;
    const endDate = `${year}-${formattedMonth}-${new Date(+year, +month, 0).getDate()}T23:59:59Z`;
    return this.db.list(`/Sensores/${sensorId}/Lecturas`, ref => 
      ref.orderByKey().startAt(startDate).endAt(endDate)
    ).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          FechaHora: c.payload.key, 
          ...c.payload.val() as {} 
        }))
      )
    );
  }

  
  setControlValues(sensorId: string, controlValues: any) {
    const path = `/Sensores/${sensorId}/Control`;
    return this.db.object(path).update(controlValues);
  }
  
  updateSensor(sensorId: string, sensorData: any): Promise<void> {
    return this.db.object(`/Sensores/${sensorId}`).update(sensorData);
  }

  

}

