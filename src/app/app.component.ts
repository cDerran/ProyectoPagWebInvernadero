import { Component } from '@angular/core';
import { LoginService } from './Servicios/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  user: any;
  title = 'crudangular';
  
  constructor(
    private loginService:LoginService,
    private auth: AngularFireAuth
  ){ 

    this.auth.user.subscribe((user) => {
      this.user = user;
    });
   }
   logout(){
    this.loginService.logout();
  } 



  
}
