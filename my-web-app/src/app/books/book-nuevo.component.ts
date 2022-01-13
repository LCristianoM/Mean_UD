import { Autor } from './../autores/autor.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BooksService } from './books.service';
import { AutoresService } from '../autores/autores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: 'book-nuevo.component.html',
})
export class BookNuevoComponent implements OnInit, OnDestroy {
  selectAutor!: string;
  selectAutorTexto!: string;
  fechaPublicacion!: string;

  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  autores: Autor[] = [];
  autorSubscription!: Subscription;

  constructor(
    private booksService: BooksService,
    private dialogRef: MatDialog,
    private autoresSvc: AutoresService
  ) {}

  ngOnInit() {
    //this.autores = this.autoresSvc.obtenerAutores();

    this.autoresSvc.obtenerAutores();
    this.autorSubscription = this.autoresSvc
      .obtenerActualListener()
      .subscribe((autoresBackEnd: Autor[]) => {
        this.autores = autoresBackEnd;
      });
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      const autorRequest = {
        id: this.selectAutor,
        nombreCompleto: this.selectAutorTexto,
      };

      const libroRequest = {
        id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion),
      };

      this.booksService.guardarLibro(libroRequest);
      this.autorSubscription = this.booksService.guardarLibroListener()
      .subscribe(() => {
        this.dialogRef.closeAll();
      });
    }
  }

  ngOnDestroy() {
    this.autorSubscription.unsubscribe();
  }
}
