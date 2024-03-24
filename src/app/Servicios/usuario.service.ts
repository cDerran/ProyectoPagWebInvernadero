import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, combineLatest,of, Subject } from "rxjs";
import { map, switchMap,takeUntil  } from "rxjs/operators";
import { AngularFireFunctions } from '@angular/fire/compat/functions';

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
    
   

    guardarDatos(uid: any, email: any, nombre: any, apellido: any, password: any,direccion:any,telefono:any) {
      const datosUsuario = {
            uid: uid,
            email: email,
            nombre:nombre,
            apellido:apellido,
            password:password,
            direccion:direccion,
            telefono:'+56'+telefono,
            Tipo: ''
          };
        return this.db.object("/Usuarios/"+uid).set(datosUsuario);

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

}