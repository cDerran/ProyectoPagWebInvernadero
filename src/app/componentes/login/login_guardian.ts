import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {  CanActivate, Router} from "@angular/router";
import { Observable, map } from "rxjs";


@Injectable()
export class Guardian implements CanActivate{

    constructor (
        private router: Router,
        private afAuth: AngularFireAuth
    ){}

    canActivate():Observable<boolean>{

        return this.afAuth.authState.pipe(
            map(user => {
              if (user) {
                // El usuario está autenticado, por lo que puede acceder a la ruta solicitada
                return true;
              } else {
                alert("Inicie Sesion para poder ver esta pagina");
                this.router.navigate(['/Login']);
                return false;
              }
            })
          );
    }

    
}