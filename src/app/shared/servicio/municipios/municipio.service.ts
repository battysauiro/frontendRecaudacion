import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { Municipio } from '../../modelo/municipios/municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(public httpClient:HttpClient,public authService:AuthService,
    public alertService:AlertService) { }

    public httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

    options = {
      autoClose: true,
      keepAfterRouteChange: false
    };

    public agregarAuthorizationHeader(){
      let token= this.authService.token;
      if(token!=null){
        return this.httpHeaders.append('Authorization','Bearer '+token);
      }
      return this.httpHeaders;
    }

    ObtenerListaMunicipios():Observable<Municipio[]>{
      return this.httpClient.get<Municipio[]>(`${environment.baseUrl}/api/municipios`,{headers:this.agregarAuthorizationHeader()})
      }

    obtenerMunicipio(id):Observable<Municipio>{
      return this.httpClient.get<Municipio>(`${environment.baseUrl}/api/municipios/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
