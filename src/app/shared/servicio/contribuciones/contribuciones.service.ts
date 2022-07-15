import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { Catalogo } from '../../modelo/contribuciones/catalogo';
import { Periodicidad } from '../../modelo/contribuciones/periodicidad';
import { TipoPago } from '../../modelo/contribuciones/tipo-pago';
import { TipoVehiculo } from '../../modelo/contribuciones/tipo-vehiculo';

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

  obtenerCatalogoDescripcion():Observable<Catalogo[]>{
    return this.httpClient.get<Catalogo[]>(`${environment.baseUrl}/api/catalogoDescripcion`,{headers:this.agregarAuthorizationHeader()})
  }

  obtenerCatalogoImpuesto():Observable<Catalogo[]>{
    return this.httpClient.get<Catalogo[]>(`${environment.baseUrl}/api/catalogoImpuesto`,{headers:this.agregarAuthorizationHeader()})
  }

  obtenerCatalogoDerechos():Observable<Catalogo[]>{
    return this.httpClient.get<Catalogo[]>(`${environment.baseUrl}/api/catalogoDerecho`,{headers:this.agregarAuthorizationHeader()})
  }

  obtenerCatalogoAprovechamiento():Observable<Catalogo[]>{
    return this.httpClient.get<Catalogo[]>(`${environment.baseUrl}/api/catalogoAprovechamiento`,{headers:this.agregarAuthorizationHeader()})
  }

  obtenerCatalogoOtrosProductos():Observable<Catalogo[]>{
    return this.httpClient.get<Catalogo[]>(`${environment.baseUrl}/api/catalogoOtrosProductos`,{headers:this.agregarAuthorizationHeader()})
  }

  obtenerTipoPago():Observable<TipoPago[]>{
    return this.httpClient.get<TipoPago[]>(`${environment.baseUrl}/api/tipoPago`,{headers:this.agregarAuthorizationHeader()})
  }

  obtenerPeriodicidad():Observable<Periodicidad[]>{
    return this.httpClient.get<Periodicidad[]>(`${environment.baseUrl}/api/periodicidad`,{headers:this.agregarAuthorizationHeader()})
  }

  obtenerTipoVehiculo():Observable<TipoVehiculo[]>{
    return this.httpClient.get<TipoVehiculo[]>(`${environment.baseUrl}/api/tipoVehiculo`,{headers:this.agregarAuthorizationHeader()})
  }
}
