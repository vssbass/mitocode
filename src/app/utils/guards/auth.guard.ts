import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  CanLoad
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router) {}
    
  canActivate(

  ):Observable<boolean> | boolean
  {
    return this.authService.validarAcceso()
    .pipe(
      tap(valid =>{
        if(!valid){
          this.router.navigateByUrl('/login');
        }
      })
    )

  }

  canLoad(): Observable<boolean> | boolean {
    
    return this.authService.validarAcceso()
    .pipe(
      tap(valid =>{
        if(!valid){
          this.router.navigateByUrl('/login');
        }
      })
    )
  }
  
  canActivateChild(

  ):Observable<boolean> | boolean
    {
      return this.authService.validarAcceso()
    .pipe(
      tap(valid =>{
        if(!valid){
          this.router.navigateByUrl('/auth');
        }
      })
    )

  }
}
