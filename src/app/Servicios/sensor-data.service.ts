import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, catchError, combineLatest, filter, forkJoin, from, map, mergeMap, of, switchMap } from 'rxjs';
import { LecturaSensor, Sensor } from '../Modelos/Sensor.model';


@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  constructor(private db: AngularFireDatabase) { }

  getSensorsForUser(userId: string): Observable<Sensor[]> {
    return this.db.list(`/Usuarios/Clientes/${userId}/Sensores`).snapshotChanges().pipe(
      switchMap(actions => {
        const sensorIds = actions.map(a => a.payload.key);
        if (sensorIds.length === 0) {
          return of([]);
        }
        // Usamos combineLatest para obtener los detalles de todos los sensores en paralelo
        return combineLatest(
          sensorIds.map(sensorId =>
            this.db.object<Sensor>(`/Sensores/${sensorId}`).valueChanges().pipe(
              switchMap(sensor => {
                if (!sensor) {
                  return of(null); // Aquí manejamos el caso en que un sensor específico no se encuentra.
                }
                // Suponiendo que las lecturas están organizadas y se puede obtener la última de esta manera.
                return this.db.list<LecturaSensor>(`/Sensores/${sensorId}/Lecturas`, ref => ref.limitToLast(1)).valueChanges().pipe(
                  map(lecturas => {
                    const ultimaLectura = lecturas[0] || null;
                    return { id: sensorId, ...Object.fromEntries(Object.entries(sensor).filter(([key]) => key !== 'id')),   ultimaLectura };
                  })
                );
              }),
              catchError(() => of(null)) // Manejamos errores devolviendo null para este sensor.
            )
          )
        ).pipe(
          map(sensors => sensors.filter((sensor): sensor is Sensor => sensor !== null && !!sensor.ultimaLectura)), // Filtramos cualquier sensor null antes de emitir.
        );
      }),
      catchError(error => {
        console.error('Error al obtener sensores:', error);
        return of([]);
      })
    );
  }
  
  
   
  
  getSensorData(): Observable<any[]> {
    return this.db.list('Sensores').valueChanges();
  }


}
