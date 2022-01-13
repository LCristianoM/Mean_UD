import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SeguridadSvc } from "./seguiridad.service";

@Injectable()
export class SeguridadInterceptor implements HttpInterceptor{

  constructor(private seguridadSvc: SeguridadSvc){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
      const tokenSeguridad = this.seguridadSvc.obtenerToken();
      const request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer' + tokenSeguridad)
      });

      return next.handle(request);
  }
}
