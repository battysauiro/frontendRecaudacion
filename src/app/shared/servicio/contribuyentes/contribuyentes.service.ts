import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alerts/alert.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { ContribuyenteFisica } from '../../modelo/contribuyentes/contribuyente-fisica';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { ContribuyenteMoral } from '../../modelo/contribuyentes/contribuyente-moral';

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
  /**--------------- CRUD CONTRIBUYENTES FISICAS----------- */
  //obtiene los contribuyentes Fisicas
  ObtenerListaContribuentes(pageNo: number): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/contribuyenteFisica/page/${pageNo}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        map((response: any) => {
          let contribuyentesFisica =
            response.contenido as ContribuyenteFisica[];
          contribuyentesFisica.map((contribuyenteFisica) => {
            contribuyenteFisica.fecha = formatDate(
              contribuyenteFisica.fecha,
              'yyyy-MM-dd',
              'en-MX'
            );
            response.contenido = contribuyentesFisica;
          });
          return response;
        }),

        catchError((e) => {
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
  }

  crearContribuyenteFisica(contribuyenteFisica:ContribuyenteFisica):Observable<ContribuyenteFisica>{
    return this.httpClient.post<ContribuyenteFisica>(`${environment.baseUrl}/api/contribuyenteFisica`,contribuyenteFisica,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //buscar por termino el contribuyente fisica
  buscarTerminoFisica(pageNo: number,term:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/contribuyenteFisica/filtrar/${pageNo}/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        let contribuyentesFisica =
          response.contenido as ContribuyenteFisica[];
        contribuyentesFisica.map((contribuyenteFisica) => {
          contribuyenteFisica.fecha = formatDate(
            contribuyenteFisica.fecha,
            'yyyy-MM-dd',
            'en-MX'
          );
          response.contenido = contribuyentesFisica;
        });
        return response;
      }),

      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  actualizarPersonaFisica(contribuyenteFisica:ContribuyenteFisica):Observable<ContribuyenteFisica>{
    return this.httpClient.put<ContribuyenteFisica>(`${environment.baseUrl}/api/contribuyenteFisica/${contribuyenteFisica.rfc_contribuyente}`,contribuyenteFisica,{headers:this.agregarAuthorizationHeader()});
  }

  eliminarContribuyenteFisica(id: string): Observable<Object> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/contribuyenteFisica/${id}`,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  /**--------------- CRUD CONTRIBUYENTES MORALES----------- */
  ObtenerListaContribuentesM(pageNo:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/contribuyenteMoral/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map(response=>{
          return response;
      })
    );
  }

  crearContribuyenteMoral(contribuyenteMoral:ContribuyenteMoral):Observable<ContribuyenteMoral>{
    return this.httpClient.post<ContribuyenteMoral>(`${environment.baseUrl}/api/contribuyenteMoral`,contribuyenteMoral,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status==302){
          this.alertService.error('LA PERSONA MORAL YA EXISTE', this.options);
        }
        return throwError(e);
      })
    );
  }
  //buscara contribuyentes morales por el termino
  buscarTerminoMoral(pageNo: number,term:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/contribuyenteMoral/filtrar/${pageNo}/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map(response=>{
          return response;
      })
    );
  }

  actualizarPersonaMoral(contribuyenteMoral:ContribuyenteMoral):Observable<ContribuyenteMoral>{
    return this.httpClient.put<ContribuyenteMoral>(`${environment.baseUrl}/api/contribuyenteMoral/${contribuyenteMoral.rfc_contribuyente}`,contribuyenteMoral,{headers:this.agregarAuthorizationHeader()});
  }

  deleteM(id:string):Observable<Object>{
    return this.httpClient.delete(`${environment.baseUrl}/api/contribuyenteMoral/${id}`,{headers:this.agregarAuthorizationHeader()});
  }

  public isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status == 403) {
      console.log('usted entro en el 403');
      swal(
        'Acceso denegado',
        `${this.authService.usuario.username} no tienes acceso a este recurso`,
        'warning'
      );
      this.router.navigate(['/inicio/contribuyentes']);
      return true;
    }
    if (e.status == 500) {
      this.alertService.error('LA PERSONA FISICA YA EXISTE', this.options);
      return true;
    }

    if (e.status == 302) {
      this.alertService.error('LA CURP YA EXISTE', this.options);
      return true;
    }
    return false;
  }
}
