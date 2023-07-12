import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SinAuthGuardian {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
        
          this.router.navigate(['/Inicio']);
          return false;
        
        } else {
        
          return true;
        
        }

      })
    );
  }


}
