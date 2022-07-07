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



@NgModule({
  declarations: [...fromComponents.components, InicioComponent, FormularioPrincipalComponent, FormFisicaComponent, FormMoralComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...fromComponents.components

  ]
})
export class SharedModule { }
