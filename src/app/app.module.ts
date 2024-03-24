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
import { NavbarComponent } from './componentes/navbar/navbar.component';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Guardian } from './componentes/login/login_guardian';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule,FIREBASE_OPTIONS } from "@angular/fire/compat";
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';



import { LoginService } from './Servicios/login.service';
import { UsuarioService } from './Servicios/usuario.service';
import { NuevoPasswordComponent } from './componentes/nuevo-password/nuevo-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { SensorComponent } from './componentes/sensor/sensor.component';
import { ChartComponent } from './componentes/chart/chart.component';
import { SensorDataService } from './Servicios/sensor-data.service';





@NgModule({
  declarations: [
    AppComponent,
    DetalleRegistroComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    QuienesSomosComponent,
    GestionUsersComponent,
    NavbarComponent,
    NuevoPasswordComponent,
    DashboardComponent,
    SensorComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModalModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    provideFunctions(() => getFunctions()),
    BrowserAnimationsModule
    
  ],
  providers: [
    UsuarioService,
    LoginService,
    SensorDataService,
    UsuarioService,
    Guardian,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
