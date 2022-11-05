import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Contribuyente } from '../../modelo/contribuyentes/contribuyente';
import { FacturasNoPagadasDTO } from '../../modelo/linea-factura/facturas-no-pagadas-dto';
import { ContribuyentesService } from '../../servicio/contribuyentes/contribuyentes.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

 class fila{

   border:[true, false, true, true];
   text: string;
   bold: true;
   fontSize: 14;
   fillColor: '#740432';
   color: 'white';

   constructor(text:string){
    this.text=text;
   }
}
@Component({
  selector: 'app-vista-adeudos',
  templateUrl: './vista-adeudos.component.html',
  styleUrls: ['./linea-capturascss.component.scss','./vista-adeudos.component.css']
})
export class VistaAdeudosComponent implements OnInit {

  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  autoCompleteContribuyente = new FormControl('');
  contribuyente= new Contribuyente();
  facturas:FacturasNoPagadasDTO[];
  facturasPagadas:FacturasNoPagadasDTO[];
  facturasProximas:FacturasNoPagadasDTO[];
  filas:fila[];
  filtroContribuyente: Observable<Contribuyente[]>;
  base=environment.baseUrl;
  tipoConsulta=true;
  value="true";
  valor="true";
  valor2="false";
  codigo="";
  selectEstado=true;
  modal : NgbModalRef;
  mostrar:boolean=true;
  proximas:boolean=false;
  constructor(
    public contribuyenteService:ContribuyentesService,
    public router:Router,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

      map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
      mergeMap(value => value ? this._filterContribuyente(value) : []),
    );
  }

  open(content) {
    this.modal = this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' })
    this.modal.result.then((e) => {
    });
  }

  public _filterContribuyente(value: string): Observable<Contribuyente[]> {
    const filterValue = value.toLowerCase();
    return this.contribuyenteService.filtrarContribuyentes(filterValue,this.tipoConsulta);
  }

  mostrarNombreContribuyente(contribuyente?: Contribuyente): string | undefined {
      return contribuyente ? contribuyente.rfc_contribuyente + " " + contribuyente.nombreContribuyente : undefined;
  }

  seleccionarContribuyente(event: MatAutocompleteSelectedEvent): void {

      this.contribuyente = event.option.value as Contribuyente;
      event.option.focus();
      event.option.deselect();
      /**this.facturas=this.contribuyente.contribucionesPagadas;
      this.facturasPagadas=this.contribuyente.contribucionesPagadas;
      this.facturasProximas=this.contribuyente.contribucionesProximas;
      this.autoCompleteContribuyente.setValue('');
      event.option.focus();
      event.option.deselect();*/

  }

  public mostrarlo(){
    console.log(this.mostrar," esto ees verificar");
  }

  salir(){
    this.autoCompleteContribuyente.enable();
    this.contribuyente=new Contribuyente();
    this.facturasPagadas=[];
    this.facturasProximas=[];
    this.selectEstado=true;
    this.codigo="";
    this.value='true';
  }

  public cerrar(){
    this.contribuyente=new Contribuyente();
    this.autoCompleteContribuyente.setValue('');
    this.codigo="";
    this.mostrar=true;
    this.tipoConsulta=true;
    //this.onChange();

    this.modal.close();
  }

  public verificarAutorizacion(){
    let dato:boolean=false;
    this.contribuyenteService.isAutorizado(this.contribuyente.rfc_contribuyente,this.codigo).subscribe(
      response=> {
        //this.mostrar=response;
        if(response){
          //this.mostrar=false;
          this.selectEstado=false;
          this.facturas=this.contribuyente.contribucionesPagadas;
          this.facturasPagadas=this.contribuyente.contribucionesPagadas;
          this.facturasProximas=this.contribuyente.contribucionesProximas;
          this.autoCompleteContribuyente.setValue('');
          this.autoCompleteContribuyente.disable();
          //this.cerrar();
          this.modal.close();
        }
        else{
          this.mostrar=false;
          console.log("no autorizado");
        }
      }

    );

  }

  createPDF(){
    let urlAux:string=environment.baseUrl+'/api/reportes/informacionPagos/exportarPDF/'+this.contribuyente.nombreContribuyente+'/'+this.contribuyente.rfc_contribuyente+'/'+this.contribuyente.direccion+'/'+false;
    this.router.navigate(['/'+urlAux]);

  }

  onChange(){
    if(this.value==='true'){
      //this.facturas=this.facturasPagadas;
      this.tipoConsulta=true;
    }
    if(this.value==='false'){
      //this.facturas=this.facturasProximas;
      this.tipoConsulta=false;
    }
    }

  }

  //AQUI VA LA ESTRUCTURA PARA QUE EL PDF PUEDA SER DESCARGADO


