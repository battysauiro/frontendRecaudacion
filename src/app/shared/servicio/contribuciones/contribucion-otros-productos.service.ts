import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { ContribucionOtrosProductos } from '../../modelo/contribuciones/contribucion-otros-productos';

@Injectable({
  providedIn: 'root',
})
export class ContribucionOtrosProductosService {
  public httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    public httpClient: HttpClient,
    public authService: AuthService,
    public alertService: AlertService
  ) {}

  public agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  obtenerListaCOtrosProductos(pageNo: number): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/otrosProductos/page/${pageNo}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  buscarTerminoContribucionOtrosProductos(pageNo: number,term:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/otrosProductos/filtrar/${pageNo}/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        return response;
      }),
    );
  }

  crearCOtrosProductos(
    otroProductos: ContribucionOtrosProductos
  ): Observable<ContribucionOtrosProductos> {
    return this.httpClient
      .post<ContribucionOtrosProductos>(`${environment.baseUrl}/api/otrosProductos`, otroProductos, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (e.status == 302) {
            this.alertService.error(
              'YA EXISTE UNA CONTRIBUCION CON ESTA INFORMACION',
              this.options
            );
          }
          return throwError(e);
        })
      );
  }

  obtenerCOtrosProductos(id): Observable<ContribucionOtrosProductos> {
    return this.httpClient.get<ContribucionOtrosProductos>(
      `${environment.baseUrl}/api/otrosProductos/${id}`,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  actualizarCOtrosProductos(
    otroProductos: ContribucionOtrosProductos
  ): Observable<ContribucionOtrosProductos> {
    return this.httpClient.put<ContribucionOtrosProductos>(
      `${environment.baseUrl}/api/otrosProductos/${otroProductos.codigo_contribucion}`,
      otroProductos,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  eliminarCOtrosProductos(id: string): Observable<Object> {
    return this.httpClient.delete(`${environment.baseUrl}/api/otrosProductos/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }
}
