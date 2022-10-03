import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Contribuyente } from '../../modelo/contribuyentes/contribuyente';
import { ContribuyentesService } from '../../servicio/contribuyentes/contribuyentes.service';

@Component({
  selector: 'app-vista-adeudos',
  templateUrl: './vista-adeudos.component.html',
  styleUrls: ['./linea-capturascss.component.scss','./vista-adeudos.component.css']
})
export class VistaAdeudosComponent implements OnInit {

  autoCompleteContribuyente = new FormControl('');
  contribuyente= new Contribuyente();
  filtroContribuyente: Observable<Contribuyente[]>;
  constructor(
    public contribuyenteService:ContribuyentesService
  ) { }

  ngOnInit(): void {
    this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

      map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
      mergeMap(value => value ? this._filterContribuyente(value) : []),
    );
  }

  public _filterContribuyente(value: string): Observable<Contribuyente[]> {
    const filterValue = value.toLowerCase();
    return this.contribuyenteService.filtrarContribuyentes(filterValue);
  }

  mostrarNombreContribuyente(contribuyente?: Contribuyente): string | undefined {
      return contribuyente ? contribuyente.rfc_contribuyente + " " + contribuyente.nombreContribuyente : undefined;
  }

  seleccionarContribuyente(event: MatAutocompleteSelectedEvent): void {

      this.contribuyente = event.option.value as Contribuyente;
      this.autoCompleteContribuyente.setValue('');
      event.option.focus();
      event.option.deselect();

  }

}
