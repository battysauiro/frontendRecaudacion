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
  filas:fila[];
  filtroContribuyente: Observable<Contribuyente[]>;
  base=environment.baseUrl;
  constructor(
    public contribuyenteService:ContribuyentesService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

      map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
      mergeMap(value => value ? this._filterContribuyente(value) : []),
    );
  }

  public _filterContribuyente(value: string): Observable<Contribuyente[]> {
    const filterValue = value.toLowerCase();
    return this.contribuyenteService.filtrarContribuyentes(filterValue,false);
  }

  mostrarNombreContribuyente(contribuyente?: Contribuyente): string | undefined {
      return contribuyente ? contribuyente.rfc_contribuyente + " " + contribuyente.nombreContribuyente : undefined;
  }

  seleccionarContribuyente(event: MatAutocompleteSelectedEvent): void {

      this.contribuyente = event.option.value as Contribuyente;
      this.facturas=this.contribuyente.contribuciones;
      this.autoCompleteContribuyente.setValue('');
      event.option.focus();
      event.option.deselect();

  }

  createPDF(){
    let urlAux:string=environment.baseUrl+'/api/reportes/informacionPagos/exportarPDF/'+this.contribuyente.nombreContribuyente+'/'+this.contribuyente.rfc_contribuyente+'/'+this.contribuyente.direccion+'/'+false;
    this.router.navigate(['/'+urlAux]);

  }

  //AQUI VA LA ESTRUCTURA PARA QUE EL PDF PUEDA SER DESCARGADO

}
