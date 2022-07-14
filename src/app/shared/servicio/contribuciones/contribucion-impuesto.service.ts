import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';

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
}
