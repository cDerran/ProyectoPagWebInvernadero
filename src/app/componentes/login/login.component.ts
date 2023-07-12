import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class  LoginComponent implements OnInit {

  user: any;
  formularioDeUsuario: FormGroup;
  submitted=false;
  
  constructor(
    private loginService: LoginService,
    public formulario:FormBuilder,
    private router: Router,
    private auth: AngularFireAuth
  ) { 
      this.formularioDeUsuario = this.formulario.group({
      contra:[''],
      correo:['']  
    }); 

  }

  login(form: FormGroup) {
    const correo= form.value.correo;
    const password= form.value.contra;
    
    this.loginService.Login(correo, password);
  }
   ngOnInit() {
      
  }

  ngSubmit(){
    
  }  

   

  public get ControlFormulario():any{
    return this.formularioDeUsuario.controls;

  }


  

  



}
