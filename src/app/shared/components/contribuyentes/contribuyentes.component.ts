import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { ContribuyenteFisica } from '../../modelo/contribuyentes/contribuyente-fisica';
import { ContribuyenteMoral } from '../../modelo/contribuyentes/contribuyente-moral';
import { ContribuyentesService } from '../../servicio/contribuyentes/contribuyentes.service';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contribuyentes',
  templateUrl: './contribuyentes.component.html',
  styleUrls: ['./contribuyentes.component.css'],
})
export class ContribuyentesComponent implements OnInit {
  contribuyentesFisicas: ContribuyenteFisica[];
  contribuyentesMorales: ContribuyenteMoral[];
  pagina: number = 0;
  paginador: any;
  urlEndPoint: string = environment.baseUrl;
  banderaTipo: boolean = true;
  tipoPersona: string = 'Fisica';
  /*  Variables para agregar los contribuyentes  */
  curp: string;
  rfc: string;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  fechaNacimiento: string;
  calle: string;
  numero: string;
  colonia: string;
  cp: string;
  razonSocial: string;
  constructor(
    public contribuyentesService: ContribuyentesService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.banderaTipo) {
      this.activatedRoute.paramMap.subscribe((params) => {
        let page: number = +params.get('page');
        if (!page) {
          page = 0;
        }
        this.pagina = page;
        this.obtenerContribuyentesFisicas(page);
      });
    } else {
      this.activatedRoute.paramMap.subscribe((params) => {
        let page: number = +params.get('page');
        if (!page) {
          page = 0;
        }
        this.pagina = page;
        this.obtenerContribuyentesM(page);
      });
    }
  }

  mostrarDatos() {
    console.log(this.curp);
    console.log(this.rfc);
    console.log(this.nombre);
    console.log(this.apellidoP);
    console.log(this.apellidoM);
    console.log(this.fechaNacimiento);
    console.log(this.calle);
    console.log(this.numero);
    console.log(this.colonia);
    console.log(this.cp);
    console.log(this.razonSocial);
  }
  //cambiar el tipo de contribuyente
  tipoContribuyente(tipo: boolean) {
    if (tipo) {
      this.banderaTipo = tipo;
      this.tipoPersona = 'Fisica';
      this.obtenerContribuyentesFisicas(this.pagina);
    } else {
      this.banderaTipo = tipo;
      this.tipoPersona = 'Moral';
      this.obtenerContribuyentesM(this.pagina);
    }
  }
  //limpiar el modal de agregar contribuyente
  limpiarModal(){
    var element = <HTMLFormElement> document.getElementById("formContribuyente");
    element.reset();
    var elementoDiv = <HTMLDivElement> document.getElementById("miContenedor");
    var aux=element;
    this.obtenerContribuyentesFisicas(this.pagina);
    console.log(element);
  }
  //agregar contribuyente dependiendo del tipo de contribuyente
  agregarContribuyente() {
    var forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }else{
            console.log("todo bien ");
          }
          form.classList.add('was-validated');
        },
        false
      );
    });
  }
  //obteniendo contribuyenes fisicas
  public obtenerContribuyentesFisicas(pagina: number) {
    this.contribuyentesService
      .ObtenerListaContribuentes(pagina)
      .subscribe((response) => {
        this.contribuyentesFisicas =
          response.contenido as ContribuyenteFisica[];
        this.paginador = response;
      });
  }

  eliminarContribuyente(contribuyenteF: ContribuyenteFisica) {
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al contribuyente  ${contribuyenteF.nombre} ${contribuyenteF.apellido_p} ${contribuyenteF.apellido_m}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.contribuyentesService
          .eliminarContribuyenteFisica(contribuyenteF.rfc_contribuyente)
          .subscribe((response) => {
            this.obtenerContribuyentesFisicas(this.pagina);
            swal(
              'Contribuyente Eliminado!',
              `Contribuyente ${contribuyenteF.nombre} ${contribuyenteF.apellido_p} ${contribuyenteF.apellido_m} eliminado con éxito`,
              'success'
            );
          });
      }
    });
  }

  /*------------------------contribuyentes morales-----------------*/
  public obtenerContribuyentesM(pagina: number) {
    this.contribuyentesService
      .ObtenerListaContribuentesM(pagina)
      .subscribe((response) => {
        this.contribuyentesMorales = response.contenido as ContribuyenteMoral[];
        this.paginador = response;
      });
  }

  eliminarContribuyenteM(contribuyenteM: ContribuyenteMoral) {
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al contribuyente con razón social: ${contribuyenteM.rfc_contribuyente}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.contribuyentesService
          .deleteM(contribuyenteM.rfc_contribuyente)
          .subscribe((response) => {
            this.obtenerContribuyentesM(this.pagina);
            swal(
              'Contribuyente Eliminado!',
              `Contribuyente ${contribuyenteM.razon_social}  eliminado con éxito`,
              'success'
            );
          });
      }
    });
  }
}
