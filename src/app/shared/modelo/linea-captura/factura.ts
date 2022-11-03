import { ContribuyenteFisica } from "../contribuyentes/contribuyente-fisica";
import { ContribuyenteMoral } from "../contribuyentes/contribuyente-moral";
import { ItemFactura } from "./item-factura";

export class Factura {
    folio : number;
    usuario_id : string;
    contribuyente_id : string;
    domicilio:string;
    rmc :string;
    fecha : string;
    descuento : number;
    costo:number
    total : number;
    items : ItemFactura[]=[];
    estado_pago:boolean;
    nombre_contribuyente:string;
    direccion_contribuyente:string;
    tipo_contribuyente:boolean;
    contribuyenteFisica :ContribuyenteFisica;
    contribuyenteMoral :ContribuyenteMoral;
}
