import { Subject } from 'rxjs';

import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SeguridadSvc {
  private token!: string;
  baseUrl = environment.baseUrl;

  seguridadCambio = new Subject<boolean>();
  private usuario!: Usuario;

  obtenerToken(): string{
    return this.token;
  }

  constructor(private router: Router, private http: HttpClient ){

  }

  registrarUsuario(usr: Usuario) {
    this.usuario = {
      email: usr.email,
      usuarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usr.nombre,
      apellidos: usr.apellidos,
      nick: usr.nick,
      password: '',
      token: ''
    };
    this.seguridadCambio.next(true);
    this.router.navigate(['/']);
  }

  login(loginData: LoginData) {
    // this.usuario = {
    //   email: loginData.email,
    //   usuarioId: Math.round(Math.random() * 10000).toString(),
    //   nombre: '',
    //   apellidos: '',
    //   nick: '',
    //   password: '',
    // };
    // this.seguridadCambio.next(true);
    // this.router.navigate(['/']);

    this.http.post<Usuario>(this.baseUrl + 'usuario/login', loginData)
      .subscribe( (response) => {
        console.log('login response', response);

        this.token = response.token;
        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellidos: response.apellidos,
          token: response.token,
          password: '',
          nick: response.nick,
          usuarioId: response.usuarioId,
        };
        this.seguridadCambio.next(true);
        this.router.navigate(['/']);
      });
  }

  salirSesion() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return {...this.usuario};
  }

  onSesion(){
    return this.usuario!= null;
  }
}
