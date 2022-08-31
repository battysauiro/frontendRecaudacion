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
import { PaginadorContribucionesComponent } from './components/paginadores/paginadores-contribuciones/paginador-contribuciones/paginador-contribuciones.component';
import { PaginadorImpuestosComponent } from './components/paginadores/paginadores-contribuciones/paginador-impuestos/paginador-impuestos.component';
import { PaginadorContribucionDerechosGComponent } from './components/paginadores/paginadores-contribuciones/paginador-contribucion-derechos-g/paginador-contribucion-derechos-g.component';
import { PaginadorContribucionDerechosLicenciasComponent } from './components/paginadores/paginadores-contribuciones/paginador-contribucion-derechos-licencias/paginador-contribucion-derechos-licencias.component';
import { PaginadorContribucionMultasComponent } from './components/paginadores/paginadores-contribuciones/paginador-contribucion-multas/paginador-contribucion-multas.component';
import { PaginadorContribucionMultasVehicularComponent } from './components/paginadores/paginadores-contribuciones/paginador-contribucion-multas-vehicular/paginador-contribucion-multas-vehicular.component';
import { PaginadorContribucionMultasEbriedadComponent } from './components/paginadores/paginadores-contribuciones/paginador-contribucion-multas-ebriedad/paginador-contribucion-multas-ebriedad.component';
import { PaginadorContribucionOtrosProductosComponent } from './components/paginadores/paginadores-contribuciones/paginador-contribucion-otros-productos/paginador-contribucion-otros-productos.component';
import { ContribucionDerechoGComponent } from './components/contribuciones/contribucion-derecho-g/contribucion-derecho-g.component';
import { ContribucionDerechosLicenciasComponent } from './components/contribuciones/contribucion-derechos-licencias/contribucion-derechos-licencias.component';
import { ContribucionMultasComponent } from './components/contribuciones/contribucion-multas/contribucion-multas.component';
import { ContribucionMultasVehicularComponent } from './components/contribuciones/contribucion-multas-vehicular/contribucion-multas-vehicular.component';
import { ContribucionMultasEbriedadComponent } from './components/contribuciones/contribucion-multas-ebriedad/contribucion-multas-ebriedad.component';
import { ContribucionOtrosProductosComponent } from './components/contribuciones/contribucion-otros-productos/contribucion-otros-productos.component';
import { FormContribucionesComponent } from './components/contribuciones/form-contribuciones/form-contribuciones.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { PaginadorEmpleadoComponent } from './components/paginadores/paginadores-empleados/paginador-empleado/paginador-empleado.component';
import { FormEmpleadosComponent } from './components/empleados/form-empleados/form-empleados.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PaginadorUsuarioComponent } from './components/paginadores/paginadores-usuario/paginador-usuario/paginador-usuario.component';


@NgModule({
  declarations: [...fromComponents.components, InicioComponent, FormularioPrincipalComponent, FormFisicaComponent, FormMoralComponent, ContribucionImpuestoComponent, ContribucionesComponent, PaginadorContribucionesComponent, PaginadorImpuestosComponent, PaginadorContribucionDerechosGComponent, PaginadorContribucionDerechosLicenciasComponent, PaginadorContribucionMultasComponent, PaginadorContribucionMultasVehicularComponent, PaginadorContribucionMultasEbriedadComponent, PaginadorContribucionOtrosProductosComponent, ContribucionDerechoGComponent, ContribucionDerechosLicenciasComponent, ContribucionMultasComponent, ContribucionMultasVehicularComponent, ContribucionMultasEbriedadComponent, ContribucionOtrosProductosComponent, FormContribucionesComponent, EmpleadosComponent, PaginadorEmpleadoComponent, FormEmpleadosComponent, UsuariosComponent, PaginadorUsuarioComponent],
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
