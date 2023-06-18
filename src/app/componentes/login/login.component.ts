import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/Servicios/login.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class  LoginComponent implements OnInit {



  formularioDeUsuario: FormGroup;
  submitted=false;
  Listemp: any[]=[];
  
  
  constructor(
    private usuarioService:UsuarioService,
    private loginService: LoginService,
    public formulario:FormBuilder) { 


      this.formularioDeUsuario = this.formulario.group({
      contra:[''],
      correo:['']  
    }); 
  }


   ngOnInit() {
      
  }

  ngSubmit(){
    
    const uid =  this.loginService.getUid();
    console.log(uid);
  }  

  login(form: FormGroup){

    const correo= form.value.correo;
    const password= form.value.contra;

    this.loginService.LoginMejorado(correo,password);


  }

  public get ControlFormulario():any{
    return this.formularioDeUsuario.controls;

  }

    SeleccionarUsuario(){
      //esta funcion me va a servir para la actualizacion de los datos entregados por los sensores

    return this.usuarioService.encontrarIndice(this.Listemp,this.formularioDeUsuario.value.correo,this.formularioDeUsuario.value.contra)
  } 

  

  



}
