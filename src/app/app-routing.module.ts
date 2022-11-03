import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CobrarContribucionPasoDosComponent } from './shared/components/cobrar-contribucion-paso-dos/cobrar-contribucion-paso-dos.component';
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
import { RecuperarPasswordComponent } from './shared/components/recuperar-password/recuperar-password.component';
import { SendEmailComponent } from './shared/components/recuperar-password/send-email.component';
import { ReportesContribuyentesComponent } from './shared/components/reportes/reportes-contribuyentes/reportes-contribuyentes.component';
import { ReportesComponent } from './shared/components/reportes/reportes.component';
import { FormUsuarioComponent } from './shared/components/usuarios/form-usuario/form-usuario.component';
import { UsuariosComponent } from './shared/components/usuarios/usuarios.component';
import { VistaAdeudosComponent } from './shared/components/vista-adeudos/vista-adeudos.component';
import { AuthGuard } from './usuario-login/guards/auth.guard';
import { LoginComponent } from './usuario-login/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'inicio',component:InicioComponent,canActivate:[AuthGuard]},
  {path:'contribuyentes',component:ContribuyentesComponent,canActivate:[AuthGuard]},
  {path:'contribuyentes/page/:page/:tipo',component:ContribuyentesComponent,canActivate:[AuthGuard]},
  {path:'contribuyentesMoral/page/:page/:tipo',component:ContribuyentesComponent,canActivate:[AuthGuard]},
  {path:'contribuciones',component:ContribucionesComponent,canActivate:[AuthGuard]},
  {path:'contribuciones/page/:page',component:ContribucionesComponent,canActivate:[AuthGuard]},
  {path:'impuestos',component:ContribucionImpuestoComponent,canActivate:[AuthGuard]},
  {path:'impuestos/page/:page',component:ContribucionImpuestoComponent,canActivate:[AuthGuard]},
  {path:'derechosGeneral',component:ContribucionDerechoGComponent,canActivate:[AuthGuard]},
  {path:'derechosGeneral/page/:page',component:ContribucionDerechoGComponent,canActivate:[AuthGuard]},
  {path:'derechosLicencia',component:ContribucionDerechosLicenciasComponent,canActivate:[AuthGuard]},
  {path:'derechosLicencia/page/:page',component:ContribucionDerechosLicenciasComponent,canActivate:[AuthGuard]},
  {path:'multa',component:ContribucionMultasComponent,canActivate:[AuthGuard]},
  {path:'multa/page/:page',component:ContribucionMultasComponent,canActivate:[AuthGuard]},
  {path:'multaVehicular',component:ContribucionMultasVehicularComponent,canActivate:[AuthGuard]},
  {path:'multaVehicular/page/:page',component:ContribucionMultasVehicularComponent,canActivate:[AuthGuard]},
  {path:'multaEbriedad',component:ContribucionMultasEbriedadComponent,canActivate:[AuthGuard]},
  {path:'multaEbriedad/page/:page',component:ContribucionMultasEbriedadComponent,canActivate:[AuthGuard]},
  {path:'otrosProductos',component:ContribucionOtrosProductosComponent,canActivate:[AuthGuard]},
  {path:'otrosProductos/page/:page',component:ContribucionOtrosProductosComponent,canActivate:[AuthGuard]},
  {path:'formulario-contribucion/:tipo/:id',component:FormContribucionesComponent,canActivate:[AuthGuard]},
  {path:'formulario-contribucion',component:FormContribucionesComponent,canActivate:[AuthGuard]},
  {path:'formulario-contribucion/:tipoSeleccion',component:FormContribucionesComponent,canActivate:[AuthGuard]},
  {path:'empleados',component:EmpleadosComponent,canActivate:[AuthGuard]},
  {path:'empleados/page/:page',component:EmpleadosComponent,canActivate:[AuthGuard]},
  {path:'empleados/formulario-empleados',component:FormEmpleadosComponent,canActivate:[AuthGuard]},
  {path:'empleados/formulario-empleados/:id',component:FormEmpleadosComponent,canActivate:[AuthGuard]},
  {path:'usuario',component:UsuariosComponent,canActivate:[AuthGuard]},
  {path:'usuario/page/:page',component:UsuariosComponent,canActivate:[AuthGuard]},
  {path:'usuario/formUsuario',component:FormUsuarioComponent,canActivate:[AuthGuard]},
  {path:'usuario/formUsuario/:id',component:FormUsuarioComponent,canActivate:[AuthGuard]},
  {path:'generarLinea-captura',component:CobrarContribucionComponent,canActivate:[AuthGuard]},
  {path:'generarLinea-captura-paso-dos',component:CobrarContribucionPasoDosComponent,canActivate:[AuthGuard]},
  {path:'vista-adeudos',component:VistaAdeudosComponent},
  {path:'sendEmail',component:SendEmailComponent},
  {path:'changePassword/:tokenPassword',component:RecuperarPasswordComponent},
  {path:'reportes',component:ReportesComponent,canActivate:[AuthGuard]},
  {path:'reportes-contribuyentes',component:ReportesContribuyentesComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
