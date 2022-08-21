import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { Empleado } from '../../modelo/empleados/empleado';
import { EmpleadoService } from '../../servicio/empleados/empleado.service';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  paginador:any;
  empleados:Empleado[];
  pagina=0;
  termEmpleado='';
  urlEndPoint: string = environment.baseUrl;
  termino='';

  constructor(public empleadoService:EmpleadoService,
    public activatedRoute:ActivatedRoute,
    public authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerEmpleadosByMunicipio(page);
     }
     );
  }
  //Listara solo a los empleados del municipio seleccionado
  public obtenerEmpleadosByMunicipio(page:number){
    this.empleadoService.obtenerListaEmpleadosPorMunicipio(page,this.authService._usuario.id_municipio).subscribe(
      response=> {this.empleados= response.contenido as Empleado[]
        this.paginador=response;
      }

    );
  }

  eliminarEmpleado(empleado:Empleado){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al empleado  ${empleado.nombre} ${empleado.apellido_p} ${empleado.apellido_m}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.empleadoService.eliminarEmpleado(empleado.curp).subscribe(response=>{
        this.obtenerEmpleadosByMunicipio(this.pagina);
          swal(
            'Empleado Eliminado!',
            `Empleado ${empleado.nombre} ${empleado.apellido_p} ${empleado.apellido_m} eliminado con éxito`,
            'success'
          )
        });
      }
    })
  }

  public onSearh(){

    if(this.termino==""){
      this.obtenerEmpleadosByMunicipio(this.pagina);
    }else{
      this.empleadoService
      .buscarTerminoEmpleados(0,this.termino,this.authService._usuario.id_municipio)
      .subscribe(response => {
        this.empleados =response.contenido as Empleado[];
        this.paginador = response;
      });
    }
  }

}
