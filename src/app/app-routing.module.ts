import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContribucionesComponent } from './shared/components/contribuciones/contribuciones.component';
import { ContribuyentesComponent } from './shared/components/contribuyentes/contribuyentes.component';
import { InicioComponent } from './shared/components/inicio/inicio.component';
import { LoginComponent } from './usuario-login/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'inicio',component:InicioComponent},
  {path:'contribuyentes',component:ContribuyentesComponent},
  {path:'contribuyentes/page/:page',component:ContribuyentesComponent},
  {path:'contribuyentesMoral/page/:page',component:ContribuyentesComponent},
  {path:'contribuciones',component:ContribucionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
