import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContribucionOtrosProductos } from 'src/app/shared/modelo/contribuciones/contribucion-otros-productos';
import { ContribucionOtrosProductosService } from 'src/app/shared/servicio/contribuciones/contribucion-otros-productos.service';
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
  selector: 'app-contribucion-otros-productos',
  templateUrl: './contribucion-otros-productos.component.html',
  styleUrls: ['./contribucion-otros-productos.component.css']
})
export class ContribucionOtrosProductosComponent implements OnInit {

  paginador:any;
  pagina: number = 0;
  contribucionesOtrosP:ContribucionOtrosProductos[];
  contribucionControl = new FormControl(false);
  selected:number =7;
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
    public contribucionOtrosPService:ContribucionOtrosProductosService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerContribucionesOtrosProductos(page);
     }
     );
  }

  public obtenerContribucionesOtrosProductos(page:number){
    this.contribucionOtrosPService.obtenerListaCOtrosProductos(page).subscribe(
      response=> {this.contribucionesOtrosP= response.contenido as ContribucionOtrosProductos[];
        this.paginador=response;
      }
    );
  }

  eliminarContribucionOtrosProductos(contribucion:ContribucionOtrosProductos){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribucionOtrosPService.eliminarCOtrosProductos(contribucion.codigo_contribucion).subscribe(response=>{
        this.obtenerContribucionesOtrosProductos(this.pagina);
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
