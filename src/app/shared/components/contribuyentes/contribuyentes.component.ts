import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/usuario-login/auth.service';
import { ContribuyenteFisica } from '../../modelo/contribuyentes/contribuyente-fisica';
import { ContribuyenteMoral } from '../../modelo/contribuyentes/contribuyente-moral';
import { ContribuyentesService } from '../../servicio/contribuyentes/contribuyentes.service';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LineaCapturaService } from '../../servicio/lineas-captura/linea-captura.service';
@Component({
  selector: 'app-contribuyentes',
  templateUrl: './contribuyentes.component.html',
  styleUrls: ['./contribuyentes.component.css'],
})
export class ContribuyentesComponent implements OnInit {
  contribuyentesFisicas: ContribuyenteFisica[];
  contribuyentesMorales: ContribuyenteMoral[];
  contribuyenteFisica = new ContribuyenteFisica();
  contribuyenteMoral = new ContribuyenteMoral();
  notificarCambiosFisica = new EventEmitter<any>();
  notificarCambiosMoral = new EventEmitter<any>();
  pagina: number = 0;
  paginador: any;
  urlEndPoint: string = environment.baseUrl;
  banderaTipo: boolean = true;
  tipoPersona: string = 'Fisica';
  termino='';
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
  modal : NgbModalRef;
  banderaActualizar:boolean=false;
  constructor(
    public contribuyentesService: ContribuyentesService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public facturasService: LineaCapturaService
  ) {}

