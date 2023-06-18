import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "src/app/Servicios/login.service";


@Injectable()
export class Guardian implements CanActivate{

    constructor (private loginService: LoginService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        if(this.loginService.Verificatoken()){
            return true;
        }else{
            this.router.navigate(['/Login']);
            return false;
        }
    }

    
}