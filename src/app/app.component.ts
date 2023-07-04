import { Component, NgModule } from '@angular/core';
import { LoginService } from './Servicios/login.service';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
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

  ngOnInit(){
    /* onAuthStateChanged(this.loginService.auth, (user) => {
      this.user = user;
    }); */

  }



  verificalogin()
  {

  
  }

  
}
