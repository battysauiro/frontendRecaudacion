import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LineaCapturaService } from '../shared/servicio/lineas-captura/linea-captura.service';

@Injectable({
  providedIn: 'root'
})
export class GuardContribuyenteExisteGuard implements CanActivate {

  constructor(public facturasService: LineaCapturaService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.facturasService.factura){
        this.facturasService.factura=undefined;
        return true;
      }

    return false;
  }

}
