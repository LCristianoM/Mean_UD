import { Subject } from "rxjs";

export class LibrosService {

  librosSubject = new Subject();

  private libros = [
    'Libro de la vida',
    'Libro de programcación',
    'Articulo de revista',
    'Como ganar amigos e influir en las personas'
  ];

  agregarLibro(libroNombre: string){
    this.libros.push(libroNombre);
    this.librosSubject.next('');
  }

  eliminarLibro(libroNombre: string){
    this.libros = this.libros.filter(x => x !==libroNombre);
    this.librosSubject.next('');
  }

  obtenerLibros(){
    return [...this.libros];
  }
}
