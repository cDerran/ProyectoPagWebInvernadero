  import { Component,ElementRef,HostListener, Renderer2  } from '@angular/core';
  import { LoginService } from 'src/app/Servicios/login.service';
  import { UsuarioService } from 'src/app/Servicios/usuario.service';
  import { Subscription } from 'rxjs';
  import { Router } from "@angular/router";

  @Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
  export class NavbarComponent {
      user: any;
      isCollapsed = true;
      tipoUsuario: string ='';
      private listener: () => void;
      userSubscription!: Subscription;

    constructor(
      private loginService:LoginService,
      private userService: UsuarioService,
      private renderer: Renderer2,
      private el: ElementRef,
      private router: Router
    ){ 

      this.userSubscription = this.loginService.getUserState().subscribe((user) => {
       
        this.user = user;
        if (this.user && this.user.uid) {
          this.obtenerTipoUsuario(this.user.uid);
        } else {
          this.tipoUsuario = '';
        }
      });
      
      
        this.listener = this.renderer.listen('document', 'click', (event) => {
          if (!this.el.nativeElement.contains(event.target) && !this.isCollapsed) {
            this.isCollapsed = true;
          }
        });

      
    }

    
    obtenerTipoUsuario(uid: string) {
      
      this.userService.getTipoUsuario(uid).subscribe(
        (tipo: string) => {
          this.tipoUsuario = tipo;
        },
        (error) => {
          console.error('Error al acceder a los datos del usuario.');
        }
      );
      
    }

    logout() {
      if (this.userSubscription) {
        this.userSubscription.unsubscribe();
      }
      this.tipoUsuario = '';
      this.user= null;
      this.loginService.logout().then(() => {
        // Esto redirige al usuario a la página de login y recarga la aplicación
        this.router.navigate(['/Login']).then(() => {
          window.location.reload();
        });
      }).catch(error => {
        console.error('Error durante el cierre de sesión:', error);
      });
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

  }