import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { GestionUsersComponent } from './componentes/gestion-users/gestion-users.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { SensorComponent } from './componentes/sensor/sensor.component';
import { ChartComponent } from './componentes/chart/chart.component';
import { ViewMinMaxComponent } from './componentes/view-min-max/view-min-max.component';
import { DetalleSensorComponent } from './componentes/detalle-sensor/detalle-sensor.component';
import { GestionSensoresComponent } from './componentes/gestion-sensores/gestion-sensores.component';
import { HistorialSensorComponent } from './componentes/historial-sensor/historial-sensor.component';
import { GestionUsersSensorsComponent } from './componentes/gestion-users-sensors/gestion-users-sensors.component';
import { NuevoPasswordComponent } from './componentes/nuevo-password/nuevo-password.component';
import { AgregarSensorModalComponent } from './componentes/agregar-sensor-modal/agregar-sensor-modal.component';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Guardian } from './componentes/login/login_guardian';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective,provideCharts,withDefaultRegisterables} from 'ng2-charts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule,FIREBASE_OPTIONS } from "@angular/fire/compat";
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';



import { LoginService } from './Servicios/login.service';
import { UsuarioService } from './Servicios/usuario.service';
import { SensorDataService } from './Servicios/sensor-data.service';







@NgModule({
  declarations: [
    AgregarSensorModalComponent,
    AppComponent,
    ChartComponent,
    DashboardComponent,
    DetalleSensorComponent,
    GestionUsersComponent,
    GestionUsersSensorsComponent,
    GestionSensoresComponent,
    HistorialSensorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NuevoPasswordComponent,
    PageNotFoundComponent,
    QuienesSomosComponent,
    SensorComponent,
    TablaUsuariosComponent,
    ViewMinMaxComponent
    
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BaseChartDirective,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    NgbModalModule,
    NgbModule,
    provideFunctions(() => getFunctions()),
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    UsuarioService,
    provideCharts(withDefaultRegisterables()),
    LoginService,
    SensorDataService,
    UsuarioService,
    Guardian,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
