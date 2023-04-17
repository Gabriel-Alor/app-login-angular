import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  public get usuario() {
    return { ...this._usuario };
  }

  constructor( private http: HttpClient ) { }

  public login( email: string, password: string ) {

    const url = `${ this.baseUrl }/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body )
               .pipe(
                  tap( resp => {
                    if( resp.ok ){
                      localStorage.setItem( 'token', resp.token! );
                    }
                  }),
                  map( resp => {
                    return resp.ok;
                  }),
                  // cachar errores y mandar lo que nosotros queramos pero como observable
                  catchError( err => of(err.error.msg) )
               )
  }

  public registrarNuevoUsuario( name: string, email: string, password: string ): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>( url, body )
               .pipe(
                  tap( resp => {
                    if( resp.ok ){
                      localStorage.setItem( 'token', resp.token! );
                    }
                  }),
                  map( resp => {
                    return resp.ok;
                  }),
                  catchError( err => {
                    return of(err.error.msg);
                  })
               )
  }


  public validarToken(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/renew`;
    // crear los headers
    const headers = new HttpHeaders().set( 'x-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>( url, { headers: headers } )
               .pipe(
                map( resp => {
                  localStorage.setItem( 'token', resp.token! );
                  this._usuario = {
                    name: resp.name!,
                    uid: resp.uid!,
                    email: resp.email!
                  }
                  return resp.ok;
                }),
                catchError( error => {
                  return of(false);
                })
               )

  }


  public logout() {
    // borra todo
    // localStorage.clear();
    //borra solo un elemento
    localStorage.removeItem('token');
  }
}
