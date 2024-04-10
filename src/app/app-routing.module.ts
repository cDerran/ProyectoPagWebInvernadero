import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { Guardian } from './componentes/login/login_guardian';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { GestionUsersComponent } from './componentes/gestion-users/gestion-users.component';
import { SinAuthGuardian } from './Servicios/sin-auth-guardian.service';
import { NuevoPasswordComponent } from './componentes/nuevo-password/nuevo-password.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { GestionSensoresComponent } from './componentes/gestion-sensores/gestion-sensores.component';


const appRoute: Routes=[

  {path: '', component:HomeComponent},
  {path: 'MisionVision', component:HomeComponent},
  {path: 'Nosotros', component:QuienesSomosComponent},
  {path: 'DetallePlanta', component:GestionSensoresComponent, canActivate: [Guardian]},
  {path: 'Login', component:LoginComponent, canActivate: [SinAuthGuardian]},
  {path: 'GestionUsuarios', component:GestionUsersComponent, canActivate: [Guardian]},
  {path: 'Reset-password', component:NuevoPasswordComponent},
  {path: 'Dashboard', component:DashboardComponent, canActivate: [Guardian] },
  {path: '**', component: PageNotFoundComponent }
  
];
@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule] 
})

export class AppRoutingModule { }
