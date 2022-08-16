import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { ContribucionDerechosGenerales } from '../../modelo/contribuciones/contribucion-derechos-generales';

@Injectable({
  providedIn: 'root'
})
export class ContribucionDerechosGService {

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

    obtenerListaCDerechoG(pageNo:number):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/derechoGeneral/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
        map((response:any)=>{
          return response
        }));
      }

      buscarTerminoContribucionDGeneral(pageNo: number,term:string):Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/derechoGeneral/filtrar/${pageNo}/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
          map((response: any) => {
            return response;
          }),
        );
      }

      crearCDerechoG(derechoG:ContribucionDerechosGenerales):Observable<ContribucionDerechosGenerales>{
        return this.httpClient.post<ContribucionDerechosGenerales>(`${environment.baseUrl}/api/derechoGeneral`,derechoG,{headers:this.agregarAuthorizationHeader()}).pipe(
          catchError(e=>{
            if(e.status==302){
              this.alertService.error('YA EXISTE UNA CONTRIBUCION CON ESTA INFORMACION', this.options);
            }
            return throwError(e);
          })
        );
      }

    obtenerCDerechoG(id):Observable<ContribucionDerechosGenerales>{
      return this.httpClient.get<ContribucionDerechosGenerales>(`${environment.baseUrl}/api/derechoGeneral/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    actualizarCDerechoG(derechoG:ContribucionDerechosGenerales):Observable<ContribucionDerechosGenerales>{
      return this.httpClient.put<ContribucionDerechosGenerales>(`${environment.baseUrl}/api/derechoGeneral/${derechoG.codigo_contribucion}`,derechoG,{headers:this.agregarAuthorizationHeader()});
    }


    eliminarCDerechoG(id:string):Observable<Object>{
      return this.httpClient.delete(`${environment.baseUrl}/api/derechoGeneral/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
