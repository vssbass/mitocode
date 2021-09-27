import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/utils/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {
  public loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required,Validators.minLength(5)]],
    password: ['',[Validators.required, Validators.minLength(3)]]
  })
  public isAuthLoading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  login() {

    const { usuario, password }= this.loginForm.value;
    this.authService.login( usuario, password)
    .subscribe( resp => {
      if(resp.respuesta){
        this.router.navigateByUrl('/dashboard');
      }else{
      
        if(resp.respuesta == false){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: resp.mensaje,
            timer: 2500
          })
        }else if(resp[0].respuesta == 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: resp.mensaje,
            timer: 2500
          })
        }
      
      }
    })
  }
}
