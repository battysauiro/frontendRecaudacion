import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alerts/alert.service';
import { catchError, map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { ContribuyenteFisica } from '../../modelo/contribuyentes/contribuyente-fisica';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment'
import { AuthService } from 'src/app/usuario-login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContribuyentesService {
  public httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public estado: boolean;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(
    public httpClient: HttpClient,
    public authService: AuthService,
    public router: Router,
    public alertService: AlertService
  ) {}

  public agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  //obtiene los contribuyentes Fisicas
  ObtenerListaContribuentes(pageNo:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/contribuyenteFisica/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        let contribuyentesFisica= response.contenido as ContribuyenteFisica[];
        console.log("vamos a mostrar contribuyentes");
        console.log(contribuyentesFisica);
         contribuyentesFisica.map(contribuyenteFisica=>{
          contribuyenteFisica.fecha=formatDate(contribuyenteFisica.fecha,'dd-MM-yyyy','en-MX');
          //contribuyenteMoral.colonia=contribuyenteMoral.colonia.toUpperCase();
          //contribuyenteMoral;
          response.contenido=contribuyentesFisica;
         });
        return response;
        //return response.contenido;
      }),

      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })

    );  //null;// retunr of(contribuyentes)
  }

  public isNoAutorizado(e):boolean{
    if(e.status==401){
      if(this.authService.isAuthenticated()){
        this.authService.logout();

      }
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status==403){
      console.log("usted entro en el 403");
      swal('Acceso denegado',`${this.authService.usuario.username} no tienes acceso a este recurso`,'warning');
      this.router.navigate(['/inicio/contribuyentes']);
      return true;
    }
    if(e.status==500){

      this.alertService.error('LA PERSONA FISICA YA EXISTE', this.options);
      return true;
    }

    if(e.status==302){
      this.alertService.error('LA CURP YA EXISTE', this.options);
      return true;
    }
    return false;
  }
}
