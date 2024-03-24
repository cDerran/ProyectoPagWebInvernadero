import { Component,ElementRef,HostListener, Renderer2  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from 'src/app/Servicios/login.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Subscription } from 'rxjs';

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
    router: any;
    userSubscription!: Subscription;

  constructor(
    private loginService:LoginService,
    private auth: AngularFireAuth,
    private userService: UsuarioService,
    private renderer: Renderer2,
    private el: ElementRef
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
    
      this.userService.getTipoUsuario(uid).subscribe((tipo: string) => {
        
        this.tipoUsuario = tipo;
      });
    
  }

   logout(){
    
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    window.location.reload();
    this.tipoUsuario = ''; // Limpiar el tipo de usuario
    this.loginService.logout()

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