import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination-books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  timeOut: any = null;
  bookData: Books[] = [];
  desplegarColumnas = ["titulo", "descripcion", "autor", "precio"];
  dataSource = new MatTableDataSource<Books>();

  @ViewChild(MatSort) ordernamiento!: MatSort;
  @ViewChild(MatPaginator) paginacion!: MatPaginator;

  private bookSubscription!: Subscription;

  totalLibros = 0;
  libroPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection!: 'asc';
  filterValue = null;

  constructor(private booksService: BooksService, private dialog: MatDialog) { }

  eventoPaginador(event: PageEvent){
    this.libroPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.booksService.obtenerLibros(this.libroPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue);
  }

  ordenarColumna(event){

    this.sort = event.active;
    this.sortDirection = event.direction;
    this.booksService.obtenerLibros(this.libroPorPagina,
      this.paginaActual,
      event.active,
      event.direction,
      this.filterValue);
  }

  hacerFiltro(event: any){
    clearTimeout(this.timeOut);
    let $this = this;

    this.timeOut = setTimeout( () => {

      if(event.keyCode != 13){
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value
        };

        $this.filterValue = filterValueLocal;

        $this.booksService.obtenerLibros(
          $this.libroPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal);
      }
    }, 1000)
  }

  abrirDialog(){
    const dialogRef = this.dialog.open(BookNuevoComponent, {
      width: '550px'
    });
    dialogRef.afterClosed()
    .subscribe(() => {
      this.booksService.obtenerLibros(this.libroPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue);
    });
  }

  ngOnInit(): void {
    // this.bookData = this.booksService.obtenerLibros();
    this.booksService.obtenerLibros(this.libroPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue);
    this.booksService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros = pagination.totalRows;
      })
  }

  ngAfterViewInit(){
      this.dataSource.sort = this.ordernamiento;
      this.dataSource.paginator = this.paginacion;
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
  }
}
