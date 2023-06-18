import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalleRegistroComponent } from './componentes/detalle-registro/detalle-registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';

import{ FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { initializeApp,provideFirebaseApp,getApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { DataService } from './Servicios/data.service';
import { LoginService } from './Servicios/login.service';
import { UsuarioService } from './Servicios/usuario.service';
import { InfoSensorService } from './Servicios/infosensor.service';
import { Guardian } from './componentes/login/login_guardian';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    DetalleRegistroComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    QuienesSomosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()) 
  ],
  providers: [DataService,UsuarioService,LoginService,CookieService,Guardian,InfoSensorService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
