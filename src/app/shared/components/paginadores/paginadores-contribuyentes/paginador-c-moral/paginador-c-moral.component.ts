import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador-c-moral',
  templateUrl: './paginador-c-moral.component.html',
  styleUrls: ['./paginador-c-moral.component.css']
})
export class PaginadorCMoralComponent implements OnInit {

  @Input() paginador:any;
  paginas:number[];
  desde:number;
  hasta:number;
  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes:SimpleChanges){
    let paginadorActualizado=changes['paginador'];
    if(paginadorActualizado.previousValue){
      this.initPaginator();
    }
  }

  public initPaginator():void{
    this.desde=Math.min(Math.max(1,this.paginador.numeroPagina-4),this.paginador.totalPaginas-5);
    this.hasta=Math.max(Math.min(this.paginador.totalPaginas,this.paginador.numeroPagina+4),6);
    if(this.paginador.totalPaginas>5){
      this.paginas=new Array(this.hasta - this.desde+1).fill(0).map((_valor,indice)=>indice + this.desde);
    }else{
      this.paginas=new Array(this.paginador.totalPaginas).fill(0).map((_valor,indice)=>indice+1);
    }
  }

}
