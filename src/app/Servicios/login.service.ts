 import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Firestore,collection, collectionData, } from "@angular/fire/firestore";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";

import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth' 
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { Usuario } from "../Modelos/Usuario";



@Injectable()
export class LoginService{
    userData:any;
    tokencito: string; 
     
    constructor(
        private AngularFirestore: AngularFirestore,
        private router: Router,
        private cookies:CookieService, 
        private firestore: Firestore,
        private auth: AngularFireAuth
    ){
     this.tokencito='';

     this.auth.authState.subscribe(user=>{
        if(user){
            this.userData=user;
            localStorage.setItem('Usuarios',JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('Usuarios')!)
        }else{
            localStorage.setItem("Usuarios","null");
            JSON.parse(localStorage.getItem('Usuarios')!)
        }
     })
    }

    setUsuario(user:any){
        const userRef:AngularFirestoreDocument<any>= this.AngularFirestore.doc(`Usuarios/id`);
        const userData: Usuario={
            Uid: user.uid,
            Nombre: user.Nombre,
            Correo: user.Correo,
            Clave:  user.Clave,
            Telefono: user.Telefono
        };
        return userRef.set(userData,{
            merge:true
        });
    }

     LoginMejorado(correo:string,password:string){
        
            return this.auth.signInWithEmailAndPassword(correo,password)
            .then(result=>{
                this.setUsuario(result.user);
                this.auth.authState.subscribe(user=>{
                    if(user){
                        this.router.navigate(["/Inicio"]);
                    }
                })
            }).catch(error=>{
                console.log(error);
            })
        
    }

    getUsuario():Observable<any[]>{
        if(this.cookies.get("token")!=''){
            const RegRef = collection(this.firestore,'Usuarios');
        return collectionData(RegRef,{idField:'id'}) as Observable<any[]>
        }else{
            const RegReef = collection(this.firestore,'aa');
            return collectionData(RegReef,{idField:'id'}) as Observable<any[]>
        }
        
    }     

   /*  login(correo:string,password:string){

        firebase.auth().signInWithEmailAndPassword(correo,password).then(
            Response=> {
                firebase.auth().currentUser?.getIdToken().then(
                    token=>{
                        this.tokencito = token;
                        this.cookies.set("token",this.tokencito);
                        this.router.navigate(['/DetallePlanta']);
                    }
                )
            }

        );
    } */
    

    getUid(){
        const user = firebase.auth().currentUser;
        if(user===null){
            return null;
        }else{
            return user.uid;
        }
    } 


    getIdToken(){
        return this.cookies.get('token');
    }


    Verificatoken(){
        
        return this.cookies.get('token');
    }

    Logout(){
        firebase.auth().signOut().then(()=>{
            this.tokencito = '';
            this.cookies.set('token',this.tokencito);
            this.router.navigate(['/Inicio']);
            window.location.reload();
        });
    }
}



