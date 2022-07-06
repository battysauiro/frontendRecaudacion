import { Contribucion } from "../contribuciones/contribucion";

export class ItemFactura {
    contribucionFactura : number;
    idContribucion: string;
    idFactura : number;
    cantidad :number;
    importe : number = 1;
    precio : number;
    contribucion:Contribucion;
}
