import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalogo } from 'src/app/shared/modelo/contribuciones/catalogo';
import { ContribucionDerechosGenerales } from 'src/app/shared/modelo/contribuciones/contribucion-derechos-generales';
import { ContribucionDerechosLicencias } from 'src/app/shared/modelo/contribuciones/contribucion-derechos-licencias';
import { ContribucionImpuestos } from 'src/app/shared/modelo/contribuciones/contribucion-impuestos';
import { ContribucionMVehicular } from 'src/app/shared/modelo/contribuciones/contribucion-m-vehicular';
import { ContribucionMulta } from 'src/app/shared/modelo/contribuciones/contribucion-multa';
import { Periodicidad } from 'src/app/shared/modelo/contribuciones/periodicidad';
import { TipoPago } from 'src/app/shared/modelo/contribuciones/tipo-pago';
import { TipoVehiculo } from 'src/app/shared/modelo/contribuciones/tipo-vehiculo';
import { ContribucionDerechosGService } from 'src/app/shared/servicio/contribuciones/contribucion-derechos-g.service';
import { ContribucionDerechosLicenciasService } from 'src/app/shared/servicio/contribuciones/contribucion-derechos-licencias.service';
import { ContribucionImpuestoService } from 'src/app/shared/servicio/contribuciones/contribucion-impuesto.service';
import { ContribucionMultasVehicularService } from 'src/app/shared/servicio/contribuciones/contribucion-multas-vehicular.service';
import { ContribucionMultasService } from 'src/app/shared/servicio/contribuciones/contribucion-multas.service';
import { ContribucionesService } from 'src/app/shared/servicio/contribuciones/contribuciones.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-contribuciones',
  templateUrl: './form-contribuciones.component.html',
  styleUrls: ['./form-contribuciones.component.css']
})
export class FormContribucionesComponent implements OnInit {

  contribucionImpuesto= new ContribucionImpuestos();
  contribucionDerechosG= new ContribucionDerechosGenerales();
  contribucionDerechosL= new ContribucionDerechosLicencias();
  contribucionMultas= new ContribucionMulta();
  contribucionMVehicular= new ContribucionMVehicular();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[];
  tDerechos:Catalogo[];
  tImpuestos:Catalogo[];
  tAprovechamientos:Catalogo[];
  periodicidades:Periodicidad[];
  tVehiculos:TipoVehiculo[];
  idFound=false;
  tipoContribucion:number=0;//aqui decidira cual vista mostrar
  constructor(
    public contribucionesService:ContribucionesService,
    public router:Router,
    public activatedRouter:ActivatedRoute,
    public contribucionImpuestoService:ContribucionImpuestoService,
    public contribucionDerechosGService:ContribucionDerechosGService,
    public contribucionDLicenciasService:ContribucionDerechosLicenciasService,
    public contribucionMultasService:ContribucionMultasService,
    public contribucionMVehicularService:ContribucionMultasVehicularService
  ) { }

  ngOnInit(): void {
    this.cargarContribucion();
    this.obtenerTipoPago();
    this.obtenerDescripciones();
    this.obtenerPeriodicidad();

  }

  //cargara la contribucion dependiendo el tipo de contribucion
  cargarContribucion(){
    this.activatedRouter.params.subscribe(params=>{
      let id:number=params['id'];
      let tipo:number=params['tipo'];
      this.tipoContribucion=tipo;
      if(tipo==1){
        this.obtenerTipoImpuesto();
        this.idFound=true;
        this.contribucionImpuestoService.ObtenerCImpuesto(id).subscribe(contribucion=>this.contribucionImpuesto=contribucion)
      }
      if(tipo==2){
        this.obtenerTipoDerecho();
        this.idFound=true;
        this.contribucionDerechosGService.obtenerCDerechoG(id).subscribe(contribucion=>this.contribucionDerechosG=contribucion)
      }
      if(tipo==3){
        this.obtenerTipoDerecho();
        this.idFound=true;
        this.contribucionDLicenciasService.ObtenerCDerechosLicencias(id).subscribe(contribucion=>this.contribucionDerechosL=contribucion)
      }
      if(tipo==4){
        this.obtenerTipoAprovechamiento();
        this.idFound=true;
        this.contribucionMultasService.ObtenerCMulta(id).subscribe(contribucion=>this.contribucionMultas=contribucion)
      }
      if(tipo==5){
        this.obtenerTipoAprovechamiento();
        this.obtenerTipoVehiculo();
        this.idFound=true;
        this.contribucionMVehicularService.obtenerCMvehicular(id).subscribe(contribucion=>this.contribucionMVehicular=contribucion)
      }
    });
  }