  ngOnInit(): void {
    this.facturasService.factura=undefined;
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      let tipo: number = +params.get('tipo');//contiene el tipo de contribuyente (moral=1,fisica=0)
      if (!page) {
        page = 0;
      }
      if (tipo===0){
        this.banderaTipo=true;
        this.tipoPersona = 'Fisica';
        this.pagina = page;
        this.obtenerContribuyentesFisicas(page);
      }
      if(tipo===1){
        this.banderaTipo=false;
        this.tipoPersona = 'Moral';
        this.pagina = page;
        this.obtenerContribuyentesM(page);
      }
    });

    this.notificarCambiosFisica.subscribe(contribuyente=>{
      this.contribuyentesFisicas=this.contribuyentesFisicas.map(contribuyenteOriginal=>{
        if(contribuyente.rfc_contribuyente==contribuyenteOriginal.rfc_contribuyente){
          contribuyenteOriginal=contribuyente;
        }
        return contribuyenteOriginal;
      })
    })

    this.notificarCambiosMoral.subscribe(contribuyente=>{
      this.contribuyentesMorales=this.contribuyentesMorales.map(contribuyenteOriginal=>{
        if(contribuyente.rfc_contribuyente==contribuyenteOriginal.rfc_contribuyente){
          contribuyenteOriginal=contribuyente;
        }
        return contribuyenteOriginal;
      })
    })
  }

  public vacio() {
    if(this.banderaTipo){
      return this.vacioFisica();
    }
    else{
      return this.vacioMoral();
    }
  }

  public vacioFisica():boolean{
    if (
      this.rfc == null ||
      this.rfc == '' ||
      this.rfc.length < 13 ||
      this.curp == null ||
      this.curp == '' ||
      this.curp.length < 18 ||
      this.nombre == null ||
      this.nombre == '' ||
      this.apellidoP == null ||
      this.apellidoP == '' ||
      this.apellidoM == null ||
      this.apellidoM == '' ||
      this.calle == null ||
      this.calle == '' ||
      this.colonia == null ||
      this.colonia == '' ||
      this.cp == null ||
      this.cp == '' ||
      this.fechaNacimiento == null ||
      this.fechaNacimiento == ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  public vacioMoral():boolean {
    if(
      this.rfc == null ||
      this.rfc == '' ||
      this.razonSocial == null ||
      this.razonSocial == '' ||
      this.calle == null ||
      this.calle == '' ||
      this.colonia == null ||
      this.colonia == '' ||
      this.cp == null ||
      this.cp == ''
      ){
        return true;
      } else {
        return false;
      }
  }

  agregarDatosPersonaFisica() {
    this.contribuyenteFisica.curp=this.curp;
    this.contribuyenteFisica.rfc_contribuyente=this.rfc;
    this.contribuyenteFisica.nombre=this.nombre;
    this.contribuyenteFisica.apellido_p=this.apellidoP;
    this.contribuyenteFisica.apellido_m=this.apellidoM;
    this.contribuyenteFisica.fecha=this.fechaNacimiento;
    this.contribuyenteFisica.calle=this.calle;
    this.contribuyenteFisica.numero=this.numero;
    this.contribuyenteFisica.colonia=this.colonia;
    this.contribuyenteFisica.codigo_postal=this.cp;
  }

  agregarDatosPersonaMoral() {
    this.contribuyenteMoral.rfc_contribuyente=this.rfc;
    this.contribuyenteMoral.razon_social=this.razonSocial;
    this.contribuyenteMoral.calle=this.calle;
    this.contribuyenteMoral.numero=this.numero;
    this.contribuyenteMoral.colonia=this.colonia;
    this.contribuyenteMoral.codigo_postal=this.cp;
  }
  //cambiar el tipo de contribuyente
  tipoContribuyente(tipo: boolean) {
    if (tipo) {
      this.banderaTipo = tipo;
      this.tipoPersona = 'Fisica';
      this.obtenerContribuyentesFisicas(0);
    } else {
      this.banderaTipo = tipo;
      this.tipoPersona = 'Moral';
      this.obtenerContribuyentesM(0);
    }
  }

  public insertarContribuyente(): void {
    if(this.banderaTipo){
      this.agregarDatosPersonaFisica();
      this.crearContribuyenteFisica();
    }
    else{
      this.agregarDatosPersonaMoral();
      this.createMoral();
    }
  }

  actualizarContribuyente(){
    if(this.banderaTipo){
      this.agregarDatosPersonaFisica();
      this.actualizarPersonaFisica();
      this.banderaActualizar=false;
    }
    else{
      this.agregarDatosPersonaMoral();
      this.actualizarPersonaMoral();
      this.banderaActualizar=false;
    }
  }

  //limpiar el modal de agregar contribuyente
  limpiarModal() {
    var element = <HTMLFormElement>document.getElementById('formContribuyente');
    element.reset();
    this.banderaActualizar=false;
  }

  onKey(event: any){
    event.target.value = event.target.value.toUpperCase();
    console.log(event.target.value);
 }

  //rellena el formulario con el contribuyente fisica seleccionado
  rellenarFormularioFisica(contribuyente:ContribuyenteFisica){
    this.curp=contribuyente.curp;
    this.rfc=contribuyente.rfc_contribuyente;
    this.nombre=contribuyente.nombre;
    this.apellidoP=contribuyente.apellido_p;
    this.apellidoM=contribuyente.apellido_m;
    this.fechaNacimiento=contribuyente.fecha;
    this.calle=contribuyente.calle;
    this.numero=contribuyente.numero;
    this.colonia=contribuyente.colonia;
    this.cp=contribuyente.codigo_postal;
    this.banderaActualizar=true;
  }

  rellenarFormularioMoral(contribuyente:ContribuyenteMoral){
    this.rfc=contribuyente.rfc_contribuyente;
    this.razonSocial=contribuyente.razon_social;
    this.calle=contribuyente.calle;
    this.numero=contribuyente.numero;
    this.colonia=contribuyente.colonia;
    this.cp=contribuyente.codigo_postal;
    this.banderaActualizar=true;
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

  crearContribuyenteFisica():void{
    this.contribuyentesService
      .crearContribuyenteFisica(this.contribuyenteFisica)
      .subscribe((response) => {
        this.contribuyenteFisica = response;
        this.limpiarModal();
        //this.irContribuyentes(estado); aqui debe de ir el observador para que se actulice la vista
        //this.notificarCambiosFisica.emit(this.contribuyenteFisica);
        this.obtenerContribuyentesFisicas(0);
        swal(
          'La persona fisica se ha agregado correctamente',
          `contribuyente ${this.contribuyenteFisica.curp} creado con éxito`,
          'success'
        );
      });
  }

  public onSearh(){
    if(this.termino==""){
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

    }

  }

  public actualizarPersonaFisica():void{
    console.log(this.contribuyenteFisica);
    this.contribuyentesService.actualizarPersonaFisica(this.contribuyenteFisica).subscribe(contribuyenteF=>{
      this.notificarCambiosFisica.emit(this.contribuyenteFisica);
      this.limpiarModal();
      swal('La persona fisica se ha actualizado con exito ',`Persona Fisica ${contribuyenteF.curp} actualizado con éxito`,'success');
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
          .eliminarPersonaFisicaByEstado(contribuyenteF,true)
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

  public createMoral():void{
    this.contribuyentesService.crearContribuyenteMoral(this.contribuyenteMoral).subscribe(
      (response)=> {this.contribuyenteMoral=response;
                  this.limpiarModal();
                  //this.notificarCambiosMoral.emit(this.contribuyenteMoral);
                  this.router.navigate(['/contribuyentesMoral/page/0/1']);
                  //this.obtenerContribuyentesM(0);
                  swal('Contribuyente Moral Agregado',`contribuyente ${this.contribuyenteMoral.razon_social} creado con éxito`,'success');
                }
    );
    console.log(this.contribuyenteMoral);
  }

  public actualizarPersonaMoral():void{
    this.contribuyentesService.actualizarPersonaMoral(this.contribuyenteMoral).subscribe(contribuyenteM=>{
      this.limpiarModal();
      this.notificarCambiosMoral.emit(this.contribuyenteMoral);
      swal('El contribuyente moral se ha actualizado con exito',`Contribuyente Moral ${contribuyenteM.razon_social} actualizado con éxito`,'success');
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
          .eliminarPersonaMoralByEstado(contribuyenteM,true)
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
