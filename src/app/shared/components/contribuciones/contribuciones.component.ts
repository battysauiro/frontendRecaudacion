import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { Contribucion } from '../../modelo/contribuciones/contribucion';
import { ContribucionesService } from '../../servicio/contribuciones/contribuciones.service';

interface ContribucionInter {
  value: string;
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
  contribuciones:Contribucion[];
  contribucionControl = new FormControl('');
  contribucionGroups: ContribucionGroup[] = [
    {
      name: 'Impuestos',
      contribucion: [
        {value: '1', viewValue: 'Impuestos'},
      ],
    },
    {
      name: 'Derechos',
      contribucion: [
        {value: '2', viewValue: 'Derechos Generales'},
        {value: '3', viewValue: 'Licencias'},
      ],
    },
    {
      name: 'Aprovechamientos',
      disabled: true,
      contribucion: [
        {value: '4', viewValue: 'Multas'},
        {value: '5', viewValue: 'Vehicular'},
        {value: '6', viewValue: 'Ebriedad'},
      ],
    },
    {
      name: 'Otros Productos',
      contribucion: [
        {value: '7', viewValue: 'Otros Productos'},
      ],
    },
  ];
  constructor(
    public contribucionService:ContribucionesService,
    public activatedRoute:ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.obtenerContribuciones(page);
     }
    );
  }

  obtenerContribuciones(page:number){
    this.contribucionService.ObtenerListaContribuciones(page).subscribe(
      response=> {this.contribuciones= response.contenido as Contribucion[]
        this.paginador=response;
      }
    );

  }

}