  //funciones para la contribucion Impuestos
  public crearImpuesto():void{
    this.contribucionImpuestoService.crearCImpuesto(this.contribucionImpuesto).subscribe(
      response=> {this.contribucionImpuesto=response;
                  this.router.navigate(['/impuestos']);
                  swal('Impuesto Agregado',`Impuesto ${this.contribucionImpuesto.codigo_contribucion} añadido con éxito`,'success');
                }
    );
  }

  public actualizarImpuesto():void{
    console.log(this.contribucionImpuesto);
    this.contribucionImpuestoService.actualizarCImpuesto(this.contribucionImpuesto).subscribe(contribucion=>{
      this.router.navigate(['/impuestos']);
      swal('Impuesto Actualizado',`Impuesto ${contribucion.codigo_contribucion} actualizado con éxito`,'success');
    });
  }

  obtenerTipoImpuesto(){
    this.contribucionesService.obtenerCatalogoImpuesto().subscribe(
      response=> {this.tImpuestos= response
      }
    );
  }
  /*------------------------------------------------------------------------*/
  //funciones de la contribucion derechos generales
  public crearDerechoG():void{
    this.contribucionDerechosGService.crearCDerechoG(this.contribucionDerechosG).subscribe(
      response=> {this.contribucionDerechosG=response;
                  this.irDerechosG();
                  swal('Derecho General Agregado',`Derecho General ${this.contribucionDerechosG.codigo_contribucion} añadido con éxito`,'success');
                }
    );
  }

  public actualizarDerechosG():void{
    this.contribucionDerechosGService.actualizarCDerechoG(this.contribucionDerechosG).subscribe(contribucion=>{
      this.irDerechosG();
      swal('Derecho General Actualizado',`Derecho General ${contribucion.codigo_contribucion} actualizado con éxito`,'success');
    });
  }

  obtenerTipoDerecho(){
    this.contribucionesService.obtenerCatalogoDerechos().subscribe(
      response=> {this.tDerechos= response
      }
    );
  }
  /*--------------------------------------------------------------*/
  //funciones de la contribucion derechos licencias
  public crearDerechosL():void{
    this.contribucionDLicenciasService.crearCDerechosLicencias(this.contribucionDerechosL).subscribe(
      response=> {this.contribucionDerechosL=response;
                  this.irDerechosL();
                  swal('Derecho Licencia Agregado',`Derecho Licencia ${this.contribucionDerechosL.codigo_contribucion} añadido con éxito`,'success');
                }
    );
  }

  public actualizarDerechosL():void{
    this.contribucionDLicenciasService.actualizarCDerechosLicencias(this.contribucionDerechosL).subscribe(contribucion=>{
      this.irDerechosL();
      swal('Derecho Licencia Actualizado',`Derecho Licencia ${contribucion.codigo_contribucion} actualizado con éxito`,'success');
    });
  }
  /*--------------------------------------------------------------*/
  //funciones de la contribucion Multas
  public crearMultas():void{
    this.contribucionMultasService.crearCMulta(this.contribucionMultas).subscribe(
      response=> {this.contribucionMultas=response;
                  this.irMultas();
                  swal('Multa Agregada',`Multa ${this.contribucionMultas.codigo_contribucion} añadida con éxito`,'success');
                }
    );
  }

  public actualizarMultas():void{
    this.contribucionMultasService.actualizarCMulta(this.contribucionMultas).subscribe(contribucion=>{
      this.irMultas();
      swal('Multa Actualizada',`Multa ${contribucion.codigo_contribucion} actualizada con éxito`,'success');
    });
  }

  obtenerTipoAprovechamiento(){
    this.contribucionesService.obtenerCatalogoAprovechamiento().subscribe(
      response=> {this.tAprovechamientos= response
      }
    );
  }
  /*--------------------------------------------------------------*/
  //funciones de la contribucion Multas vehiculares
  public crearMVehicular():void{
    this.contribucionMVehicularService.crearCMvehicular(this.contribucionMVehicular).subscribe(
      response=> {this.contribucionMVehicular=response;
                  this.irMultasVehicular();
                  swal('Multa Vehicular Agregada',`Multa ${this.contribucionMVehicular.codigo_contribucion} añadida con éxito`,'success');
                }
    );
  }

  public actualizarMVehicular():void{
    this.contribucionMVehicularService.actualizarCMvehicular(this.contribucionMVehicular).subscribe(contribucion=>{
      this.irMultasVehicular();
      swal('Multa Vehicular Actualizada',`Multa ${contribucion.codigo_contribucion} actualizada con éxito`,'success');
    });
  }

  obtenerTipoVehiculo(){
    this.contribucionesService.obtenerTipoVehiculo().subscribe(
      response=> {this.tVehiculos= response
      }
    );
  }
  /*--------------------------------------------------------------*/
  //funciones de metodos generales
  obtenerTipoPago(){
    this.contribucionesService.obtenerTipoPago().subscribe(
      response=> {this.tipoPagos= response
      }
    );
  }

