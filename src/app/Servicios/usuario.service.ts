import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, combineLatest,of, Subject,  } from "rxjs";
import { map, switchMap  } from "rxjs/operators";
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import Swal from 'sweetalert2';

@Injectable()
export class UsuarioService{

  private unsubscribe$ = new Subject<void>();  

    constructor(
        private afAuth: AngularFireAuth,  
        private db: AngularFireDatabase,
        private functions: AngularFireFunctions

    ){}

    

    getUsers(): Observable<any[]> {
      const clientesRef = this.db.list('Usuarios/Clientes').snapshotChanges();
      const adminsRef = this.db.list('Usuarios/Administradores').snapshotChanges();

      return combineLatest([clientesRef, adminsRef]).pipe(
        map(([clientesSnapshots, adminsSnapshots]) => {
          const clientes = clientesSnapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return { uid: snapshot.key, ...(value ? value : {}) }; 
          });
          const administradores = adminsSnapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return { uid: snapshot.key, ...(value ? value : {}) };
          });
          return [...clientes, ...administradores]; // Combina los arrays.
        })
      );
      
    }

    getCurrentUser(): Observable<any> {
      return this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            // El usuario está autenticado
            return of(user);
          } else {
            // No hay usuario autenticado
            return of(null);
          }
        })
      );
    }

    actualizarDatosUsuario(uid: string, usuarioData: any) {
      const callable = this.functions.httpsCallable('actualizarUsuario');
      return callable({ uid, ...usuarioData });
    }

     getTipoUsuario(uid: string): Observable<string> {
      return this.db.object(`Usuarios/Clientes/${uid}`).valueChanges().pipe(
        switchMap((cliente) => {
          if (cliente) {
            return of('Cliente');
          }
          return this.db.object(`Usuarios/Administradores/${uid}`).valueChanges().pipe(
            map((administrador) => administrador ? 'Administrador' : 'Desconocido')
          );
        })
      );
    } 
    
    DesconectarSensor(uid: string, sensorId: string): Promise<void> {
      const sensorData = { [sensorId]: false };
      return this.db.object(`Usuarios/Clientes/${uid}/Sensores/`).update(sensorData);
    }


    eliminarSensor(uid: string, sensorId: string): Promise<void> {
      return this.db.object(`Usuarios/Clientes/${uid}/Sensores/${sensorId}`).remove()
        .then(() => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Sensor eliminado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        })
        .catch(error => {
          console.error("Error al eliminar el sensor:", error);
          Swal.fire({
            title: 'Error',
            text: 'Error al eliminar el sensor. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
    }


    registrarUsuarioConRol(usuarioData: any) {
      const registrarFn = this.functions.httpsCallable('registrarUsuarioConRol');
      return registrarFn(usuarioData);
    }
    
    eliminarUsuario(userId: string, tipoUsuario: string): Observable<any> {
      const eliminarUsuarioFn = this.functions.httpsCallable('eliminarUsuario');
      return eliminarUsuarioFn({ userId, tipoUsuario });
    }
    
    ExistenUsuarios(): Observable<boolean> {
      return this.db.list('Usuarios').valueChanges().pipe(
        map(users => users.length > 0)
      );
    }

    agregarSensorACliente(sensorId: string, userId: string) {
      const sensorData = { [sensorId]: true };
      return this.db.object(`/Usuarios/Clientes/${userId}/Sensores`).update(sensorData);
    }

    
    getSensoresDesconectados(uid: string): Observable<{ id: string; nombre: string; tipo: string }[]> {
      return this.db.object<{ [key: string]: boolean }>(`/Usuarios/Clientes/${uid}/Sensores`).valueChanges().pipe(
        switchMap(sensores => {
          if (!sensores) {
            return []; // Si sensores es nulo, devolvemos un array vacío
          }
          const sensorIds = Object.entries(sensores)
            .filter(([_, conectado]) => !conectado)
            .map(([sensorId, _]) => sensorId);
          // Realizar una solicitud para obtener la información de cada sensor desconectado
          const observables = sensorIds.map(sensorId => {
            return this.getSensorInfo(sensorId).pipe(
              map(info => ({ id: sensorId, ...info }))
            );
          });
          return combineLatest(observables);
        })
      );
    }
    
    getSensorInfo(sensorId: string): Observable<{ nombre: string; tipo: string }> {
      return this.db.object(`/Sensores/${sensorId}`).valueChanges().pipe(
        map((sensor: any) => {
          return { nombre: sensor.Nombre, tipo: sensor.Tipo };
        })
      );
    }

  conectarSensor(uid: string, sensorId: string): Promise<void> {
    const sensorData = { [sensorId]: true };
      return this.db.object(`Usuarios/Clientes/${uid}/Sensores/`).update(sensorData);
  }

}