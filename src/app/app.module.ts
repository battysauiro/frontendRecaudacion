import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from './alerts/alert/alert.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContribuyentesComponent } from './shared/components/contribuyentes/contribuyentes.component';

@NgModule({
  declarations: [
    AppComponent,
    ContribuyentesComponent
  ],
  imports: [
    AlertModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
