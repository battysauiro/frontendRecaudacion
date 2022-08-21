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
      this.obtenerEmpleados(page);
     }
     );
  }

  public obtenerEmpleados(page:number){
    this.empleadoService.obtenerListaEmpleados(page).subscribe(
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
        this.obtenerEmpleados(this.pagina);
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
    /**if(this.termino==""){
      if(this.banderaTipo){
        this.obtenerContribuyentesFisicas(this.pagina);
      }else{
        this.obtenerContribuyentesM(this.pagina);
      }

    }else{
      if(this.banderaTipo){
      this.contribuyentesService
      .buscarTerminoFisica(0,this.termino)
      .subscribe(response => {
        this.contribuyentesFisicas =response.contenido as ContribuyenteFisica[];
        this.paginador = response;
      });
      }else{
        this.contribuyentesService
        .buscarTerminoMoral(0,this.termino)
        .subscribe(response => {
          this.contribuyentesMorales =response.contenido as ContribuyenteMoral[];
          this.paginador = response;
      });
      }

    }*/
    //this.authService._usuario.
  }

}
