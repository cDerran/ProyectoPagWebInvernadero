import { Injectable } from "@angular/core";
import { Usuario} from  "../Modelos/Usuario";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, map } from "rxjs";


@Injectable()
export class UsuarioService{

  

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase

    ){}

    getUsers(): Observable<any[]> {
      return this.db.list('Usuarios').valueChanges();
    }

    RegistrarAdministrador(email:string, password:string,nombre:string,apellido:string,direccion:string,telefono:string){
      return this.afAuth.createUserWithEmailAndPassword(email,password)
      .then((admin) =>{
        if(admin && admin.user){
          const uid = admin.user.uid;
          const datosUsuario = {
            uid: uid,
            email: email,
            nombre:nombre,
            apellido:apellido,
            password:password,
            direccion:direccion,
            telefono:telefono,

          };
          return this.db.object("/Administradores/"+uid).set(datosUsuario);
        }else{
          console.error('Error al crear el usuario: Usuario no válido');
          return null;
        }
        
      }).catch((error) => {
        console.error('Servicios:  Error al crear al Admin:', error);
      });
    }

    registerUser(email: string, password: string,nombre: string,apellido: string,direccion:string,telefono:string,Tipo:string){
     return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            if (userCredential && userCredential.user) {
                const uid = userCredential.user.uid;
                const datosUsuario = {
                  uid: uid,
                  email: email,
                  nombre:nombre,
                  apellido:apellido,
                  password:password,
                  direccion:direccion,
                  telefono:'+56'+telefono,
                  Tipo: Tipo
                };
                return this.db.object("/Usuarios/"+uid).set(datosUsuario);
                
              } else {
                console.error('Error al crear el usuario: Usuario no válido');
                return null;
              }
            
          })
          .catch((error) => {
            console.error('Servicios= Error al crear el usuario:', error);
          });
    } 


    actualizarUsuario(usuario: Usuario,correo: string,password: string){

      const usuarioRef = this.db.object(`Usuarios/${usuario.uid}`);
      for (const campo in usuario) {
        

        if (usuario.hasOwnProperty(campo) && campo in usuario && usuario[campo as keyof Usuario] != null && usuario[campo as keyof Usuario] !== undefined && usuario[campo as keyof Usuario] !== "") {
         
          if(campo === "password"){

            this.afAuth.signInWithEmailAndPassword(correo, password)
              .then((userCredential) =>{
                
                var user = userCredential.user;
                user?.updatePassword(usuario.password)
                .then(() => {
                  usuarioRef.update({ [campo]: usuario[campo as keyof Usuario] })
                  console.log(`Campo '${campo}' actualizado en la base de datos Realtime de Firebase`);
                })
                .catch((error) => {
                  console.error("Error al actualizar Password: ", error);
                });
              })
              
          }else if(campo == "email"){// modificar cuando el Email se cambio
            
            try {
              this.afAuth.signInWithEmailAndPassword(correo, password)
              .then((userCredential) =>{
                
                var user = userCredential.user;
                user?.updateEmail(usuario.email)
                .then(() => {
                  usuarioRef.update({ [campo]: usuario[campo as keyof Usuario] })
                  console.log(`Campo '${campo}' actualizado en la base de datos Realtime de Firebase`);
                })
                .catch((error) => {
                  console.error("Error al actualizar correo electrónico: ", error);
                });
              })
              
            } catch (error) {
              console.error('Error al actualizar la contraseña:', error);
            }

          }else if(campo == "telefono"){
            const TelefonoSinactualizar = usuario[campo as keyof Usuario];
            const TelefonoActualizado = '+56' + TelefonoSinactualizar;
            const actualizacion = { [campo]: TelefonoActualizado };
            usuarioRef.update(actualizacion)
            .then(() => {
              console.log(`Campo '${campo}' actualizado en la base de datos Realtime de Firebase`);
            })
            .catch((error) => {
              console.error(`Error al actualizar campo '${campo}' en la base de datos Realtime de Firebase:`, error);
            });

          }else{
            usuarioRef.update({ [campo]: usuario[campo as keyof Usuario] })
            .then(() => {
              console.log(`Campo '${campo}' actualizado en la base de datos Realtime de Firebase`);
            })
            .catch((error) => {
              console.error(`Error al actualizar campo '${campo}' en la base de datos Realtime de Firebase:`, error);
            });
          }
        }
      }
     
     
    }

    getTipoUsuario(uid: string): Observable<any> {
      return this.db.object(`Usuarios/${uid}/Tipo`).valueChanges();
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
    
    EliminarUsuario(email: any, password: any, userId: any) {
      try {
        this.afAuth.signInWithEmailAndPassword(email, password)
          .then(function (userCredential) {
            var user = userCredential.user;
            user?.delete()
              .then(function () {
                console.log("Usuario eliminado exitosamente");
              })
              .catch(function (error) {
                console.error("Error al eliminar usuario: ", error);
              });
          })
          .catch(function (error) {
            console.error("Error al autenticar usuario: ", error);
          });
    
        this.db.object(`Usuarios/${userId}`).remove()
          .then(() => {
            console.log("Usuario eliminado de la base de datos Realtime de Firebase");
          })
          .catch((error) => {
            console.error("Error al eliminar usuario de la base de datos Realtime de Firebase:", error);
          });
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    }



    ExistenUsuarios(): Observable<boolean> {
      return this.db.list('Usuarios').valueChanges().pipe(
        map(users => users.length > 0)
      );
    }

}