import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CobrarContribucionComponent } from './shared/components/cobrar-contribucion/cobrar-contribucion.component';
import { ContribucionDerechoGComponent } from './shared/components/contribuciones/contribucion-derecho-g/contribucion-derecho-g.component';
import { ContribucionDerechosLicenciasComponent } from './shared/components/contribuciones/contribucion-derechos-licencias/contribucion-derechos-licencias.component';
import { ContribucionImpuestoComponent } from './shared/components/contribuciones/contribucion-impuesto/contribucion-impuesto.component';
import { ContribucionMultasEbriedadComponent } from './shared/components/contribuciones/contribucion-multas-ebriedad/contribucion-multas-ebriedad.component';
import { ContribucionMultasVehicularComponent } from './shared/components/contribuciones/contribucion-multas-vehicular/contribucion-multas-vehicular.component';
import { ContribucionMultasComponent } from './shared/components/contribuciones/contribucion-multas/contribucion-multas.component';
import { ContribucionOtrosProductosComponent } from './shared/components/contribuciones/contribucion-otros-productos/contribucion-otros-productos.component';
import { ContribucionesComponent } from './shared/components/contribuciones/contribuciones.component';
import { FormContribucionesComponent } from './shared/components/contribuciones/form-contribuciones/form-contribuciones.component';
import { ContribuyentesComponent } from './shared/components/contribuyentes/contribuyentes.component';
import { EmpleadosComponent } from './shared/components/empleados/empleados.component';
import { FormEmpleadosComponent } from './shared/components/empleados/form-empleados/form-empleados.component';
import { InicioComponent } from './shared/components/inicio/inicio.component';
import { FormUsuarioComponent } from './shared/components/usuarios/form-usuario/form-usuario.component';
import { UsuariosComponent } from './shared/components/usuarios/usuarios.component';
import { LoginComponent } from './usuario-login/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'inicio',component:InicioComponent},
  {path:'contribuyentes',component:ContribuyentesComponent},
  {path:'contribuyentes/page/:page',component:ContribuyentesComponent},
  {path:'contribuyentesMoral/page/:page',component:ContribuyentesComponent},
  {path:'contribuciones',component:ContribucionesComponent},
  {path:'contribuciones/page/:page',component:ContribucionesComponent},
  {path:'impuestos',component:ContribucionImpuestoComponent},
  {path:'impuestos/page/:page',component:ContribucionImpuestoComponent},
  {path:'derechosGeneral',component:ContribucionDerechoGComponent},
  {path:'derechosGeneral/page/:page',component:ContribucionDerechoGComponent},
  {path:'derechosLicencia',component:ContribucionDerechosLicenciasComponent},
  {path:'derechosLicencia/page/:page',component:ContribucionDerechosLicenciasComponent},
  {path:'multa',component:ContribucionMultasComponent},
  {path:'multa/page/:page',component:ContribucionMultasComponent},
  {path:'multaVehicular',component:ContribucionMultasVehicularComponent},
  {path:'multaVehicular/page/:page',component:ContribucionMultasVehicularComponent},
  {path:'multaEbriedad',component:ContribucionMultasEbriedadComponent},
  {path:'multaEbriedad/page/:page',component:ContribucionMultasEbriedadComponent},
  {path:'otrosProductos',component:ContribucionOtrosProductosComponent},
  {path:'otrosProductos/page/:page',component:ContribucionOtrosProductosComponent},
  {path:'formulario-contribucion/:tipo/:id',component:FormContribucionesComponent},
  {path:'formulario-contribucion',component:FormContribucionesComponent},
  {path:'formulario-contribucion/:tipoSeleccion',component:FormContribucionesComponent},
  {path:'empleados',component:EmpleadosComponent},
  {path:'empleados/page/:page',component:EmpleadosComponent},
  {path:'empleados/formulario-empleados',component:FormEmpleadosComponent},
  {path:'empleados/formulario-empleados/:id',component:FormEmpleadosComponent},
  {path:'usuario',component:UsuariosComponent},
  {path:'usuario/page/:page',component:UsuariosComponent},
  {path:'usuario/formUsuario',component:FormUsuarioComponent},
  {path:'usuario/formUsuario/:id',component:FormUsuarioComponent},
  {path:'generarLinea-captura',component:CobrarContribucionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
