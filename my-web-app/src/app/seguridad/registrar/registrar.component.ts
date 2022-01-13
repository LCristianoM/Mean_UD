import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadSvc } from '../seguiridad.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private seguridadSvc: SeguridadSvc) { }

  ngOnInit(): void {
  }
  registrarUsuario(form: NgForm){
    this.seguridadSvc.registrarUsuario({
      email: form.value.email,
      password: form.value.password,
      apellidos: form.value.apellidos,
      nombre: form.value.nombre,
      nick: form.value.nick,
      usuarioId: '',
      token: ''
    });
  }

}
