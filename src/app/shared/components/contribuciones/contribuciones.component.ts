import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { Contribucion } from '../../modelo/contribuciones/contribucion';
import { ContribucionImpuestos } from '../../modelo/contribuciones/contribucion-impuestos';
import { ContribucionesService } from '../../servicio/contribuciones/contribuciones.service';
import swal from 'sweetalert2';
import { ContribucionDerechosGenerales } from '../../modelo/contribuciones/contribucion-derechos-generales';
import { ContribucionDerechosLicencias } from '../../modelo/contribuciones/contribucion-derechos-licencias';
import { ContribucionMulta } from '../../modelo/contribuciones/contribucion-multa';
import { ContribucionMEbriedad } from '../../modelo/contribuciones/contribucion-m-ebriedad';
import { ContribucionMVehicular } from '../../modelo/contribuciones/contribucion-m-vehicular';
import { ContribucionOtrosProductos } from '../../modelo/contribuciones/contribucion-otros-productos';
import { ContribucionDerechosGService } from '../../servicio/contribuciones/contribucion-derechos-g.service';
import { ContribucionDerechosLicenciasService } from '../../servicio/contribuciones/contribucion-derechos-licencias.service';
import { ContribucionImpuestoService } from '../../servicio/contribuciones/contribucion-impuesto.service';
import { ContribucionMultasEbriedadService } from '../../servicio/contribuciones/contribucion-multas-ebriedad.service';
import { ContribucionMultasVehicularService } from '../../servicio/contribuciones/contribucion-multas-vehicular.service';
import { ContribucionMultasService } from '../../servicio/contribuciones/contribucion-multas.service';
import { ContribucionOtrosProductosService } from '../../servicio/contribuciones/contribucion-otros-productos.service';

interface ContribucionInter {
  value: number;
  viewValue: string;
}

interface ContribucionGroup {
  disabled?: boolean;
  name: string;
  contribucion: ContribucionInter[];
}

@Component({
  selector: 'app-contribuciones',
  templateUrl: './contribuciones.component.html',
  styleUrls: ['./contribuciones.component.css']
})
export class ContribucionesComponent implements OnInit {
  paginador:any;
  pagina: number = 0;
  //variables de contribuciones
  contribuciones:Contribucion[];
  contribucion:any;
  contribucionImpuesto:ContribucionImpuestos;
  contribucionDerechosG:ContribucionDerechosGenerales;
  contribucionDerechosL:ContribucionDerechosLicencias;
  contribucionMultas:ContribucionMulta;
  contribucionMultaE:ContribucionMEbriedad;
  contribucionMultaV:ContribucionMVehicular;
  contribucionOtrosProductos:ContribucionOtrosProductos;
  contribucionControl = new FormControl(false);
  selected:number = 0;
  termino='';
  nivelContribucion=0;


  contribucionGroups: ContribucionGroup[]= [
    {
      name: 'Impuestos',
      contribucion: [
        {value: 1, viewValue: 'Impuestos'},
      ],
    },
    {
      name: 'Derechos',
      contribucion: [
        {value: 2, viewValue: 'Derechos Generales'},
        {value: 3, viewValue: 'Licencias'},
      ],
    },
    {
      name: 'Aprovechamientos',
      disabled: true,
      contribucion: [
        {value: 4, viewValue: 'Multas'},
        {value: 5, viewValue: 'Ebriedad'},
        {value: 6, viewValue: 'Vehicular'},
      ],
    },
    {
      name: 'Otros Productos',
      contribucion: [
        {value: 7, viewValue: 'Otros Productos'},
      ],
    },
  ];
  constructor(
    public contribucionService:ContribucionesService,
    public activatedRoute:ActivatedRoute,
    public authService: AuthService,
    public router:Router,
    public contribucionImpuestoService:ContribucionImpuestoService,
    public contribucionDerechosGService:ContribucionDerechosGService,
    public contribucionDLicenciasService:ContribucionDerechosLicenciasService,
    public contribucionMultasService:ContribucionMultasService,
    public contribucionMVehicularService:ContribucionMultasVehicularService,
    public contribucionMEbriedadService:ContribucionMultasEbriedadService,
    public contribucionOtrosProductosService:ContribucionOtrosProductosService) { }

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params=>{
        let page:number=+params.get('page');
        if(!page){
          page=0;
        }
        this.pagina = page;
        this.obtenerContribuciones(page);
      }
    );
  }

  obtenerContribuciones(page:number){
    this.contribucionService.ObtenerListaContribuciones(page).subscribe(
      response=> {this.contribuciones= response.contenido as Contribucion[];
        this.paginador=response;
      }
    );

  }

  onChange(valor){
    if(valor===1){
      this.router.navigate(['/impuestos']);
    }
    if(valor===2){
      this.router.navigate(['/derechosGeneral']);
    }
    if(valor===3){
      this.router.navigate(['/derechosLicencia']);
    }
    if(valor===4){
      this.router.navigate(['/multa']);
    }
    if(valor===5){
      this.router.navigate(['/multaEbriedad']);
    }
    if(valor===6){
      this.router.navigate(['/multaVehicular']);
    }
    if(valor===7){
      this.router.navigate(['/otrosProductos']);
    }
  }

  eliminarContribucion(contribucion:Contribucion){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribucionService.eliminarContribucion(contribucion.codigo_contribucion).subscribe(response=>{
        this.obtenerContribuciones(this.pagina);
          swal(
            'Contribucion Eliminada!',
            `Contribucion ${contribucion.codigo_contribucion} eliminada con éxito`,
            'success'
          )
        });
      }
    })
  }

  public onSearh(){
    if(this.termino==""){
        this.obtenerContribuciones(this.pagina);
    }else{
      this.contribucionService
      .buscarTerminoContribucion(0,this.termino)
      .subscribe(response => {
        this.contribuciones =response.contenido as Contribucion[];
        this.paginador = response;
      });
    }

  }
  //Obtiene la información de la contribución seleccionada
  public obtenerInfoContribucion(nivelContribucion:number,codigoContribucion:string){
    this.nivelContribucion=nivelContribucion;
    if(nivelContribucion==1){
      this.contribucionImpuestoService
      .ObtenerCImpuesto(codigoContribucion)
      .subscribe(response => {
        this.contribucion =response;
      });
    }
    if(nivelContribucion==2){
      this.contribucionDerechosGService
      .obtenerCDerechoG(codigoContribucion)
      .subscribe(response => {
        this.contribucion =response;
      });
    }
    if(nivelContribucion==3){
      this.contribucionDLicenciasService
      .ObtenerCDerechosLicencias(codigoContribucion)
      .subscribe(response => {
        this.contribucion =response;
      });
    }
    if(nivelContribucion==4){
      this.contribucionMultasService
      .ObtenerCMulta(codigoContribucion)
      .subscribe(response => {
        this.contribucion =response;
      });
    }
    if(nivelContribucion==5){
      this.contribucionMEbriedadService
      .obtenerCMebriedad(codigoContribucion)
      .subscribe(response => {
        this.contribucion =response;
      });
    }
    if(nivelContribucion==6){
      this.contribucionMVehicularService
      .obtenerCMvehicular(codigoContribucion)
      .subscribe(response => {
        this.contribucion =response;
      });
    }
    if(nivelContribucion==7){
      this.contribucionOtrosProductosService
      .obtenerCOtrosProductos(codigoContribucion)
      .subscribe(response => {
        this.contribucion =response;
      });
    }
  }

}
