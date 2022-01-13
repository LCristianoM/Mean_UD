import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from './autor.model';
import { AutoresService } from './autores.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit, OnDestroy {

  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();

  private autorSubscription!: Subscription;
  constructor(private autoresSvc: AutoresService) { }

  ngOnInit(): void {
    this.autoresSvc.obtenerAutores();
    this.autorSubscription =
    this.autoresSvc
    .obtenerActualListener()
    .subscribe((autores: Autor[]) => {
      this.dataSource.data = autores;
    });
  }

  ngOnDestroy(){
    this.autorSubscription.unsubscribe();
  }
}
