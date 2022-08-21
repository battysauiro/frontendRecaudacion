import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { Empleado } from '../../modelo/empleados/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  public httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(
    public httpClient:HttpClient,
    public authService:AuthService,
    public alertService:AlertService
  ) { }

  public agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

  //se obtiene la lista de empleados en general
  obtenerListaEmpleados(pageNo:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/empleado/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        return response
      }));
    }
    //busca por termino a todos los empleados de los municipios
    buscarTerminoEmpleados(pageNo: number,term:string,id_municipio:number):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/empleado/filtrar/${pageNo}/municipio/${id_municipio}/term/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
        map((response: any) => {
          return response;
        }),
      );
    }

  //se obtiene la lista de empleados por el municipio seleccionado
  obtenerListaEmpleadosPorMunicipio(pageNo:number,idMunicipio:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/empleado/${pageNo}/municipio/${idMunicipio}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        return response
      }));
  }

  crearEmpleado(empleado:Empleado):Observable<Empleado>{
    return this.httpClient.post<Empleado>(`${environment.baseUrl}/api/empleado/`,empleado,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status==302){
          this.alertService.error('YA EXISTE EL EMPLEADO', this.options);
        }
        return throwError(e);
      })
    );
  }
  //obtiene un empleado por su id
  obtenerEmpleado(id):Observable<Empleado>{
    return this.httpClient.get<Empleado>(`${environment.baseUrl}/api/empleado/${id}`,{headers:this.agregarAuthorizationHeader()});
  }

  obtenerEmpleadoByMunicipio(idMunicipio:number,idEmpleado:string):Observable<Empleado>{
    return this.httpClient.get<Empleado>(`${environment.baseUrl}/api/empleado/municipio/${idMunicipio}/empleado/${idEmpleado}`,{headers:this.agregarAuthorizationHeader()});
  }

  actualizarEmpleado(empleado:Empleado):Observable<Empleado>{
    return this.httpClient.put<Empleado>(`${environment.baseUrl}/api/empleado/${empleado.curp}`,empleado,{headers:this.agregarAuthorizationHeader()});
  }

  eliminarEmpleado(id:string):Observable<Object>{
    return this.httpClient.delete(`${environment.baseUrl}/api/empleado/${id}`,{headers:this.agregarAuthorizationHeader()});
  }
}
