import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { ContribucionMulta } from '../../modelo/contribuciones/contribucion-multa';

@Injectable({
  providedIn: 'root',
})
export class ContribucionMultasService {
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

  obtenerListaCMulta(pageNo: number): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/aprovechamientoMulta/page/${pageNo}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        map((response: any) => {
          console.log(response.contenido);
          return response;
        })
      );
  }

  crearCMulta(multa: ContribucionMulta): Observable<ContribucionMulta> {
    return this.httpClient
      .post<ContribucionMulta>(`${environment.baseUrl}/api/aprovechamientoMulta`, multa, {
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

  ObtenerCMulta(id): Observable<ContribucionMulta> {
    return this.httpClient.get<ContribucionMulta>(`${environment.baseUrl}/api/aprovechamientoMulta/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  actualizarCMulta(multa: ContribucionMulta): Observable<ContribucionMulta> {
    return this.httpClient.put<ContribucionMulta>(
      `${environment.baseUrl}/api/aprovechamientoMulta/${multa.codigo_contribucion}`,
      multa,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  eliminarCMulta(id: string): Observable<Object> {
    return this.httpClient.delete(`${environment.baseUrl}/api/aprovechamientoMulta/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }
}
