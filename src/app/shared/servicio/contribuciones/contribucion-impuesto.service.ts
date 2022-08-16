import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { ContribucionImpuestos } from '../../modelo/contribuciones/contribucion-impuestos';

@Injectable({
  providedIn: 'root'
})
export class ContribucionImpuestoService {

  public httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    public httpClient:HttpClient,
    public authService:AuthService,
    public alertService:AlertService) { }

    public agregarAuthorizationHeader(){
      let token= this.authService.token;
      if(token!=null){
        return this.httpHeaders.append('Authorization','Bearer '+token);
      }
      return this.httpHeaders;
    }

    obtenerListaCImpuesto(pageNo:number):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/impuestos/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
        map((response:any)=>{
          return response
        }))
    }

    buscarTerminoContribucionImpuesto(pageNo: number,term:string):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/impuestos/filtrar/${pageNo}/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
        map((response: any) => {
          return response;
        }),
      );
    }

    crearCImpuesto(impuesto:ContribucionImpuestos):Observable<ContribucionImpuestos>{
      return this.httpClient.post<ContribucionImpuestos>(`${environment.baseUrl}/api/impuestos`,impuesto,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE UNA CONTRIBUCION CON ESTA INFORMACION', this.options);
          }
          return throwError(e);
        })
      );
    }

    ObtenerCImpuesto(id):Observable<ContribucionImpuestos>{
      return this.httpClient.get<ContribucionImpuestos>(`${environment.baseUrl}/api/impuestos/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    actualizarCImpuesto(impuesto:ContribucionImpuestos):Observable<ContribucionImpuestos>{
      return this.httpClient.put<ContribucionImpuestos>(`${environment.baseUrl}/api/impuestos/${impuesto.codigo_contribucion}`,impuesto,{headers:this.agregarAuthorizationHeader()});
    }


    eliminarCImpuesto(id:string):Observable<Object>{
      return this.httpClient.delete(`${environment.baseUrl}/api/impuestos/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
