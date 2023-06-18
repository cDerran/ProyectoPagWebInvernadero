import { Component, NgModule } from '@angular/core';
import firebase from 'firebase/compat/app';
import { LoginService } from './Servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'crudangular';
  
  constructor(private loginService:LoginService){  }


  ngOnInit(): void{


  }



  verificalogin()
  {
  return this.loginService.Verificatoken();
  
  }

  logout(){
    this.loginService.Logout();
  }
}
