import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { ContribucionDerechosLicencias } from '../../modelo/contribuciones/contribucion-derechos-licencias';

@Injectable({
  providedIn: 'root',
})
export class ContribucionDerechosLicenciasService {
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

  obtenerListaCDerechosLicencias(pageNo: number): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/derechoLicencias/page/${pageNo}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  buscarTerminoContribucionDLicencias(pageNo: number,term:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/derechoLicencias/filtrar/${pageNo}/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => {
        return response;
      }),
    );
  }

  crearCDerechosLicencias(
    dLicencia: ContribucionDerechosLicencias
  ): Observable<ContribucionDerechosLicencias> {
    return this.httpClient
      .post<ContribucionDerechosLicencias>(`${environment.baseUrl}/api/derechoLicencias`, dLicencia, {
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

  ObtenerCDerechosLicencias(id): Observable<ContribucionDerechosLicencias> {
    return this.httpClient.get<ContribucionDerechosLicencias>(
      `${environment.baseUrl}/api/derechoLicencias/${id}`,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  actualizarCDerechosLicencias(
    dLicencia: ContribucionDerechosLicencias
  ): Observable<ContribucionDerechosLicencias> {
    return this.httpClient.put<ContribucionDerechosLicencias>(
      `${environment.baseUrl}/api/derechoLicencias/${dLicencia.codigo_contribucion}`,
      dLicencia,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  eliminarCDerechosLicencias(id: string): Observable<Object> {
    return this.httpClient.delete(`${environment.baseUrl}/api/derechoLicencias/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }
}
