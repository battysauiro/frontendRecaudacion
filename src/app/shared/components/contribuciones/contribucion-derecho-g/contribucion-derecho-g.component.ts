import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContribucionDerechosGenerales } from 'src/app/shared/modelo/contribuciones/contribucion-derechos-generales';
import { ContribucionDerechosGService } from 'src/app/shared/servicio/contribuciones/contribucion-derechos-g.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

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
  selector: 'app-contribucion-derecho-g',
  templateUrl: './contribucion-derecho-g.component.html',
  styleUrls: ['./contribucion-derecho-g.component.css']
})
export class ContribucionDerechoGComponent implements OnInit {

  paginador:any;
  pagina: number = 0;
  contribucionesDerechosG:ContribucionDerechosGenerales[];
  contribucionControl = new FormControl(false);
  selected:number =2;
  termino='';
  urlEndPoint: string = environment.baseUrl;
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
    public activatedRoute:ActivatedRoute,
    public authService:AuthService,
    public contribucionDerechosGService:ContribucionDerechosGService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerContribucionesDGenerales(page);
     }
     );
  }

  obtenerContribucionesDGenerales(page:number){
    this.contribucionDerechosGService.obtenerListaCDerechoG(page).subscribe(
      response=> {this.contribucionesDerechosG= response.contenido as ContribucionDerechosGenerales[]
        this.paginador=response;
      }
    );
  }

  eliminarContribucionDGenerales(contribucion:ContribucionDerechosGenerales){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribucionDerechosGService.eliminarCDerechoG(contribucion.codigo_contribucion).subscribe(response=>{
        this.obtenerContribucionesDGenerales(this.pagina);
          swal(
            'Contribucion Eliminada!',
            `Contribucion ${contribucion.codigo_contribucion} eliminada con éxito`,
            'success'
          )
        });
      }
    })
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
    if(valor===undefined){
      this.router.navigate(['/contribuciones']);
    }
  }

  public onSearh(){
    if(this.termino==""){
        this.obtenerContribucionesDGenerales(this.pagina);
    }else{
      this.contribucionDerechosGService
      .buscarTerminoContribucionDGeneral(0,this.termino)
      .subscribe(response => {
        this.contribucionesDerechosG =response.contenido as ContribucionDerechosGenerales[];
        this.paginador = response;
      });
    }

  }

}
