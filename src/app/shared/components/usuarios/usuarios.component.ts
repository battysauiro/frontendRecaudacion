import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { Usuario } from '../../modelo/usuarios/usuario';
import { UsuarioService } from '../../servicio/usuarios/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  paginador:any;
  usuarios:Usuario[];
  pagina=0;
  termino='';
  municipioClave=this.authService.usuario.id_municipio;
  constructor(public usuarioService:UsuarioService,
    public activatedRoute:ActivatedRoute,
    public authService:AuthService,
    public router:Router) { }

  ngOnInit(): void {
    //this.municipioClave=this.authService._usuario.id_municipio;
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerUsuarios(page);
     }
     );
  }

  public obtenerUsuarios(page:number){
    this.usuarioService.obtenerListaUsuarioPorMunicipio(page,this.municipioClave).subscribe(
      response=> {
        this.usuarios= response.contenido as Usuario[]
        this.paginador=response;
      }
    );
  }

  eliminarUsuario(usuario:Usuario){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al Usuario  ${usuario.email}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuarioByEstado(usuario,true).subscribe(response=>{
        this.obtenerUsuarios(this.pagina);
          swal(
            'Usuario Eliminado!',
            `Usuario ${usuario.email}  eliminado con éxito`,
            'success'
          )
        });
      }
    })
  }

  estadoUsuario(estado:boolean){
    console.log(estado);
  }

  onChange(usuario,estado){
    this.update(usuario,estado);
    console.log(usuario+" este es el usuario");
    console.log(estado+" este es el estado");
  }

  public update(usuario,estado){
    this.usuarioService.actualizarEstado(usuario,estado).subscribe(usuario=>{
      this.obtenerUsuarios(this.pagina);
      this.router.navigate(['/usuario']);

    });
  }

  public onSearh(){

    if(this.termino==""){
      this.obtenerUsuarios(this.pagina);
    }else{
      this.usuarioService
      .buscarTerminoUsuario(0,this.termino,this.municipioClave)
      .subscribe(response => {
        this.usuarios =response.contenido as Usuario[];
        this.paginador = response;
      });
    }
  }

}
