import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormularioPrincipalComponent } from './components/contribuyentes/forms/formulario-principal/formulario-principal.component';
import { FormFisicaComponent } from './components/contribuyentes/forms/form-fisica/form-fisica.component';
import { FormMoralComponent } from './components/contribuyentes/forms/form-moral/form-moral.component';
import { PaginadorCFisicaComponent } from './components/paginadores/paginadores-contribuyentes/paginador-c-fisica/paginador-c-fisica.component';
import { PaginadorCMoralComponent } from './components/paginadores/paginadores-contribuyentes/paginador-c-moral/paginador-c-moral.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContribucionImpuestoComponent } from './components/contribuciones/contribucion-impuesto/contribucion-impuesto.component';
import { ContribucionesComponent } from './components/contribuciones/contribuciones.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [...fromComponents.components, InicioComponent, FormularioPrincipalComponent, FormFisicaComponent, FormMoralComponent, ContribucionImpuestoComponent, ContribucionesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,

  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...fromComponents.components

  ]
})
export class SharedModule { }
