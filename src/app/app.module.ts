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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
