import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthResponse, UsuarioResponse } from "src/app/models/login.model";
import { dataAsideBar } from "src/app/models/personas.model";
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = {

    image: 'assets/img/user2-160x160.jpg',
  };
  private baseUrl: string = environment.baseUrl;
  private _usuario?: UsuarioResponse;
  private _dataUsuario?: dataAsideBar;

  get Usuario(){
    return {...this._usuario};
  }

  get DataUsuario(){
    return {...this._dataUsuario};
  }
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string){

    const url = `${ this.baseUrl }/login`;
    const body = { usuario: usuario, clave: password};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp =>{
        if(resp.respuesta){     
          sessionStorage.setItem('sesionValida', resp.token);
          this._usuario = {
            
            iduser:  resp.codigo,
            usuario: resp.usuario,
            nombres: resp.nombres,
            descripcion: resp.descripcion
          }
          this._dataUsuario = {
            nombres: resp.nombres,
            codigo: resp.codigo,
            rol: resp.descripcion
           
          }
        }
      }),
      map( resp => resp ),
      catchError(err => of(err.error.msg)
    ))
  }

  validarAcceso(): Observable<boolean>{
    const url = `${ this.baseUrl }/tokens`;
    const headers = new HttpHeaders()
    .set('x-token', sessionStorage.getItem('sesionValida') || '')
    return this.http.get<AuthResponse>(url, { headers } )
    .pipe(
      map( resp => {
        sessionStorage.setItem('sesionValida', resp.token);
        console.log(sessionStorage.getItem('sesionValida'));
        console.log(resp);
        if(resp.respuesta == false){
            return false;
        }else{
          this._usuario = {
            
            iduser:  resp.codigo,
            usuario: resp.usuario,
            nombres: resp.nombres,
            descripcion: resp.descripcion
          }
          this._dataUsuario = {
            nombres: resp.nombres,
            codigo: resp.codigo,
            rol: resp.descripcion
           
          }
            return true;
        }
        
      }),
      catchError( err => of(false))
    )
  }

  logout(){
    sessionStorage.removeItem('sesionValida');
    window.location.reload();
  }
}
