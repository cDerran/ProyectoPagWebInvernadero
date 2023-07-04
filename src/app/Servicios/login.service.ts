import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AngularFireAuth } from "@angular/fire/compat/auth";


@Injectable()
export class LoginService{
    userData:any;
    tokencito:any ; 
     
    constructor(
       
        private router: Router,
        private cookies:CookieService,
        private afAuth: AngularFireAuth
    ){
        

    }


    logout(){
        this.afAuth.signOut()
        .then(() => {
            this.router.navigate(['/Login']);
          });
    }


    Login(email:string, password:string){

        return this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
            this.router.navigate(['/Inicio']); 
          })
          .catch(error => {
           console.log(error);
          });
    }
 
   
   




    
}



