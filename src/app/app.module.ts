import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from './alerts/alert/alert.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContribuyentesComponent } from './shared/components/contribuyentes/contribuyentes.component';
import { PaginadorCFisicaComponent } from './shared/components/paginadores/paginadores-contribuyentes/paginador-c-fisica/paginador-c-fisica.component';
import { PaginadorCMoralComponent } from './shared/components/paginadores/paginadores-contribuyentes/paginador-c-moral/paginador-c-moral.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './usuario-login/login/login.component';
import { ModalContribuyenteComponent } from './modales/modal-contribuyente/modal-contribuyente.component';

@NgModule({
  declarations: [
    AppComponent,
    ContribuyentesComponent,
    LoginComponent,
    PaginadorCFisicaComponent,
    PaginadorCMoralComponent,
    ModalContribuyenteComponent
  ],
  imports: [
    AlertModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
