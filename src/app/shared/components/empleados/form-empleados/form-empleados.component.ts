import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/shared/modelo/empleados/empleado';
import { EmpleadoService } from 'src/app/shared/servicio/empleados/empleado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit {

  empleado= new Empleado();
  idFound=false;
  titulo="AÑADIR EMPLEADO";
  constructor(public empleadoService:EmpleadoService,public router:Router,public activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  public agregarEmpleado():void{
    this.empleadoService.crearEmpleado(this.empleado).subscribe(
      response=> {this.empleado=response;
                  this.irEmpleados();
                  swal('Empleado Agregado',`empleado ${this.empleado.nombre} ${this.empleado.apellido_p} ${this.empleado.apellido_m} creado con éxito`,'success');
                }
    );
  }

  cargarEmpleado(){
    this.activatedRouter.params.subscribe(params=>{
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.titulo="ACTUALIZAR EMPLEADO";
        this.empleadoService.obtenerEmpleado(id).subscribe(empleado=>this.empleado=empleado)
      }
    });
  }

  public actualizarEmpleado():void{
    this.empleadoService.actualizarEmpleado(this.empleado).subscribe(empleado=>{
      this.irEmpleados();
      //this.router.navigate(['/inicio/contribuyentes']);

      swal('Empleado Actualizado',`Empleado ${empleado.nombre}  ${empleado.apellido_p} ${empleado.apellido_m} actualizado con éxito`,'success');
    });
  }

  irEmpleados(){
    this.router.navigate(['/empleados']);
  }

  public vacio(){
    if(this.empleado.curp==null || this.empleado.curp=="" ||
      this.empleado.nombre==null || this.empleado.nombre=="" ||
      this.empleado.apellido_p==null || this.empleado.apellido_p=="" ||
      this.empleado.apellido_m==null || this.empleado.apellido_m==""){
        return true;
      }
        else{
          return false;
        }
  }

  //CONVIERTE A MAYUSCULAS LA CADENA cambia a servicio para optimizacion
  onKey(event: any){
    event.target.value = event.target.value.toUpperCase();
    console.log(event.target.value);
 }

}
