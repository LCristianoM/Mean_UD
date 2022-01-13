import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadSvc } from '../seguiridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private seguridadSvc: SeguridadSvc) { }

  ngOnInit(): void {
  }

  loginUsuario(form: NgForm){
    this.seguridadSvc.login({
      email: form.value.email,
      password: form.value.password
    });
  }

}
