import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import { Contribucion } from '../../modelo/contribuciones/contribucion';
import { ContribuyenteFisica } from '../../modelo/contribuyentes/contribuyente-fisica';
import { ContribuyenteMoral } from '../../modelo/contribuyentes/contribuyente-moral';
import { Factura } from '../../modelo/linea-captura/factura';
import { FacturasNoPagadasDTO } from '../../modelo/linea-factura/facturas-no-pagadas-dto';

@Injectable({
  providedIn: 'root'
})
export class LineaCapturaService {

  public urlEndPoint: string =environment.baseUrl+"/api/facturas";
  public urlExisteContribucion: string =environment.baseUrl+"/api/facturas-contribuyente";
  public urlExisteFactura: string =environment.baseUrl+"/api/obtenerFactura";
  public urlpagoPendiente: string =environment.baseUrl+"/api/facturas-Pendientecontribuyente";
  public urlpagosPendientes: string =environment.baseUrl+"/api/facturas/pagosPendientes";
  public urlContribucion: string =environment.baseUrl+"/api/contribucion";
  public urlContribuyenteFisica: string =environment.baseUrl+"/api/contribuyenteFisica";
  public urlContribuyenteMoral: string =environment.baseUrl+"/api/contribuyenteMoral";
  public httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  public _factura:Factura;
  constructor(
    public httpCliente: HttpClient,
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

  public get factura():Factura{
    return this._factura;
  }

  public set factura(factura:Factura){
    this._factura=factura;
  }

  getFactura(id:number):Observable<Factura>{
    return this.httpCliente.get<Factura>(this.urlEndPoint+'/'+id,{headers:this.agregarAuthorizationHeader()});
  }

  filtrarContribucion(term:string):Observable<Contribucion[]>{
    return this.httpCliente.get<Contribucion[]>(this.urlContribucion+'/filtrar/'+term,{headers:this.agregarAuthorizationHeader()});
  }

  filtrarContribuyenteFisica(term:string):Observable<ContribuyenteFisica[]>{
    return this.httpCliente.get<ContribuyenteFisica[]>(this.urlContribuyenteFisica+'/filtrar/'+term,{headers:this.agregarAuthorizationHeader()});
  }

  filtrarContribuyenteMoral(term:string):Observable<ContribuyenteMoral[]>{
    return this.httpCliente.get<ContribuyenteMoral[]>(this.urlContribuyenteMoral+'/filtrar/'+term,{headers:this.agregarAuthorizationHeader()});
  }

  createFactura(factura:Factura): Observable<Factura>{
    return this.httpCliente.post<Factura>(this.urlEndPoint,factura,{headers:this.agregarAuthorizationHeader()}).pipe(
      map(response=>{
        response.fecha=formatDate(response.fecha,'yyyy-MM-dd','en-MX');
        return response;
      })
    );
  }
  //verifica si una contribucion ya ha sido pagada antes por el contribuyente
  existeContribucion(id_contribuyente:string,codigo_contribucion:string):Observable<boolean>{
    return this.httpCliente.get<boolean>(this.urlExisteContribucion+'/'+id_contribuyente+'/'+codigo_contribucion,{headers:this.agregarAuthorizationHeader()});
  }

  //verifica si ya paso un mes de generar su captura de pago
  pagoPendiente(id_contribuyente:string,codigo_contribucion:string):Observable<boolean>{
    return this.httpCliente.get<boolean>(this.urlpagoPendiente+'/'+id_contribuyente+'/'+codigo_contribucion,{headers:this.agregarAuthorizationHeader()});
  }
 //regresa una lista con las contriuciones que se paaran anualmente
  pagosPendientes(id_contribuyente:string):Observable<FacturasNoPagadasDTO[]>{
    return this.httpCliente.get<FacturasNoPagadasDTO[]>(this.urlpagosPendientes+'/'+id_contribuyente,{headers:this.agregarAuthorizationHeader()});
  }

  //busca si la linea de captura existe, si es asi regreasara el DTO
  obtenerFacturaContribucion(rmc:string,codigo:string):Observable<Factura>{
    return this.httpCliente.get<Factura>(this.urlExisteFactura+'/'+rmc+'/'+codigo,{headers:this.agregarAuthorizationHeader()});
  }

  //actualiza su estado de pago a pagado y regreasa un DTO
  actualizarPago(factura:Factura):Observable<Factura>{
    return this.httpCliente.put<Factura>(this.urlEndPoint+'/actualizarPago/'+factura.folio,factura,{headers:this.agregarAuthorizationHeader()});
  }
}
