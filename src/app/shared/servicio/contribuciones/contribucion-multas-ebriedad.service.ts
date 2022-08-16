import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { ContribucionMEbriedad } from '../../modelo/contribuciones/contribucion-m-ebriedad';

@Injectable({
  providedIn: 'root',
})
export class ContribucionMultasEbriedadService {
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

  obtenerListaCMebriedad(pageNo: number): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/multaEbriedad/page/${pageNo}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  buscarTerminoContribucionMEbriedad(pageNo: number,term:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/multaEbriedad/filtrar/${pageNo}/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        return response;
      }),
    );
  }

  crearCMebriedad(
    mEbriedad: ContribucionMEbriedad
  ): Observable<ContribucionMEbriedad> {
    return this.httpClient
      .post<ContribucionMEbriedad>(`${environment.baseUrl}/api/multaEbriedad`, mEbriedad, {
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

  obtenerCMebriedad(id): Observable<ContribucionMEbriedad> {
    return this.httpClient.get<ContribucionMEbriedad>(
      `${environment.baseUrl}/api/multaEbriedad/${id}`,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  actualizarCMebriedad(
    mEbriedad: ContribucionMEbriedad
  ): Observable<ContribucionMEbriedad> {
    return this.httpClient.put<ContribucionMEbriedad>(
      `${environment.baseUrl}/api/multaEbriedad/${mEbriedad.codigo_contribucion}`,
      mEbriedad,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  eliminarCMebriedad(id: string): Observable<Object> {
    return this.httpClient.delete(`${environment.baseUrl}/api/multaEbriedad/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }
}
