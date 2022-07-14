import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { ContribucionMVehicular } from '../../modelo/contribuciones/contribucion-m-vehicular';

@Injectable({
  providedIn: 'root',
})
export class ContribucionMultasVehicularService {
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

  obtenerListaCMvehicular(pageNo: number): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/multaVehicular/page/${pageNo}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  crearCMvehicular(
    mVehicular: ContribucionMVehicular
  ): Observable<ContribucionMVehicular> {
    return this.httpClient
      .post<ContribucionMVehicular>(`${environment.baseUrl}/api/multaVehicular`, mVehicular, {
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

  obtenerCMvehicular(id): Observable<ContribucionMVehicular> {
    return this.httpClient.get<ContribucionMVehicular>(
      `${environment.baseUrl}/api/multaVehicular/${id}`,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  actualizarCMvehicular(
    mVehicular: ContribucionMVehicular
  ): Observable<ContribucionMVehicular> {
    return this.httpClient.put<ContribucionMVehicular>(
      `${environment.baseUrl}/api/multaVehicular/${mVehicular.codigo_contribucion}`,
      mVehicular,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  eliminarCMvehicular(id: string): Observable<Object> {
    return this.httpClient.delete(`${environment.baseUrl}/api/multaVehicular/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }
}
