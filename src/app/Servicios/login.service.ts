import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, catchError, throwError } from "rxjs";
import { UsuarioService } from "./usuario.service";


@Injectable()
export class LoginService{
    
    userData:any;
     
    constructor(
       
        private router: Router,
        private afAuth: AngularFireAuth,
        private usuarioService: UsuarioService
    ){
        

    }
    
    getUserState(): Observable<any> {
      return this.afAuth.authState; // Devuelve el observable que emite el estado del usuario
    }
    
    async login(email: string, password: string): Promise<void> {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        this.usuarioService.getTipoUsuario(userCredential.user!.uid).subscribe((rol) => {
          if (rol === 'Cliente') {
            this.router.navigate(['/Dashboard']);
          } else if (rol === 'Administrador') {
            this.router.navigate(['/GestionUsuarios']);
          } else {
            this.router.navigate(['/MisionVision']);
          }
        });
      } catch (error) {
        throw error;
      }
    }


  logout() {
    return this.afAuth.signOut();
  }
  
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      alert('Correo de restablecimiento enviado.');
    } catch (error) {
      alert(error);
    }
  }
  
}



