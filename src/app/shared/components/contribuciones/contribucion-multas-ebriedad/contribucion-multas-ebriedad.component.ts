import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContribucionMEbriedad } from 'src/app/shared/modelo/contribuciones/contribucion-m-ebriedad';
import { ContribucionMultasEbriedadService } from 'src/app/shared/servicio/contribuciones/contribucion-multas-ebriedad.service';
import { AuthService } from 'src/app/usuario-login/auth.service';
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
  selector: 'app-contribucion-multas-ebriedad',
  templateUrl: './contribucion-multas-ebriedad.component.html',
  styleUrls: ['./contribucion-multas-ebriedad.component.css']
})
export class ContribucionMultasEbriedadComponent implements OnInit {

  paginador:any;
  pagina: number = 0;
  contribucionesMEbriedad:ContribucionMEbriedad[];
  contribucionControl = new FormControl(false);
  selected:number =5;
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
    public contribucionMEbriedadService:ContribucionMultasEbriedadService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerContribucionesMEbriedad(page);
     }
     );
  }

  public obtenerContribucionesMEbriedad(page:number){
    this.contribucionMEbriedadService.obtenerListaCMebriedad(page).subscribe(
      response=> {this.contribucionesMEbriedad= response.contenido as ContribucionMEbriedad[];
        this.paginador=response;
      }
    );
  }

  eliminarContribucionMEbriedad(contribucion:ContribucionMEbriedad){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribucionMEbriedadService.eliminarCMebriedad(contribucion.codigo_contribucion).subscribe(response=>{
        this.obtenerContribucionesMEbriedad(this.pagina);
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

}
