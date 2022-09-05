import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { Empleado } from '../../modelo/empleados/empleado';
import { EmpleadoService } from '../../servicio/empleados/empleado.service';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../modelo/usuarios/usuario';
import { Rol } from '../../modelo/roles/rol';
import { RolesService } from '../../servicio/roles/roles.service';
import { UsuarioService } from '../../servicio/usuarios/usuario.service';
import { Municipio } from '../../modelo/municipios/municipio';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  paginador:any;
  empleados:Empleado[];
  empleado= new Empleado;
  usuario= new Usuario;
  municipioClave=this.authService.usuario.id_municipio;
  roles:Rol[];
  pagina=0;
  termEmpleado='';
  banderaActualizar:boolean=false;
  banderaPassword=false;
  Cpassword=" ";
  urlEndPoint: string = environment.baseUrl;
  termino='';
  existe=false;
  seleccionado:Rol;


  constructor(public empleadoService:EmpleadoService,
    public activatedRoute:ActivatedRoute,
    public authService:AuthService,
    public rolesService:RolesService,
    public usuarioService:UsuarioService,
    public router:Router) { }

  ngOnInit(): void {
    this.obtenerListaRoles();
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
    this.empleadoService.obtenerListaEmpleadosPorMunicipio(page,this.municipioClave).subscribe(
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

  rellenarFormularioUsuario(empleado:Empleado){
    this.usuarioService
      .existeUsuarioEmpleado(empleado.curp)
      .subscribe(response => {
         this.existe =response;
         if(this.existe){
          this.banderaActualizar=true;
          this.obtenerUsuarioByEmpleado(empleado.curp);
        }
      });
  }

  agregarEmpleado(empleado:Empleado){
    this.usuario.id_empleado=empleado.curp;
  }

  obtenerUsuarioByEmpleado(idEmpleado:string){
    this.usuarioService
      .buscarEmpleadoByUsuario(idEmpleado)
      .subscribe(response => {
        this.usuario =response;
      });
  }

  existeUsuario(idEmpleado:string){
    this.usuarioService
      .existeUsuarioEmpleado(idEmpleado)
      .subscribe(response => {
         this.existe =response;
      });

  }

  public onSearh(){

    if(this.termino==""){
      this.obtenerEmpleadosByMunicipio(this.pagina);
    }else{
      this.empleadoService
      .buscarTerminoEmpleados(0,this.termino,this.municipioClave)
      .subscribe(response => {
        this.empleados =response.contenido as Empleado[];
        this.paginador = response;
      });
    }
  }

  irEmpleados(){
    this.router.navigate(['/empleados']);
  }
//metodos de usuario

public crearUsuario():void{
  this.usuarioService.crearUsuario(this.usuario).subscribe(
    response=> {this.usuario=response;
              this.obtenerEmpleadosByMunicipio(0);
                swal('Usuario Agregado',`Usuario ${this.usuario.email} creado con éxito`,'success');
              }
  );
}
actualizarDatosUsuario(){
  this.usuarioService.actualizarDatosUsuario(this.usuario).subscribe(usuario=>{
    this.obtenerEmpleadosByMunicipio(0);
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
  compararRoles(o1:number,o2:number){
    if (o1==null || o2==null)
    {
      return false;
    }
      return o1===o2;

  }

  validarCorreo(){
    let correo=this.usuario.email;
    if(correo===undefined){
      correo="";
    }
    var expCorreo=  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if(correo.match(expCorreo)){
      return true;

    }else{
    return false;
  }
  }

  validarContrasena(event){
    let password=this.usuario.password;
    var passw=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*¡¿#?&./()=])[A-Za-z\d$@!%*¡¿#?&./()=]{8,15}[^'\s]/;
    if(password.match(passw)){
      this.banderaPassword=true;
    }else{
    this.banderaPassword=false;}
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

  public vacio(){
    if(this.usuario.email==null || this.usuario.email=="" ||
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
  //metodos del modal
  //limpiar el modal de agregar usuario
  limpiarModal() {
    var element = <HTMLFormElement>document.getElementById('formUsuario');
    element.reset();
    this.banderaActualizar=false;
  }
}
