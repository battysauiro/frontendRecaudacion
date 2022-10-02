import { ItemFactura } from "./item-factura";

export class Factura {
    folio : number;
    usuario_id : string;
    contribuyente_id : string;
    domicilio:string;
    rmc :string;
    fecha : string;
    descuento : number;
    total : number;
    items : Array<ItemFactura>=[];
    estado_pago:boolean;
    nombre_contribuyente:string;
    direccion_contribuyente:string;
}
