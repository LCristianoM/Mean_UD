import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Autor } from "./autor.model";
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AutoresService{
  baseUrl = environment.baseUrl;

  private autoresLista: Autor[] = [];

  autoresSubject = new Subject<Autor[]>();

  constructor(private http: HttpClient){ }

  obtenerAutores(){
    this.http.get<Autor[]>(this.baseUrl + 'api/libreriaAutor')
      .subscribe( (data) => {
        this.autoresLista = data;
        this.autoresSubject.next([...this.autoresLista]);
    })
  }
  obtenerActualListener(){
    return this.autoresSubject.asObservable();
  }
}
