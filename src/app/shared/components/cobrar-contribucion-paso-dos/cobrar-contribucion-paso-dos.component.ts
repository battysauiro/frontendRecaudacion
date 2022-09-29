import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cobrar-contribucion-paso-dos',
  templateUrl: './cobrar-contribucion-paso-dos.component.html',
  styleUrls: ['./cobrar-contribucion-paso-dos.component.css']
})
export class CobrarContribucionPasoDosComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  irPasoUno(): void{
    this.router.navigate(['/generarLinea-captura']);
  }

}
