import { Books } from './books.model';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from './pagination-books.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.baseUrl;

  private booksLista: Books[] = [];

  // private booksLista: Books[] = [
  //   {
  //     libroId: 1,
  //     titulo: 'Python',
  //     descripcion: 'Inicios de python',
  //     autor: 'AuthorPython',
  //     precio: 23,
  //   },
  //   {
  //     libroId: 2,
  //     titulo: 'Padre rico padre pobre',
  //     descripcion: 'Libro autoayuda',
  //     autor: 'Robert T',
  //     precio: 32,
  //   },
  //   {
  //     libroId: 3,
  //     titulo: 'Piense y hagase rico',
  //     descripcion: 'Libro autoayuda',
  //     autor: 'Napoleion hill',
  //     precio: 43,
  //   },
  //   {
  //     libroId: 4,
  //     titulo: 'Los secretos de la mente millonaria',
  //     descripcion: 'Autoayuda',
  //     autor: 'T harv eker',
  //     precio: 40,
  //   },
  //   {
  //     libroId: 5,
  //     titulo: 'Inquebrantable',
  //     descripcion: 'Autoayuda',
  //     autor: 'Daniel Habit',
  //     precio: 54,
  //   },
  //   {
  //     libroId: 6,
  //     titulo: 'Club de las 5 de la mañana',
  //     descripcion: 'Autoayuda',
  //     autor: 'Robin Sharma',
  //     precio: 54,
  //   },
  //   {
  //     libroId: 7,
  //     titulo: 'El Origen de las especies',
  //     descripcion: 'Ciencia',
  //     autor: 'Charles Darwin',
  //     precio: 54,
  //   },
  //   {
  //     libroId: 8,
  //     titulo: 'El codigo da vinci',
  //     descripcion: 'ficcion',
  //     autor: 'Dan Brown',
  //     precio: 54,
  //   },
  //   {
  //     libroId: 9,
  //     titulo: 'Cien años de soledad',
  //     descripcion: 'ficcion',
  //     autor: 'Gabriel García Marquez',
  //     precio: 54,
  //   }
  // ];

  bookSubject = new Subject();

  bookPagination!: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  constructor(private http: HttpClient){}

  obtenerLibros(libroPorPagina: number,
    paginaActual: number,
    sort: string,
    sortDirection: string,
    filterValue: any){
    // return this.booksLista.slice();
    const request = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort: sort,
      sortDirection: sortDirection,
      filterValue: filterValue
    };

    this.http.post<PaginationBooks>(this.baseUrl + 'api/libro/Pagination', request)
    .subscribe((data) =>{
      this.bookPagination = data;
      this.bookPaginationSubject.next(this.bookPagination);
    });
  }

  obtenerActualListener(){
    return this.bookPaginationSubject.asObservable();
  }

  guardarLibro(book: Books){

    this.http.post(this.baseUrl + 'api/libro', book)
    .subscribe((response) => {
      this.bookSubject.next(book);
    });
  }

  guardarLibroListener(){
    return this.bookSubject.asObservable();
  }
}
