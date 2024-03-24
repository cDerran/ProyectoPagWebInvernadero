import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, catchError, throwError } from "rxjs";


@Injectable()
export class LoginService{
    
    userData:any;
     
    constructor(
       
        private router: Router,
        private afAuth: AngularFireAuth
    ){
        

    }
    
    getUserState(): Observable<any> {
      return this.afAuth.authState; // Devuelve el observable que emite el estado del usuario
    }
    
    async login(email: string, password: string): Promise<void> {
      try {
        await this.afAuth.signInWithEmailAndPassword(email, password);
        this.router.navigate(['/Inicio']);
      } catch (error) {
        throw error; // Lanza el error para que el componente lo maneje
      }
    }
  logout() {
    return this.afAuth.signOut();
  }
  
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo de restablecimiento enviado.');
    } catch (error) {
      console.error(error);
    }
  }
  
}



