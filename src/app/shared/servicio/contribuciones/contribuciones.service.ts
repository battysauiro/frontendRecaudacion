import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContribucionesService {

  public httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(
    public httpClient:HttpClient,
    public authService:AuthService) { }

    public agregarAuthorizationHeader(){
      let token= this.authService.token;
      if(token!=null){
        return this.httpHeaders.append('Authorization','Bearer '+token);
      }
      return this.httpHeaders;
    }

    ObtenerListaContribuciones(pageNo:number):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/contribucion/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
        map((response:any)=>{
          return response
        }))
  }

  eliminarContribucion(id:string):Observable<Object>{
    return this.httpClient.delete(`${environment.baseUrl}/api/contribucion/${id}`,{headers:this.agregarAuthorizationHeader()});
  }
}
