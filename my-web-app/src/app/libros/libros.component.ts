import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
})
export class LibrosComponent implements OnInit, OnDestroy {

  libros = [];
  constructor(private librosSvc: LibrosService) {  }
  private libroSubscription: Subscription;

  eliminarLibro(libro){

  }

  guardarLibro(f){
    if(f.valid){
      this.librosSvc.agregarLibro(f.value.nombreLibro)
    }
  }

  ngOnInit() {
    this.libros = this.librosSvc.obtenerLibros();
    this.libroSubscription = this.librosSvc.librosSubject.subscribe( () => {
      this.libros = this.librosSvc.obtenerLibros();
    })
  }

  ngOnDestroy() {
      this.libroSubscription.unsubscribe();
  }

}
