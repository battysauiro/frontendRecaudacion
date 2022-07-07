import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './usuario-login/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  titulo = 'IDS administración';
  subtitulo = 'Recaudacion de Ingresos';
  title = 'recaudacionMunicipioFrontend';
  constructor(public authService: AuthService, public router: Router) {}

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
