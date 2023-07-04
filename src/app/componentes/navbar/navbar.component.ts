import { Component,ElementRef,HostListener, ViewChild  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from 'src/app/Servicios/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    user: any;
    isCollapsed: boolean = true;

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

  closeNavbar() {
    this.isCollapsed = true;
  }
  
  NosePuede(){
    alert('no se puede ingresar si no inicio sesion');
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  @ViewChild('navbar', { static: false }) navbar: ElementRef | undefined;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!this.navbar?.nativeElement.contains(targetElement)) {
      this.isCollapsed = true; // Cerrar el navbar
    }
  }

}