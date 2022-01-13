import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SeguridadSvc } from '../../seguridad/seguiridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  estadoUsuario!: boolean;
  usuarioSubscription!: Subscription;

  constructor(private seguridadSvc: SeguridadSvc) { }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadSvc.seguridadCambio.subscribe( status => {
      this.estadoUsuario = status;
    });
  }

  onMenuToggleDispatch(){
    this.menuToggle.emit();
  }

  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
  }

  terminarSesion(){
    this.seguridadSvc.salirSesion();
  }

}