  obtenerDescripciones(){
    this.contribucionesService.obtenerCatalogoDescripcion().subscribe(
      response=> {this.descripciones= response
      }

    );
  }

  obtenerPeriodicidad(){
    this.contribucionesService.obtenerPeriodicidad().subscribe(
      response=> {this.periodicidades= response
      }
    );
  }

  compararPago(o1:TipoPago,o2:TipoPago){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_pago===o2.id_pago;
  }

  compararDescripcion(o1:Catalogo,o2:Catalogo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_catalogo===o2.id_catalogo;
  }

  compararPeriodicidad(o1:Periodicidad,o2:Periodicidad){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_periodicidad===o2.id_periodicidad;
  }

  //reenvio de rutas
  irImpuestos(){
    this.router.navigate(['/impuestos']);
  }

  irDerechosG(){
    this.router.navigate(['/derechosGeneral']);
  }
  //redirige a derechos licencias
  irDerechosL(){
    this.router.navigate(['/derechosLicencia']);
  }

  irMultas(){
    this.router.navigate(['/multa']);
  }

  irMultasVehicular(){
    this.router.navigate(['/multaVehicular']);
  }

  irMultasEbriedad(){
    this.router.navigate(['/multaEbriedad']);
  }

  irOtrosProductos(){
    this.router.navigate(['/otrosProductos']);
  }
  //comparadores de las contribuciones
  compararTImpuesto(o1:Catalogo,o2:Catalogo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_catalogo===o2.id_catalogo;
  }

  compararTDerecho(o1:Catalogo,o2:Catalogo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_catalogo===o2.id_catalogo;
  }

  compararTAprovechamiento(o1:Catalogo,o2:Catalogo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_catalogo===o2.id_catalogo;
  }

  compararTVehiculo(o1:TipoVehiculo,o2:TipoVehiculo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_tipo_vehiculo===o2.id_tipo_vehiculo;
  }

  //validacion para los campos de cada contribucion
  public vacioImpuesto(){
    if(this.contribucionImpuesto.codigo_contribucion==null || this.contribucionImpuesto.codigo_contribucion=="" ||
      this.contribucionImpuesto.concepto_contribucion==null || this.contribucionImpuesto.concepto_contribucion=="" ||
      this.contribucionImpuesto.id_tipo_pago==null ||
      this.contribucionImpuesto.id_descripcion==null ||
      this.contribucionImpuesto.catalogo_impuesto==null){
        return true;
      }
        else{
          return false;
        }
  }

  public vacioDerechosG(){
    if(this.contribucionDerechosG.codigo_contribucion==null || this.contribucionDerechosG.codigo_contribucion=="" ||
      this.contribucionDerechosG.concepto_contribucion==null || this.contribucionDerechosG.concepto_contribucion=="" ||
      this.contribucionDerechosG.id_tipo_pago==null ||
      this.contribucionDerechosG.id_descripcion==null ||
      this.contribucionDerechosG.catalogo_derechos==null ||
      this.contribucionDerechosG.id_periodicidad==null){
        return true;
      }
        else{
          return false;
        }
  }

  public vacioDerechosL(){
    if(this.contribucionDerechosL.codigo_contribucion==null || this.contribucionDerechosL.codigo_contribucion=="" ||
      this.contribucionDerechosL.concepto_contribucion==null || this.contribucionDerechosL.concepto_contribucion=="" ||
      this.contribucionDerechosL.id_tipo_pago==null ||
      this.contribucionDerechosL.id_descripcion==null ||
      this.contribucionDerechosL.catalogo_derechos==null){
        return true;
      }
        else{
          return false;
        }
  }

  public vacioMultas(){
    if(this.contribucionMultas.codigo_contribucion==null || this.contribucionMultas.codigo_contribucion=="" ||
      this.contribucionMultas.concepto_contribucion==null || this.contribucionMultas.concepto_contribucion=="" ||
      this.contribucionMultas.id_tipo_pago==null ||
      this.contribucionMultas.id_descripcion==null ||
      this.contribucionMultas.id_catalogo==null){
        return true;
      }
        else{
          return false;
        }
  }

  public vacioMVehicular(){
    if(this.contribucionMVehicular.codigo_contribucion==null || this.contribucionMVehicular.codigo_contribucion=="" ||
      this.contribucionMVehicular.concepto_contribucion==null || this.contribucionMVehicular.concepto_contribucion=="" ||
      this.contribucionMVehicular.id_tipo_pago==null ||
      this.contribucionMVehicular.id_descripcion==null ||
      this.contribucionMVehicular.id_catalogo==null ||
      this.contribucionMVehicular.tipo_vehiculo==null ||
      this.contribucionMVehicular.descripcion_articulo==null || this.contribucionMVehicular.descripcion_articulo==""){
        return true;
      }
        else{
          return false;
        }
  }

}
