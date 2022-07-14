import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContribucionMulta } from 'src/app/shared/modelo/contribuciones/contribucion-multa';
import { ContribucionMultasService } from 'src/app/shared/servicio/contribuciones/contribucion-multas.service';
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
  selector: 'app-contribucion-multas',
  templateUrl: './contribucion-multas.component.html',
  styleUrls: ['./contribucion-multas.component.css']
})
export class ContribucionMultasComponent implements OnInit {

  paginador:any;
  pagina: number = 0;
  contribucionesMultas:ContribucionMulta[];
  contribucionControl = new FormControl(false);
  selected:number =4;
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
        {value: 5, viewValue: 'Vehicular'},
        {value: 6, viewValue: 'Ebriedad'},
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
    public contribucionMultasService:ContribucionMultasService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerContribucionesMultas(page);
     }
     );
  }

  public obtenerContribucionesMultas(page:number){
    this.contribucionMultasService.obtenerListaCMulta(page).subscribe(
      response=> {this.contribucionesMultas= response.contenido as ContribucionMulta[];
        this.paginador=response;
      }
    );
  }

  eliminarContribucionMultas(contribucion:ContribucionMulta){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribucionMultasService.eliminarCMulta(contribucion.codigo_contribucion).subscribe(response=>{
        this.obtenerContribucionesMultas(this.pagina);
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
      this.router.navigate(['/multaVehicular']);
    }
    if(valor===6){
      this.router.navigate(['/multaEbriedad']);
    }
    if(valor===7){
      this.router.navigate(['/otrosProductos']);
    }
    if(valor===undefined){
      this.router.navigate(['/contribuciones']);
    }
  }

}
