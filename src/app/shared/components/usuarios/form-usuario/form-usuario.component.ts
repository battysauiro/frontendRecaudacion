import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alerts/alert.service';
import { Empleado } from 'src/app/shared/modelo/empleados/empleado';
import { Rol } from 'src/app/shared/modelo/roles/rol';
import { Usuario } from 'src/app/shared/modelo/usuarios/usuario';
import { EmpleadoService } from 'src/app/shared/servicio/empleados/empleado.service';
import { UsuarioService } from 'src/app/shared/servicio/usuarios/usuario.service';
import { RolesService } from 'src/app/shared/servicio/roles/roles.service';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css','./linea-capturascss.component.scss']
})
export class FormUsuarioComponent implements OnInit {

  usuario= new Usuario();
  roles:Rol[];
  empleados:Empleado[];
  empleado= new Empleado();
  idFound=false;
  Cpassword:string;
  fotoSeleccionada: File;
  banderaPassword=false;
  municipioClave=this.authService.usuario.id_municipio;
  mensaje='';

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  titulo="AGREGAR USUARIO";
  autoCompleteEmpleado = new FormControl('');

  constructor(public userService:UsuarioService,
    public rolesService:RolesService,
    public empleadoService:EmpleadoService,
    public router:Router,
    public activatedRouter:ActivatedRoute,
    public alertService:AlertService,
    public authService:AuthService) { }

  ngOnInit(): void {
  }

  public crearUsuario():void{
    this.userService.crearUsuario(this.usuario).subscribe(
      response=> {this.usuario=response;
        this.irUsuarios();
          swal('Usuario Agregado',`Usuario ${this.usuario.email} creado con éxito`,'success');
      }
    );
  }

  actualizarDatosUsuario(){
  this.userService.actualizarDatosUsuario(this.usuario).subscribe(usuario=>{
    this.irUsuarios();
    swal('Datos actualizados',`Usuario ${this.usuario.email} actualizado con éxito`,'success');
  });
  this.Cpassword=" ";
}

  obtenerListaRoles(){
    this.rolesService.obtenerListaRole().subscribe(
      response=> {this.roles= response
      }
    );
  }
  //obtiene la lista de empleados que no tiene un usuario creado
  obtenerListaEmpleadosNoUsuarios(){
    this.empleadoService.obtenerListaEmpleadosNoUsuarios(this.municipioClave).subscribe(
      response=> {this.empleados= response
        console.log(this.empleados);
      }
    );
  }

  cargarUsuarios(){
    this.activatedRouter.params.subscribe(params=>{
      console.log(params)
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.titulo="ACTUALIZAR USUARIO";
        this.userService.obtenerUsuario(id).subscribe(usuario=>{
          usuario.password="";
          this.usuario=usuario})
      }
    });
  }

  public actualizarUsuario():void{
    this.userService.actualizarUsuario(this.usuario).subscribe(usuario=>{
      this.irUsuarios();
      swal('Usuario Actualizado',`Usuario ${this.usuario.email} actualizado con éxito`,'success');
    });
  }

  irUsuarios(){
    this.router.navigate(['/usuario']);
  }

  compararRoles(o1:number,o2:number){
    if (o1==null || o2==null)
    {
      return false;
    }
      return o1===o2;
  }

  compararEmpleados(o1:number,o2:number){
    if (o1==null || o2==null)
    {
      return false;
    }
      return o1===o2;
  }

  mostrarDatosEmpleado(empleado?: Empleado): string | undefined {
    return empleado ? empleado.nombre + " " + empleado.apellido_p + " " +  empleado.apellido_m : undefined;
  }

  seleccionarEmpleado(event: MatAutocompleteSelectedEvent): void {

      this.empleado = event.option.value as Empleado;
      this.autoCompleteEmpleado.setValue('');
      event.option.focus();
      event.option.deselect();

   }

   public vacio(){
    if(this.usuario.id_empleado==null || this.usuario.id_empleado=="" ||
      this.usuario.email==null || this.usuario.email=="" ||
      this.usuario.id_rol==null ||
      this.usuario.password==null || this.usuario.password=="" ||
      this.usuario.password.length <9 ||
      this.Cpassword.length<9  &&
      (!this.compararContrasena())){
        return true;
      }
        else{
          return false;
        }
  }



   //metodos para la validación de la contraseña
   checarLongitud():boolean{
    if(this.usuario.password!=undefined && this.usuario.password.length>=8)
      return true;
    else
      return false;
  }

  validarMinusculaMayuscula():boolean{
    let numeros=["0","1","2","3","4","5","6","7","8","9"];
    let contieneMayuscula=false;
    let contieneMinuscula=false;
    if(this.usuario.password!=undefined){
      for(let letra of this.usuario.password){
        if(letra.startsWith(letra.toUpperCase()) && !numeros.includes(letra))
          contieneMayuscula=true;
        else if(letra.startsWith(letra.toLowerCase()) && !numeros.includes(letra)){
          contieneMinuscula=true;
        }
      }
    }
    if(contieneMayuscula && contieneMinuscula)
      return true;
    else
      return false;
  }

  validarNumeroCaracterEspecial():boolean{
    let numeros=["0","1","2","3","4","5","6","7","8","9"];
    let caracterEspecial=  ["$","@","!",";","%","*","¡","¿","#","?","&",".","/","(",")","="];
    let contieneNumeros=false;
    let contieneCaracterEspeciales=false;
    if(this.usuario.password!=undefined){
      for(let letra of this.usuario.password){
        if(numeros.includes(letra))
          contieneNumeros=true;
        else if(caracterEspecial.includes(letra)){
          contieneCaracterEspeciales=true;
        }
      }
    }
    if(contieneNumeros && contieneCaracterEspeciales)
      return true;
    else
      return false;

  }

  compararContrasena(){
    let password=this.usuario.password;
    if(password===undefined){
      return false;
    }
    if(password===null){
      return false;
    }
    if(password===""){
      return false;
    }
    if(password===this.Cpassword && password.length>8 && this.Cpassword.length >8){
      return true;
    }
    else{
      return false;
    }
  }

}
