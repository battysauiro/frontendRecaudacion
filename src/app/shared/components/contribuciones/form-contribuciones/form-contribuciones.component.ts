import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalogo } from 'src/app/shared/modelo/contribuciones/catalogo';
import { ContribucionImpuestos } from 'src/app/shared/modelo/contribuciones/contribucion-impuestos';
import { TipoPago } from 'src/app/shared/modelo/contribuciones/tipo-pago';
import { ContribucionImpuestoService } from 'src/app/shared/servicio/contribuciones/contribucion-impuesto.service';
import { ContribucionesService } from 'src/app/shared/servicio/contribuciones/contribuciones.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-contribuciones',
  templateUrl: './form-contribuciones.component.html',
  styleUrls: ['./form-contribuciones.component.css']
})
export class FormContribucionesComponent implements OnInit {

  contribucionImpuesto= new ContribucionImpuestos();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[];
  tImpuestos:Catalogo[];
  idFound=false;
  tipoContribucion:number=0;//aqui decidira cual vista mostrar
  constructor(
    public contribucionesService:ContribucionesService,
    public router:Router,
    public activatedRouter:ActivatedRoute,
    public contribucionImpuestoService:ContribucionImpuestoService
  ) { }

  ngOnInit(): void {
    this.cargarContribucion();
    this.obtenerTipoPago();
    this.obtenerDescripciones();

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

  irDerechosMultas(){
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

  compararTImpuesto(o1:Catalogo,o2:Catalogo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_catalogo===o2.id_catalogo;
  }

  public vacio(){
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

}
