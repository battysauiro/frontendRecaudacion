import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { Empleado } from '../../modelo/empleados/empleado';
import { Usuario } from '../../modelo/usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(public httpClient:HttpClient,public authService:AuthService,
    public alertService:AlertService) { }

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

  obtenerListaUsuarios(pageNo:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/usuario/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
         //let usuario= response as User[];
         //return usuario.map(usuario=>{
          //usuario.estado=contribuyenteMoral.calle.toUpperCase();
        //contribuyenteMoral.colonia=contribuyenteMoral.colonia.toUpperCase();
        //contribuyenteMoral;
        return response
      }))
    }

    existeUsuarioEmpleado(idEmpleado:string):Observable<boolean>{
      return this.httpClient.get<boolean>(`${environment.baseUrl}/api/usuario/existe-usuario/${idEmpleado}`,{headers:this.agregarAuthorizationHeader()})
    }

    buscarEmpleadoByUsuario(idEmpleado:string):Observable<Usuario>{
      return this.httpClient.get<Usuario>(`${environment.baseUrl}/api/usuario/buscar-empleado/${idEmpleado}`,{headers:this.agregarAuthorizationHeader()})
    }

    //busca por termino a todos los usuarios de los municipios
    buscarTerminoUsuario(pageNo: number,term:string,id_municipio:number):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/usuario/filtrar/${pageNo}/municipio/${id_municipio}/term/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
        map((response: any) => {
          return response;
        })
      );
    }

    obtenerListaEmpleados():Observable<Empleado[]>{
      return this.httpClient.get<Empleado[]>(`${environment.baseUrl}/api/empleado`,{headers:this.agregarAuthorizationHeader()})
      }

    crearUsuario(usuario:Usuario):Observable<Usuario>{
      return this.httpClient.post<Usuario>(`${environment.baseUrl}/api/usuario`,usuario,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(e.status==302){
          this.alertService.error('YA EXISTE UN CORREO ASOCIADO', this.options);
        }
        return throwError(e);
      })
    );
  }

  obtenerUsuario(id):Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${environment.baseUrl}/api/usuario/${id}`,{headers:this.agregarAuthorizationHeader()});
  }

  //se obtiene la lista de usuarios por el municipio seleccionado
  obtenerListaUsuarioPorMunicipio(pageNo:number,idMunicipio:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/usuario/${pageNo}/municipio/${idMunicipio}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        return response
      }));
  }

  actualizarUsuario(usuario:Usuario):Observable<Usuario>{
    return this.httpClient.put<Usuario>(`${environment.baseUrl}/api/usuario/${usuario.email}`,usuario,{headers:this.agregarAuthorizationHeader()});
  }

  eliminarUsuarioByEstado(usuario:Usuario):Observable<Usuario>{
    return this.httpClient.put<Usuario>(`${environment.baseUrl}/api/usuario/eliminar/${usuario.email}`,usuario,{headers:this.agregarAuthorizationHeader()});
  }

  actualizarDatosUsuario(usuario:Usuario):Observable<Usuario>{
    return this.httpClient.put<Usuario>(`${environment.baseUrl}/api/usuario/actualizarDatos/${usuario.email}`,usuario,{headers:this.agregarAuthorizationHeader()});
  }

  actualizarEstado(usuario:Usuario,estado:boolean):Observable<Usuario>{
    return this.httpClient.put<Usuario>(`${environment.baseUrl}/api/usuario/${usuario.email}/${estado}`,usuario,{headers:this.agregarAuthorizationHeader()});
  }

  subirFoto(archivo:File,username):Observable<Usuario>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("username",username);
    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token!=null){
      httpHeaders=httpHeaders.append('Authorization','Bearer '+token)
    }
    return this.httpClient.post(`${environment.baseUrl}/api/usuario/upload`,formData,{headers:httpHeaders}).pipe(
      map((response: any)=> response.usuario as Usuario)
    );
  }

  eliminarUsuario(id:string):Observable<Object>{
    return this.httpClient.delete(`${environment.baseUrl}/api/usuario/${id}`,{headers:this.agregarAuthorizationHeader()});
  }
}
