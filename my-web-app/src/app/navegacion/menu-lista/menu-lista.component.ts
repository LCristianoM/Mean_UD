import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { SeguridadSvc } from '../../seguridad/seguiridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();

  estadoUsuario!: boolean;
  usuarioSubscription!: Subscription;

  constructor( private seguridadSvc: SeguridadSvc) { }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadSvc.seguridadCambio.subscribe( status => {
      this.estadoUsuario = status;
    });
  }

  onCerrarMenu(){
    this.menuToggle.emit();
  }

  terminarSesionMenu(){
    this.onCerrarMenu();
    this.seguridadSvc.salirSesion();
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }

}
