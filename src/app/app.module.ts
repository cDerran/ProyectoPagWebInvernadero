import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DetalleRegistroComponent } from './componentes/detalle-registro/detalle-registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { GestionUsersComponent } from './componentes/gestion-users/gestion-users.component';

import { Guardian } from './componentes/login/login_guardian';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule,FIREBASE_OPTIONS } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';



import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './Servicios/login.service';
import { UsuarioService } from './Servicios/usuario.service';
import { NavbarComponent } from './componentes/navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    DetalleRegistroComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    QuienesSomosComponent,
    GestionUsersComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    UsuarioService,
    GestionUsersComponent,
    LoginService,CookieService,
    Guardian,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
