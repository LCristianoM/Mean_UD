import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SeguridadSvc } from "./seguiridad.service";

@Injectable()
export class SeguridadRouter implements CanActivate {
  constructor(
    private seguridadSvc: SeguridadSvc,
    private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.seguridadSvc.onSesion()){
      return true;
    }else{
      this.router.navigate(['/login']);
    }
  }
};
