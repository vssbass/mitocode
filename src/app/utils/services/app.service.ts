import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public user = {
    image: 'assets/img/user2-160x160.jpg',
  };

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private authService: AuthService
    ) {}

  
  logout() {
    sessionStorage.removeItem('token_');
    window.location.reload();
    //this.router.navigate(['/login']);
  }
}
