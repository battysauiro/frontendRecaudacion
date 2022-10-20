import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { Rol } from '../../modelo/roles/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(public httpClient:HttpClient,
    public authService:AuthService) { }

    public agregarAuthorizationHeader(){
      let token= this.authService.token;
      if(token!=null){
        return this.httpHeaders.append('Authorization','Bearer '+token);
      }
      return this.httpHeaders;
    }

      obtenerListaRoles(pageNo:number):Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/roles/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
          map((response:any)=>{
            return response
          }))
        }

      obtenerListaRole():Observable<Rol[]>{
          return this.httpClient.get<Rol[]>(`${environment.baseUrl}/api/roles`,{headers:this.agregarAuthorizationHeader()})
        }

      crearRole(role:Rol):Observable<Rol>{
        return this.httpClient.post<Rol>(`${environment.baseUrl}/api/roles`,role,{headers:this.agregarAuthorizationHeader()});
      }

      obtenerRole(id):Observable<Rol>{
        return this.httpClient.get<Rol>(`${environment.baseUrl}/api/roles/${id}`,{headers:this.agregarAuthorizationHeader()});
      }

      actualizarRole(role:Rol):Observable<Rol>{
        return this.httpClient.put<Rol>(`${environment.baseUrl}/api/roles/${role.id_rol}`,role,{headers:this.agregarAuthorizationHeader()});
      }


      delete(id:number):Observable<Object>{
        return this.httpClient.delete(`${environment.baseUrl}/api/roles/${id}`,{headers:this.agregarAuthorizationHeader()});
      }
}
